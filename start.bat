@echo off
echo ============================================
echo    Prompt Enhancer - Node.js Server
echo ============================================
echo.

echo [1/4] Stopping any existing server...
taskkill /f /im node.exe >nul 2>&1

echo [2/4] Installing Node.js dependencies...
powershell -ExecutionPolicy Bypass -Command "npm install"

echo.
echo [3/4] Starting the server...
echo Server will be available at: http://localhost:3000
echo Press Ctrl+C to stop the server
echo.

echo [4/4] Launching server...
powershell -ExecutionPolicy Bypass -Command "npm start"
