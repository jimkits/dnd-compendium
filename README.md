# Dungeons & Dragons Compendium

A React frontend for a D&D compendium. Browse heroes and monsters with animated navigation, character art, and detailed game statistics. The API backend lives in a separate repo, `bitsanis-api`.

## Installation

### Prerequisites

- Node.js v20 or higher (CI builds/deploys on Node 24)
- `bitsanis-api` running locally (see that repo) — this UI expects it at `http://localhost:8080` by default

### 1. Install UI dependencies

```bash
cd dnd-web
npm install
```

### 2. Install test dependencies

```bash
cd dnd-web-tests
npm install
npx playwright install firefox
```

### 3. Enable the pre-push hook (one-time)

```bash
git config core.hooksPath .githooks
```

This runs `dnd-web`'s unit tests before every `git push` and aborts the push on failure — the
same check CI's `build` job runs (see `.github/workflows/deploy.yml`). The hook lives in the
tracked `.githooks/` directory (not `.git/hooks/`, which isn't version-controlled), so it's
shareable — but git does **not** apply it automatically on clone. Each contributor opts in once
per local clone with the command above.

## Usage

### Start the UI

```bash
cd dnd-web
npm start
```

UI runs at `http://localhost:3000`.

## Examples

### Projects

| Project          | Description          | Port                    |
| ---------------- | --------------------- | ----------------------- |
| `dnd-web`        | React frontend        | `http://localhost:3000` |
| `dnd-web-tests`  | Playwright e2e tests  |                          |

### Run tests

```bash
cd dnd-web-tests
npx playwright test
npx playwright test --grep=smoke       # critical path only
npx playwright test --grep=regression  # full regression suite
```

## License

This project is for personal/educational use. No license has been applied.

## Contributors

- Dimitrios B
