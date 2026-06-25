# GoDaddy Hosting Upload

This project now has a static build for GoDaddy cPanel/shared hosting.

## Build

```bash
npm run build:godaddy
```

The upload-ready files are generated in:

```text
godaddy-dist/
```

Upload the contents of `godaddy-dist/` into the GoDaddy hosting document root, usually
`public_html/`.

## Important Files

- `index.html` is the static app entry.
- `assets/` contains the compiled JavaScript, CSS, and images.
- `.htaccess` rewrites direct route requests like `/about-us` back to `index.html`.

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
