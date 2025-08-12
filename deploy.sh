#!/bin/bash

# Prompt Enhancer - Render Deployment Script
# This script helps prepare and test your application for Render deployment

echo "🚀 Prompt Enhancer - Render Deployment Preparation"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    if [ -f env.example ]; then
        cp env.example .env
        echo "✅ Created .env from template"
        echo "⚠️  Please update .env with your actual values"
    else
        echo "❌ env.example not found"
        exit 1
    fi
else
    echo "✅ .env file exists"
fi

# Check if GEMINI_API_KEY is set
if ! grep -q "GEMINI_API_KEY" .env || grep -q "your_gemini_api_key_here" .env; then
    echo "⚠️  GEMINI_API_KEY not set in .env"
    echo "   Please get your API key from: https://makersuite.google.com/app/apikey"
fi

# Build the project
echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi

echo "✅ Build completed successfully"

# Test the application locally
echo "🧪 Testing application locally..."
echo "   Starting server on http://localhost:10000"
echo "   Press Ctrl+C to stop the server"
echo ""

# Start the server in background
npm start &
SERVER_PID=$!

# Wait a moment for server to start
sleep 3

# Test health endpoint
if curl -s http://localhost:10000/health > /dev/null; then
    echo "✅ Health check passed"
else
    echo "❌ Health check failed"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Test main endpoint
if curl -s http://localhost:10000/ > /dev/null; then
    echo "✅ Main endpoint working"
else
    echo "❌ Main endpoint failed"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

echo ""
echo "🎉 Local testing completed successfully!"
echo ""
echo "📋 Next steps for Render deployment:"
echo "   1. Push your code to GitHub"
echo "   2. Go to https://render.com"
echo "   3. Create new Web Service or use Blueprint"
echo "   4. Connect your GitHub repository"
echo "   5. Set environment variables (especially GEMINI_API_KEY)"
echo "   6. Deploy!"
echo ""
echo "📚 See RENDER_DEPLOYMENT.md for detailed instructions"
echo ""

# Stop the server
kill $SERVER_PID 2>/dev/null
echo "🛑 Local server stopped"

echo ""
echo "✨ Your project is ready for Render deployment!"
