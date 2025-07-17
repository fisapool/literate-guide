@echo off
echo Starting Kanban MCP Server with Inspector...
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

echo Starting MCP Inspector...
echo This will open a web interface at http://localhost:5174
echo.

set SERVER_PORT=3008
set CLIENT_PORT=5174

npm run inspector

pause
