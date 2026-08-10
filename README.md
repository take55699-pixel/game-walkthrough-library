# GAME CODEX

**English** | [日本語](README.ja.md)

Organize HTML game walkthroughs and walkthrough URLs in one local-first browser library — no account, installation, or server upload required.

GAME CODEX is a static web app for storing, searching, opening, and maintaining game walkthrough resources directly in your browser.

## Demo

https://take55699-pixel.github.io/game-walkthrough-library/

## Features

- Import self-contained HTML walkthrough files
- Register `http` / `https` walkthrough URLs
- Display imported HTML inside a sandboxed viewer
- Preserve `localStorage`-style walkthrough progress in the app's IndexedDB storage
- Add cover images, platform information, tags, and notes
- Search by game name, URL, tags, and notes
- Filter and sort the library
- Mark favorites
- Grid and list views
- Japanese / English UI switching with the selected language saved in the browser
- Built-in **Try sample** button when the library is empty
- Export and import JSON backups
- Mobile-friendly interface
- Store the library locally in the browser

## How to use

1. Open the demo.
2. Press **EN** if you want the English interface. The selection is remembered on this browser.
3. If the library is empty, press **Try sample** to add and immediately open the included sample walkthrough.
4. Or press **+ Add** to add your own HTML walkthrough or walkthrough-site URL.
5. Add the title, platform, tags, notes, and cover image as needed.
6. Open entries from the library and export backups regularly for important data.

The built-in sample uses [`sample-walkthrough.html`](sample-walkthrough.html) and is tagged `SAMPLE` when added.

## Local data and backups

Walkthrough HTML, saved progress, cover images, notes, and related metadata are stored locally in the browser using IndexedDB. GAME CODEX does not require an account and does not upload your walkthrough library to an application server.

**Important:** clearing site data, resetting the browser profile, or losing the device can permanently remove locally stored data. Export backups regularly for anything you do not want to lose.

## Web walkthrough URLs

GAME CODEX can store walkthrough-site URLs and attempts to display them in the in-app viewer. Some sites block embedding with `X-Frame-Options` or Content Security Policy. In that case, use **Open site** to open the registered URL in a separate tab.

## Security

Do not import HTML from sources you do not trust. Imported walkthroughs may contain JavaScript.

- Imported local HTML is rendered in a sandboxed `iframe` without `allow-same-origin`.
- Imported local HTML is not opened as a top-level same-origin `blob:` document.
- Registered external URLs are subject to the destination site's own origin and security policy.
- If you need to run downloaded HTML outside the sandbox, inspect it first and only open files you trust.

See [SECURITY.md](SECURITY.md) for the security model and vulnerability reporting guidance.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

## License

[MIT License](LICENSE)