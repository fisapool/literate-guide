@echo off
REM Debug version to see what's happening

echo Starting Kanban MCP VSCode Demo Setup...
echo Current directory: %CD%
echo.

REM Check if package.json exists
if exist "package.json" (
    echo ✅ package.json found
) else (
    echo ❌ package.json NOT found
    pause
    exit /b 1
)

echo.
echo Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js check failed
    pause
    exit /b 1
)

echo.
echo Checking npm...
npm --version
if %errorlevel% neq 0 (
    echo ❌ npm check failed
    pause
    exit /b 1
)

echo.
echo Installing dependencies...
npm install
if %errorlevel% neq 0 (
    echo ❌ npm install failed
    pause
    exit /b 1
)

echo.
echo Building project...
npm run build
if %errorlevel% neq 0 (
    echo ❌ build failed
    pause
    exit /b 1
)

echo.
echo Creating .vscode directory...
if not exist ".vscode" mkdir .vscode

echo.
echo Creating mcp.json...
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
echo Files created:
if exist ".vscode\mcp.json" echo   - .vscode\mcp.json
if exist "dist\index.js" echo   - dist\index.js
echo.
pause
