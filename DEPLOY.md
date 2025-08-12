# Quick Vercel Deployment Guide

## 🚀 Deploy to Vercel in 3 Steps

### 1. **Connect Your Repository**
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Vercel will auto-detect it's a Node.js project

### 2. **Set Environment Variable**
- Add `GEMINI_API_KEY` in Vercel dashboard
- Go to **Settings** → **Environment Variables**
- Set value to your Google Gemini API key

### 3. **Deploy**
- Click **Deploy**
- Your app will be live in minutes!

## ✅ What's Already Configured

- **vercel.json** - Vercel configuration ✅
- **package.json** - Build script and dependencies ✅
- **server.js** - Express server for Vercel ✅
- **.vercelignore** - Excludes unnecessary files ✅

## 🌐 Your App Will Be Available At

- **Frontend**: `https://your-domain.vercel.app/`
- **API**: `https://your-domain.vercel.app/api/enhance-prompt`
- **Health Check**: `https://your-domain.vercel.app/health`

## 🔧 No Code Changes Needed

Your project is already Vercel-ready! Just deploy and it will work perfectly.

---

**Need help?** Check the detailed guide in `VERCEL_DEPLOYMENT.md`
