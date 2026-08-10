import fs from 'node:fs';

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

const requiredFiles = [
  'index.html',
  'i18n.js',
  'sample-button.js',
  'README.md',
  'README.ja.md',
  'SECURITY.md',
  'CONTRIBUTING.md',
  'LICENSE',
  'sample-walkthrough.html'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) fail(`Missing required file: ${file}`);
}

const html = fs.readFileSync('index.html', 'utf8');
const i18n = fs.existsSync('i18n.js') ? fs.readFileSync('i18n.js', 'utf8') : '';
const sampleButton = fs.existsSync('sample-button.js') ? fs.readFileSync('sample-button.js', 'utf8') : '';
const isGameCodex = html.includes('GAME CODEX');

if (!/<!doctype html>/i.test(html)) fail('index.html is missing a doctype');
if (!html.includes('GameWalkthroughLibraryDB')) fail('IndexedDB application code was not found');

const iframe = html.match(/<iframe class="viewer-frame"[^>]*>/)?.[0] ?? '';
if (!iframe) fail('Walkthrough viewer iframe was not found');
if (!iframe.includes('sandbox=')) fail('Walkthrough viewer iframe is not sandboxed');
if (iframe.includes('allow-same-origin')) fail('Local viewer sandbox must not statically include allow-same-origin');

// Imported local HTML must never be promoted to a top-level same-origin blob document.
const openCurrent = html.match(/function openCurrentInNewTab\(\)\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? '';
if (/new Blob\(\[guide\.html\]/.test(openCurrent)) {
  fail('Local HTML is opened as a top-level Blob URL');
}
if (/URL\.createObjectURL\(blob\)/.test(openCurrent)) {
  fail('openCurrentInNewTab creates a Blob URL for imported local HTML');
}
if (html.includes('攻略HTMLを制限なしで開く') || html.includes('Open unrestricted')) {
  fail('Unsafe unrestricted local HTML execution UI was found');
}

if (isGameCodex) {
  const requiredV18Tokens = [
    '攻略サイトURL',
    'normalizeWebUrl',
    'withProgressStorageBridge',
    'progressStorage',
    'GAME_CODEX_backup_'
  ];
  for (const token of requiredV18Tokens) {
    if (!html.includes(token)) fail(`GAME CODEX v1.8 feature token missing: ${token}`);
  }

  if (!html.includes('<script src="i18n.js"></script>')) {
    fail('GAME CODEX language module is not wired into index.html');
  }
  if (!i18n.includes('game-codex-language') || !i18n.includes('languageButton')) {
    fail('Japanese / English language switching is incomplete');
  }
  try {
    new Function(i18n);
  } catch (error) {
    fail(`i18n.js has a syntax error: ${error.message}`);
  }

  if (!html.includes('<script src="sample-button.js"></script>')) {
    fail('Built-in sample helper is not wired into index.html');
  }
  if (!sampleButton.includes('sample-walkthrough.html') || !sampleButton.includes('Try sample') || !sampleButton.includes('サンプルを試す')) {
    fail('Built-in sample walkthrough support is incomplete');
  }
  try {
    new Function(sampleButton);
  } catch (error) {
    fail(`sample-button.js has a syntax error: ${error.message}`);
  }
} else {
  // Legacy v0.3.x checks remain valid during the migration commit sequence.
  if (!html.includes('gwl-language')) fail('Language preference persistence was not found');
  if (!html.includes('Try sample') || !html.includes('サンプルを試す')) {
    fail('Built-in sample localization is incomplete');
  }
}

const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
if (!scripts.length) fail('No inline JavaScript was found');
for (const [index, source] of scripts.entries()) {
  try {
    new Function(source);
  } catch (error) {
    fail(`Inline script ${index + 1} has a syntax error: ${error.message}`);
  }
}

if (!process.exitCode) {
  console.log(`All repository checks passed (${isGameCodex ? 'GAME CODEX v1.8' : 'legacy build'}).`);
}
