# MCP Inspector Troubleshooting Guide

## Common Error: "Error Connecting to MCP Inspector Proxy - Check Console logs"

This guide provides step-by-step solutions for resolving MCP Inspector connection issues.

## Quick Fix Steps

### 1. Run the Automated Fix
```bash
# Windows
fix-mcp-inspector-issues.bat

# Or use the enhanced inspector
start-kanban-mcp-inspector-fixed.bat
```

### 2. Manual Troubleshooting Steps

#### Check Prerequisites
```bash
# Verify Node.js is installed
node --version

# Verify project is built
ls dist/index.js  # Linux/Mac
dir dist\index.js  # Windows
```

#### Install MCP Inspector
```bash
# Install globally
npm install -g @modelcontextprotocol/inspector

# Or use npx directly
npx @modelcontextprotocol/inspector --version
```

#### Clean Up Ports
```bash
# Windows - kill processes on ports 3008 and 5174
netstat -ano | findstr ":3008|:5174"
taskkill /F /PID [PID_NUMBER]

# Linux/Mac
lsof -ti:3008 | xargs kill -9
lsof -ti:5174 | xargs kill -9
```

#### Test Server Independently
```bash
# Terminal 1: Start the MCP server
node dist/index.js

# Terminal 2: Test with inspector
npx @modelcontextprotocol/inspector
# Then enter: node dist/index.js in the web interface
```

## Environment Setup

### Required Environment Variables
```bash
export PLANKA_BASE_URL=http://localhost:3333
export PLANKA_AGENT_EMAIL=demo@demo.demo
export PLANKA_AGENT_PASSWORD=demo
```

### Verify Planka is Running
```bash
# Check if Planka is accessible
curl http://localhost:3333/api/access-tokens
```

## Common Issues and Solutions

### Issue 1: "Cannot connect to proxy"
**Solution**: Ensure ports 3008 and 5174 are available
```bash
# Check port usage
netstat -tulpn | grep :3008
netstat -tulpn | grep :5174
```

### Issue 2: "Inspector not found"
**Solution**: Install the inspector globally
```bash
npm install -g @modelcontextprotocol/inspector
```

### Issue 3: "Build failed"
**Solution**: Rebuild the project
```bash
npm install
npm run build
```

### Issue 4: "Connection refused"
**Solution**: Check firewall and antivirus settings

## Alternative Setup Methods

### Method 1: Manual Inspector Setup
1. Open two terminal windows
2. Terminal 1: `node dist/index.js`
3. Terminal 2: `npx @modelcontextprotocol/inspector`
4. In web interface: Enter `node dist/index.js` as command

### Method 2: VS Code Integration
1. Use `.vscode/mcp.json` configuration
2. Ensure absolute paths are used
3. Restart VS Code after changes

### Method 3: Docker Setup
```bash
npm run up  # Start Planka
npm run build-docker  # Build MCP server
```

## Debugging Steps

### Enable Debug Logging
```bash
# Set debug environment variable
set DEBUG=mcp:*
node dist/index.js
```

### Check Console Logs
1. Open browser developer tools (F12)
2. Check Network tab for failed requests
3. Check Console tab for JavaScript errors

### Verify MCP Server Health
```bash
# Test basic server functionality
node -e "console.log('Testing server...'); require('./dist/index.js')"
```

## Firewall and Network Issues

### Windows Firewall
1. Open Windows Defender Firewall
2. Allow Node.js through firewall
3. Allow ports 3008 and 5174

### Antivirus Software
- Add Node.js to antivirus exclusions
- Allow MCP Inspector processes

## Verification Steps

After applying fixes, verify:
1. ✅ Node.js is installed and accessible
2. ✅ Project is built (dist/index.js exists)
3. ✅ MCP Inspector is installed
4. ✅ Ports 3008 and 5174 are available
5. ✅ Planka is running at http://localhost:3333
6. ✅ Environment variables are set correctly

## Getting Help

If issues persist:
1. Run `troubleshoot-inspector.bat` for detailed diagnostics
2. Check the [GitHub Issues](https://github.com/bradrisse/kanban-mcp/issues)
3. Provide console logs when reporting issues
