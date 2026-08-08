# Security Policy

## Supported version

Security fixes are applied to the latest version on the `main` branch and the latest published release.

## Reporting a vulnerability

Please do not publish details of a security vulnerability in a public issue before a fix is available.

If you discover a vulnerability, contact the maintainer through GitHub using the repository owner's profile/contact options. Include:

- A clear description of the issue
- Steps to reproduce it
- The affected browser/device
- The security impact
- A minimal proof of concept when possible

## HTML safety model

Game Walkthrough Library stores imported walkthrough HTML in the user's browser.

- Imported HTML is shown inside a sandboxed `iframe`.
- The in-app viewer intentionally restricts capabilities to reduce risk from untrusted HTML.
- The app does not execute imported walkthrough HTML directly in the application's top-level page context.
- If a walkthrough requires functionality blocked by the sandbox, download the HTML and inspect/open it separately only if you trust its source.

Never import or open HTML from an untrusted source without reviewing it first.

## Local data

Walkthroughs, cover images, notes, and preferences are stored locally in the browser. Clearing site data or browser storage can permanently remove this data. Export backups regularly if the data matters to you.
