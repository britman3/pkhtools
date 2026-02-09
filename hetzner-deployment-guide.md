# Hetzner Server Deployment & Folder Structure Guide

> **Purpose:** This document defines the standard folder structure, deployment process, and conventions for all applications deployed to Nick's Hetzner server. Every new app or service MUST follow these standards for consistency.

---

## Server Folder Structure

All applications and services must follow this directory layout:

```
/opt/apps/                        ← All custom applications live here
├── app-name/                     ← One folder per app, lowercase, hyphenated
│   ├── .env                      ← Environment variables (never commit to Git)
│   ├── docker-compose.yml        ← Docker config (if using Docker)
│   ├── Dockerfile                ← Docker build file (if using Docker)
│   ├── README.md                 ← How to start/stop/update this app
│   └── src/                      ← Application source code
│       └── ...
│
/var/www/                         ← Static websites / frontends ONLY
├── domain1.example.com/
└── domain2.example.com/
│
/etc/nginx/sites-available/       ← Nginx reverse proxy configs
/etc/nginx/sites-enabled/         ← Symlinks to active configs
│
/var/log/apps/                    ← Centralised application logs
├── app-name/
│   ├── access.log
│   └── error.log
│
/opt/backups/                     ← Database dumps, config backups
├── daily/
└── manual/
```

### Naming Conventions

- App folder names: **lowercase, hyphenated** (e.g., `trugov-ai`, `pkh-portal`, `ecom-dashboard`)
- No spaces, no underscores, no uppercase
- Name should clearly identify the app or project

---

## Deployment: GitHub to Hetzner via SSH

### 1. SSH into the Server

```bash
ssh root@YOUR-SERVER-IP
# Or if using a non-root user:
ssh deploy@YOUR-SERVER-IP
```

### 2. Ensure Git is Installed

```bash
sudo apt update && sudo apt install git -y
```

### 3. Clone the Repository

```bash
cd /opt/apps
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git app-name
cd app-name
```

**For private repos, use one of:**

- **SSH key (recommended):** Add the server's public key (`~/.ssh/id_rsa.pub`) to GitHub → Settings → SSH and GPG Keys, then:
  ```bash
  git clone git@github.com:YOUR-USERNAME/YOUR-REPO.git app-name
  ```
- **Personal Access Token:**
  ```bash
  git clone https://YOUR-TOKEN@github.com/YOUR-USERNAME/YOUR-REPO.git app-name
  ```

### 4. Set Up Environment Variables

```bash
cd /opt/apps/app-name
cp .env.example .env    # If a template exists
nano .env               # Edit with actual values
```

> **IMPORTANT:** Never commit `.env` files to Git. Ensure `.env` is in `.gitignore`.

### 5. Install Dependencies & Build

**Node.js app:**
```bash
npm install
npm run build    # If applicable
```

**Python app:**
```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Docker app:**
```bash
docker compose up -d --build
```

### 6. Set Up Process Manager (Non-Docker)

**Node.js — use PM2:**
```bash
npm install -g pm2
pm2 start app.js --name "app-name"
pm2 save
pm2 startup    # Auto-start on server reboot
```

**Python — use systemd:**
```bash
sudo nano /etc/systemd/system/app-name.service
```

Example systemd unit file:
```ini
[Unit]
Description=App Name Service
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/apps/app-name
ExecStart=/opt/apps/app-name/venv/bin/python app.py
Restart=always
RestartSec=5
EnvironmentFile=/opt/apps/app-name/.env

[Install]
WantedBy=multi-user.target
```

Then enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable app-name
sudo systemctl start app-name
```

### 7. Set Up Nginx Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/app-name
```

Example config:
```nginx
server {
    listen 80;
    server_name app.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:YOUR_APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and test:
```bash
sudo ln -s /etc/nginx/sites-available/app-name /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### 8. SSL with Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d app.yourdomain.com
```

---

## Updating an Existing App

```bash
cd /opt/apps/app-name
git pull origin main

# Then depending on stack:
npm install && npm run build && pm2 restart app-name          # Node
source venv/bin/activate && pip install -r requirements.txt && sudo systemctl restart app-name   # Python
docker compose up -d --build                                   # Docker
```

---

## Logging

All apps should write logs to `/var/log/apps/app-name/`. Create the directory when deploying:

```bash
sudo mkdir -p /var/log/apps/app-name
```

Configure your app to write to this location, or use symlinks if the app writes logs to its own directory.

**Viewing logs:**
```bash
# PM2
pm2 logs app-name

# systemd
journalctl -u app-name -f

# Docker
docker compose logs -f

# Nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

---

## Port Management

Each app should run on a unique port. Keep a record here or in a central config:

| App Name       | Port  | Domain                  | Stack   |
|----------------|-------|-------------------------|---------|
| example-app    | 3001  | app.example.com         | Node    |
| another-app    | 3002  | another.example.com     | Python  |

> **Convention:** Start at port 3001 and increment. Ports 80/443 are reserved for Nginx.

---

## Docker Convention (If Using Docker)

When using Docker, each app's `docker-compose.yml` should live in the app folder:

```yaml
version: '3.8'
services:
  app:
    build: .
    container_name: app-name
    restart: unless-stopped
    ports:
      - "3001:3000"    # Host:Container
    env_file:
      - .env
    volumes:
      - ./data:/app/data    # Persist data if needed
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## Pre-Deployment Checklist

Before deploying any new app, confirm the following:

- [ ] App folder created at `/opt/apps/app-name/`
- [ ] `.env` file created with correct variables
- [ ] `.env` is in `.gitignore`
- [ ] Unique port assigned and documented in port table above
- [ ] Log directory created at `/var/log/apps/app-name/`
- [ ] Nginx reverse proxy config created and enabled
- [ ] SSL certificate provisioned via Certbot
- [ ] Process manager configured (PM2 / systemd / Docker)
- [ ] App starts on server reboot
- [ ] `README.md` in app folder with start/stop/update instructions

---

## Auditing Existing Apps

To check what's currently running and where:

```bash
# List all apps in /opt/apps
ls -la /opt/apps/

# Check PM2 processes
pm2 list

# Check systemd services
systemctl list-units --type=service --state=running

# Check Docker containers
docker ps

# Check what's listening on which ports
sudo ss -tlnp

# Check Nginx configs
ls -la /etc/nginx/sites-enabled/
```

---

## Key Rules for Claude / AI Assistants

When building or deploying apps for this server:

1. **Always install to `/opt/apps/app-name/`** — never to `/root/`, `/home/`, or random locations
2. **Always use a reverse proxy** — apps should not be exposed directly on their port
3. **Always create a `.env` file** — never hardcode secrets or config values
4. **Always set up a process manager** — apps must survive server reboots
5. **Always assign a unique port** — check existing ports first with `sudo ss -tlnp`
6. **Always create a `README.md`** in the app folder explaining how to run, stop, and update the app
7. **Always set up logging** to `/var/log/apps/app-name/`
8. **Always provision SSL** — no HTTP-only deployments
9. **Follow the naming convention** — lowercase, hyphenated folder names
10. **Update the port table** in this document when adding a new app
