#!/usr/bin/env python3
"""
sitemap_generator.py

Generates sitemap.xml by reading:
- upload_folders/product_upload_v4.json (uses product['URL'] when present)
- upload_folders/category_upload.json (generates category URLs by slugifying parent/child/subchild/title)

Usage: python sitemap_generator.py [--base BASE] [--products PATH] [--categories PATH] [--out PATH]

Defaults assume files are in upload_folders/*.json and output is ./sitemap.xml
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.request
from datetime import datetime
from typing import Iterable, List, Set, Tuple


def slugify(value: str) -> str:
    """Simple slugify for Turkish/Latin characters and spaces -> hyphen.
    Keeps it deterministic and filesystem-safe.
   """
    if not value:
        return ""
    v = value.strip().lower()
    # replace Turkish chars
    replacements = {
        'ç': 'c', 'ğ': 'g', 'ı': 'i', 'İ': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u',
        'Ç': 'c', 'Ğ': 'g', 'Ö': 'o', 'Ş': 's', 'Ü': 'u'
    }
    for a, b in replacements.items():
        v = v.replace(a, b)
    # remove anything not alnum or space or hyphen
    v = re.sub(r"[^a-z0-9\s-]", "", v)
    # collapse whitespace/hyphens
    v = re.sub(r"[\s-]+", "-", v)
    v = v.strip('-')
    return v


def clean_input(value: str) -> str:
    """Preprocess input: percent-decode and strip surrounding whitespace/quotes.
    This avoids generating slugs from already-encoded titles like 'A16%20Serisi...'
    which sometimes come from copy-pasted search engine URLs.
    """
    if not value:
        return ''
    v = value
    try:
        # decode %20 etc.
        v = urllib.request.unquote(v)
    except Exception:
        # fallback: keep original
        pass
    # remove stray quotes and trim
    return v.strip().strip('"\'')


def load_json(path: str) -> dict:
    # Use utf-8-sig to tolerate files that begin with a UTF-8 BOM
    with open(path, 'r', encoding='utf-8-sig') as f:
        return json.load(f)


def gather_product_urls(products_json_path: str, base: str | None) -> List[str]:
    data = load_json(products_json_path)
    rows = data.get('Sheet1') or data.get('sheet1') or data if isinstance(data, list) else []
    print(f"Loaded {len(rows)} product rows from {products_json_path}")
    urls: List[str] = []
    for item in rows:
        # Prefer explicit URL field (clean/percent-decode it first)
        raw_url = item.get('URL') or item.get('Url') or item.get('url') or item.get('link')
        url = clean_input(raw_url) if raw_url is not None else ''
        # Some exports contain literal strings like "NULL" or "null" - treat as empty
        if isinstance(url, str) and url.strip().lower() in ('', 'null', 'none', 'nil'):
            url = ''
        if not url:
            # fallback: try to build from sku if present
            sku = item.get('sku') or item.get('SKU')
            if sku:
                    # Prefer SKU-based product permalinks when sku is present
                    sku = item.get('sku') or item.get('SKU') or ''
                    url = item.get('url') or item.get('URL') or item.get('Url') or ''
                    if sku:
                        # Ensure SKU-based link uses slugified SKU and trailing slash
                        url = f"/urun/{slugify(str(sku))}/"
                    elif url:
                        # normalize url from API (may be absolute or relative)
                        url = str(url)
                    else:
                        # skip if no usable url or sku
                        url = ''
        if url:
            # Normalize to chosen base if base provided and url looks absolute
            if base:
                # if url already absolute, replace host portion
                if url.startswith('http://') or url.startswith('https://'):
                    # replace scheme+host with base
                    path = '/' + '/'.join(url.split('/')[3:])
                    url = base.rstrip('/') + path
                else:
                    url = base.rstrip('/') + (url if url.startswith('/') else '/' + url)
            urls.append(url)
    return urls


def fetch_from_api(api_url: str, api_key: str | None, include: str = 'products,articles', limit: int = 10000, offset: int = 0) -> Tuple[List[dict], List[dict]]:
    """Fetch products and articles JSON from the export endpoint.
    Returns (products_rows, articles_rows).
    """
    params = f"?include={urllib.request.quote(include)}&limit={limit}&offset={offset}"
    url = api_url + params if '?' not in api_url else api_url + '&' + params.lstrip('?')
    req = urllib.request.Request(url)
    if api_key:
        req.add_header('X-API-Key', api_key)
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read()
            data = json.loads(raw.decode('utf-8'))
            products = data.get('products', [])
            articles = data.get('articles', [])
            return products, articles
    except Exception as e:
        print(f"Failed to fetch from API: {e}")
        return [], []


def gather_category_urls(categories_json_path: str, base: str | None) -> List[str]:
    data = load_json(categories_json_path)
    rows = data.get('Sheet1') or data.get('sheet1') or data if isinstance(data, list) else []
    print(f"Loaded {len(rows)} category rows from {categories_json_path}")
    urls: Set[str] = set()
    # We'll create tier-level and category-level slugs. Use parent/child/subchild/title fields.
    for item in rows:
        # clean inputs (decode percent-encoding and ignore literal NULLs)
        parent = clean_input(item.get('Parent') or item.get('parent') or item.get('parent_category') or '')
        child = clean_input(item.get('child') or item.get('Child') or '')
        subchild = clean_input(item.get('subchild') or item.get('Subchild') or '')
        title = clean_input(item.get('title') or item.get('Title') or '')
        if parent.strip().lower() in ('', 'null', 'none'):
            parent = ''
        if child.strip().lower() in ('', 'null', 'none'):
            child = ''
        if subchild.strip().lower() in ('', 'null', 'none'):
            subchild = ''

        # Determine tier slug: prefer parent if present else 'genel'
        tier_slug = slugify(parent) or 'genel'

        # If child exists, create /kategoriler/<tier>/<child-slug>/
        if child:
            child_slug = slugify(child)
            if child_slug:
                urls.add(f"/kategoriler/{tier_slug}/{child_slug}/")

        # If subchild exists, create /kategoriler/<tier>/<child-slug>/<subchild-slug>/
        if subchild and child:
            child_slug = slugify(child)
            subchild_slug = slugify(subchild)
            if child_slug and subchild_slug:
                urls.add(f"/kategoriler/{tier_slug}/{child_slug}/{subchild_slug}/")

        # Also add a page for the top-level tier
        urls.add(f"/kategoriler/{tier_slug}/")

        # NOTE: do not create pages from arbitrary 'title' fields. Titles often
        # represent article headlines and are not direct category pages. Creating
        # URLs from titles caused sitemap entries like
        # /kategoriler/profesyonel/A16%20Serisi%20Haval%C4%B1%20Kar%C4%B1%C5%9Ft%C4%B1r%C4%B1c%C4%B1%20Mikser
        # which do not correspond to an actual route. We only emit tier/child/subchild.

    out = sorted(urls)
    # Normalize to base if provided
    if base:
        out = [base.rstrip('/') + u if u.startswith('/') else base.rstrip('/') + '/' + u for u in out]
    return out


def gather_category_urls_from_articles(articles_rows: List[dict], base: str | None) -> List[str]:
    urls: Set[str] = set()
    for item in articles_rows:
        parent = clean_input(item.get('parent') or item.get('Parent') or '')
        child = clean_input(item.get('child') or item.get('Child') or '')
        subchild = clean_input(item.get('subchild') or item.get('Subchild') or '')
        title = clean_input(item.get('title') or item.get('Title') or '')
        if parent.strip().lower() in ('', 'null', 'none'):
            parent = ''
        if child.strip().lower() in ('', 'null', 'none'):
            child = ''
        if subchild.strip().lower() in ('', 'null', 'none'):
            subchild = ''

        tier_slug = slugify(parent) or 'genel'
        if child:
            child_slug = slugify(child)
            if child_slug:
                urls.add(f"/kategoriler/{tier_slug}/{child_slug}/")
        if subchild and child:
            child_slug = slugify(child)
            subchild_slug = slugify(subchild)
            if child_slug and subchild_slug:
                urls.add(f"/kategoriler/{tier_slug}/{child_slug}/{subchild_slug}/")
        urls.add(f"/kategoriler/{tier_slug}/")
        # Do not add title-based paths for same reason as gather_category_urls
        # Titles often are article headings and not category pages.

    out = sorted(urls)
    if base:
        out = [base.rstrip('/') + u if u.startswith('/') else base.rstrip('/') + '/' + u for u in out]
    return out


def build_static_pages(base: str | None) -> List[str]:
    pages = [
        '/',
        '/kategoriler/',
        '/urunler/',
        '/hakkimizda/',
        '/iletisim/',
        '/demo-talebi/',
        '/teknik-servis/',
        '/sss/',
        '/blog/',
    ]
    if base:
        pages = [base.rstrip('/') + p for p in pages]
    return pages


def priority_static_pages(base: str | None) -> List[str]:
    # Explicit prioritized pages (home, hakkimizda and children, demo request, contact)
    items = [
        '/',
        '/hakkimizda/',
        '/hakkimizda/kolver/',
        '/hakkimizda/hiyoki/',
        '/hakkimizda/apac/',
        '/demo-talebi/',
        '/iletisim/',
        '/urunler/',
        '/kategoriler/',
        '/blog/',
    ]
    if base:
        items = [base.rstrip('/') + p for p in items]
    return items


def extract_static_routes_from_react(app_tsx_path: str, base: str | None) -> List[str]:
    """Parse App.tsx for Route path="..." entries and return non-parameter routes.
    Only includes routes without ':' parameters.
    """
    if not os.path.exists(app_tsx_path):
        return []
    with open(app_tsx_path, 'r', encoding='utf-8') as f:
        content = f.read()
    # crude regex to find path="/..."
    paths = re.findall(r'path\s*=\s*"([^"]+)"', content)
    static = []
    for p in paths:
        # skip wildcard and parameterized routes
        if ':' in p or '*' in p:
            continue
        # skip relative nested routes (they are children of a parent Route and
        # usually do not start with '/'; including them causes malformed URLs
        # like https://domainkategoriler/). We only include absolute routes.
        if not p.startswith('/'):
            continue

        # ensure trailing slash for non-root
        if p == '/':
            route = '/'
        else:
            route = p if p.endswith('/') else p + '/'
        if base:
            route = base.rstrip('/') + route
        static.append(route)
    # dedupe while preserving order
    seen = set()
    out = []
    for r in static:
        if r not in seen:
            out.append(r)
            seen.add(r)
    return out


def write_sitemap(entries: Iterable[tuple], out_path: str) -> None:
    """Write sitemap where entries is an iterable of tuples (loc, priority, changefreq, lastmod).
    """
    seen = set()
    deduped = []
    for loc, pr, cf, lm in entries:
        if loc in seen:
            continue
        seen.add(loc)
        deduped.append((loc, pr, cf, lm))

    now = datetime.utcnow().date().isoformat()
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
        f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
        for loc, pr, cf, lm in deduped:
            f.write('  <url>\n')
            f.write(f'    <loc>{loc}</loc>\n')
            # lastmod removed per user request
            if pr is not None:
                f.write(f'    <priority>{pr:.1f}</priority>\n')
            if cf:
                f.write(f'    <changefreq>{cf}</changefreq>\n')
            f.write('  </url>\n')
        f.write('</urlset>\n')


def main(argv: List[str] | None = None) -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument('--base', '-b', help='Base URL to prefix (e.g. https://ketenpnomatik.com)', default='https://ketenpnomatik.com')
    parser.add_argument('--products', help='Path to product JSON', default=os.path.join('upload_folders', 'product_upload_v4.json'))
    parser.add_argument('--categories', help='Path to category JSON', default=os.path.join('upload_folders', 'category_upload.json'))
    parser.add_argument('--api-url', help='Optional export API URL to fetch data from (e.g. https://example.com/php/api/export_sitemap_data.php)')
    parser.add_argument('--api-key', help='API key to send in X-API-Key header when fetching from --api-url')
    parser.add_argument('--static-priority', type=float, default=0.9, help='Priority for priority/static pages (0.0-1.0)')
    parser.add_argument('--category-priority', type=float, default=0.6, help='Priority for category pages')
    parser.add_argument('--product-priority', type=float, default=0.5, help='Priority for product pages')
    parser.add_argument('--static-changefreq', default='weekly', help='changefreq for static pages')
    parser.add_argument('--category-changefreq', default='weekly', help='changefreq for category pages')
    parser.add_argument('--product-changefreq', default='monthly', help='changefreq for product pages')
    parser.add_argument('--out', '-o', help='Output sitemap path', default='sitemap.xml')
    args = parser.parse_args(argv or sys.argv[1:])

    product_json = args.products
    category_json = args.categories
    base = args.base.rstrip('/')

    urls: List[str] = []
    prod_count = 0
    cat_count = 0

    # If api-url provided, fetch and build from API
    if getattr(args, 'api_url', None):
        print(f"Fetching data from API: {args.api_url}")
        products_rows, articles_rows = fetch_from_api(args.api_url, args.api_key)

        entries: List[tuple] = []

        # Priority static pages first
        for p in priority_static_pages(base):
            entries.append((p, args.static_priority, args.static_changefreq, None))

        # Extract static routes from React App.tsx and append any that aren't already present
        react_static = extract_static_routes_from_react(os.path.join('react', 'src', 'App.tsx'), base)
        for r in react_static:
            # filter out admin-only or site-image related routes
            low = r.lower()
            if 'kategori-fotografl' in low or 'site-gorsel' in low or 'kategori-fotograf' in low:
                continue
            if r not in [e[0] for e in entries]:
                entries.append((r, args.static_priority, args.static_changefreq, None))

        # Categories
        if articles_rows:
            cat_urls = gather_category_urls_from_articles(articles_rows, base)
            for c in cat_urls:
                if c not in [e[0] for e in entries]:
                    entries.append((c, args.category_priority, args.category_changefreq, None))
            cat_count = len(cat_urls)

        # Products (append at the end)
        if products_rows:
            for item in products_rows:
                url = item.get('url') or item.get('URL') or item.get('Url')
                if not url and item.get('sku'):
                    # match site product paths: /urun/<sku>
                    url = f"/urun/{slugify(str(item.get('sku')))}"
                if url:
                    if base:
                        if url.startswith('http://') or url.startswith('https://'):
                            path = '/' + '/'.join(url.split('/')[3:])
                            url = base.rstrip('/') + path
                        else:
                            url = base.rstrip('/') + (url if url.startswith('/') else '/' + url)
                    if url not in [e[0] for e in entries]:
                        entries.append((url, args.product_priority, args.product_changefreq, None))
            prod_count = len(products_rows)

        write_sitemap(entries, args.out)
        print(f"Wrote {args.out} with {len(entries)} URLs (products: {prod_count}, categories: {cat_count})")
        return 0

    # Static pages
    urls.extend(build_static_pages(base))

    # Priority static pages first (local JSON flow)
    entries: List[tuple] = []
    for p in priority_static_pages(base):
        entries.append((p, args.static_priority, args.static_changefreq, None))

    # Extract static routes from React App.tsx and append any that aren't already present
    react_static = extract_static_routes_from_react(os.path.join('react', 'src', 'App.tsx'), base)
    for r in react_static:
        low = r.lower()
        if 'kategori-fotografl' in low or 'site-gorsel' in low or 'kategori-fotograf' in low:
            continue
        if r not in [e[0] for e in entries]:
            entries.append((r, args.static_priority, args.static_changefreq, None))

    # Categories
    if os.path.exists(category_json):
        cat_urls = gather_category_urls(category_json, base)
        for c in cat_urls:
            if c not in [e[0] for e in entries]:
                entries.append((c, args.category_priority, args.category_changefreq, None))
        cat_count = len(cat_urls)
    else:
        print(f"Warning: category JSON not found at {category_json}")

    # Products
    if os.path.exists(product_json):
        prod_urls = gather_product_urls(product_json, base)
        for p in prod_urls:
            if p not in [e[0] for e in entries]:
                entries.append((p, args.product_priority, args.product_changefreq, None))
    else:
        print(f"Warning: product JSON not found at {product_json}")

    # Final write
    write_sitemap(entries, args.out)
    print(f"Wrote {args.out} with {len(entries)} URLs (products: {len(prod_urls) if 'prod_urls' in locals() else 0}, categories: {cat_count})")
    return 0


if __name__ == '__main__':
    raise SystemExit(main())
