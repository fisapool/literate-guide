# **AGENTS.md**

This document provides essential context for AI agents to understand and interact with the literate-guide repository. The primary goal of this project is to act as a middleware service, or Middleware Co-Pilot (MCP), connecting a large language model to a Planka Kanban board.

## **1. Project Overview**

This project is a TypeScript-based middleware that exposes a RESTful API to perform operations on a Planka Kanban board. It is designed to be used as a local server within VS Code, allowing an AI agent to manage software projects by interacting with a Kanban board programmatically.

### **Key Features**
- **Real-time Kanban Management**: Create, update, and manage cards, lists, and boards
- **Task Automation**: Automated card creation with predefined templates and tasks
- **Project Intelligence**: AI-powered insights and recommendations for project management
- **Multi-environment Support**: Local development, Docker containers, and cloud deployment
- **Comprehensive Testing**: Integration tests, health checks, and diagnostic tools

## **2. Key Libraries and Technologies**

### **Core Stack**
- **Language**: TypeScript 5.x with strict type checking
- **Runtime**: Node.js 18+ with native ES modules
- **API Framework**: Express.js with OpenAPI 3.0 specification
- **Database**: Planka API via @plankas/node-sdk
- **Testing**: Jest with supertest for API testing

### **Development Tools**
- **Package Managers**: npm, pnpm, and yarn support
- **Build System**: TypeScript compiler with source maps
- **Linting**: ESLint with TypeScript rules
- **Environment Management**: dotenv with validation
- **Containerization**: Docker with docker-compose

### **AI Integration**
- **MCP Protocol**: Model Context Protocol for AI agent communication
- **RAG Pipeline**: Retrieval-Augmented Generation for project insights
- **Health Monitoring**: Real-time system diagnostics and alerts

## **3. Architectural Principles**

### **API-First Design**
- **OpenAPI Specification**: Complete REST API documentation in `openapi.yaml`
- **Type Safety**: Full TypeScript interfaces for all API contracts
- **Versioning**: Semantic versioning with backward compatibility

### **Separation of Concerns**
- **Operations Layer** (`/operations/`): Low-level Planka API interactions
  - Individual resource CRUD operations
  - Error handling and retry logic
  - Rate limiting and throttling
- **Tools Layer** (`/tools/`): High-level agent-friendly functions
  - Composite operations for common workflows
  - Intelligent defaults and validation
  - User-friendly error messages
- **Utilities Layer** (`/src/utils/`): Cross-cutting concerns
  - Health checks and diagnostics
  - Environment validation
  - Logging and monitoring

### **Configuration Management**
- **VS Code Integration**: `.vscode/mcp.json` for MCP server configuration
- **Environment Variables**: `.env` files for sensitive configuration
- **Docker Support**: Containerized deployment with environment-specific configs

## **4. Quick Start Guide**

### **Prerequisites**
```bash
# Node.js 18+ required
node --version

# Package manager (npm/pnpm/yarn)
npm --version
```

### **Installation**
```bash
# Clone and setup
git clone <repository>
cd literate-guide
npm install

# Environment configuration
cp .env.example .env
# Edit .env with your Planka credentials
```

### **Development Commands**
```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Run tests
npm test

# Run with inspector
npm run start:inspector

# Docker development
docker-compose up
```

## **5. Available Agent Tools**

### **Core Tools** (`/tools/index.ts`)

#### **Board Management**
- `boardSummary(boardId: string)`: Get comprehensive board overview
  - Lists and their cards
  - Card counts and progress metrics
  - Recent activity summary

#### **Card Operations**
- `cardDetails(cardId: string)`: Retrieve detailed card information
  - Full card metadata
  - Tasks, comments, and attachments
  - Labels and assignees
- `createCardWithTasks(options)`: Create card with predefined tasks
  - Template-based card creation
  - Bulk task addition
  - Automatic checklist population
- `moveCard(cardId: string, listId: string)`: Move card between lists
  - Position-based placement
  - Status update automation
  - Progress tracking

#### **Workflow Actions**
- `createProjectBoard(name: string, description?: string)`: Create new project board
- `archiveCompletedCards(boardId: string)`: Archive finished work
- `generateProgressReport(boardId: string)`: AI-powered project insights

### **Advanced Features**
- **Batch Operations**: Process multiple cards simultaneously
- **Template System**: Reusable card and task templates
- **Webhook Integration**: Real-time notifications for board changes
- **Search & Filter**: Advanced querying capabilities

## **6. Environment Configuration**

### **Required Environment Variables**
```bash
# Planka API Configuration
PLANKA_URL=https://your-planka-instance.com
PLANKA_USERNAME=your-email@domain.com
PLANKA_PASSWORD=your-password

# Server Configuration
PORT=3000
NODE_ENV=development

# Optional Features
ENABLE_WEBHOOKS=true
LOG_LEVEL=info
```

### **VS Code MCP Configuration** (`.vscode/mcp.json`)
```json
{
  "mcpServers": {
    "kanban-mcp": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "PLANKA_URL": "https://your-planka-instance.com",
        "PLANKA_USERNAME": "your-email@domain.com",
        "PLANKA_PASSWORD": "your-password"
      }
    }
  }
}
```

## **7. Troubleshooting & Diagnostics**

### **Common Issues**
1. **Connection Errors**: Verify Planka URL and credentials
2. **Rate Limiting**: Check API usage limits
3. **Permission Issues**: Ensure user has board access
4. **Environment Issues**: Run diagnostic script

### **Diagnostic Tools**
```bash
# Environment check
npm run diagnose

# Health check endpoint
GET /health

# Detailed logs
LOG_LEVEL=debug npm start
```

### **Support Resources**
- **Troubleshooting Guide**: `wiki/Troubleshooting.md`
- **RAG Pipeline Issues**: `wiki/TROUBLESHOOTING_RAG.md`
- **Inspector Issues**: `MCP_INSPECTOR_TROUBLESHOOTING.md`

## **8. Example Workflows**

### **Project Setup Workflow**
1. Create new board: `createProjectBoard("My Project", "Project description")`
2. Set up lists: Create "Backlog", "In Progress", "Review", "Done"
3. Add initial cards: Use `createCardWithTasks` for project milestones

### **Daily Standup Workflow**
1. Get board summary: `boardSummary(currentBoardId)`
2. Review in-progress cards
3. Update card statuses with `moveCard`
4. Add new tasks as needed

### **Sprint Planning Workflow**
1. Archive completed work: `archiveCompletedCards(boardId)`
2. Create sprint cards from templates
3. Assign team members and due dates
4. Generate progress report: `generateProgressReport(boardId)`

## **9. Best Practices for Agents**

### **Performance Optimization**
- Use batch operations for multiple cards
- Cache board summaries for frequently accessed boards
- Implement pagination for large datasets

### **Error Handling**
- Always check for null/undefined responses
- Implement retry logic for transient failures
- Log detailed error contexts for debugging

### **Security Considerations**
- Never expose credentials in logs
- Validate all user inputs
- Use environment variables for sensitive data

### **Testing Strategy**
- Test with real Planka instance
- Use test boards for development
- Validate all edge cases in card operations
