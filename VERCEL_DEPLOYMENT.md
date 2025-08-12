# Vercel Deployment Guide for Prompt Enhancer

This guide will help you deploy your Prompt Enhancer Node.js application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Node.js**: Version 18.0.0 or higher

## Environment Variables Setup

Before deploying, you need to set up your environment variables in Vercel:

### Required Environment Variables

1. **GEMINI_API_KEY**: Your Google Gemini AI API key
   - Get it from [Google AI Studio](https://makersuite.google.com/app/apikey)

### How to Set Environment Variables in Vercel

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add the following:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: Your actual API key
   - **Environment**: Production, Preview, and Development

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Node.js project

2. **Configure Project**:
   - **Framework Preset**: Node.js
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build`
   - **Output Directory**: Leave empty (not needed for Node.js)
   - **Install Command**: `npm install`

3. **Deploy**:
   - Click **Deploy**
   - Vercel will build and deploy your application

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow the prompts**:
   - Link to existing project or create new
   - Set project name
   - Confirm deployment

## Project Structure for Vercel

Your project is already properly configured with:

- ✅ `vercel.json` - Vercel configuration
- ✅ `package.json` - Node.js dependencies and scripts
- ✅ `server.js` - Express server (properly exported for Vercel)
- ✅ `.vercelignore` - Files to exclude from deployment

## API Endpoints

After deployment, your API will be available at:

- **Health Check**: `https://your-domain.vercel.app/health`
- **Enhance Prompt**: `https://your-domain.vercel.app/api/enhance-prompt`
- **Frontend**: `https://your-domain.vercel.app/`

## Troubleshooting

### Common Issues

1. **Environment Variables Not Working**:
   - Ensure variables are set in Vercel dashboard
   - Check that variable names match exactly (case-sensitive)
   - Redeploy after adding environment variables

2. **Build Failures**:
   - Check that all dependencies are in `package.json`
   - Ensure Node.js version compatibility (18+)
   - Check build logs in Vercel dashboard

3. **API Not Responding**:
   - Verify your `GEMINI_API_KEY` is set correctly
   - Check Vercel function logs for errors
   - Ensure your API key has proper permissions

### Checking Logs

1. Go to your Vercel dashboard
2. Select your project
3. Go to **Functions** tab
4. Click on `server.js` function
5. Check **Logs** for any errors

## Performance Optimization

- **Function Timeout**: Set to 30 seconds (already configured)
- **Cold Starts**: Vercel automatically handles this
- **Static Files**: Served efficiently through Vercel's CDN

## Monitoring

- **Analytics**: Available in Vercel dashboard
- **Performance**: Monitor function execution times
- **Errors**: Set up error tracking in Vercel

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **Vercel Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Next Steps

After successful deployment:

1. Test your API endpoints
2. Update your frontend to use the new Vercel URLs
3. Set up custom domain if needed
4. Configure monitoring and alerts
5. Set up CI/CD for automatic deployments

---

**Note**: Your application is now fully configured for Vercel deployment. The `vercel.json` file handles all routing, and your Express server is properly exported for Vercel's serverless environment.
