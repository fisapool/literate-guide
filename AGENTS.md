# **AGENTS.md**

This document provides essential context for AI agents to understand and interact with the literate-guide repository. The primary goal of this project is to act as a middleware service, or Middleware Co-Pilot (MCP), connecting a large language model to a Planka Kanban board.

### **1\. Project Overview**

This project is a TypeScript-based middleware that exposes a RESTful API to perform operations on a Planka Kanban board. It is designed to be used as a local server within VS Code, allowing an AI agent to manage software projects by interacting with a Kanban board programmatically.

### **2\. Key Libraries and Technologies**

* **Core Language**: TypeScript  
* **API Framework**: The project uses a custom setup to serve an API defined by openapi.yaml.  
* **Planka Integration**: It uses the @plankas/node-sdk for all interactions with the Planka API.  
* **Environment**: The application is designed to run on Node.js and can be containerized using the provided docker-compose.yml file.

### **3\. Architectural Principles**

* **API-First Design**: The core capabilities are exposed through a RESTful API, with the schema formally defined in openapi.yaml. This is the primary interface for interaction.  
* **Separation of Concerns**:  
  * **Operations**: Low-level business logic for interacting with individual Planka resources (like cards, boards, lists) is isolated in the operations/ directory.  
  * **Tools**: Higher-level, composite functions designed for agent use are located in the tools/ directory. **Agents should prefer using these tools over raw operations.**  
* **Configuration**: The MCP server is configured via .vscode/mcp.json.

### **4\. How to Operate the Kanban MCP**

As an agent, your primary goal is to use the provided tools to manage the Kanban board.

#### **Core Commands:**

* **Installation**: npm install  
* **Build**: npm run build (This compiles TypeScript files into the dist directory)  
* **Run Server**: node dist/index.js  
* **Run Tests**: npm test (This will run integration tests using Jest)

#### **Available Agent Tools:**

You should import and use the functions available in tools/index.ts. Key tools include:

* boardSummary: To get a high-level overview of a specific board, including its lists and the cards within them.  
* cardDetails: To retrieve detailed information about a single card, including its tasks, comments, and labels.  
* createCardWithTasks: To create a new card and simultaneously populate it with a list of checklist tasks.  
* moveCard: To move a card from one list to another (e.g., from 'To Do' to 'In Progress').

**Example Workflow:**

1. To understand the current state of a project, call the boardSummary tool.  
2. To begin work on a task, use the moveCard tool to shift the relevant card to the "In Progress" list.  
3. When a user requests a new feature, use createCardWithTasks to add it to the "To Do" list with all sub-tasks defined.  
4. Always reference openapi.yaml for detailed endpoint definitions and data schemas if you need to interact at a lower level than the provided tools.