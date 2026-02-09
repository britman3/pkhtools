# PKH Tools Hub — pkhtools.com

Static internal dashboard linking to PKH tools.

## Location
- Site files: `/var/www/pkhtools.com/`
- Nginx config: `/etc/nginx/sites-available/pkhtools.com`
- Auth file: `/etc/nginx/.htpasswd_pkhtools`

## Update site content
1. Edit files locally or pull from repo
2. Copy updated files to `/var/www/pkhtools.com/`
3. No reload needed for static file changes

## Update Nginx config
```bash
sudo nano /etc/nginx/sites-available/pkhtools.com
sudo nginx -t
sudo systemctl reload nginx
```

## Update banner
Edit `app.js`:
- Change `BANNER_TEXT` in index.html
- Bump `BANNER_VERSION` (e.g. 'v1' → 'v2') so it reappears for users who dismissed the old one
- Set `BANNER_ENABLED = false` to turn it off entirely

## Change basic auth password
```bash
sudo htpasswd /etc/nginx/.htpasswd_pkhtools pkh
sudo systemctl reload nginx
```

## Tool URLs
Update tool links directly in `index.html`. The Bridging Loan Calculator URL is marked with a comment for easy swapping.
