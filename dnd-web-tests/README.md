# D&D UI Tests

End-to-end tests for the D&D UI, covering hero navigation and monster navigation.

## Tech Stack

- Playwright 1.57 with TypeScript
- Page Object Model pattern
- Firefox only

## Installation

### Prerequisites

- Node.js v20 or higher (CI runs on Node 24)
- D&D UI running at `http://localhost:3000`
- `bitsanis-api` running locally via Docker at `http://localhost:8080`

Install dependencies and browsers:

```bash
npm install
npx playwright install firefox
```

### Configure the base URL

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit the `.env` file to some default values:

```env
BASE_URL=http://localhost:3000
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
npx playwright test --project=firefox  # single project
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

### Troubleshooting

| Error                | Fix                                                           |
| --------------------- | -------------------------------------------------------------- |
| "Browser not found"   | Run `npx playwright install firefox`                          |
| Hero/monster tests fail | Ensure both the UI and API are running before starting tests |

## License

This project is for personal/educational use. No license has been applied.

## Contributors

- Dimitrios B
