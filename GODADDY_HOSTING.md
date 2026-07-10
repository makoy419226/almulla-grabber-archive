# GoDaddy Hosting Upload

This project deploys a browser-only React build to GoDaddy cPanel/shared hosting.

## Build

```bash
npm run build:godaddy
```

For local development, `npm run dev` also refreshes `godaddy-dist/` once before starting the React
dev server. The deployed GoDaddy build now uses the same React routes and components as local
development, so edits under `src/` are included after `npm run build:godaddy`.

The script builds the React app with `vite.godaddy.config.ts`, copies shared public assets, adds
GoDaddy SPA fallback files, and writes the output into:

```text
godaddy-dist/
```

Upload the contents of `godaddy-dist/` into the GoDaddy hosting document root, usually
`public_html/`.

## Important Files

- `godaddy-react/index.html` is the lightweight React app shell used for GoDaddy.
- `src/godaddy-main.tsx` mounts the same TanStack Router app used in local development.
- `scripts/prepare-godaddy-react-dist.mjs` writes fallback `index.html` files for deployed routes.
- Shared assets, `.htaccess`, `robots.txt`, and `sitemap.xml` come from `godaddy-public/`.

## GoDaddy cPanel Steps

1. Open GoDaddy Hosting.
2. Open cPanel Admin.
3. Open File Manager.
4. Go to `public_html/`.
5. Remove the old site files if this is replacing an existing site.
6. Upload everything inside `godaddy-dist/`.
7. Confirm `.htaccess` is present. Enable "Show Hidden Files" in File Manager if needed.

The contact form is still client-side only. It shows a thank-you message but does not send email
unless a form backend or third-party form endpoint is added.

## GitHub Auto Deploy

The repository includes a GitHub Actions workflow at:

```text
.github/workflows/deploy-godaddy.yml
```

It runs `npm ci`, builds the React GoDaddy app with `npm run build:godaddy`, validates the output,
and uploads `godaddy-dist/` to GoDaddy by FTP on every push.

Add these secrets in GitHub:

```text
GODADDY_FTP_SERVER
GODADDY_FTP_USERNAME
GODADDY_FTP_PASSWORD
```

The workflow uploads the built React site to:

```text
/
```

Use an FTP account whose directory is the live site root:

```text
/home/upjzdjjy3xcp/public_html
```

Because the FTP account starts inside `public_html`, `/` means the live website folder.

The workflow runs on every push and can also be started manually from GitHub Actions. Local changes
deploy only after they are committed and pushed to GitHub.
