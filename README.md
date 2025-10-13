

Keten Pnömatik - Website Source
================================

This repository contains the source code for ketenpnomatik.com. The project is split into two main parts:

- A PHP-based backend and helper scripts under `php/` (content management, image uploads, sitemap generation, etc.).
- A React + Vite frontend under `react/` (public website UI).

This README provides a quick guide for anyone who clones the repo: what is where, how to run the frontend and backend locally, and common commands.

Overview
--------

- Project: Keten Pnömatik corporate website
- Frontend: React + TypeScript + Vite, TailwindCSS
- Backend: Plain PHP scripts (simple API endpoints, file uploads, sitemap generation)
- Static sitemaps: `sitemap.xml` at repository root, and `react/public/sitemap.xml`

Important Files and Folders
---------------------------

- `react/` - Frontend application
	- `react/package.json` - scripts and dependencies
	- `react/src/` - React source code (pages, components, hooks)
	- `react/public/` - static assets (robots.txt, sitemap.xml, uploads)
	- `react/README.md` - frontend-specific notes

- `php/` - Backend and admin helper scripts
	- `php/api/` - API-like endpoints (e.g. `articles.php`, `blogs.php`, `products.php`)
	- `php/generate_sitemap.php`, `php/export_sitemap_data.php` - sitemap generation tools
	- `php/bootstrap.php` - common configuration (DB connection, includes)

- `uploads/` - uploaded files used by the site (e.g. `blog_images/`)
- `sitemap_generator.py` - alternative Python script to help generate sitemap data
- `sitemap.xml` - sitemap file at repository root
- `upload_folders/`, `product_upload_v4.json`, `category_upload.json` - bulk upload samples and data

Quick Start (Frontend)
----------------------

Requirements: Node.js (recommended v16+)

Install and start the dev server:

```powershell
cd react
npm install
npm run dev
```

The Vite dev server usually runs at http://localhost:5173.

Build for production and preview the build:

```powershell
npm run build
npm run preview
```

Quick Start (Backend / PHP)
---------------------------

The backend is implemented as PHP scripts. You can run them with a PHP-enabled web server (Apache/Nginx + PHP-FPM) or PHP's built-in server for local testing.

Start a simple PHP server from the `php/` directory:

```powershell
cd php
php -S localhost:8000
```

Note: Some scripts expect database access. Configure your DB connection in `php/bootstrap.php` if you need full functionality.

Sitemap and Site Content
------------------------

- `php/generate_sitemap.php` and `php/export_sitemap_data.php` are used to extract site data and build/update the sitemap.
- There are static sitemap files at the repository root and under `react/public/`. Re-generate them if they are out of date.
- `sitemap_generator.py` is a convenience Python script for generating or manipulating sitemap data locally.

Uploads and Media
-----------------

- Uploaded images are stored in `uploads/` (e.g. `uploads/blog_images/`) and in `react/public/uploads/site_images/` for the frontend.
- API endpoints for uploading media: `php/api/upload_image.php` and `php/api/upload_site_image.php`.

Development Tips and Configuration
---------------------------------

- Environment and DB configuration is typically inside `php/bootstrap.php`. Avoid committing secrets to the repo.
- Frontend API base URLs and endpoints are used in `react/src` (hooks/services). Update them when running the backend on a different host/port.

Contributing
------------

- Preferred workflow: fork -> branch -> pull request.
- Open an issue to discuss larger changes before implementing them.

Example Commands
----------------

- Start frontend dev server:

```powershell
cd react; npm install; npm run dev
```

- Build frontend for production:

```powershell
cd react; npm run build
```

- Run a simple PHP server for backend testing:

```powershell
cd php; php -S localhost:8000
```

- Generate sitemap with PHP scripts (server-side): access `php/generate_sitemap.php` via the server or run it in CLI depending on the script's expectations.

Troubleshooting
---------------

- Frontend issues: check Node version, delete `node_modules` and re-run `npm install`.
- PHP errors: check syntax with `php -l` and inspect server logs or terminal output for stack traces.

License and Copyright
---------------------

This repository contains project-specific content. There is no LICENSE file included — add one if you want to specify reuse terms.

Contact
-------

Repository owner: `ugurkanyilmaz` (GitHub username). Use the repo's Issues area for questions or requests.

Notes
-----

If you want more detailed instructions for database setup, deployment pipelines (Netlify/Vercel/Cloud), or CI/CD, tell me the target environment and I will add step-by-step configs and examples.
