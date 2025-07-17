@echo off
echo MCP Inspector Troubleshooting...
echo.

echo 1. Checking Node.js...
node --version

echo.
echo 2. Checking ports...
netstat -ano | findstr ":3008\|:5174"

echo.
echo 3. Checking if inspector is installed...
npm list @modelcontextprotocol/inspector --depth=0

echo.
echo 4. Testing basic server startup...
echo Starting server in background...
start /b node dist/index.js
timeout /t 3 /nobreak >nul

echo.
echo 5. Testing inspector manually...
echo Open new terminal and run:
echo   npx @modelcontextprotocol/inspector node dist/index.js
echo.

echo 6. Alternative manual steps:
echo   1. Run: node dist/index.js
echo   2. In another terminal: npx @modelcontextprotocol/inspector
echo   3. Enter: node dist/index.js as the command

pause
