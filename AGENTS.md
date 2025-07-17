# 🤖 AGENTS.md - Kanban MCP Agent Guide

Welcome to the Kanban MCP repository! This guide is designed to help agents (AI assistants and human developers) understand, contribute to, and work effectively with this project management integration system.

## 📋 Repository Overview

**Kanban MCP** is a Model Context Protocol (MCP) server that bridges [Planka](https://planka.app/) (an open-source kanban board) with AI assistants like Claude, enabling automated project management capabilities.

### 🎯 Key Focus Areas for Agents

| Area | Purpose | Key Files |
|------|---------|-----------|
| **Core Server** | MCP protocol implementation | `index.ts` |
| **Operations** | Planka API interactions | `operations/*.ts` |
| **Tools** | Custom utility functions | `tools/index.ts` |
| **Common** | Shared types and utilities | `common/*.ts` |
| **Tests** | Integration and unit tests | `tests/*.ts` |

### 🏗️ Architecture Overview

```
kanban-mcp/
├── index.ts                 # Main MCP server entry point
├── operations/              # Planka API operations
│   ├── boards.ts           # Board CRUD operations
│   ├── cards.ts            # Card management
│   ├── lists.ts            # List management
│   ├── tasks.ts            # Task management
│   └── ...                 # Other entity operations
├── tools/                  # Custom utility tools
│   ├── create-card-with-tasks.ts
│   ├── board-summary.ts
│   └── workflow-actions.ts
├── common/                 # Shared utilities
│   ├── types.ts            # TypeScript type definitions
│   ├── errors.ts           # Error handling
│   └── utils.ts            # Helper functions
└── tests/                  # Test suites
```

## 🚀 Contributor Guide

### Prerequisites

- **Node.js** 18+ with npm/pnpm
- **Docker** for Planka development environment
- **TypeScript** knowledge
- **MCP protocol** understanding (see [MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk))

### Development Environment Setup

```bash
# 1. Clone and install
git clone https://github.com/bradrisse/kanban-mcp.git
cd kanban-mcp
npm install

# 2. Start development environment
npm run up                    # Start Planka via Docker
npm run build                # Build TypeScript
npm run watch               # Watch mode for development

# 3. Test the setup
npm test                    # Run test suite
npm run inspector           # Launch MCP inspector for testing
```

### Environment Configuration

Create `.env` file:
```bash
PLANKA_BASE_URL=http://localhost:3333
PLANKA_AGENT_EMAIL=demo@demo.demo
PLANKA_AGENT_PASSWORD=demo
```

## 🧪 Testing Instructions

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- tests/integration.test.ts

# Run tests in watch mode
npm test -- --watch
```

### Test Structure

- **Integration tests**: `tests/integration.test.ts`
- **Unit tests**: Individual operation tests
- **MCP inspector**: `npm run inspector` for interactive testing

### CI/CD Pipeline

The project uses GitHub Actions for:
- TypeScript compilation
- Linting (ESLint)
- Test execution
- Docker image building

## 📤 PR Instructions

### Pull Request Format

**Title Format**: `[TYPE] Brief description`

Types:
- `[FEAT]`: New feature
- `[FIX]`: Bug fix
- `[DOCS]`: Documentation updates
- `[REFACTOR]`: Code refactoring
- `[TEST]`: Test additions/improvements

**PR Template**:
```markdown
## Summary
Brief description of changes

## Changes Made
- List specific changes
- Include any breaking changes

## Testing
- [ ] Tests pass locally
- [ ] Manual testing completed
- [ ] MCP inspector validation

## Related Issues
Fixes #issue-number
```

### AI Tool Prompting Tips

When using AI tools like Codex:

1. **Provide context**: Include relevant file paths and function names
2. **Be specific**: Use exact parameter names from the API
3. **Include examples**: Reference existing patterns in the codebase
4. **Test incrementally**: Validate each change with the MCP inspector

## 🔧 Customization and Debugging

### Tailoring MCP Tasks

#### Adding New Operations

1. Create new file in `operations/`:
```typescript
// operations/newFeature.ts
export async function newOperation(params: Params): Promise<Result> {
  // Implementation
}
```

2. Register in `index.ts`:
```typescript
server.tool("mcp_kanban_new_feature", "Description", schema, handler);
```

#### Custom Tool Development

1. Create tool in `tools/`:
```typescript
// tools/custom-tool.ts
export async function customTool(params: CustomParams): Promise<Result> {
  // Custom logic
}
```

2. Export from `tools/index.ts`:
```typescript
export { customTool } from './custom-tool.js';
```

### Debugging Strategies

#### Using MCP Inspector
```bash
# Start inspector with demo data
npm run inspector:demo

# Custom inspector session
npm run inspector
```

#### Log Analysis
- Enable debug logging: Set `DEBUG=*` environment variable
- Check Docker logs: `docker compose logs kanban`
- Monitor network requests via browser dev tools

#### Common Issues and Solutions

| Issue | Solution |
|-------|----------|
| **Connection refused** | Verify Planka is running: `npm run up` |
| **Authentication failed** | Check credentials in `.env` |
| **TypeScript errors** | Run `npm run build` to see detailed errors |
| **MCP tool not found** | Ensure tool is registered in `index.ts` |

### Large Task Management

For complex features:

1. **Break into phases**:
   - Phase 1: Core functionality
   - Phase 2: Error handling
   - Phase 3: Testing and documentation

2. **Use feature flags**:
   ```typescript
   const FEATURE_FLAGS = {
     newFeature: process.env.ENABLE_NEW_FEATURE === 'true'
   };
   ```

3. **Incremental deployment**:
   - Test with MCP inspector
   - Deploy to staging environment
   - Gradual rollout to production

## 🔄 Migration Guidelines

### Current Migration Areas

#### API Standardization (Q1 2025)
- **Goal**: Implement OpenAPI 3.0 specification
- **Status**: In progress
- **Files affected**: `operations/*.ts`, `index.ts`
- **Validation**: Use OpenAPI validator tools

#### Webhook Implementation (Q1 2025)
- **Goal**: Add webhook emitters for board events
- **Status**: Planning phase
- **Files to create**: `webhooks/`, `events/`
- **Validation**: Webhook testing endpoints

#### Metadata Enhancement (Q2 2025)
- **Goal**: Support custom fields and structured metadata
- **Status**: Design phase
- **Files to modify**: `operations/cards.ts`, `common/types.ts`

### Change Validation Process

1. **Code Quality Checks**:
   ```bash
   npm run qc                    # Lint + type checking
   npm test                      # Full test suite
   ```

2. **Manual Testing**:
   ```bash
   npm run inspector             # Interactive testing
   npm run start-node            # Direct Node.js testing
   ```

3. **Integration Testing**:
   - Test with actual Planka instance
   - Verify MCP protocol compliance
   - Check backward compatibility

## 📊 Performance Guidelines

### Optimization Targets

- **API calls**: Minimize Planka API calls through batching
- **Memory usage**: Efficient data structures in tools
- **Response time**: < 2s for standard operations

### Monitoring

- Use MCP inspector for performance profiling
- Monitor Docker resource usage
- Track API response times

## 🎯 Next Steps for Agents

1. **Explore the codebase**: Start with `index.ts` and follow the tool registration patterns
2. **Run the test suite**: Ensure your environment is properly configured
3. **Try the MCP inspector**: Get hands-on experience with the API
4. **Pick a good first issue**: Look for issues labeled `good-first-issue`
5. **Join the community**: Engage with maintainers and other contributors

## 📞 Support and Resources

- **Documentation**: [Wiki](https://github.com/bradrisse/kanban-mcp/wiki)
- **Issues**: [GitHub Issues](https://github.com/bradrisse/kanban-mcp/issues)
- **Discussions**: [GitHub Discussions](https://github.com/bradrisse/kanban-mcp/discussions)
- **MCP Protocol**: [Official MCP Documentation](https://modelcontextprotocol.io/)

---

**Remember**: This is a living document. Update it as the project evolves and new patterns emerge. When in doubt, ask questions in the project's discussions or issues!
