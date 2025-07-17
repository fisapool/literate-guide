@echo off
echo Starting Kanban MCP Server...
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

REM Set environment variables
set PLANKA_BASE_URL=http://localhost:3333
set PLANKA_AGENT_EMAIL=demo@demo.demo
set PLANKA_AGENT_PASSWORD=demo

echo Starting MCP server...
echo Environment: PLANKA_BASE_URL=%PLANKA_BASE_URL%
echo Environment: PLANKA_AGENT_EMAIL=%PLANKA_AGENT_EMAIL%
echo.
echo Server starting... Press Ctrl+C to stop
echo.

node dist/index.js

pause
