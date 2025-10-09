Deployment notes

- The frontend uses BrowserRouter (client-side routing). Your web server must rewrite all unmatched routes to `index.html` (single page app). For example:
  - Apache: enable `mod_rewrite` and use `FallbackResource /index.html` or a RewriteRule to route to index.html
  - Nginx: use `try_files $uri /index.html;`

- Set production site URL for canonical tags and analytics:
  - Create a `.env.production` with `VITE_SITE_URL=https://ketenpnomatik.com` (already included in repo as example). The production build uses this value.

- Backend MySQL configuration:
  - Put DB credentials in `php/.env` on the server (do NOT commit this file to git). The `php/api/bootstrap.php` will prefer MySQL when these are present.

- To migrate data from the local SQLite to MySQL, see `php/scripts/migrate_sqlite_to_mysql.php` (if created) or export/import via phpMyAdmin.

- Local dev: `npm run dev` will serve at e.g. http://localhost:5173 and canonical will use `window.location.origin`, so it will not be replaced by production domain.
