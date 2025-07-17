# MCP Tools Demo Guide

This guide demonstrates how to call and use the Kanban MCP tools within VSCode after configuration.

## Prerequisites
1. Ensure MCP extension is installed in VSCode
2. Verify `.vscode/settings.json` is configured correctly
3. Build the project: `npm run build`
4. Start Planka: `npm run up`

## Demo Commands

### 1. List Available Tools
Open VSCode Command Palette (Ctrl+Shift+P) and run:
```
MCP: List Available Tools
```

### 2. Get Board Summary
```json
// Command: MCP: Execute Tool
// Tool: get_board_summary
// Arguments:
{
  "boardId": "your-board-id-here"
}
```

### 3. Create Card with Tasks
```json
// Command: MCP: Execute Tool
// Tool: create_card_with_tasks
// Arguments:
{
  "listId": "your-list-id-here",
  "title": "Demo Card",
  "description": "This is a demo card created via MCP",
  "tasks": [
    {"name": "Task 1", "isCompleted": false},
    {"name": "Task 2", "isCompleted": false}
  ]
}
```

### 4. Get Card Details
```json
// Command: MCP: Execute Tool
// Tool: get_card_details
// Arguments:
{
  "cardId": "your-card-id-here"
}
```

### 5. Workflow Actions
```json
// Command: MCP: Execute Tool
// Tool: workflow_actions
// Arguments:
{
  "action": "move_card",
  "cardId": "your-card-id-here",
  "targetListId": "target-list-id-here"
}
```

## Quick Demo Script

### Step 1: Get Project Boards
```bash
# Use MCP tool: get_project_boards
# Arguments: {"projectId": "demo-project-id"}
```

### Step 2: Create a Demo Card
```bash
# Use MCP tool: create_card_with_tasks
# Arguments: 
{
  "listId": "todo-list-id",
  "title": "MCP Demo Card",
  "description": "Testing MCP integration",
  "tasks": [
    {"name": "Configure MCP", "isCompleted": true},
    {"name": "Test tools", "isCompleted": false},
    {"name": "Document findings", "isCompleted": false}
  ]
}
```

### Step 3: Update Card Position
```bash
# Use MCP tool: workflow_actions
# Arguments:
{
  "action": "move_card",
  "cardId": "newly-created-card-id",
  "targetListId": "in-progress-list-id"
}
```

### Step 4: Add Comment
```bash
# Use MCP tool: add_comment
# Arguments:
{
  "cardId": "newly-created-card-id",
  "text": "MCP integration working perfectly!"
}
```

## VSCode Integration Demo

### Using Command Palette
1. Press `Ctrl+Shift+P`
2. Type "MCP:" to see available commands
3. Select "MCP: Execute Tool"
4. Choose tool from dropdown
5. Enter arguments in JSON format

### Using Keyboard Shortcuts
- `Ctrl+Shift+M`: Quick MCP command
- `Ctrl+Alt+M`: Show MCP tools panel

### Sample JSON for Testing
Save this as `demo-mcp-requests.json` in your workspace:

```json
{
  "demo_requests": [
    {
      "tool": "get_board_summary",
      "args": {"boardId": "demo-board"}
    },
    {
      "tool": "create_card_with_tasks",
      "args": {
        "listId": "demo-list",
        "title": "VSCode MCP Demo",
        "description": "Testing MCP tools from VSCode",
        "tasks": [
          {"name": "Setup MCP", "isCompleted": true},
          {"name": "Test tools", "isCompleted": false}
        ]
      }
    }
  ]
}
```

## Verification Steps

### 1. Check MCP Connection
```bash
# In VSCode terminal
npm run build
# Then test via MCP: Test Connection command
```

### 2. Verify Tools Loading
- Open VSCode Output panel
- Select "MCP" channel
- Look for "Tools loaded successfully" message

### 3. Test Basic Operations
- Create a test card
- Move it between lists
- Add a comment
- Check card details

## Error Handling Demo

### Common Errors and Solutions

1. **"Tool not found"**
   - Ensure MCP server is running
   - Check `.vscode/settings.json` configuration

2. **"Invalid arguments"**
   - Verify JSON format in arguments
   - Check required fields for each tool

3. **"Connection failed"**
   - Verify Planka is running
   - Check environment variables in config

## Advanced Demo Features

### Batch Operations
```json
// Multiple operations in sequence
[
  {
    "tool": "create_card_with_tasks",
    "args": {...}
  },
  {
    "tool": "workflow_actions",
    "args": {...}
  }
]
```

### Environment-Specific Testing
```json
// Use environment variables
{
  "tool": "get_board_summary",
  "args": {
    "boardId": "${env:DEMO_BOARD_ID}"
  }
}
```

## Quick Start Commands

Copy and paste these into VSCode Command Palette:

1. **Test MCP Connection**: `MCP: Test Connection`
2. **List Tools**: `MCP: List Available Tools`
3. **Execute Tool**: `MCP: Execute Tool`
4. **Show Logs**: `MCP: Show Output Panel`

## Demo Checklist
- [ ] MCP extension installed
- [ ] Configuration files created
- [ ] Project built successfully
- [ ] Planka server running
- [ ] Test connection successful
- [ ] Basic tools working
- [ ] Advanced features tested
