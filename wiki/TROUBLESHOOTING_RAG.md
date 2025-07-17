# 🛠️ RAG Pipeline Troubleshooting Guide

This comprehensive guide addresses Docker-related issues for the RAG pipeline script and provides automated diagnostics.

## 🚀 Quick Start

Run the diagnostic script to automatically check your environment:

```bash
# Using npm
npm run diagnose

# Using node directly
node scripts/diagnose-environment.js
```

## 🔍 Common Issues & Solutions

### 1. Container-to-Host Communication

**Problem**: MCP server in Docker container cannot connect to Planka on localhost.

**Solution**:
```bash
# Use host.docker.internal instead of localhost
PLANKA_BASE_URL=http://host.docker.internal:3333
```

**For Linux users**:
```bash
# Add host mapping when running Docker
docker run --add-host=host.docker.internal:host-gateway ...
```

### 2. Port Conflicts

**Problem**: Default ports (3333, 3008, 5174) are already in use.

**Solution**:
```bash
# Check port usage
npm run diagnose

# Kill processes using specific ports
# Windows:
netstat -ano | findstr :3333
taskkill /PID <PID> /F

# macOS/Linux:
lsof -ti:3333 | xargs kill -9
```

### 3. Environment Variable Configuration

**Problem**: Docker container fails to start due to missing environment variables.

**Solution**:
```bash
# Create .env file
PLANKA_BASE_URL=http://host.docker.internal:3333
PLANKA_AGENT_EMAIL=your-agent@example.com
PLANKA_AGENT_PASSWORD=your-password

# Use explicit values in docker run (no variable references)
docker run -e PLANKA_BASE_URL=http://host.docker.internal:3333 ...
```

## 🧪 Testing Your Setup

### Health Check Script
```bash
# Test RAG pipeline health
npm run health-check

# Test with specific configuration
node -e "
import('./dist/config/environment.js').then(m => {
  console.log('Environment:', m.getEnvironmentInfo());
});
"
```

### Manual Testing
```bash
# Test Planka connectivity
curl http://localhost:3333/api/health

# Test from Docker container
docker run --rm -it mcp-kanban:latest /bin/sh
# Inside container:
curl http://host.docker.internal:3333/api/health
```

## 📋 Environment Configuration

### Development Setup (Recommended)
```bash
# Start Planka in Docker
npm run up

# Run MCP server directly (avoids Docker networking issues)
npm run dev
```

### Production Docker Setup
```bash
# Build and run with proper configuration
docker build -t mcp-kanban:latest .
docker run -d \
  -e PLANKA_BASE_URL=http://host.docker.internal:3333 \
  -e PLANKA_AGENT_EMAIL=agent@example.com \
  -e PLANKA_AGENT_PASSWORD=password \
  --add-host=host.docker.internal:host-gateway \
  mcp-kanban:latest
```

## 🔧 Diagnostic Commands

### Check Docker Status
```bash
docker info
docker ps -a
docker network ls
```

### Check Container Logs
```bash
# Planka logs
docker logs kanban

# MCP server logs
docker logs <mcp-container-id>
```

### Network Diagnostics
```bash
# Test connectivity from container
docker run --rm -it mcp-kanban:latest /bin/sh
ping host.docker.internal
curl http://host.docker.internal:3333
```

## 🚨 Error Messages & Solutions

### "ECONNREFUSED localhost:3333"
**Cause**: Using localhost inside Docker container
**Solution**: Use `host.docker.internal:3333`

### "Invalid credentials"
**Cause**: Wrong PLANKA_AGENT_EMAIL or PLANKA_AGENT_PASSWORD
**Solution**: Verify credentials in Planka admin panel

### "Port already in use"
**Cause**: Another service using required ports
**Solution**: Change ports or stop conflicting services

## 📊 Performance Optimization

### Development Mode
- Use Node.js directly for faster iteration
- Skip Docker networking complexity

### Production Mode
- Use Docker with proper host networking
- Implement health checks before operations

## 🔄 Automated Recovery

The RAG pipeline includes automatic retry logic:
- 3 retry attempts with exponential backoff
- Health checks before each operation
- Detailed error reporting

## 📞 Getting Help

1. **Run diagnostics**: `npm run diagnose`
2. **Check logs**: `npm run logs`
3. **Verify setup**: Follow this guide step-by-step
4. **Create issue**: Include diagnostic report output

## 🎯 Quick Fix Checklist

- [ ] Docker is running (`docker info`)
- [ ] Planka container is running (`docker ps | grep planka`)
- [ ] Required ports are available (`npm run diagnose`)
- [ ] Environment variables are set (check `.env` file)
- [ ] Network connectivity works (`curl http://localhost:3333`)
- [ ] Docker networking configured (`host.docker.internal`)
- [ ] Health checks pass (`npm run health-check`)
