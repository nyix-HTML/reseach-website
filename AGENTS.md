# Aetheris — Base44 Dev Environment

## What this is
A two-file static site: `index.html` + `gemini-engine.js` (ES module). The page calls the Gemini API directly from the browser using a key embedded in `gemini-engine.js`. No build step, no backend, no dependencies.

## Running it
```
docker compose -f docker-compose.base44.yml up -d
```
Serves on host port 3000 via Python's built-in HTTP server (`python:3.12-slim`). The repo root has `700` permissions, so nginx (non-root worker) gets 403 — Python's server runs as root and reads fine.

## Editing
Files are bind-mounted read-only. Edits are visible on page refresh; call `reload_preview` after changes that won't auto-reload.

## Secrets
The Gemini API key is hardcoded in `gemini-engine.js` (already present in the repo). No external secrets needed for boot.
