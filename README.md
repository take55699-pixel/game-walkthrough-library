# Game Walkthrough Library

**English** | [日本語](README.ja.md)

Organize and open your HTML game walkthroughs directly in your browser — no account, installation, or server upload required.

Game Walkthrough Library is a local-first static web app for storing, searching, and organizing self-contained HTML walkthroughs and cover images.

## Demo

https://take55699-pixel.github.io/game-walkthrough-library/

![Game Walkthrough Library screenshot](screenshot.png)

## Try it instantly

Open the demo and press **Try sample** when the library is empty. A built-in fictional walkthrough is added and opened automatically, so you can test the app without downloading a separate file.

## Features

- Add HTML walkthrough files
- Automatically detect game titles
- Add cover images
- Search, filter, and sort walkthroughs
- Mark favorites
- Store data locally in the browser
- Export and import backups
- Mobile-friendly interface
- Japanese / English UI switching
- Remember the selected language
- Built-in sample walkthrough

## How to use

1. Open the demo.
2. Press **Add HTML**.
3. Choose a walkthrough HTML file.
4. Set the title, platform, tags, notes, and cover image as needed.
5. Export a backup if the data matters to you.

## Local data and backups

Walkthrough HTML, cover images, notes, and related metadata are stored locally in the browser using IndexedDB. The app does not require an account and does not upload your walkthrough library to a server.

**Important:** clearing site data, resetting the browser profile, or losing the device can permanently remove locally stored data. Export backups regularly for anything you do not want to lose.

## Security

Do not import HTML from sources you do not trust. Imported walkthroughs may contain JavaScript.

The in-app viewer uses a sandboxed iframe to restrict imported HTML. If a walkthrough needs capabilities blocked by the sandbox, save the HTML file and inspect/open it separately only when you trust its source.

See [SECURITY.md](SECURITY.md) for the security model and vulnerability reporting guidance.

## Contributing

Issues and pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

## License

[MIT License](LICENSE)
