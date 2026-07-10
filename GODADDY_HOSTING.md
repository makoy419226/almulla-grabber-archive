# GoDaddy Hosting Upload

This project has a lightweight static build for GoDaddy cPanel/shared hosting.

## Build

```bash
npm run build:godaddy
```

For local development, `npm run dev` also refreshes `godaddy-dist/` once before starting the
React dev server. It does not watch the static GoDaddy files after startup; run
`npm run build:godaddy` again if you edit files under `godaddy/` or `godaddy-public/` while the dev
server is already running.

The script copies `godaddy/` pages and `godaddy-public/` assets into:

```text
godaddy-dist/
```

Upload the contents of `godaddy-dist/` into the GoDaddy hosting document root, usually
`public_html/`.

## Important Files

- `index.html` is committed static HTML, so the homepage does not wait for the React app bundle.
- `contact-us/` and `privacy-policy/` contain static page HTML.
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

It runs `npm run build:godaddy` on every push, validates that the output is still static,
and uploads `godaddy-dist/` to GoDaddy by FTP.

Add these secrets in GitHub:

```text
GODADDY_FTP_SERVER
GODADDY_FTP_USERNAME
GODADDY_FTP_PASSWORD
```

The workflow uploads the built site to:

```text
/
```

Use an FTP account whose directory is the live site root:

```text
/home/upjzdjjy3xcp/public_html
```

Because the FTP account starts inside `public_html`, `/` means the live website folder.

The workflow runs on every push and can also be started manually from GitHub Actions.
