import fs from 'node:fs';

const path = 'index.html';
let html = fs.readFileSync(path, 'utf8');
const before = html;

html = html.replace(
  '<!-- Game Walkthrough Library: built-in sample edition v0.3.0 -->',
  '<!-- Game Walkthrough Library: security-hardened edition v0.3.1 -->'
);

html = html.replace(/^\s*<button class="btn small" id="openNewTabButton"[^\n]*\n/m, '');

html = html.replace(
  '<div class="viewer-note">アプリ内表示は安全性を優先した制限表示です。攻略HTML内の進捗保存などが動かない場合は「制限なしで開く」を使用してください。</div>',
  '<div class="viewer-note">アプリ内表示は安全性を優先した制限表示です。制限により動作しないHTMLは「HTML保存」で保存し、信頼できる内容か確認したうえでアプリとは別に開いてください。</div>'
);

html = html.replace(/^\s*openNewTabButton: \$\("#openNewTabButton"\),\n/m, '');
html = html.replace(/^\s*openUnrestricted: .*\n/gm, '');
html = html.replace(/^\s*openUnrestrictedTitle: .*\n/gm, '');
html = html.replace(/^\s*unrestrictedConfirm: .*\n/gm, '');

html = html.replace(
  '      viewerNote: "アプリ内表示は安全性を優先した制限表示です。攻略HTML内の進捗保存などが動かない場合は「制限なしで開く」を使用してください。",',
  '      viewerNote: "アプリ内表示は安全性を優先した制限表示です。制限により動作しないHTMLは「HTML保存」で保存し、信頼できる内容か確認したうえでアプリとは別に開いてください。",'
);
html = html.replace(
  '      viewerNote: "The in-app viewer uses restrictions for safety. If progress saving or other features do not work, use “Open unrestricted.”",',
  '      viewerNote: "The in-app viewer is sandboxed for safety. If a walkthrough needs blocked capabilities, save the HTML and inspect/open it separately only if you trust its source.",'
);

html = html.replace(
  /\n\s*els\.openNewTabButton\.querySelector\("\.label"\)\.textContent[^\n]*\n\s*const labelTail[^\n]*\n\s*if \(labelTail\)[^\n]*\n\s*els\.openNewTabButton\.title[^\n]*\n/,
  '\n'
);

html = html.replace(
  /\n  function openCurrentInNewTab\(\) \{[\s\S]*?\n  \}\n\n  async function handleCardAction/,
  '\n  async function handleCardAction'
);

html = html.replace(/^\s*els\.openNewTabButton\.addEventListener\("click", openCurrentInNewTab\);\n/m, '');

const forbidden = [
  'openNewTabButton',
  'openCurrentInNewTab',
  'Open unrestricted',
  '制限なしで開く',
  'unrestrictedConfirm'
];
for (const token of forbidden) {
  if (html.includes(token)) {
    throw new Error(`Security hardening incomplete: found ${token}`);
  }
}

const iframe = html.match(/<iframe class="viewer-frame"[^>]*>/)?.[0] ?? '';
if (!iframe.includes('sandbox=')) throw new Error('Viewer iframe is missing sandbox');
if (iframe.includes('allow-same-origin')) throw new Error('Viewer iframe must not use allow-same-origin');
if (html === before) throw new Error('No changes were applied');

fs.writeFileSync(path, html);
console.log('index.html security hardening applied successfully.');
