/**
 * background.ts — MV3 service worker.
 *
 * - Relays the download request from the popup to chrome.downloads
 *   (Blob URLs created in the popup context are not readable by the
 *   service worker, so the XML string is passed here and re-wrapped).
 * - Provides the active-tab info used by the popup for scanning.
 */

const NAME = 'Epiplex IE Rules Generator';

chrome.runtime.onInstalled.addListener(() => {
  console.log(`[${NAME}] installed — ready to scan pages and generate IEAdaptor.xml rules.`);
});

chrome.runtime.onMessage.addListener((msg: unknown, _sender, sendResponse) => {
  const m = msg as { type?: string; filename?: string; data?: string; mime?: string };
  if (m?.type === 'EPIPLEX_DOWNLOAD' && typeof m.data === 'string') {
    const url = URL.createObjectURL(new Blob([m.data], { type: m.mime || 'application/xml;charset=utf-8' }));
    chrome.downloads
      .download({ url, filename: m.filename || 'IEAdaptor.xml', saveAs: true })
      .then((downloadId) => {
        // Revoke once the download has started (Chrome snapshots the URL).
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
        sendResponse({ ok: true, downloadId });
      })
      .catch((e: Error) => sendResponse({ ok: false, error: String(e?.message || e) }));
    return true; // async
  }

  if (m?.type === 'EPIPLEX_GET_TAB') {
    chrome.tabs
      .query({ active: true, currentWindow: true })
      .then(([tab]) =>
        sendResponse({
          ok: true,
          tab: tab ? { id: tab.id, url: tab.url, title: tab.title } : null,
        })
      )
      .catch((e: Error) => sendResponse({ ok: false, error: String(e?.message || e) }));
    return true; // async
  }

  return false;
});
