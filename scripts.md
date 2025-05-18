
# Project Scripts Documentation

This document provides an overview of all available npm scripts in the project, with explanations and usage examples.

## Available Scripts

### `npm run dev`

**Purpose**: Starts the development server with hot module replacement.

**Usage**:
```bash
npm run dev
```

This script runs Vite in development mode, which provides features like:
- Fast hot module replacement (HMR)
- Error overlay
- Source maps
- Automatic port allocation if the default port is in use

**Example output**:
```
> vite

  VITE v5.0.0  ready in 1234 ms

  ➜  Local:   http://localhost:8080/
  ➜  Network: http://192.168.1.5:8080/
  ➜  press h to show help
```

### `npm run build`

**Purpose**: Creates a production-ready build of the application.

**Usage**:
```bash
npm run build
```

This script compiles the TypeScript code, bundles the application using Vite, and applies optimizations like:
- Code splitting
- Tree shaking
- Asset optimization
- Minification

The output will be in the `/dist` directory.

**Example output**:
```
> vite build

vite v5.0.0 building for production...
✓ 1234 modules transformed.
dist/index.html                     2.50 kB │ gzip: 1.15 kB
dist/assets/index-abc123.css       78.21 kB │ gzip: 12.34 kB
dist/assets/index-def456.js       240.56 kB │ gzip: 78.90 kB
```

### `npm run preview`

**Purpose**: Locally previews the production build.

**Usage**:
```bash
npm run build
npm run preview
```

This script serves the `/dist` directory locally, allowing you to test the production build before deployment.

**Example output**:
```
> vite preview

  ➜  Local:   http://localhost:4173/
  ➜  Network: http://192.168.1.5:4173/
```

### `npm run lint`

**Purpose**: Runs ESLint to check for code quality and style issues.

**Usage**:
```bash
npm run lint
```

This script checks all TypeScript and JavaScript files for code quality issues according to the rules defined in `eslint.config.js`.

**Example output**:
```
> eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0

/path/to/file.tsx
  Line 10:10: 'unused' is defined but never used  @typescript-eslint/no-unused-vars

✖ 1 problem (1 error, 0 warnings)
```

### `npm run lint:fix`

**Purpose**: Automatically fixes ESLint issues when possible.

**Usage**:
```bash
npm run lint:fix
```

This script runs ESLint with the `--fix` flag to automatically correct fixable issues.

**Example output**:
```
> eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0 --fix

✨ No lint errors found!
```

### `npm run format`

**Purpose**: Formats code using Prettier.

**Usage**:
```bash
npm run format
```

This script formats all files according to Prettier rules defined in the project configuration.

**Example output**:
```
> prettier --write "src/**/*.{js,jsx,ts,tsx,css,md}"

src/components/Button.tsx 42ms
src/pages/Index.tsx 35ms
```

### `npm test`

**Purpose**: Runs test suites using Vitest.

**Usage**:
```bash
npm test
```

This script executes all test files in the project using Vitest.

**Example output**:
```
> vitest

 RUN  v0.34.6 /path/to/project

 ✓ src/components/Button.test.tsx (3 tests) 932ms
 ✓ src/utils/helpers.test.ts (2 tests) 124ms

 Test Files  2 passed (2)
 Tests       5 passed (5)
 Time        1.20s (in thread 1.05s, 114.29%)
```

### `npm run coverage`

**Purpose**: Runs tests with coverage reporting.

**Usage**:
```bash
npm run coverage
```

This script runs the test suite with coverage analysis to show which parts of the code are covered by tests.

**Example output**:
```
> vitest run --coverage

 RUN  v0.34.6 /path/to/project

 ✓ src/components/Button.test.tsx (3 tests) 932ms
 ✓ src/utils/helpers.test.ts (2 tests) 124ms

 Test Files  2 passed (2)
 Tests       5 passed (5)
 Time        1.64s

 ------------|---------|----------|---------|---------|-------------------
 File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
 ------------|---------|----------|---------|---------|-------------------
 All files   |   82.35 |    71.43 |   85.71 |   82.35 |                   
  Button.tsx |   88.89 |      100 |   85.71 |   88.89 | 45                
  helpers.ts |   76.47 |    71.43 |   85.71 |   76.47 | 15,32,54,76       
 ------------|---------|----------|---------|---------|-------------------
```

### `npm run typecheck`

**Purpose**: Checks TypeScript types without emitting files.

**Usage**:
```bash
npm run typecheck
```

This script runs the TypeScript compiler in `noEmit` mode to check for type errors without generating JavaScript files.

**Example output**:
```
> tsc --noEmit

src/components/Example.tsx:10:10 - error TS2322: Type 'string' is not assignable to type 'number'.

10   const value: number = "string";
            ~~~~~
```

## Composite Scripts

### `npm run validate`

**Purpose**: Runs multiple validation scripts sequentially.

**Usage**:
```bash
npm run validate
```

This script runs the following checks in sequence:
1. TypeScript type checking
2. ESLint code quality checks
3. Test suite

It's useful for ensuring all validation passes before committing or deploying.

**Example output**:
```
> npm run typecheck && npm run lint && npm test

// Output from each command will appear in sequence
```

## Utility Scripts

### `npm run clean`

**Purpose**: Cleans build artifacts and cache.

**Usage**:
```bash
npm run clean
```

This script removes the `/dist` directory, node_modules/.vite cache, and other temporary files.

**Example output**:
```
> rimraf dist node_modules/.vite

// No output if successful
```

## Recommended Workflow

For daily development:
```bash
# Start development server
npm run dev

# Before committing changes
npm run lint:fix
npm run format
npm run typecheck

# Before creating a pull request
npm run validate
```

For deployment:
```bash
# Build and verify locally
npm run build
npm run preview

# Deploy (using your preferred method)
```
