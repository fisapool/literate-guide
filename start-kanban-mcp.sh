#!/bin/bash

echo "Starting Kanban MCP Server..."
echo

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed or not in PATH"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if dist folder exists
if [ ! -f "dist/index.js" ]; then
    echo "Building project..."
    npm run build
    if [ $? -ne 0 ]; then
        echo "ERROR: Build failed"
        exit 1
    fi
fi

# Set environment variables
export PLANKA_BASE_URL="http://localhost:3333"
export PLANKA_AGENT_EMAIL="demo@demo.demo"
export PLANKA_AGENT_PASSWORD="demo"

echo "Starting MCP server..."
echo "Environment: PLANKA_BASE_URL=$PLANKA_BASE_URL"
echo "Environment: PLANKA_AGENT_EMAIL=$PLANKA_AGENT_EMAIL"
echo
echo "Server starting... Press Ctrl+C to stop"
echo

node dist/index.js
