# Olympay CLI Command Reference

## File: src/cli.ts
All CLI commands are defined in this file.

### Auth Commands
- login: Prompt API key, validate via /auth/login, save config
- logout: Delete config file
- whoami: GET /auth/whoami, workspace info

### Agent Commands
- agent create: POST /agents, --name <name>
- agent list: GET /agents
- agent suspend <id>: PATCH /agents/:id/suspend
- agent activate <id>: PATCH /agents/:id/activate

### Account Commands
- account create: POST /accounts, --agent <id>, --currency <USD>
- account list: GET /accounts

### Card Commands
- card issue: POST /cards, --account <id>
- card list: GET /cards

### Policy Commands
- policy create: POST /policies, --type <TYPE>, --name <name>, --amount <n>, --currency <USD>, --period <period>
- policy list: GET /policies
- policy assign: POST /policies/:id/assign, --policy <id>, --agent <id>

### Transaction Commands
- tx eval: POST /transactions/attempt, --agent <id>, --amount <n>, --currency <USD>, --merchant <name>

### Workspace Commands
- workspace generate-key: POST /workspace/keys
- workspace keys: GET /workspace/keys
- workspace revoke <keyId>: DELETE /workspace/keys/:keyId

## Mini Repo
- src/cli.ts: All command logic
- build.mjs: Build script
- dist/cli.js: Build output
- package.json: npm metadata
- tsconfig.json: TypeScript config
- README.md: Documentation

Config file: ~/.olympay/config.json
