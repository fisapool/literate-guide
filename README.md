# 🔄 Kanban MCP

Welcome to the Kanban MCP project! 🎉 This project integrates Planka kanban boards with Cursor's Machine Control Protocol (MCP) to enable AI assistants like Claude to manage your kanban boards.

## 🤔 What is Kanban MCP?

Kanban MCP is a bridge between [Planka](https://planka.app/) (an open-source kanban board) and [Cursor](https://cursor.sh/)'s Machine Control Protocol. It allows AI assistants like Claude to:

- 📋 View and manage projects, boards, lists, and cards
- ✅ Create and update tasks
- 💬 Add comments to cards
- 🔄 Move cards between lists
- ⏱️ Track time spent on tasks
- 🚀 And much more!

This integration enables a seamless workflow where you can ask Claude to help manage your development tasks, track progress, and organize your work.

## 🚦 Quick Start

### 📋 Prerequisites

- 🐳 [Docker](https://www.docker.com/get-started) for running Planka
- 🔄 [Git](https://git-scm.com/downloads) for cloning the repository
- 🟢 [Node.js](https://nodejs.org/) (version 18 or above) and npm for development

### 📥 Installation

1. Clone this repository:
```bash
git clone https://github.com/bradrisse/kanban-mcp.git
cd kanban-mcp
```

2. Install dependencies and build the TypeScript code:
```bash
npm install
npm run build
```

3. Start the Docker containers (Planka, PostgreSQL, and the MCP server):
```bash
docker compose up
# or use the convenience script
npm run up
```

4. Access the Planka Kanban board:
   - Default URL: http://localhost:3333
   - Default credentials: 
     - Email: demo@demo.demo
     - Password: demo

5. Configure Cursor to use the MCP server:
   - In Cursor, go to Settings > Features > MCP
   - Add a new MCP server with the following configuration:
   ```json
   {
     "mcpServers": {
       "kanban": {
         "command": "node",
         "args": ["/path/to/kanban-mcp/dist/index.js"],
         "env": {
           "PLANKA_BASE_URL": "http://localhost:3333",
           "PLANKA_AGENT_EMAIL": "demo@demo.demo",
           "PLANKA_AGENT_PASSWORD": "demo"
         }
       }
     }
   }
   ```
   - Replace `/path/to/kanban-mcp` with the actual absolute path to your kanban-mcp directory

Alternatively, you can use a project-specific configuration by creating a `.cursor/mcp.json` file in your project root with the same configuration.

For Docker-based deployment and other advanced options, see the [Installation Guide](https://github.com/bradrisse/kanban-mcp/wiki/Installation-Guide).

## 📚 Documentation

### For Users

- [🛠️ Installation Guide](https://github.com/bradrisse/kanban-mcp/wiki/Installation-Guide): How to install and configure Kanban MCP
- [📝 Usage Guide](https://github.com/bradrisse/kanban-mcp/wiki/Usage-Guide): How to use Kanban MCP with Claude
- [💡 Capabilities and Strategies](https://github.com/bradrisse/kanban-mcp/wiki/Capabilities-and-Strategies): Detailed exploration of MCP server capabilities and LLM interaction strategies
- [⚠️ Troubleshooting](https://github.com/bradrisse/kanban-mcp/wiki/Troubleshooting): Solutions to common issues

### For Developers

- [👨‍💻 Developer Guide](https://github.com/bradrisse/kanban-mcp/wiki/Developer-Guide): Information for developers who want to contribute to or modify Kanban MCP
- [📖 API Reference](https://github.com/bradrisse/kanban-mcp/wiki/API-Reference): Detailed documentation of the MCP commands and Planka API integration

## ✨ Features

Kanban MCP provides a comprehensive set of features for managing your kanban boards:

### 📂 Project Management
- Create and view projects
- Manage project settings and members

### 📊 Board Management
- Create and view boards within projects
- Customize board settings

### 📋 List Management
- Create and organize lists within boards
- Reorder lists as needed

### 🗂️ Card Management
- Create, update, and delete cards
- Move cards between lists
- Add descriptions, due dates, and labels
- Duplicate cards to create templates

### ⏱️ Time Tracking
- Start, stop, and reset stopwatches
- Track time spent on individual tasks
- Analyze time usage patterns

### ✅ Task Management
- Create and manage tasks within cards
- Mark tasks as complete or incomplete

### 💬 Comment Management
- Add comments to cards for discussion
- View comment history

## 🤖 LLM Interaction Strategies

MCP Kanban supports several workflow strategies for LLM-human collaboration:

1. **🤝 LLM-Driven Development with Human Review**: LLMs implement tasks while humans review and provide feedback
2. **👥 Human-Driven Development with LLM Support**: Humans implement while LLMs provide analysis and recommendations
3. **🧠 Collaborative Grooming and Planning**: Humans and LLMs work together to plan and organize tasks

For more details on these strategies, see the [Capabilities and Strategies](https://github.com/bradrisse/kanban-mcp/wiki/Capabilities-and-Strategies) wiki page.

## 📦 Available npm Scripts

- `npm run build`: Build the TypeScript code
- `npm run build-docker`: Build the TypeScript code and create a Docker image
- `npm run up`: Start all containers (Planka, Postgres, and the MCP server)
- `npm run down`: Stop all containers
- `npm run restart`: Restart the Planka containers
- `npm run start-node`: Start the MCP server directly with Node (for testing outside of Cursor)
- `npm run qc`: Run quality control checks (linting and type checking)

## 🤝 Contributing

We welcome contributions to Kanban MCP! If you'd like to contribute:

1. Check out the [Developer Guide](https://github.com/bradrisse/kanban-mcp/wiki/Developer-Guide) for information on the project structure and development workflow
2. Look at the [open issues](https://github.com/bradrisse/kanban-mcp/issues) for tasks that need help
3. Submit a pull request with your changes

## 🆘 Support

If you need help with Kanban MCP:

1. Check the [Troubleshooting](https://github.com/bradrisse/kanban-mcp/wiki/Troubleshooting) page for solutions to common issues
2. Search the [GitHub issues](https://github.com/bradrisse/kanban-mcp/issues) to see if your problem has been reported
3. Open a new issue if you can't find a solution

## 📜 License

Kanban MCP is open-source software licensed under the MIT License. See the [LICENSE](https://github.com/bradrisse/kanban-mcp/blob/main/LICENSE) file for details. 