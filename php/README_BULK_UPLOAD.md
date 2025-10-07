# Categories Bulk Upload (JSON)

This endpoint lets you import/update the `categories` table in bulk via JSON.

Endpoint
- POST `/php/api/categories_bulk_upload_json.php`
- Content-Type: `application/json`
- Body:
  - Either `{ "items": [ ... ] }` or a raw array `[ ... ]`
- Response: `{ status, inserted, updated, skipped, errors: [] }`

Item schema (fields)
- required: `parent`, `child`, `subchild`
- optional: `title`, `title_subtext`, `about`, `featured` (0/1/true/false/evet/hayır/yes/no), `info`, `summary`, `usable_areas`, `meta_title`, `meta_desc`, `schema_desc`, `meta_keywords`, `main_image`, `img1`

Upsert rule
- Unique key: `(parent, child, subchild)`
- If a row with same path exists → it’s updated. Otherwise → inserted.

Sample JSON
- See `php/samples/categories_sample.json`

How to test with PowerShell
```powershell
$uri = "http://127.0.0.1:9000/php/api/categories_bulk_upload_json.php"  # PHP built-in server URL
$body = Get-Content "c:/Users/uur/OneDrive/Masaüstü/keten_work/ketenpnomatik.com/php/samples/categories_sample.json" -Raw -Encoding UTF8
Invoke-WebRequest -Uri $uri -Method Post -Body $body -ContentType "application/json" | Select-Object -ExpandProperty Content
```

Notes
- Ensure DB exists (run `php/setup_db.php` once)
- For production, restrict CORS and add authentication (e.g., token check)