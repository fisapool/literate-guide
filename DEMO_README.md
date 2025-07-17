# 🎯 Kanban MCP VSCode Demo Files

This directory contains comprehensive demo materials for setting up and using Kanban MCP in VSCode.

## 📁 Demo Files Overview

| File | Purpose | Platform |
|------|---------|----------|
| `DEMO_VSCODE_SETUP.md` | Complete step-by-step guide | All platforms |
| `demo-vscode-setup.sh` | Automated setup script | Mac/Linux |
| `demo-vscode-setup.bat` | Automated setup script | Windows |
| `demo-vscode.html` | Interactive demo page | All platforms |
| `DEMO_README.md` | This file - overview of all demos |

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)
```bash
# Mac/Linux
./demo-vscode-setup.sh

# Windows
demo-vscode-setup.bat
```

### Option 2: Manual Setup
1. Read `DEMO_VSCODE_SETUP.md` for detailed instructions
2. Follow the step-by-step guide
3. Use `demo-vscode.html` for interactive testing

### Option 3: Interactive Demo
1. Open `demo-vscode.html` in your browser
2. Click through the interactive elements
3. Follow the visual workflow examples

## 📋 What Each Demo Covers

### 1. Prerequisites Check
- Node.js installation
- npm availability
- Docker setup
- VSCode MCP extension

### 2. Project Setup
- Dependency installation
- TypeScript compilation
- VSCode configuration
- Planka startup

### 3. VSCode Integration
- MCP extension installation
- Configuration file creation
- Connection testing
- Basic commands

### 4. AI Assistant Usage
- Natural language commands
- Project management
- Board and card operations
- Task management

### 5. Troubleshooting
- Common issues
- Solutions and workarounds
- Debug commands
- Support resources

## 🎯 Demo Scenarios

### Scenario 1: Sprint Planning
```
"Create a new board called 'Sprint 15' with lists: Backlog, In Progress, Review, Done"
```

### Scenario 2: Task Management
```
"Add a card called 'Implement user authentication' to the Backlog list"
```

### Scenario 3: Progress Tracking
```
"Show me all cards in the In Progress list"
```

## 🔧 Testing Your Setup

After running any demo:

1. **Verify Planka**: Visit http://localhost:3333
2. **Test MCP**: Ctrl+Shift+P → "MCP: Test Connection"
3. **Check Logs**: Ctrl+Shift+U → Select "MCP"
4. **Try Commands**: Ask AI to show projects or create boards

## 📞 Support

If you encounter issues:
1. Check the troubleshooting sections in each demo file
2. Review the main README.md
3. Visit the GitHub issues page
4. Check the wiki documentation

## 🎉 Success Indicators

Your setup is working when:
- ✅ Planka loads at http://localhost:3333
- ✅ MCP extension shows "Connected" status
- ✅ AI assistant responds to kanban commands
- ✅ You can create/view projects and boards through AI

## 🔄 Next Steps

After completing the demo:
1. Explore advanced features in the wiki
2. Try the integration with your actual projects
3. Customize the configuration for your needs
4. Contribute improvements back to the project
