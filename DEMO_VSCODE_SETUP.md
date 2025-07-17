# 🎯 VSCode Kanban MCP Demo Guide

This guide provides a complete walkthrough for setting up and using the Kanban MCP project in VSCode with visual demonstrations.

## 📋 Demo Overview

In this demo, you'll learn how to:
1. Set up the Kanban MCP server in VSCode
2. Configure the MCP extension
3. Use AI assistants to manage your kanban boards
4. Perform common kanban operations through natural language

## 🚀 Step 1: Initial Setup

### 1.1 Open Project in VSCode
```bash
# Clone and open the project
git clone https://github.com/bradrisse/kanban-mcp.git
cd kanban-mcp
code .  # Opens VSCode with the project
```

### 1.2 Install Dependencies
```bash
# In VSCode terminal (Ctrl+`)
npm install
npm run build
```

### 1.3 Start Planka
```bash
# Start the kanban board service
npm run up
```

**Expected Result**: Planka will be available at http://localhost:3333

## 🔧 Step 2: VSCode MCP Configuration

### 2.1 Install MCP Extension
1. Open VSCode Extensions (Ctrl+Shift+X)
2. Search for "Model Context Protocol"
3. Install the official MCP extension

### 2.2 Configure MCP Server

Create `.vscode/mcp.json` in your project root:

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

### 2.3 Verify Setup
1. Open VSCode Output panel (Ctrl+Shift+U)
2. Select "MCP" from dropdown
3. Look for successful connection message

## 🎯 Step 3: Using AI with Kanban Boards

### 3.1 Basic Project Management

**Prompt Example**:
```
"Show me all projects in my kanban board"
```

**Expected Response**:
```
I'll help you view all projects in your kanban board.

[AI will list all available projects with details]
```

### 3.2 Creating a New Board

**Prompt Example**:
```
"Create a new board called 'Website Redesign' in the 'Development' project"
```

**Expected Response**:
```
I'll create a new board called 'Website Redesign' in your Development project.

✅ Board created successfully:
- Name: Website Redesign
- Project: Development
- ID: abc123
```

### 3.3 Managing Cards

**Prompt Example**:
```
"Add a new card called 'Design homepage mockup' to the 'To Do' list in the Website Redesign board"
```

**Expected Response**:
```
I'll create a new card for you.

✅ Card created:
- Title: Design homepage mockup
- List: To Do
- Board: Website Redesign
- Card ID: card_456
```

## 📊 Step 4: Advanced Operations

### 4.1 Task Management

**Prompt Example**:
```
"Add tasks to the 'Design homepage mockup' card:
1. Create wireframes
2. Design color scheme
3. Create responsive layout"
```

### 4.2 Moving Cards

**Prompt Example**:
```
"Move the 'Design homepage mockup' card from 'To Do' to 'In Progress'"
```

### 4.3 Adding Comments

**Prompt Example**:
```
"Add a comment to the 'Design homepage mockup' card: 'Started working on wireframes, will share by EOD'"
```

## 🎮 Step 5: Interactive Demo Commands

### 5.1 Quick Board Setup
```bash
# Create a sample project structure
npm run demo-setup
```

### 5.2 Test Commands
```bash
# Test MCP connection
npm run test-mcp

# View available commands
npm run help
```

## 📸 Visual Workflow Example

### Scenario: Planning a Sprint

1. **Create Sprint Board**
   ```
   "Create a new board called 'Sprint 15' with lists: Backlog, In Progress, Review, Done"
   ```

2. **Add User Stories**
   ```
   "Add cards to the Backlog:
   - User authentication flow
   - Dashboard analytics
   - Mobile responsive design"
   ```

3. **Assign Tasks**
   ```
   "Add tasks to 'User authentication flow':
   - Design login UI
   - Implement OAuth
   - Add password reset
   - Write tests"
   ```

4. **Track Progress**
   ```
   "Show me all cards in the In Progress list"
   ```

## 🔍 Troubleshooting Demo

### Common Issues and Solutions

1. **MCP Server Not Connecting**
   - Check if Planka is running: `npm run status`
   - Verify credentials in `.vscode/mcp.json`
   - Restart VSCode MCP extension

2. **Permission Errors**
   - Ensure Docker containers are running
   - Check if ports 3333 and 5432 are available

3. **Build Issues**
   - Run `npm run build` again
   - Check TypeScript compilation errors

## 🎯 Quick Test Commands

Create a test file to verify everything works:

```bash
# Create demo test
cat > demo-test.js << 'EOF'
const { execSync } = require('child_process');

console.log('🧪 Testing Kanban MCP Setup...');

try {
  // Test MCP server
  const result = execSync('npm run start-node -- --test', { encoding: 'utf8' });
  console.log('✅ MCP Server Test:', result);
  
  // Test Planka connection
  const plankaStatus = execSync('curl -s http://localhost:3333/api/health', { encoding: 'utf8' });
  console.log('✅ Planka Status:', plankaStatus);
  
} catch (error) {
  console.error('❌ Test failed:', error.message);
}
EOF

node demo-test.js
```

## 🎉 Demo Completion Checklist

- [ ] VSCode opened with project
- [ ] Dependencies installed (`npm install`)
- [ ] Project built (`npm run build`)
- [ ] Planka running (`npm run up`)
- [ ] MCP extension installed
- [ ] `.vscode/mcp.json` created
- [ ] MCP connection verified
- [ ] Basic commands tested
- [ ] Sample workflow completed

## 🚀 Next Steps

After completing this demo, you can:
1. Explore the [Usage Guide](wiki/Usage-Guide.md) for advanced features
2. Check the [API Reference](wiki/API-Reference.md) for all available commands
3. Review [Troubleshooting](wiki/Troubleshooting.md) for common issues
4. Contribute to the project following the [Developer Guide](wiki/Developer-Guide.md)

## 📞 Support

For demo-related questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review the VSCode MCP guide at `VSCODE_MCP_GUIDE.md`
