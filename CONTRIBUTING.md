# Contributing

Thanks for helping improve Game Walkthrough Library.

## Before you start

- Search existing issues before opening a new one.
- Keep changes focused on one problem or feature.
- For security vulnerabilities, follow `SECURITY.md` instead of opening a public issue with exploit details.

## Development

This project is intentionally lightweight and runs as a static web app.

1. Fork or clone the repository.
2. Open `index.html` in a modern browser, or serve the repository with a local static server.
3. Test changes in both Japanese and English UI modes.
4. Test at desktop and narrow/mobile widths.
5. Run the repository checks before submitting a pull request.

```bash
node scripts/check.mjs
```

## Pull requests

A good pull request should include:

- What changed and why
- How it was tested
- Screenshots for visible UI changes
- Any security or compatibility considerations

Avoid unrelated formatting or refactoring in the same pull request.

## Data and privacy expectations

The project is local-first. Changes should not add analytics, tracking, account requirements, or remote upload of user walkthrough data without an explicit design discussion first.
