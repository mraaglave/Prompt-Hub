# Render.com Deployment Guide

This guide will help you deploy your Prompt Enhancer application to Render.com.

## Prerequisites

1. A GitHub account with your project repository
2. A Render.com account
3. A Gemini AI API key from Google AI Studio

## Step 1: Prepare Your Repository

Your project is already configured with the necessary files:
- `render.yaml` - Render Blueprint configuration
- `Dockerfile` - Container configuration
- `package.json` - Dependencies and scripts
- `server.js` - Production-ready server

## Step 2: Deploy to Render

### Option A: Using Render Blueprint (Recommended)

1. **Fork/Clone your repository** to ensure it's accessible
2. **Go to [Render.com](https://render.com)** and sign in
3. **Click "New +"** and select "Blueprint"
4. **Connect your GitHub repository** and select this project
5. **Render will automatically detect** the `render.yaml` configuration
6. **Set your environment variables:**
   - `GEMINI_API_KEY`: Your Google Gemini AI API key
   - `NODE_ENV`: production
   - `PORT`: 10000 (Render will set this automatically)
7. **Click "Apply"** to deploy

### Option B: Manual Web Service Deployment

1. **Go to [Render.com](https://render.com)** and sign in
2. **Click "New +"** and select "Web Service"
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: prompt-enhancer
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Starter (Free tier)
5. **Set environment variables:**
   - `GEMINI_API_KEY`: Your Google Gemini AI API key
   - `NODE_ENV`: production
6. **Click "Create Web Service"**

## Step 3: Environment Variables

Set these environment variables in your Render service:

| Variable | Value | Description |
|----------|-------|-------------|
| `GEMINI_API_KEY` | `your_api_key_here` | Required for AI features |
| `NODE_ENV` | `production` | Production environment |
| `PORT` | `10000` | Port (Render sets this) |
| `CORS_ORIGIN` | `https://yourdomain.com` | Optional: CORS origins |

## Step 4: Get Your Gemini AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to Render environment variables

## Step 5: Verify Deployment

1. **Check the deployment logs** in Render dashboard
2. **Test your endpoints:**
   - Health check: `https://your-app.onrender.com/health`
   - Main app: `https://your-app.onrender.com/`
3. **Monitor the service** for any errors

## Step 6: Custom Domain (Optional)

1. **In Render dashboard**, go to your service
2. **Click "Settings"** → "Custom Domains"
3. **Add your domain** and configure DNS records
4. **Update CORS_ORIGIN** environment variable

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check `package.json` for correct dependencies
   - Verify Node.js version compatibility

2. **Runtime Errors**
   - Check environment variables are set correctly
   - Review Render logs for specific error messages

3. **API Key Issues**
   - Verify `GEMINI_API_KEY` is set correctly
   - Check if the API key has proper permissions

4. **CORS Issues**
   - Update `CORS_ORIGIN` environment variable
   - Check browser console for CORS errors

### Performance Optimization

- **Enable compression** (already configured)
- **Set proper cache headers** (already configured)
- **Monitor resource usage** in Render dashboard
- **Consider upgrading** to paid plans for better performance

## Security Features

Your deployment includes:
- ✅ Helmet.js security headers
- ✅ CORS protection
- ✅ Rate limiting (configurable)
- ✅ Environment variable protection
- ✅ Non-root Docker user

## Monitoring

- **Health checks** at `/health` endpoint
- **Status endpoint** at `/status` for debugging
- **Render dashboard** for service monitoring
- **Logs** accessible in Render console

## Support

- **Render Documentation**: [docs.render.com](https://docs.render.com)
- **Render Community**: [community.render.com](https://community.render.com)
- **Project Issues**: Check your GitHub repository

---

**Happy Deploying! 🚀**

Your Prompt Enhancer app will be live at: `https://your-app-name.onrender.com`
