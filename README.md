# Dungeons & Dragons Compendium

A React frontend for a D&D compendium. Browse heroes and monsters with animated navigation, character art, and detailed game statistics. The API backend lives in a separate repo, `bitsanis-api`.

## Projects

Two independent npm projects (no shared root `package.json`) — each has its own install/run/test
instructions in its README.

| Project                                    | Description           | Port                    |
| ------------------------------------------- | ---------------------- | ----------------------- |
| [`dnd-web`](dnd-web/README.md)              | React frontend         | `http://localhost:3000` |
| [`dnd-web-tests`](dnd-web-tests/README.md)  | Playwright e2e tests   |                          |

Both expect `bitsanis-api` running locally (see that repo) at `http://localhost:8080` by default.

## Pre-push hook (one-time)

```bash
git config core.hooksPath .githooks
```

This runs `dnd-web`'s unit tests before every `git push` and aborts the push on failure — the
same check CI's `build` job runs (see `.github/workflows/deploy.yml`). The hook lives in the
tracked `.githooks/` directory (not `.git/hooks/`, which isn't version-controlled), so it's
shareable — but git does **not** apply it automatically on clone. Each contributor opts in once
per local clone with the command above.

## License

This project is for personal/educational use. No license has been applied.

## Contributors

- Dimitrios B
