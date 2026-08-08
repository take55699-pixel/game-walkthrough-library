import fs from 'node:fs';

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
}

const requiredFiles = [
  'index.html',
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

if (!/<!doctype html>/i.test(html)) fail('index.html is missing a doctype');
if (!html.includes('GameWalkthroughLibraryDB')) fail('IndexedDB application code was not found');
if (!html.includes('gwl-language')) fail('Language preference persistence was not found');
if (!html.includes('Try sample') || !html.includes('サンプルを試す')) fail('Built-in sample localization is incomplete');

const iframe = html.match(/<iframe class="viewer-frame"[^>]*>/)?.[0] ?? '';
if (!iframe) fail('Walkthrough viewer iframe was not found');
if (!iframe.includes('sandbox=')) fail('Walkthrough viewer iframe is not sandboxed');
if (iframe.includes('allow-same-origin')) fail('Viewer sandbox must not include allow-same-origin');

const forbidden = [
  'openNewTabButton',
  'openCurrentInNewTab',
  'Open unrestricted',
  '制限なしで開く',
  'unrestrictedConfirm'
];
for (const token of forbidden) {
  if (html.includes(token)) fail(`Unsafe unrestricted execution token found: ${token}`);
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

if (!process.exitCode) console.log('All repository checks passed.');
