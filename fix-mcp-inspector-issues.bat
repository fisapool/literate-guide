@echo off
echo ========================================
echo Kanban MCP Inspector Fix Tool
echo ========================================
echo.

REM Check Node.js
echo 1. Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js not found. Please install from https://nodejs.org/
    pause
    exit /b 1
)
echo.

REM Check if project is built
echo 2. Checking if project is built...
if exist "dist\index.js" (
    echo ✓ Project is built
) else (
    echo ⚠ Project needs building...
    npm run build
    if errorlevel 1 (
        echo ERROR: Build failed
        pause
        exit /b 1
    )
)
echo.

REM Install/update inspector
echo 3. Installing/updating MCP Inspector...
npm install -g @modelcontextprotocol/inspector@latest
echo.

REM Clean up ports
echo 4. Cleaning up any processes using MCP ports...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3008') do (
    echo Killing process on port 3008 (PID: %%a)
    taskkill /F /PID %%a 2>nul
)
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5174') do (
    echo Killing process on port 5174 (PID: %%a)
    taskkill /F /PID %%a 2>nul
)
timeout /t 2 /nobreak >nul
echo.

REM Set environment variables
echo 5. Setting environment variables...
set PLANKA_BASE_URL=http://localhost:3333
set PLANKA_AGENT_EMAIL=demo@demo.demo
set PLANKA_AGENT_PASSWORD=demo
set SERVER_PORT=3008
set CLIENT_PORT=5174
echo ✓ Environment variables set
echo.

REM Test server startup
echo 6. Testing server startup...
echo Starting server in background for 5 seconds...
start /b node dist/index.js
timeout /t 5 /nobreak >nul

REM Check if server is running
netstat -ano | findstr :3008 >nul
if errorlevel 1 (
    echo ⚠ Server might not have started properly
) else (
    echo ✓ Server appears to be running
)
echo.

REM Kill test server
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.

echo ========================================
echo MCP Inspector Fix Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Run: start-kanban-mcp-inspector-fixed.bat
echo 2. Or manually:
echo    - Terminal 1: node dist/index.js
echo    - Terminal 2: npx @modelcontextprotocol/inspector
echo    - In inspector UI: Enter "node dist/index.js" as command
echo.
echo If issues persist:
echo - Check firewall settings
echo - Ensure ports 3008 and 5174 are available
echo - Verify Planka is running at http://localhost:3333
echo.
pause
