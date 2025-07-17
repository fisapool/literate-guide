@echo off
REM 🎯 VSCode Kanban MCP Demo Setup Script for Windows
REM This script helps verify your VSCode setup for Kanban MCP

echo 🎯 Kanban MCP VSCode Demo Setup
echo =================================

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the kanban-mcp project root
    pause
    exit /b 1
)

echo ✅ Project directory verified

REM Step 1: Check dependencies
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

REM Step 2: Install dependencies
echo.
echo 📥 Installing dependencies...
call npm install

REM Step 3: Build the project
echo.
echo 🔨 Building project...
call npm run build

REM Step 4: Check if .vscode directory exists
echo.
echo 🔧 Setting up VSCode configuration...
if not exist ".vscode" mkdir .vscode

REM Step 5: Create mcp.json configuration
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
echo ✅ Created .vscode\mcp.json

REM Step 6: Start Planka
echo.
echo 🐳 Starting Planka...
start cmd /k "npm run up"

REM Wait for Planka to start
echo ⏳ Waiting for Planka to start...
timeout /t 10 /nobreak >nul

REM Step 7: Test Planka connection
echo.
echo 🔗 Testing Planka connection...
powershell -Command "try { Invoke-RestMethod -Uri 'http://localhost:3333' -TimeoutSec 5; exit 0 } catch { exit 1 }"
if %errorlevel% neq 0 (
    echo ❌ Planka failed to start
    pause
    exit /b 1
)
echo ✅ Planka is running on http://localhost:3333

REM Step 8: Create demo test file
echo console.log('🧪 Running Kanban MCP Demo Tests...\n'); > demo-test.js
echo const fs = require('fs'); >> demo-test.js
echo. >> demo-test.js
echo // Test 1: Check if dist/index.js exists >> demo-test.js
echo if (fs.existsSync('./dist/index.js')) { >> demo-test.js
echo     console.log('✅ dist/index.js exists'); >> demo-test.js
echo } else { >> demo-test.js
echo     console.log('❌ dist/index.js not found'); >> demo-test.js
echo     process.exit(1); >> demo-test.js
echo } >> demo-test.js
echo. >> demo-test.js
echo // Test 2: Check if .vscode/mcp.json exists >> demo-test.js
echo if (fs.existsSync('./.vscode/mcp.json')) { >> demo-test.js
echo     console.log('✅ .vscode/mcp.json exists'); >> demo-test.js
echo } else { >> demo-test.js
echo     console.log('❌ .vscode/mcp.json not found'); >> demo-test.js
echo     process.exit(1); >> demo-test.js
echo } >> demo-test.js
echo. >> demo-test.js
echo console.log('\n🎉 Demo setup complete!'); >> demo-test.js
echo console.log('\nNext steps:'); >> demo-test.js
echo console.log('1. Open this project in VSCode'); >> demo-test.js
echo console.log('2. Install the MCP extension'); >> demo-test.js
echo console.log('3. Use Ctrl+Shift+P → "MCP: Test Connection"'); >> demo-test.js
echo console.log('4. Try: "Show me all projects in my kanban board"'); >> demo-test.js

REM Step 9: Run demo tests
echo.
echo 🧪 Running demo tests...
call node demo-test.js

REM Step 10: Create quick reference
echo # 🚀 Quick Start for VSCode > QUICK_START.md
echo. >> QUICK_START.md
echo ## Immediate Steps: >> QUICK_START.md
echo 1. Open VSCode with this project >> QUICK_START.md
echo 2. Install MCP extension from marketplace >> QUICK_START.md
echo 3. Press Ctrl+Shift+P → "MCP: Test Connection" >> QUICK_START.md
echo 4. Try these commands: >> QUICK_START.md
echo    - "Show me all projects" >> QUICK_START.md
echo    - "Create a new board called 'My Project'" >> QUICK_START.md
echo    - "Add a card called 'Setup development environment'" >> QUICK_START.md
echo. >> QUICK_START.md
echo ## VSCode Commands: >> QUICK_START.md
echo - Ctrl+Shift+P → "MCP: Test Connection" >> QUICK_START.md
echo - Ctrl+Shift+U → Open Output panel, select "MCP" >> QUICK_START.md
echo - Ctrl+` → Open integrated terminal >> QUICK_START.md
echo. >> QUICK_START.md
echo ## Common Issues: >> QUICK_START.md
echo - Port 3333 already in use: Close other applications using port 3333 >> QUICK_START.md
echo - MCP not connecting: Restart VSCode after installing extension >> QUICK_START.md
echo - Build errors: Run 'npm run build' again >> QUICK_START.md

echo.
echo ✅ Demo setup complete!
echo.
echo 📋 Quick Reference:
echo ==================
type QUICK_START.md
echo.
echo Press any key to continue...
pause >nul
