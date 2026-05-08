# Deployment Guide: Vercel + Render

## Prerequisites
- GitHub account with your project pushed
- Vercel account (free sign up at vercel.com)
- Render account (free sign up at render.com)

---

## Part 1: Deploy Backend on Render

### Step 1: Prepare Repository
1. Ensure all changes are committed to GitHub:
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### Step 2: Create Render Service
1. Go to [render.com](https://render.com)
2. Sign up / Login with GitHub
3. Click **"New +"** → **"Web Service"**
4. Select your GitHub repository
5. Fill in the configuration:
   - **Name**: `maati-backend` (or any name)
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: `Free` (available)

### Step 3: Set Environment Variables
In Render dashboard, go to **Environment** tab:
```
PORT=5000
FLASK_ENV=production
FLASK_DEBUG=0
```

### Step 4: Deploy
- Click **"Create Web Service"**
- Wait for deployment (2-3 minutes)
- Copy your backend URL (e.g., `https://maati-backend.onrender.com`)

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Connect Vercel to GitHub
1. Go to [vercel.com](https://vercel.com)
2. Sign up / Login with GitHub
3. Click **"Add New"** → **"Project"**
4. Select your repository
5. Configure project:
   - **Framework Preset**: `Create React App`
   - **Root Directory**: `./frontend`

### Step 2: Set Environment Variables
Before deploying, add environment variable:
- **Name**: `REACT_APP_API_BASE_URL`
- **Value**: `https://maati-backend.onrender.com` (your Render backend URL)

### Step 3: Deploy
- Click **"Deploy"**
- Wait for build to complete (2-3 minutes)
- Your app is live at the Vercel URL!

---

## Part 3: Update API Configuration

### Update Frontend API Endpoint
In [frontend/src/services/api.js](../../frontend/src/services/api.js):
- The environment variable `REACT_APP_API_BASE_URL` is already set up
- Vercel will automatically use the production URL

### Test the Connection
1. Visit your Vercel app URL
2. Test the prediction form
3. Should communicate with Render backend

---

## Troubleshooting

### Backend not connecting
- Check CORS is enabled in [backend/app.py](../../backend/app.py) ✓
- Verify Render URL is set in Vercel environment variables
- Check Render logs: go to Render dashboard → Logs tab

### Build fails on Render
- Ensure `requirements.txt` is in project root
- Check Python version is 3.10+ in `backend/runtime.txt`
- View build logs in Render dashboard

### Frontend shows 404
- Verify `REACT_APP_API_BASE_URL` environment variable is set
- Check the backend URL is correct and accessible

---

## Free Tier Limitations

**Render (Backend)**:
- Auto-sleeps after 15 minutes of inactivity
- First request may take 30+ seconds (spinup)
- Max 750 hours/month (free tier)

**Vercel (Frontend)**:
- Unlimited deployments
- Automatic previews for PR
- Fast global CDN

**Solution**: Add a simple health check to prevent backend from sleeping, or upgrade to paid tier.

---

## Next Steps

1. Commit and push all changes to GitHub
2. Follow the deployment steps above
3. Test both frontend and backend connectivity
4. Share your deployed app URL!
