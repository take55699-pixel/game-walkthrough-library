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

## GAME CODEX security model

GAME CODEX stores imported walkthrough HTML and related data in the user's browser.

### Imported local HTML

- Imported local HTML is rendered inside a sandboxed `iframe`.
- The local HTML viewer intentionally omits `allow-same-origin`.
- Imported local HTML is not promoted to a top-level same-origin `blob:` document.
- GAME CODEX provides a bridge for selected `localStorage`-style progress data so it can be persisted in the app's IndexedDB without giving imported HTML direct access to the application's origin storage.
- If a walkthrough requires capabilities blocked by the sandbox, download and inspect the file separately and only open it outside GAME CODEX when you trust its source.

### Registered external URLs

GAME CODEX can also store `http` / `https` walkthrough URLs.

- URL input is restricted to `http` and `https` and rejects URLs containing embedded usernames/passwords.
- External sites may be embedded only when the destination site's browser security headers permit it.
- An external URL may use its own origin inside the sandbox; browser same-origin rules still separate it from the GAME CODEX application origin.
- When an external walkthrough site is opened in a separate tab, the app uses `noopener noreferrer`.

Never import or open content from an untrusted source without reviewing it first.

## Local data

Walkthrough HTML, progress data, registered URLs, cover images, notes, and preferences are stored locally in the browser. Clearing site data or browser storage can permanently remove this data. Export backups regularly if the data matters to you.
