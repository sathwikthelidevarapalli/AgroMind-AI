# 🚀 Step-by-Step Deployment Guide

## Part 1: Deploy Backend on Render (Web Service)

### Step 1: Go to Render Dashboard
1. Open [render.com](https://render.com)
2. Sign in with GitHub (or create account)
3. Click **"New +"** button in top-right
4. Select **"Web Service"**

### Step 2: Connect Your Repository
1. Select **"Connect your GitHub account"** (if not already done)
2. Search for and select: **`AgroMind-AI`**
3. Click **"Connect"**

### Step 3: Configure Web Service
Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `agromind-backend` |
| **Environment** | `Python 3` |
| **Region** | `Singapore` (or closest to you) |
| **Branch** | `main` |
| **Root Directory** | (leave empty) |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app` |
| **Instance Type** | `Free` |

### Step 4: Add Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**

Add the following variables:

| Key | Value |
|-----|-------|
| `FLASK_ENV` | `production` |
| `FLASK_DEBUG` | `0` |
| `PORT` | `5000` |

**Optional** (for weather API):
| `WEATHER_API_KEY` | `your-api-key-here` |

### Step 5: Deploy!
1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. You'll see a green **"Live"** status when ready
4. **Copy your backend URL** (e.g., `https://agromind-backend.onrender.com`)
5. **Save this URL** - you'll need it for frontend!

---

## Part 2: Deploy Frontend on Vercel

### Step 1: Go to Vercel
1. Open [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**

### Step 2: Import Repository
1. Find and select **`AgroMind-AI`** repository
2. Click **"Import"**

### Step 3: Configure Project
- **Framework**: `Create React App` (auto-detected)
- **Root Directory**: `./frontend`
- **Build Command**: `npm run build` (default)
- **Output Directory**: `build` (default)

### Step 4: Set Environment Variables
Click **"Environment Variables"**

Add:
| Name | Value |
|------|-------|
| `REACT_APP_API_BASE_URL` | `https://agromind-backend.onrender.com` |

**⚠️ IMPORTANT**: Replace with your actual Render backend URL from Part 1!

### Step 5: Deploy!
1. Click **"Deploy"**
2. Wait for build to complete (2-3 minutes)
3. Get your live frontend URL (e.g., `https://agromind-ai.vercel.app`)
4. **Your app is live!** 🎉

---

## Testing Your Deployment

### Test 1: Check Frontend
- Visit your Vercel URL in browser
- You should see the AgroMind AI form

### Test 2: Test Prediction
1. Fill in the form with sample data:
   - N: 90, P: 40, K: 60
   - pH: 6.8
   - Temperature: 28°C
   - Humidity: 70%
   - Rainfall: 220mm
2. Click "Analyze"
3. You should see top 3 crop recommendations

### Test 3: Check API Connection
Open browser console (F12) and check:
- No 404 errors for API calls
- API responses showing crop data

---

## Free Tier Notes

### Render Backend
- ✅ Free tier available
- ⚠️ Spins down after 15 min of inactivity
- ℹ️ First request after sleep takes 30-60 seconds
- 💾 Limited to 750 hours/month

### Vercel Frontend
- ✅ Completely free
- ✅ Unlimited deployments
- ✅ Auto-deploys on GitHub push
- ✅ Global CDN (fast worldwide)

---

## Troubleshooting

### "CORS Error" when testing
**Solution**: Verify `REACT_APP_API_BASE_URL` in Vercel environment variables matches your Render URL exactly

### "504 Gateway Timeout"
**Solution**: Render backend may be spinning up. Wait 60 seconds and try again.

### "404 Not Found" on frontend
**Solution**: 
1. Check Vercel build logs
2. Ensure root directory is set to `./frontend`
3. Rebuild on Vercel dashboard

### API returns 500 error
**Solution**:
1. Check Render logs (Logs tab in dashboard)
2. Verify `gunicorn` in Start Command
3. Check `requirements.txt` has all dependencies

---

## After Deployment

### Enable Auto-Deploy
- Both Vercel and Render auto-deploy on GitHub push
- Just push changes to GitHub and they'll be live!

### Monitor Performance
- **Render**: Dashboard → Metrics tab
- **Vercel**: Analytics dashboard

### Update API URL Later
If you change Render URL:
1. Update in Vercel environment variables
2. Redeploy (or just push to trigger auto-deploy)

---

## Your Project URLs (After Deployment)

**Frontend**: `https://YOUR_VERCEL_URL.vercel.app`
**Backend API**: `https://YOUR_RENDER_URL.onrender.com`

---

Good luck! 🚀 Let me know if you hit any issues during deployment!
