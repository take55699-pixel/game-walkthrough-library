(() => {
  "use strict";

  const STORAGE_KEY = "game-codex-language";
  const LEGACY_STORAGE_KEY = "gwl-language";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const copy = {
    ja: {
      brandSubtitle: "攻略HTMLをスマートに管理",
      searchPlaceholder: "ゲーム名・URL・タグ・メモを検索",
      clearSearch: "検索を消去",
      add: "＋ 追加",
      menu: "メニュー",
      exportBackup: "バックアップを書き出す",
      importBackup: "バックアップを読み込む",
      clearAll: "全データを削除",
      heroTitle: "攻略本棚を、ひとつに。",
      heroText: "攻略チャートHTMLと攻略サイトURLを、ジャケット付きでひとつに整理できます。",
      totalTitles: "登録タイトル",
      favorites: "お気に入り",
      dropTitle: "HTMLファイルをドロップ",
      dropText: "複数ファイル対応・画像やCSSを埋め込んだ単一HTML推奨",
      chooseFiles: "ファイルを選択",
      filter: "絞り込み",
      filterAll: "すべて",
      filterFavorite: "お気に入り",
      filterHtml: "HTMLのみ",
      filterWeb: "攻略サイトURL",
      filterWithCover: "ジャケットあり",
      filterWithoutCover: "ジャケットなし",
      sort: "並べ替え",
      sortUpdated: "更新が新しい順",
      sortCreated: "追加が新しい順",
      sortTitleAsc: "タイトル順",
      sortTitleDesc: "タイトル逆順",
      view: "表示切替",
      grid: "グリッド表示",
      list: "リスト表示",
      addWalkthrough: "攻略を追加",
      htmlFile: "HTMLファイル",
      htmlChoiceText: "作成済みの攻略HTMLを読み込み、GAME CODEX内に保存します。",
      guideUrl: "攻略サイトURL",
      urlChoiceText: "Web上の攻略ページを登録し、埋め込みを許可しているサイトはアプリ内で表示します。",
      addGuideUrl: "攻略サイトURLを追加",
      walkthroughUrl: "攻略ページのURL",
      gameTitle: "ゲームタイトル",
      optional: "（省略可）",
      urlTitlePlaceholder: "未入力ならサイトのドメイン名を使用",
      urlHint: "http / https のURLのみ登録できます。ユーザー名・パスワード入りURLは登録しません。サイト側が埋め込みを禁止している場合は、右上の「サイトを開く」から外部表示してください。",
      cancel: "キャンセル",
      addUrl: "URLを追加",
      editWalkthrough: "攻略チャートを編集",
      noCover: "ジャケット未設定",
      coverPreview: "ジャケット画像プレビュー",
      chooseImage: "画像を選択",
      removeImage: "画像を外す",
      platform: "プラットフォーム",
      platformPlaceholder: "例：Steam / PS5 / Switch",
      tags: "タグ",
      tagsPlaceholder: "例：推理, RPG, 完全攻略（カンマ区切り）",
      notes: "メモ",
      notesPlaceholder: "版違い、進行状況、注意点など",
      htmlEditHint: "HTML本文はそのまま保存されます。タイトルはHTML内の <title> や最初の <h1> から自動取得します。",
      save: "保存",
      viewerDefault: "攻略チャート",
      saveHtml: "HTML保存",
      viewerInitial: "攻略を表示しています。",
      idle: "待機中",
      viewerFrame: "攻略チャート表示",
      storageTitle: "IndexedDBに保存します。ブラウザーデータの削除やストレージ消去で失われる可能性があるため、重要なデータはバックアップ推奨です。",
      editWeb: "攻略サイトを編集",
      editHtml: "攻略HTMLを編集",
      editWebHint: "攻略サイトURLは http / https のみ対応しています。埋め込み可否はサイト側の X-Frame-Options / CSP 等に依存します。",
      guideSite: "攻略サイト",
      platformUnset: "機種未設定",
      open: "開く",
      edit: "編集",
      delete: "削除",
      deleteAria: "この攻略チャートを削除",
      openSite: "サイトを開く",
      openSiteTitle: "攻略サイトを新しいタブで開く",
      siteManaged: "サイト側で管理",
      progressOn: "進捗保存: 有効",
      saving: "保存中…",
      saved: "保存済み",
      saveFailed: "保存失敗"
    },
    en: {
      brandSubtitle: "Smartly organize your walkthrough HTML",
      searchPlaceholder: "Search games, URLs, tags, and notes",
      clearSearch: "Clear search",
      add: "+ Add",
      menu: "Menu",
      exportBackup: "Export backup",
      importBackup: "Import backup",
      clearAll: "Delete all data",
      heroTitle: "One shelf for every walkthrough.",
      heroText: "Organize walkthrough HTML files and guide URLs together with cover art.",
      totalTitles: "Titles",
      favorites: "Favorites",
      dropTitle: "Drop HTML files here",
      dropText: "Multiple files supported. Self-contained HTML with embedded images and CSS is recommended.",
      chooseFiles: "Choose files",
      filter: "Filter",
      filterAll: "All",
      filterFavorite: "Favorites",
      filterHtml: "HTML only",
      filterWeb: "Guide URLs",
      filterWithCover: "With cover",
      filterWithoutCover: "Without cover",
      sort: "Sort",
      sortUpdated: "Recently updated",
      sortCreated: "Recently added",
      sortTitleAsc: "Title A–Z",
      sortTitleDesc: "Title Z–A",
      view: "Change view",
      grid: "Grid view",
      list: "List view",
      addWalkthrough: "Add walkthrough",
      htmlFile: "HTML file",
      htmlChoiceText: "Import an existing walkthrough HTML file and store it in GAME CODEX.",
      guideUrl: "Guide URL",
      urlChoiceText: "Save a web walkthrough URL. Sites that allow embedding can be viewed inside the app.",
      addGuideUrl: "Add guide URL",
      walkthroughUrl: "Walkthrough URL",
      gameTitle: "Game title",
      optional: "(optional)",
      urlTitlePlaceholder: "Uses the site domain if left blank",
      urlHint: "Only http / https URLs can be saved. URLs containing usernames or passwords are rejected. If a site blocks embedding, use “Open site” to view it in a new tab.",
      cancel: "Cancel",
      addUrl: "Add URL",
      editWalkthrough: "Edit walkthrough",
      noCover: "No cover",
      coverPreview: "Cover image preview",
      chooseImage: "Choose image",
      removeImage: "Remove image",
      platform: "Platform",
      platformPlaceholder: "e.g. Steam / PS5 / Switch",
      tags: "Tags",
      tagsPlaceholder: "e.g. Mystery, RPG, 100% (comma-separated)",
      notes: "Notes",
      notesPlaceholder: "Version differences, progress, notes, etc.",
      htmlEditHint: "The HTML body is stored as-is. The title is detected from <title> or the first <h1> in the file.",
      save: "Save",
      viewerDefault: "Walkthrough",
      saveHtml: "Save HTML",
      viewerInitial: "Displaying walkthrough.",
      idle: "Idle",
      viewerFrame: "Walkthrough viewer",
      storageTitle: "Stored in IndexedDB. Browser data or site storage can be cleared, so export backups for important data.",
      editWeb: "Edit guide site",
      editHtml: "Edit walkthrough HTML",
      editWebHint: "Guide URLs support http / https only. Whether a page can be embedded depends on the site's X-Frame-Options / CSP policy.",
      guideSite: "Guide site",
      platformUnset: "Platform not set",
      open: "Open",
      edit: "Edit",
      delete: "Delete",
      deleteAria: "Delete this walkthrough",
      openSite: "Open site",
      openSiteTitle: "Open guide site in a new tab",
      siteManaged: "Managed by site",
      progressOn: "Progress saving: on",
      saving: "Saving…",
      saved: "Saved",
      saveFailed: "Save failed"
    }
  };

  const exactMessages = new Map([
    ["攻略サイトURLを追加しました。", "Guide URL added."],
    ["URLを保存できませんでした。", "Could not save the URL."],
    ["条件に一致する攻略チャートがありません", "No walkthroughs match your filters"],
    ["攻略チャートはまだありません", "No walkthroughs yet"],
    ["検索語や絞り込みを変更してください。", "Change the search or filters."],
    ["HTMLファイルまたは攻略サイトURLを追加すると、ここに並びます。", "Add an HTML file or guide URL and it will appear here."],
    ["攻略サイト", "Guide site"],
    ["ジャケット未設定", "No cover"],
    ["機種未設定", "Platform not set"],
    ["開く", "Open"],
    ["編集", "Edit"],
    ["削除", "Delete"],
    ["この攻略チャートを削除", "Delete this walkthrough"],
    ["HTMLファイルを選択してください。", "Please select an HTML file."],
    ["攻略サイトを編集", "Edit guide site"],
    ["攻略HTMLを編集", "Edit walkthrough HTML"],
    ["攻略チャートを編集", "Edit walkthrough"],
    ["攻略サイトURLは http / https のみ対応しています。埋め込み可否はサイト側の X-Frame-Options / CSP 等に依存します。", "Guide URLs support http / https only. Whether a page can be embedded depends on the site's X-Frame-Options / CSP policy."],
    ["HTML本文はそのまま保存されます。タイトルはHTML内の <title> や最初の <h1> から自動取得します。", "The HTML body is stored as-is. The title is detected from <title> or the first <h1> in the file."],
    ["ゲームタイトルを入力してください。", "Enter a game title."],
    ["変更を保存しました。", "Changes saved."],
    ["保存できませんでした。保存容量をご確認ください。", "Could not save. Check available browser storage."],
    ["お気に入りを保存できませんでした。", "Could not save favorite status."],
    ["保存失敗", "Save failed"],
    ["進捗データが大きすぎるため保存できませんでした。", "Progress data is too large to save."],
    ["この攻略HTMLの進捗保存容量が上限に達しました。", "This walkthrough has reached the progress storage limit."],
    ["保存中…", "Saving…"],
    ["保存済み", "Saved"],
    ["進捗を保存できませんでした。保存容量をご確認ください。", "Could not save progress. Check available browser storage."],
    ["攻略サイトを表示しています。サイト側の X-Frame-Options / CSP で埋め込みが禁止されている場合、アプリ内では表示できません。右上の「サイトを開く」を使用してください。", "Displaying the guide site. If the site blocks embedding with X-Frame-Options or CSP, it cannot be shown inside the app; use “Open site” instead."],
    ["サイト側で管理", "Managed by site"],
    ["このビューでは localStorage を使う攻略HTMLの進捗を、GAME CODEXのIndexedDBへ自動保存します。安全のため、読み込んだHTMLはサンドボックス内で表示します。", "For walkthrough HTML that uses localStorage, progress is automatically saved to GAME CODEX IndexedDB. Imported HTML stays inside a sandbox for safety."],
    ["進捗保存: 有効", "Progress saving: on"],
    ["削除できませんでした。もう一度お試しください。", "Could not delete the walkthrough. Please try again."],
    ["バックアップを書き出しました。", "Backup exported."],
    ["バックアップを書き出せませんでした。", "Could not export the backup."],
    ["バックアップ形式を読み込めませんでした。", "Could not read the backup format."],
    ["画像ファイルを選択してください。", "Please select an image file."],
    ["画像は12MB以下にしてください。", "Please use an image no larger than 12 MB."],
    ["削除するデータがありません。", "There is no data to delete."],
    ["最終確認：バックアップ済みですか？", "Final check: have you made a backup?"],
    ["全データを削除しました。", "All data deleted."],
    ["全データを削除できませんでした。", "Could not delete all data."],
    ["保存機能を開始できませんでした", "Storage could not be initialized"],
    ["通常モードの最新版Chrome / Edge / Firefox / Safari等で開き、ブラウザーのサイトデータ保存が有効か確認してください。", "Open the app in a current Chrome, Edge, Firefox, or Safari normal window and make sure site data storage is enabled."],
    ["ブラウザのデータベース機能を利用できません。", "The browser database is unavailable."],
    ["待機中", "Idle"],
    ["攻略を表示しています。", "Displaying walkthrough."],
    ["攻略サイトを新しいタブで開く", "Open guide site in a new tab"],
    ["攻略チャート表示", "Walkthrough viewer"],
    ["Web攻略", "Web guide"],
    ["無題の攻略チャート", "Untitled walkthrough"]
  ]);
  const reverseMessages = new Map([...exactMessages].map(([ja, en]) => [en, ja]));

  function readStoredLanguage() {
    try {
      const value = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      return value === "en" ? "en" : "ja";
    } catch {
      return "ja";
    }
  }

  let language = readStoredLanguage();
  let applying = false;

  function storeLanguage(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
      localStorage.setItem(LEGACY_STORAGE_KEY, value);
    } catch {}
  }

  function setText(selector, key, root = document) {
    const node = $(selector, root);
    if (node) node.textContent = copy[language][key];
  }

  function setAttr(selector, attr, key, root = document) {
    const node = $(selector, root);
    if (node) node.setAttribute(attr, copy[language][key]);
  }

  function setOption(selectSelector, value, key) {
    const option = $(`${selectSelector} option[value="${value}"]`);
    if (option) option.textContent = copy[language][key];
  }

  function translatePattern(text, targetLanguage = language) {
    if (targetLanguage === "ja") {
      if (reverseMessages.has(text)) return reverseMessages.get(text);
      let m;
      if ((m = text.match(/^Added (\d+) walkthroughs?\.$/))) return `${m[1]}件の攻略チャートを追加しました。`;
      if ((m = text.match(/^Imported (\d+) items and skipped (\d+)\.$/))) return `${m[1]}件を読み込み、${m[2]}件をスキップしました。`;
      if ((m = text.match(/^Imported (\d+) items?\.$/))) return `${m[1]}件を読み込みました。`;
      if ((m = text.match(/^“(.+)” was deleted\.$/))) return `「${m[1]}」を削除しました。`;
      if ((m = text.match(/^(.+) could not be read or saved\.$/))) return `${m[1]} を読み込みまたは保存できませんでした。`;
      if ((m = text.match(/^Stored in browser · approx\. (.+) used$/))) return `ブラウザ内保存・約 ${m[1]} 使用`;
      return text;
    }

    if (exactMessages.has(text)) return exactMessages.get(text);
    let m;
    if ((m = text.match(/^(\d+)件の攻略チャートを追加しました。$/))) return `Added ${m[1]} walkthrough${m[1] === "1" ? "" : "s"}.`;
    if ((m = text.match(/^(\d+)件を読み込み、(\d+)件をスキップしました。$/))) return `Imported ${m[1]} items and skipped ${m[2]}.`;
    if ((m = text.match(/^(\d+)件を読み込みました。$/))) return `Imported ${m[1]} item${m[1] === "1" ? "" : "s"}.`;
    if ((m = text.match(/^「(.+)」を削除しました。$/))) return `“${m[1]}” was deleted.`;
    if ((m = text.match(/^(.+) を読み込みまたは保存できませんでした。$/))) return `${m[1]} could not be read or saved.`;
    if ((m = text.match(/^ブラウザ内保存・約 (.+) 使用$/))) return `Stored in browser · approx. ${m[1]} used`;
    if ((m = text.match(/^(\d{4})年(\d{1,2})月(\d{1,2})日$/))) {
      const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
      return new Intl.DateTimeFormat("en-US", {year:"numeric", month:"short", day:"numeric"}).format(date);
    }
    return text;
  }

  function translateToastAndDynamicText(root = document) {
    const selectors = [
      ".toast", ".empty b", ".empty p", "#editHeading", "#editHint",
      "#viewerNoteText", "#viewerSaveState"
    ];
    for (const selector of selectors) {
      $$(selector, root).forEach(node => {
        const next = translatePattern(node.textContent.trim());
        if (next !== node.textContent.trim()) node.textContent = next;
      });
    }

    $$(".card", root).forEach(card => {
      const view = $('[data-action="view"]', card);
      const edit = $('[data-action="edit"]', card);
      const del = $('[data-action="delete"]', card);
      const favorite = $('[data-action="favorite"]', card);
      if (view) view.textContent = copy[language].open;
      if (edit) { edit.textContent = copy[language].edit; edit.title = copy[language].edit; }
      if (del) { del.textContent = copy[language].delete; del.title = copy[language].delete; del.setAttribute("aria-label", copy[language].deleteAria); }
      if (favorite) favorite.title = language === "en" ? "Favorite" : "お気に入り";

      const badge = $(".badge", card)?.textContent.trim();
      const placeholder = $(".placeholder span", card);
      if (placeholder) placeholder.textContent = badge === "WEB" ? copy[language].guideSite : copy[language].noCover;

      const metaDate = $(".meta span:last-child", card);
      if (metaDate && language === "en") metaDate.textContent = translatePattern(metaDate.textContent.trim(), "en");

      const coverImg = $(".cover img", card);
      if (coverImg && language === "en" && /のジャケット$/.test(coverImg.alt)) {
        coverImg.alt = `${coverImg.alt.replace(/のジャケット$/, "")} cover`;
      }
    });
  }

  function updateOpenSiteButton() {
    const button = $("#openNewTabButton");
    if (!button) return;
    const visible = button.style.display !== "none";
    if (visible) button.textContent = copy[language].openSite;
    if (button.title) button.title = copy[language].openSiteTitle;
  }

  function applyStaticCopy() {
    document.documentElement.lang = language;
    const t = copy[language];

    setText(".brand p", "brandSubtitle");
    setAttr("#searchInput", "placeholder", "searchPlaceholder");
    setAttr("#clearSearch", "aria-label", "clearSearch");
    setText("#addButton", "add");
    setAttr("#menuButton", "aria-label", "menu");
    setText("#exportButton", "exportBackup");
    setText("#importButton", "importBackup");
    setText("#clearAllButton", "clearAll");
    setText(".hero h2", "heroTitle");
    setText(".hero p", "heroText");
    const statSpans = $$(".stats .stat span");
    if (statSpans[0]) statSpans[0].textContent = t.totalTitles;
    if (statSpans[1]) statSpans[1].textContent = t.favorites;
    setText("#dropzone .drop-info b", "dropTitle");
    setText("#dropzone .drop-info span", "dropText");
    setText("#dropSelectButton", "chooseFiles");
    setAttr("#filterSelect", "aria-label", "filter");
    setOption("#filterSelect", "all", "filterAll");
    setOption("#filterSelect", "favorite", "filterFavorite");
    setOption("#filterSelect", "html", "filterHtml");
    setOption("#filterSelect", "web", "filterWeb");
    setOption("#filterSelect", "withCover", "filterWithCover");
    setOption("#filterSelect", "withoutCover", "filterWithoutCover");
    setAttr("#sortSelect", "aria-label", "sort");
    setOption("#sortSelect", "updatedDesc", "sortUpdated");
    setOption("#sortSelect", "createdDesc", "sortCreated");
    setOption("#sortSelect", "titleAsc", "sortTitleAsc");
    setOption("#sortSelect", "titleDesc", "sortTitleDesc");
    const viewSwitch = $(".view-switch");
    if (viewSwitch) viewSwitch.setAttribute("aria-label", t.view);
    setAttr("#gridView", "title", "grid");
    setAttr("#listView", "title", "list");
    setAttr("#mobileAdd", "aria-label", "addWalkthrough");

    setText("#addModal .dialog-header h2", "addWalkthrough");
    setText("#addHtmlChoice b", "htmlFile");
    setText("#addHtmlChoice span:last-child", "htmlChoiceText");
    setText("#addUrlChoice b", "guideUrl");
    setText("#addUrlChoice span:last-child", "urlChoiceText");

    setText("#urlModal .dialog-header h2", "addGuideUrl");
    const urlLabels = $$("#urlModal label");
    if (urlLabels[0]) urlLabels[0].textContent = t.walkthroughUrl;
    if (urlLabels[1]) urlLabels[1].innerHTML = `${t.gameTitle} <span style="color:var(--muted)">${t.optional}</span>`;
    setAttr("#urlTitleInput", "placeholder", "urlTitlePlaceholder");
    setText("#urlModal .hint", "urlHint");
    const urlCancel = $('#urlModal [data-close="urlModal"].btn');
    if (urlCancel) urlCancel.textContent = t.cancel;
    setText("#saveUrlButton", "addUrl");

    const editLabels = $$("#editModal .fields label");
    if (editLabels[0]) editLabels[0].textContent = t.gameTitle;
    if (editLabels[1]) editLabels[1].textContent = t.platform;
    if (editLabels[2] && editLabels[2].getAttribute("for") === "editUrlInput") editLabels[2].textContent = t.guideUrl;
    const tagsLabel = $('#editModal label[for="tagsInput"]');
    const notesLabel = $('#editModal label[for="notesInput"]');
    if (tagsLabel) tagsLabel.textContent = t.tags;
    if (notesLabel) notesLabel.textContent = t.notes;
    setAttr("#platformInput", "placeholder", "platformPlaceholder");
    setAttr("#tagsInput", "placeholder", "tagsPlaceholder");
    setAttr("#notesInput", "placeholder", "notesPlaceholder");
    setAttr("#editCoverPreview", "alt", "coverPreview");
    setText("#editPlaceholder span", "noCover");
    setText("#chooseCoverButton", "chooseImage");
    setText("#removeCoverButton", "removeImage");
    const editCancel = $('#editModal [data-close="editModal"].btn');
    if (editCancel) editCancel.textContent = t.cancel;
    setText("#saveEditButton", "save");

    setText("#downloadHtmlButton", "saveHtml");
    setAttr("#viewerFrame", "title", "viewerFrame");
    const storage = $("#storageInfo");
    if (storage) {
      storage.title = t.storageTitle;
      storage.textContent = translatePattern(storage.textContent.trim());
    }

    const brandIcon = $("#brandIcon");
    if (brandIcon) brandIcon.alt = language === "en" ? "GAME CODEX icon" : "GAME CODEXのアイコン";
  }

  function ensureLanguageButton() {
    let button = $("#languageButton");
    if (!button) {
      button = document.createElement("button");
      button.className = "btn small";
      button.id = "languageButton";
      const addButton = $("#addButton");
      if (addButton?.parentNode) addButton.parentNode.insertBefore(button, addButton);
      button.addEventListener("click", () => {
        language = language === "ja" ? "en" : "ja";
        storeLanguage(language);
        $("#filterSelect")?.dispatchEvent(new Event("change", {bubbles:true}));
        applyLanguage();
      });
    }
    button.textContent = language === "ja" ? "EN" : "日本語";
    button.title = language === "ja" ? "Switch to English" : "日本語に切り替え";
    button.setAttribute("aria-label", button.title);
  }

  const observerOptions = {
    subtree: true,
    childList: true,
    characterData: true,
    attributes: true,
    attributeFilter: ["title", "aria-label", "placeholder"]
  };

  function observe() {
    if (document.body) observer.observe(document.body, observerOptions);
  }

  function applyLanguage() {
    if (applying) return;
    applying = true;
    observer.disconnect();
    try {
      ensureLanguageButton();
      applyStaticCopy();
      translateToastAndDynamicText();
      updateOpenSiteButton();
    } finally {
      applying = false;
      observe();
    }
  }

  const nativeConfirm = window.confirm.bind(window);
  window.confirm = message => {
    const text = String(message);
    if (language !== "en") return nativeConfirm(text);
    let translated = text;
    let m;
    if ((m = text.match(/^「(.+)」を削除しますか？\n\n(.+)・ジャケット画像・メモが削除されます。$/))) {
      const payload = m[2] === "登録URL" ? "the saved URL" : "the HTML file and saved progress";
      translated = `Delete “${m[1]}”?\n\n${payload}, cover image, and notes will be deleted.`;
    } else if ((m = text.match(/^登録済みの(\d+)件をすべて削除しますか？\nこの操作は元に戻せません。$/))) {
      translated = `Delete all ${m[1]} saved walkthroughs?\nThis action cannot be undone.`;
    } else if (text === "最終確認：バックアップ済みですか？") {
      translated = "Final check: have you made a backup?";
    }
    return nativeConfirm(translated);
  };

  const observer = new MutationObserver(mutations => {
    if (applying) return;
    if (!mutations.some(m => m.type === "childList" || m.type === "characterData" || m.type === "attributes")) return;
    queueMicrotask(applyLanguage);
  });

  function start() {
    applyLanguage();
    observe();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, {once:true});
  else start();
})();
