# Contributing

Thanks for helping improve GAME CODEX.

## Before you start

- Search existing issues before opening a new one.
- Keep changes focused on one problem or feature.
- For security vulnerabilities, follow `SECURITY.md` instead of opening a public issue with exploit details.

## Development

This project is intentionally lightweight and runs as a static web app.

1. Fork or clone the repository.
2. Open `index.html` in a modern browser, or serve the repository with a local static server.
3. Test HTML-file entries and registered walkthrough URLs when your change affects the viewer or data model.
4. Test at desktop and narrow/mobile widths for visible UI changes.
5. Verify backup export/import when changing stored data structures.
6. Run the repository checks before submitting a pull request.

```bash
node scripts/check.mjs
```

## Pull requests

A good pull request should include:

- What changed and why
- How it was tested
- Screenshots for visible UI changes
- Any security or compatibility considerations
- Migration notes when changing IndexedDB or backup formats

Avoid unrelated formatting or refactoring in the same pull request.

## Security expectations

Changes must preserve the core isolation model:

- Imported local HTML stays sandboxed without `allow-same-origin`.
- Imported local HTML must not be executed as a top-level same-origin `blob:` document.
- External URLs opened in a separate tab must use `noopener noreferrer`.

## Data and privacy expectations

The project is local-first. Changes should not add analytics, tracking, account requirements, or remote upload of the user's walkthrough library without an explicit design discussion first.
