(() => {
  "use strict";

  const SAMPLE_PATH = "sample-walkthrough.html";
  const LANGUAGE_KEYS = ["game-codex-language", "gwl-language"];
  let busy = false;
  let scheduled = false;

  const $ = (selector, root = document) => root.querySelector(selector);

  function language() {
    try {
      for (const key of LANGUAGE_KEYS) {
        const value = localStorage.getItem(key);
        if (value === "en") return "en";
        if (value === "ja") return "ja";
      }
    } catch {}
    return document.documentElement.lang === "en" ? "en" : "ja";
  }

  function copy() {
    return language() === "en"
      ? {
          add: "+ Add walkthrough",
          sample: "▶ Try sample",
          loading: "Loading sample…",
          failed: "Could not load the sample. Please try again.",
          status: "The sample is being added to your library."
        }
      : {
          add: "＋ 攻略を追加",
          sample: "▶ サンプルを試す",
          loading: "サンプルを読み込み中…",
          failed: "サンプルを読み込めませんでした。もう一度お試しください。",
          status: "サンプルをライブラリへ追加しています。"
        };
  }

  function isTrulyEmpty() {
    const count = Number($("#totalCount")?.textContent || "0");
    return count === 0 && !$("#library .card");
  }

  function addStyles() {
    if ($("#sampleButtonStyles")) return;
    const style = document.createElement("style");
    style.id = "sampleButtonStyles";
    style.textContent = `
      .empty-actions{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:18px}
      .empty-actions .btn{min-width:150px}
      .sample-status{margin-top:10px!important;font-size:13px;color:var(--muted)}
      @media(max-width:520px){.empty-actions{flex-direction:column;align-items:stretch}.empty-actions .btn{width:100%}}
    `;
    document.head.appendChild(style);
  }

  function setStatus(message = "", isError = false) {
    const node = $("#sampleStatus");
    if (!node) return;
    node.textContent = message;
    node.style.color = isError ? "var(--danger)" : "var(--muted)";
  }

  function waitFor(test, timeout = 7000) {
    return new Promise((resolve, reject) => {
      const started = performance.now();
      const tick = () => {
        try {
          const value = test();
          if (value) return resolve(value);
        } catch {}
        if (performance.now() - started >= timeout) return reject(new Error("timeout"));
        requestAnimationFrame(tick);
      };
      tick();
    });
  }

  async function importSample() {
    if (busy || !isTrulyEmpty()) return;
    const button = $("#trySampleButton");
    const t = copy();
    busy = true;
    if (button) {
      button.disabled = true;
      button.textContent = t.loading;
    }
    setStatus(t.status);

    try {
      const response = await fetch(SAMPLE_PATH, { cache: "no-store", credentials: "same-origin" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const html = await response.text();
      if (!html.trim()) throw new Error("empty sample");

      const input = $("#htmlInput");
      if (!input) throw new Error("HTML input unavailable");

      const transfer = new DataTransfer();
      transfer.items.add(new File([html], "sample-walkthrough.html", { type: "text/html" }));
      input.files = transfer.files;
      input.dispatchEvent(new Event("change", { bubbles: true }));

      const editor = await waitFor(() => $("#editModal.open"));
      const tags = $("#tagsInput", editor);
      if (tags && !/(^|,\s*)SAMPLE(\s*,|$)/i.test(tags.value)) {
        tags.value = tags.value.trim() ? `${tags.value}, SAMPLE` : "SAMPLE";
      }
      const save = $("#saveEditButton", editor);
      if (save) save.click();

      await waitFor(() => !$("#editModal.open") && $("#library .card [data-action='view']"));
      const open = $("#library .card [data-action='view']");
      if (open) open.click();
    } catch (error) {
      console.error("GAME CODEX sample import failed", error);
      setStatus(copy().failed, true);
      const current = $("#trySampleButton");
      if (current) {
        current.disabled = false;
        current.textContent = copy().sample;
      }
    } finally {
      busy = false;
    }
  }

  function syncEmptyActions() {
    scheduled = false;
    addStyles();
    const empty = $("#library .empty");
    const existing = $("#emptyActions");

    if (!empty || !isTrulyEmpty()) {
      existing?.remove();
      return;
    }

    const t = copy();
    let actions = existing;
    if (!actions) {
      actions = document.createElement("div");
      actions.id = "emptyActions";
      actions.className = "empty-actions";
      actions.innerHTML = `
        <button type="button" class="btn small" id="emptyAddButton"></button>
        <button type="button" class="btn small primary" id="trySampleButton"></button>
        <p id="sampleStatus" class="sample-status" role="status" aria-live="polite"></p>
      `;
      empty.appendChild(actions);
      $("#emptyAddButton", actions)?.addEventListener("click", () => $("#addButton")?.click());
      $("#trySampleButton", actions)?.addEventListener("click", importSample);
    }

    const add = $("#emptyAddButton", actions);
    const sample = $("#trySampleButton", actions);
    if (add) add.textContent = t.add;
    if (sample && !busy) sample.textContent = t.sample;
  }

  function scheduleSync() {
    if (scheduled) return;
    scheduled = true;
    queueMicrotask(syncEmptyActions);
  }

  function start() {
    syncEmptyActions();
    const library = $("#library");
    if (library) new MutationObserver(scheduleSync).observe(library, { childList: true, subtree: true, characterData: true });
    const languageButton = $("#languageButton");
    languageButton?.addEventListener("click", () => setTimeout(syncEmptyActions, 0));
    window.addEventListener("storage", scheduleSync);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
