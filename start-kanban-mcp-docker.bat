@echo off
echo Starting Kanban MCP Server with Docker...
echo.

REM Check if Docker is installed
docker --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker is not installed or not in PATH
    echo Please install Docker from https://docker.com/
    pause
    exit /b 1
)

echo Building Docker image...
npm run build-docker
if errorlevel 1 (
    echo ERROR: Docker build failed
    pause
    exit /b 1
)

echo Starting Docker containers...
docker compose --env-file .env up -d
if errorlevel 1 (
    echo ERROR: Docker compose failed
    pause
    exit /b 1
)

echo.
echo Docker containers started successfully!
echo.
echo Services:
echo - Kanban MCP Server: Running in container
echo - Planka (if configured): http://localhost:3000
echo.
echo To stop: docker compose down
pause
