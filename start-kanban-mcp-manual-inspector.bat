@echo off
echo Starting Kanban MCP Server with Manual Inspector Setup...
echo.

REM Check prerequisites
node --version >nul 2>&1 || (
    echo ERROR: Node.js not found
    pause
    exit /b 1
)

if not exist "dist\index.js" (
    echo Building project...
    npm run build || (
        echo ERROR: Build failed
        pause
        exit /b 1
    )
)

echo.
echo STEP 1: Starting MCP server...
echo.
echo In a NEW terminal window, run:
echo   cd /d "%cd%"
echo   node dist/index.js
echo.
echo Wait for "Server started" message, then...
echo.

echo STEP 2: Starting Inspector...
echo.
echo In ANOTHER terminal window, run:
echo   cd /d "%cd%"
echo   npx @modelcontextprotocol/inspector
echo.
echo Then in the inspector web interface (http://localhost:5174):
echo   - Enter: node dist/index.js
echo   - Click "Connect"
echo.

echo STEP 3: Environment variables (if needed):
echo   set PLANKA_BASE_URL=http://localhost:3333
echo   set PLANKA_AGENT_EMAIL=demo@demo.demo
echo   set PLANKA_AGENT_PASSWORD=demo
echo.

echo Press any key when ready to open terminals...
pause >nul

REM Open two new terminal windows
start cmd /k "echo STEP 1: Run 'node dist/index.js' here && title MCP Server"
start cmd /k "echo STEP 2: Run 'npx @modelcontextprotocol/inspector' here && title MCP Inspector"

echo Terminals opened! Follow the steps above.
pause
