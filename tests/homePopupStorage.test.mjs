import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// Match the app's extensionless TypeScript import when running native Node tests.
registerHooks({ resolve(specifier, context, nextResolve) {
  return nextResolve(specifier === "./homePopup" && context.parentURL?.endsWith("homePopupStorage.ts") ? "./homePopup.ts" : specifier, context);
} });
const { hidePopup, isPopupHidden, popupStorageKey } = await import("../src/lib/homePopupStorage.ts");

function storage() {
  const records = new Map();
  return { getItem: (key) => records.get(key) ?? null, setItem: (key, value) => records.set(key, value), clear: () => records.clear() };
}
function environment() {
  globalThis.window = { sessionStorage: storage(), localStorage: storage() };
  return globalThis.window;
}

test("either a session record or today's record hides an item; yesterday alone does not", () => {
  const { sessionStorage, localStorage } = environment();
  const item = { id: "both-scopes", version: 1 };
  localStorage.setItem(popupStorageKey(item, "day"), "2026-11-01");
  assert.equal(isPopupHidden(item, "2026-11-02"), false);
  sessionStorage.setItem(popupStorageKey(item, "session"), "1");
  assert.equal(isPopupHidden(item, "2026-11-02"), true);
  sessionStorage.clear();
  localStorage.setItem(popupStorageKey(item, "day"), "2026-11-02");
  assert.equal(isPopupHidden(item, "2026-11-02"), true);
});

test("individual today hiding expires next local date and does not affect new IDs or versions", () => {
  environment();
  const item = { id: "individual", version: 1 };
  hidePopup(item, "day", "2026-11-01");
  assert.equal(isPopupHidden(item, "2026-11-01"), true);
  assert.equal(isPopupHidden(item, "2026-11-02"), false);
  assert.equal(isPopupHidden({ ...item, version: 2 }, "2026-11-01"), false);
  assert.equal(isPopupHidden({ ...item, id: "newly-added" }, "2026-11-01"), false);
  assert.equal(window.sessionStorage.getItem(popupStorageKey(item, "session")), null);
});

test("legacy unversioned records apply only to version 1", () => {
  const { sessionStorage, localStorage } = environment();
  sessionStorage.setItem("forbebe:home-popup:old-session:session", "1");
  localStorage.setItem("forbebe:home-popup:old-day:day", "2026-11-01");
  for (const id of ["old-session", "old-day"]) {
    assert.equal(isPopupHidden({ id, version: 1 }, "2026-11-01"), true);
    assert.equal(isPopupHidden({ id, version: 2 }, "2026-11-01"), false);
  }
});

test("denied storage does not crash and one failed scope never skips the other", () => {
  const { localStorage } = environment();
  Object.defineProperty(window, "sessionStorage", { get() { throw new Error("Denied"); }, configurable: true });
  const item = { id: "other-scope", version: 1 };
  localStorage.setItem(popupStorageKey(item, "day"), "2026-11-01");
  assert.equal(isPopupHidden(item, "2026-11-01"), true);
  Object.defineProperty(window, "localStorage", { get() { throw new Error("Denied"); }, configurable: true });
  const denied = { id: "all-denied", version: 1 };
  assert.equal(isPopupHidden(denied, "2026-11-01"), false);
  assert.doesNotThrow(() => hidePopup(denied, "day", "2026-11-01"));
  assert.equal(isPopupHidden(denied, "2026-11-01"), true);
  assert.equal(isPopupHidden(denied, "2026-11-02"), false);
  const session = { id: "denied-session", version: 1 };
  assert.doesNotThrow(() => hidePopup(session, "session"));
  assert.equal(isPopupHidden(session, "2026-11-02"), true);
});

test("an old readable record does not override an in-memory today record after a failed write", () => {
  const { localStorage } = environment();
  const item = { id: "failed-write", version: 1 };
  localStorage.setItem(popupStorageKey(item, "day"), "2026-10-31");
  localStorage.setItem = () => { throw new Error("Quota exceeded"); };
  hidePopup(item, "day", "2026-11-01");
  assert.equal(isPopupHidden(item, "2026-11-01"), true);
});
