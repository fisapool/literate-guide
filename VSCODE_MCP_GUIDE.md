# VSCode MCP Settings Configuration Guide

This guide provides comprehensive instructions for configuring the Kanban MCP server in VSCode using various configuration methods.

## Overview
The Kanban MCP server enables VSCode to interact with Planka boards directly through the Model Context Protocol (MCP). This integration allows you to manage kanban boards, cards, and tasks without leaving your editor.

## Configuration Methods

### Method 1: VSCode Settings (settings.json)

Add the following configuration to your VSCode `settings.json`:

```json
{
  "mcp": {
    "servers": {
      "kanban": {
        "command": "node",
        "args": ["/absolute/path/to/kanban-mcp/dist/index.js"],
        "env": {
          "PLANKA_BASE_URL": "http://localhost:3333",
          "PLANKA_AGENT_EMAIL": "demo@demo.demo",
          "PLANKA_AGENT_PASSWORD": "demo"
        }
      }
    }
  }
}
```

### Method 2: VSCode Extension Configuration

1. **Install the MCP Extension:**
   - Open VSCode Extensions (Ctrl+Shift+X)
   - Search for "Model Context Protocol"
   - Install the official MCP extension

2. **Configure via Extension:**
   - Create `.vscode/mcp.json` in your workspace
   - Add the following configuration:

```json
{
  "servers": {
    "kanban": {
      "type": "stdio",
      "command": "node",
      "args": ["${workspaceFolder}/dist/index.js"],
      "env": {
        "PLANKA_BASE_URL": "http://localhost:3333",
        "PLANKA_AGENT_EMAIL": "demo@demo.demo",
        "PLANKA_AGENT_PASSWORD": "demo"
      }
    }
  }
}
```

### Method 3: Workspace Configuration

Create `.vscode/settings.json` in your workspace root:

```json
{
  "mcp.servers": {
    "kanban": {
      "type": "stdio",
      "command": "node",
      "args": ["${workspaceFolder}/dist/index.js"],
      "env": {
        "PLANKA_BASE_URL": "http://localhost:3333",
        "PLANKA_AGENT_EMAIL": "demo@demo.demo",
        "PLANKA_AGENT_PASSWORD": "demo"
      }
    }
  }
}
```

## VSCode-Specific Setup Steps

### 1. Install MCP Extension
```bash
# Via VSCode Command Palette
Ctrl+Shift+P → Extensions: Install Extensions → Search "Model Context Protocol"
```

### 2. Configure Workspace
```bash
# Create workspace configuration
mkdir -p .vscode
touch .vscode/settings.json
```

### 3. Environment Setup
```bash
# In VSCode terminal
npm install
npm run build
npm run up  # Start Planka
```

### 4. Verify Configuration
- Open VSCode Output panel (Ctrl+Shift+U)
- Select "MCP" from the dropdown
- Check for successful connection logs
- Test via VSCode command palette: `MCP: Test Connection`

## VSCode Path Variables

Use these VSCode-specific path variables in your configuration:

| Variable | Description | Example |
|----------|-------------|---------|
| `${workspaceFolder}` | Current workspace root | `/home/user/projects/kanban-mcp` |
| `${userHome}` | User's home directory | `/home/user` |
| `${env:VARIABLE}` | Environment variable | `${env:PLANKA_BASE_URL}` |

## Example Configurations

### Basic Configuration
```json
{
  "mcp.servers": {
    "kanban": {
      "command": "node",
      "args": ["${workspaceFolder}/dist/index.js"],
      "env": {
        "PLANKA_BASE_URL": "http://localhost:3333",
        "PLANKA_AGENT_EMAIL": "demo@demo.demo",
        "PLANKA_AGENT_PASSWORD": "demo"
      }
    }
  }
}
```

### Advanced Configuration with Custom Paths
```json
{
  "mcp.servers": {
    "kanban": {
      "type": "stdio",
      "command": "node",
      "args": ["${userHome}/projects/kanban-mcp/dist/index.js"],
      "env": {
        "PLANKA_BASE_URL": "${env:PLANKA_BASE_URL}",
        "PLANKA_AGENT_EMAIL": "${env:PLANKA_AGENT_EMAIL}",
        "PLANKA_AGENT_PASSWORD": "${env:PLANKA_AGENT_PASSWORD}"
      }
    }
  }
}
```

## Troubleshooting

### Common Issues and Solutions

1. **MCP Extension Not Found**
   - Ensure you're using the official "Model Context Protocol" extension
   - Check extension marketplace for updates

2. **Path Issues**
   - Use absolute paths or VSCode variables
   - Verify the dist/index.js file exists after building

3. **Environment Variables**
   - Check that all required environment variables are set
   - Use VSCode's environment variable syntax

4. **Connection Errors**
   - Verify Planka is running on the specified URL
   - Check network connectivity and firewall settings

## Testing Your Configuration

1. **Build the Project:**
```bash
npm run build
```

2. **Start Planka:**
```bash
npm run up
```

3. **Test MCP Connection:**
- Open VSCode Command Palette
- Run "MCP: Test Connection"
- Check Output panel for success message

## Additional Resources

- [MCP Extension Documentation](https://marketplace.visualstudio.com/items?itemName=modelcontextprotocol.mcp)
- [VSCode Settings Reference](https://code.visualstudio.com/docs/getstarted/settings)
- [Planka Documentation](https://docs.planka.cloud/)
