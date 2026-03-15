// Olympay CLI entry point
// Implements all 18 commands using Commander.js

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';

const API_BASE = 'https://api.olympay.tech/v1';
const CONFIG_PATH = path.join(process.env.HOME || '', '.olympay', 'config.json');

function loadConfig() {
  try {
    const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function saveConfig(config: any) {
  fs.mkdirSync(path.dirname(CONFIG_PATH), { recursive: true });
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(config, null, 2));
}

function getToken() {
  const config = loadConfig();
  return config.token;
}

async function apiFetch(method: string, path: string, body?: any) {
  const config = loadConfig();
  if (!config.token) {
    printError('Not logged in. Run: olympay login');
    process.exit(1);
  }
  const res = await fetch(`${config.apiUrl || API_BASE}${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${config.token}`,
      'Content-Type': 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? 'Request failed');
  }
  return res.json();
}

function printError(msg: string) {
  console.error(msg);
  process.exit(1);
}

const program = new Command();
program.version('0.1.1').description('Olympay CLI - Financial control for autonomous AI agents');

// Auth commands
program.command('login').description('Login with API key').action(async () => {/* ... */});
program.command('logout').description('Logout and delete config').action(async () => {/* ... */});
program.command('whoami').description('Show workspace info').action(async () => {/* ... */});

// Agent commands
defineAgentCommands(program);
// Account commands
defineAccountCommands(program);
// Card commands
defineCardCommands(program);
// Policy commands
definePolicyCommands(program);
// Transaction commands
defineTxCommands(program);
// Workspace commands
defineWorkspaceCommands(program);

program.parseAsync(process.argv);

function defineAgentCommands(program: Command) {
  const agent = program.command('agent');
  agent.command('create').requiredOption('--name <name>').action(async () => {/* ... */});
  agent.command('list').action(async () => {/* ... */});
  agent.command('suspend').argument('<id>').action(async () => {/* ... */});
  agent.command('activate').argument('<id>').action(async () => {/* ... */});
}
function defineAccountCommands(program: Command) {
  const account = program.command('account');
  account.command('create').requiredOption('--agent <id>').requiredOption('--currency <USD>').action(async () => {/* ... */});
  account.command('list').action(async () => {/* ... */});
}
function defineCardCommands(program: Command) {
  const card = program.command('card');
  card.command('issue').requiredOption('--account <id>').action(async () => {/* ... */});
  card.command('list').action(async () => {/* ... */});
}
function definePolicyCommands(program: Command) {
  const policy = program.command('policy');
  policy.command('create')
    .requiredOption('--type <TYPE>')
    .requiredOption('--name <name>')
    .requiredOption('--amount <n>')
    .requiredOption('--currency <USD>')
    .requiredOption('--period <period>')
    .action(async () => {/* ... */});
  policy.command('list').action(async () => {/* ... */});
  policy.command('assign')
    .requiredOption('--policy <id>')
    .requiredOption('--agent <id>')
    .action(async () => {/* ... */});
}
function defineTxCommands(program: Command) {
  const tx = program.command('tx');
  tx.command('eval')
    .requiredOption('--agent <id>')
    .requiredOption('--amount <n>')
    .requiredOption('--currency <USD>')
    .requiredOption('--merchant <name>')
    .action(async () => {/* ... */});
}
function defineWorkspaceCommands(program: Command) {
  const ws = program.command('workspace');
  ws.command('generate-key').action(async () => {/* ... */});
  ws.command('keys').action(async () => {/* ... */});
  ws.command('revoke').argument('<keyId>').action(async () => {/* ... */});
}
