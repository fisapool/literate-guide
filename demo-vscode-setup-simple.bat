@echo off
REM Simple VSCode Kanban MCP Demo Setup Script for Windows

echo 🎯 Kanban MCP VSCode Demo Setup
echo =================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the kanban-mcp project root
    pause
    exit /b 1
)

echo ✅ Project directory verified

REM Check dependencies
echo.
echo 📦 Checking dependencies...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)
echo ✅ Node.js found

npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm not found
    pause
    exit /b 1
)
echo ✅ npm found

REM Install dependencies
echo.
echo 📥 Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Build project
echo.
echo 🔨 Building project...
npm run build
if %errorlevel% neq 0 (
    echo ❌ Build failed
    pause
    exit /b 1
)

REM Create VSCode config
echo.
echo 🔧 Creating VSCode configuration...
if not exist ".vscode" mkdir .vscode

echo { > .vscode\mcp.json
echo   "servers": { >> .vscode\mcp.json
echo     "kanban": { >> .vscode\mcp.json
echo       "type": "stdio", >> .vscode\mcp.json
echo       "command": "node", >> .vscode\mcp.json
echo       "args": ["${workspaceFolder}/dist/index.js"], >> .vscode\mcp.json
echo       "env": { >> .vscode\mcp.json
echo         "PLANKA_BASE_URL": "http://localhost:3333", >> .vscode\mcp.json
echo         "PLANKA_AGENT_EMAIL": "demo@demo.demo", >> .vscode\mcp.json
echo         "PLANKA_AGENT_PASSWORD": "demo" >> .vscode\mcp.json
echo       } >> .vscode\mcp.json
echo     } >> .vscode\mcp.json
echo   } >> .vscode\mcp.json
echo } >> .vscode\mcp.json

echo.
echo ✅ Setup complete!
echo.
echo Next steps:
echo 1. Open this project in VSCode
echo 2. Install the MCP extension
echo 3. Press Ctrl+Shift+P → "MCP: Test Connection"
echo.
pause
