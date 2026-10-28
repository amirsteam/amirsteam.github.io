# Deployment Guide

This guide covers deploying the MERN Portfolio Platform to production.

## 📋 Overview

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend | GitHub Pages (via GitHub Actions) | https://www.amirlearner.me |
| Backend | Railway | https://amirsteamgithubio-production.up.railway.app/api |
| Database | MongoDB Atlas | - |
| Admin | Vercel | https://admin.amirlearner.me |
| Contact form | Web3Forms (emails you directly) | - |

The public site works without the backend: if the API can't be reached, it shows the
content in `frontend/src/data/index.js`. The contact form uses Web3Forms when
`VITE_WEB3FORMS_KEY` is set, and the backend's `/api/contact` otherwise.

## 🗄️ Step 1: MongoDB Atlas Setup

1. Create a MongoDB Atlas account at https://www.mongodb.com/atlas
2. Create a new cluster (Free tier is fine for starting)
3. Create a database user with password
4. Whitelist your IP addresses (or allow from anywhere: 0.0.0.0/0)
5. Get your connection string:
   ```
   mongodb+srv://<username>:<password>@cluster.xxxxx.mongodb.net/portfolio
   ```

## 🔧 Step 2: Backend Deployment

### 🎓 Best for Students (Free, No Credit Card)

| Platform | Free Tier | Credit Card | Best For |
|----------|-----------|-------------|----------|
| **Railway** ⭐ | $5/month credits | ❌ Not needed | Best overall |
| **Render** | Free (with cold starts) | ❌ Not needed | Simple projects |
| **Cyclic** | Completely free | ❌ Not needed | Node.js apps |

### Option A: Railway (Recommended for Students) ⭐

1. Go to https://railway.app
2. Sign in with **GitHub** (uses your student verification!)
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select `amirsteam.github.io` repository
5. Set **Root Directory** to `backend`
6. Go to **Variables** tab and add:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_secret
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://amirlearner.me
   ADMIN_URL=https://admin.amirlearner.me
   ```
7. Railway auto-deploys! Get your URL from the **Settings** tab

> 💡 **Tip**: Generate JWT_SECRET with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

### Option B: Render (Free Alternative)

1. Go to https://render.com
2. Sign in with GitHub
3. Click **"New"** → **"Web Service"**
4. Connect your repository, set **Root Directory** to `backend`
5. Settings:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables (same as Railway)
7. Deploy!

> ⚠️ **Note**: Free tier sleeps after 15 min inactivity (30 sec cold start)

### Option C: DigitalOcean App Platform

1. Push your code to GitHub
2. Go to DigitalOcean App Platform
3. Create a new app and connect your GitHub repo
4. Select the `backend` folder as the source directory
5. Set environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_uri
   JWT_SECRET=your_production_secret
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://amirlearner.me
   ```
6. Deploy!

### Option B: Railway

1. Go to https://railway.app
2. Create new project from GitHub
3. Select the backend folder
4. Add environment variables
5. Deploy!

### Option C: VPS (DigitalOcean Droplet)

```bash
# SSH into your server
ssh root@your-server-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
npm install -g pm2

# Clone your repo
git clone https://github.com/amirsteam/amirsteam.github.io.git
cd amirsteam.github.io/backend

# Install dependencies
npm install --production

# Create .env file
nano .env
# Add your environment variables

# Start with PM2
pm2 start server.js --name portfolio-api
pm2 save
pm2 startup

# Setup Nginx reverse proxy
sudo apt install nginx
sudo nano /etc/nginx/sites-available/api.amirlearner.me
```

Nginx configuration:
```nginx
server {
    listen 80;
    server_name api.amirlearner.me;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/api.amirlearner.me /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# Setup SSL with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d api.amirlearner.me
```

## 🌐 Step 3: Frontend Deployment (GitHub Pages)

The frontend deploys automatically on every push to `main` that changes `frontend/`,
using `.github/workflows/deploy-frontend.yml`. It can also be run by hand from the
repository's **Actions** tab.

1. In the repository on GitHub, open **Settings → Pages** and set **Source** to
   **GitHub Actions**.
2. Set the build variables in `.github/workflows/deploy-frontend.yml`:
   ```yaml
   env:
     VITE_API_URL: https://amirsteamgithubio-production.up.railway.app/api
     VITE_WEB3FORMS_KEY: <your Web3Forms access key>
   ```
   Both values are public (they end up in the browser), so they can live in the workflow.
3. The build copies `index.html` to `404.html` so deep links work on GitHub Pages.

### Custom Domain Setup

1. The domain is set by the `CNAME` file at the repository root (`www.amirlearner.me`).
2. At your DNS provider, point `www` with a CNAME record to `amirsteam.github.io`.
3. In **Settings → Pages**, turn on **Enforce HTTPS**.

### Local development

```bash
cd frontend
cp .env.example .env   # then fill in the values
npm install
npm run dev
```

## 🛡️ Step 4: Admin Dashboard Deployment (Vercel)

1. Create another Vercel project for admin
2. Set root directory to `admin`
3. Add environment variable:
   ```
   VITE_API_URL=https://api.amirlearner.me/api
   ```
4. Set custom domain: `admin.amirlearner.me`
5. Deploy!

## 🔐 Security Checklist

- [ ] Use strong JWT_SECRET in production
- [ ] Enable CORS only for your domains
- [ ] Use HTTPS everywhere
- [ ] Change default admin password immediately
- [ ] Set up rate limiting
- [ ] Enable MongoDB Atlas security features
- [ ] Keep dependencies updated

## 🔄 CI/CD Setup (GitHub Actions)

- **Frontend:** `.github/workflows/deploy-frontend.yml` builds `frontend/` and publishes it
  to GitHub Pages (see Step 3). Keep this as the only Pages workflow; two workflows
  deploying at once race each other.
- **Admin:** Vercel builds `admin/` on every push (settings in `admin/vercel.json`,
  API URL in `admin/.env.production`).
- **Backend:** Railway redeploys when `backend/` changes (settings in
  `backend/railway.json`).

## 📊 Monitoring & Analytics

### Recommended Tools:
- **Uptime Monitoring**: UptimeRobot (free)
- **Error Tracking**: Sentry
- **Analytics**: Google Analytics, Plausible
- **Logs**: PM2 logs, DigitalOcean logs

## 🚨 Troubleshooting

### Common Issues

1. **CORS errors**: Make sure FRONTEND_URL in backend matches your frontend domain
2. **MongoDB connection failed**: Check connection string and IP whitelist
3. **JWT errors**: Ensure JWT_SECRET is the same across deployments
4. **Build failures**: Check Node.js version matches (18+)

### Useful Commands

```bash
# Check PM2 logs
pm2 logs portfolio-api

# Restart the app
pm2 restart portfolio-api

# View MongoDB connection
mongo "mongodb+srv://cluster.xxxxx.mongodb.net/portfolio" --username admin

# Test API endpoint
curl https://api.amirlearner.me/api/health
```

## 📧 Support

For issues and questions:
- Email: amir@amirlearner.me
- GitHub Issues: https://github.com/amirsteam/amirsteam.github.io/issues
