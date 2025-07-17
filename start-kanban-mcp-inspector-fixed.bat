@echo off
echo Starting Kanban MCP Server with Inspector (Fixed)...
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if dist folder exists
if not exist "dist\index.js" (
    echo Building project...
    npm run build
    if errorlevel 1 (
        echo ERROR: Build failed
        pause
        exit /b 1
    )
)

REM Install inspector if not available
echo Checking MCP Inspector...
npx @modelcontextprotocol/inspector --version >nul 2>&1
if errorlevel 1 (
    echo Installing MCP Inspector...
    npm install -g @modelcontextprotocol/inspector
)

REM Kill any existing processes on ports
echo Cleaning up ports...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3008') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5174') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak >nul

REM Set environment variables
set PLANKA_BASE_URL=http://localhost:3333
set PLANKA_AGENT_EMAIL=demo@demo.demo
set PLANKA_AGENT_PASSWORD=demo
set SERVER_PORT=3008
set CLIENT_PORT=5174

echo.
echo Starting MCP Inspector...
echo Server will run on: http://localhost:%SERVER_PORT%
echo Inspector UI will open on: http://localhost:%CLIENT_PORT%
echo.
echo Press Ctrl+C to stop both server and inspector
echo.

REM Use direct npx command with proper environment
npx -y @modelcontextprotocol/inspector node dist/index.js

pause
