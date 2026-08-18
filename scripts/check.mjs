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
  'LICENSE'
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) fail(`Missing required file: ${file}`);
}

const html = fs.readFileSync('index.html', 'utf8');
const isGameCodex = html.includes('GAME CODEX');

if (!/<!doctype html>/i.test(html)) fail('index.html is missing a doctype');
if (!isGameCodex) fail('GAME CODEX app shell was not found');

const cssPaths = [...new Set(
  [...html.matchAll(/href=["'](assets\/game-codex-\d+\.css)["']/g)].map(match => match[1])
)];
for (const path of cssPaths) {
  if (!fs.existsSync(path)) fail(`Missing referenced stylesheet: ${path}`);
}

const modulePaths = [...new Set(
  [...html.matchAll(/["'](assets\/game-codex-\d+\.js\.txt)["']/g)].map(match => match[1])
)];
if (!modulePaths.length) fail('GAME CODEX modular JavaScript parts were not found in index.html');

let modularSource = '';
for (const path of modulePaths) {
  if (!fs.existsSync(path)) {
    fail(`Missing referenced JavaScript part: ${path}`);
    continue;
  }
  modularSource += fs.readFileSync(path, 'utf8');
}

const appSource = `${html}\n${modularSource}`;
if (!appSource.includes('GameWalkthroughLibraryDB')) fail('IndexedDB application code was not found');

const iframe = html.match(/<iframe class="viewer-frame"[^>]*>/)?.[0] ?? '';
if (!iframe) fail('Walkthrough viewer iframe was not found');
if (!iframe.includes('sandbox=')) fail('Walkthrough viewer iframe is not sandboxed');
if (iframe.includes('allow-same-origin')) fail('Local viewer sandbox must not statically include allow-same-origin');

const requiredTokens = [
  '攻略サイトURL',
  'normalizeWebUrl',
  'withProgressStorageBridge',
  'progressStorage',
  'checkboxProgress',
  'GAME_CODEX_backup_'
];
for (const token of requiredTokens) {
  if (!appSource.includes(token)) fail(`GAME CODEX feature token missing: ${token}`);
}

const inlineScripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/gi)].map(match => match[1]);
if (!inlineScripts.length) fail('No inline bootstrap JavaScript was found');
for (const [index, source] of inlineScripts.entries()) {
  try {
    new Function(source);
  } catch (error) {
    fail(`Inline script ${index + 1} has a syntax error: ${error.message}`);
  }
}

if (modularSource) {
  try {
    new Function(modularSource);
  } catch (error) {
    fail(`Combined modular JavaScript has a syntax error: ${error.message}`);
  }
}

// Imported local HTML must stay inside the sandboxed viewer. Only registered web URLs may open externally.
const openCurrent = appSource.match(/function openCurrentInNewTab\(\)\s*\{([\s\S]*?)\n\s*\}/)?.[1] ?? '';
if (!openCurrent) fail('External URL open handler was not found');
if (/new Blob\(\[guide\.html\]/.test(openCurrent)) {
  fail('Local HTML is opened as a top-level Blob URL');
}
if (/URL\.createObjectURL\(/.test(openCurrent)) {
  fail('External-open handler creates an object URL');
}
if (!/!isUrlGuide\(guide\)/.test(openCurrent)) {
  fail('External-open handler is not restricted to registered URL guides');
}
if (appSource.includes('攻略HTMLを制限なしで開く') || appSource.includes('Open unrestricted') || appSource.includes('完全表示で')) {
  fail('Unsafe unrestricted local HTML execution UI was found');
}
const externalButton = html.match(/<button class="btn small" id="openNewTabButton"[^>]*>/)?.[0] ?? '';
if (!externalButton || !externalButton.includes('display:none')) {
  fail('External-open button must be hidden by default and enabled only for URL guides');
}

// Legacy helper files are optional in the current modular build, but syntax-check them when present.
for (const optional of ['i18n.js', 'sample-button.js']) {
  if (!fs.existsSync(optional)) continue;
  try {
    new Function(fs.readFileSync(optional, 'utf8'));
  } catch (error) {
    fail(`${optional} has a syntax error: ${error.message}`);
  }
}

if (!process.exitCode) {
  console.log(`All repository checks passed (GAME CODEX modular build, ${modulePaths.length} JS parts, strict local HTML sandbox policy).`);
}
