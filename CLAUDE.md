# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A React frontend for a D&D compendium (browse heroes and monsters). There is no backend code in
this repo — the API lives in the separate `bitsanis-api` repo (ASP.NET Core/Postgres) and is
called anonymously (no auth/login) from the browser.

Two independent npm projects, no shared root `package.json`:

- `dnd-web/` — the React app (Create React App / `react-scripts`, TypeScript)
- `dnd-web-tests/` — Playwright end-to-end tests against a running `dnd-web` + `bitsanis-api`

## Commands

Run from within each project's own directory.

### dnd-web

```bash
cd dnd-web
npm install
npm start                              # dev server at http://localhost:3000
npm run build                          # production build
npm test                               # react-scripts test (Jest, watch mode)
npm test -- --watchAll=false           # non-interactive, single run
```

### dnd-web-tests

```bash
cd dnd-web-tests
npm install
npx playwright install firefox         # only Firefox is configured, not Chromium

npx playwright test                            # all tests
npx playwright test --project=firefox           # explicit (only) project
npx playwright test --grep=smoke                # critical path only
npx playwright test --grep=regression            # full regression suite
npx playwright show-report
```

Needs a `.env` (copy `.env.example`) with `BASE_URL=http://localhost:3000`, plus `dnd-web`
running at that URL and `bitsanis-api` running at `http://localhost:8080` (Docker) — both hit
directly by the tests, there is no mocking.

### Pre-push hook

`git config core.hooksPath .githooks` (one-time per clone) runs `dnd-web`'s tests before every
push — the same check CI's `build` job in `.github/workflows/deploy.yml` runs.

## Architecture

### dnd-web

- Routing is flat and unguarded in `src/App.tsx`: `/`, `/hero`, `/monster` — no auth, no
  protected routes (login/JWT handling was removed; the compendium endpoints are public).
- Component convention: `src/components/X/` holds `index.tsx` + `style.css`, imported directly
  (`import './style.css'`) — no CSS modules, no Tailwind, no theme-token system. Colors are
  hardcoded hex values matching the existing dark/amber palette (`#C08423`, `#f0e6d0`,
  `#1a1209`, etc.); match that palette rather than inventing new colors.
- Data fetching is a plain `fetch()` per page, in a small sibling module named `get-*.tsx`
  (e.g. `Hero/get-all-heroes.tsx`, `Monster/get-all-monsters.tsx`) — no React Query or similar.
  Each defines its own response-shape interface matching `bitsanis-api`'s actual JSON (camelCase
  fields, e.g. `coreTraits.primaryAbility`, `startingEquipment.optionA`) — the API's shape does
  not match the old, retired `dnd-api`'s snake_case contract, so don't assume it does.
- `src/config.ts` exports `REACT_APP_API_BASE_URL`, read from `process.env.REACT_APP_API_BASE_URL`
  (falls back to `http://localhost:8080`). The field name doesn't match the env var prefix by
  design: this is Create React App, which only exposes `REACT_APP_`-prefixed vars to the
  bundle — a `VITE_`-prefixed env var would silently be `undefined` at runtime.
- Hero portrait images are fetched from the API directly via `<img src>` pointed at
  `{REACT_APP_API_BASE_URL}/api/compendium/heroes/{name}/portrait` — not bundled as local assets and
  not embedded as base64 in the JSON response.
- On a failed fetch, pages show only a plain "Unable to reach the server" message — no fake
  placeholder hero/monster card. Don't reintroduce fabricated fallback data on error.

### dnd-web-tests

- Page Object Model: `page-objects/*.ts` wrap locators/actions, `e2e/*.spec.ts` hold the actual
  assertions. `e2e/fixtures.ts` wires typed page objects into Playwright's `test`.
- Firefox only (`playwright.config.ts`), single project — there is no auth setup project
  anymore (removed along with the app's login flow); tests run directly against the public
  compendium pages.

### CI/CD (`.github/workflows/deploy.yml`)

Single workflow, one job: `build` (npm ci, test, build `dnd-web`), on every push/PR to `main`.
There is no deploy step and no Playwright job in CI — Vercel deployment and the
Vercel-URL-backed `ui-tests` job were both removed. Playwright (`dnd-web-tests/`) is run
manually/locally only, not as part of this pipeline.

## Code Review

Reviews are always done by all 4 agents in parallel: `correcter` (correctness), `qualiter`
(quality/convention), `tester` (coverage/input safety), and `coder` acting as a fourth,
generalist reviewer (see `.claude/agents/`). Never review with a subset.

Launch these 4 agents directly yourself (Agent tool, one call per agent, in parallel) rather than
delegating to the `code-review` skill/command — launching them directly keeps the reviewer set
verifiable instead of hidden inside an opaque subagent.
