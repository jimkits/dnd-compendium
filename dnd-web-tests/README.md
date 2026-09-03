# D&D UI Tests

End-to-end tests for the D&D UI, covering authentication, hero navigation, and monster navigation.

## Tech Stack

- Playwright 1.57 with TypeScript
- Page Object Model pattern
- Chromium only

## Installation

### Prerequisites

- Node.js v18 or higher
- D&D UI running at `http://localhost:3000`
- D&D API running at `http://localhost:5071`

Install dependencies and browsers:

```bash
npm install
npx playwright install chromium
```

### Configure Credentials

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file to some default values:

```env
BASE_URL=http://localhost:3000
DND_USERNAME=admin
DND_PASSWORD=admin
```

> Never commit the `.env` file to version control — it is already in `.gitignore`.

## Usage

### Run All Tests

```bash
npx playwright test
```

### Other Run Modes

```bash
npx playwright test --headed       # headed mode
npx playwright test --debug        # debug mode
npx playwright test --ui           # UI mode
npx playwright test --project=chromium  # single project
```

### View Test Report

```bash
npx playwright show-report
```

### Run by Tag

```bash
npx playwright test --grep=smoke       # critical path only
npx playwright test --grep=regression  # full regression suite
```

## Examples

### Project Structure

```
e2e/
page-objects/
```

### Playwright Projects

| Project    | Purpose                                                             |
| ---------- | ------------------------------------------------------------------- |
| `setup`    | Runs `auth.setup.ts` first — logs in and verifies logout is visible |
| `chromium` | Runs all tests after `setup` completes                              |

The `chromium` project declares `dependencies: ['setup']`, so Playwright always validates the login flow before running the main suite.

### Authentication Strategy

The app stores its JWT token in `localStorage`. Playwright's `storageState` captures
`localStorage`, so `auth.setup.ts` logs in once and saves the browser state to
`.auth/user.json`. The `chromium` project loads this saved state before each test,
skipping the login UI entirely.

### Troubleshooting

| Error                               | Fix                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------- |
| "Environment variables must be set" | Create `.env` from `.env.example` and set `DND_USERNAME`/`DND_PASSWORD` |
| "Browser not found"                 | Run `npx playwright install chromium`                                   |
| Hero/monster tests fail after setup | Ensure both the UI and API are running before starting tests            |

## License

This project is for personal/educational use. No license has been applied.

## Contributors

- Dimitrios B
