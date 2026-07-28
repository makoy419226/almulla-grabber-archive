# AlMulla Holding WordPress Theme

This folder contains the WordPress version of the AlMulla Holding website.

## Install

1. In WordPress Admin, open **Appearance → Themes → Add New → Upload Theme**.
2. Upload `almulla-holding.zip`.
3. Install and activate the theme.
4. Open **Appearance → Customize → AlMulla Content** to edit the homepage, sectors,
   chairman details, contact information, and footer.
5. Edit longer page content under **Pages**.
6. Create the primary and footer menus under **Appearance → Menus**.
7. Confirm **Settings → General** uses `https://almullaholding.co`.
8. Confirm **Settings → Permalinks** is set to **Post name**.

On first activation, the theme creates Home, About Us, Contact Us, and Privacy Policy pages when
those slugs do not already exist. Existing pages are preserved.

## Connect this repository to WordPress hosting

The separate `Deploy WordPress theme` GitHub Actions workflow uploads only this theme. Add these
repository secrets:

- `WORDPRESS_FTP_SERVER`
- `WORDPRESS_FTP_USERNAME`
- `WORDPRESS_FTP_PASSWORD`
- `WORDPRESS_THEME_DIR`

Set `WORDPRESS_THEME_DIR` to the theme directory visible to that FTP account, ending with `/`.
Common examples are `/wp-content/themes/almulla-holding/` or `/almulla-holding/` when the FTP
account is already rooted inside the WordPress themes directory.

Run **Actions → Deploy WordPress theme → Run workflow** after reviewing changes. Do not reuse the
existing `.com` static deployment credentials unless both domains genuinely share the same hosting
root.

## Migration order

1. Install and review this theme on `.co`.
2. Replace defaults with final content and verify all paths.
3. Back up WordPress.
4. Activate the theme on production.
5. Only after `.co` is complete, deploy the `.com` to `.co` permanent redirect.
