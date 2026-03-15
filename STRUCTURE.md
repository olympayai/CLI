# Olympay CLI Repository Structure

olympay-cli/
├── src/
│   └── cli.ts                  # Entry point, all 18 commands (Commander.js)
├── dist/
│   └── cli.js                  # Build output (esbuild, ESM bundle, do not edit)
├── build.mjs                   # esbuild build script
├── package.json                # npm metadata, bin, dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # Documentation

Config file: ~/.olympay/config.json
- Saved after login
- Contains token and apiUrl

All CLI logic is in src/cli.ts.
Build produces dist/cli.js.
