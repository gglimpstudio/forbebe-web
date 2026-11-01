import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { legacyPopupItem, normalizePopupUrl, popupIdRepairs, popupIdentity, popupSourceItems, preparePopupSlides } from "../src/lib/homePopup.ts";

test("popup links accept root-relative paths and normalize HTTP(S) URLs", () => {
  for (const path of ["/", "/pricing", "/branches?region=서울#finder", "/./offer"]) {
    assert.equal(normalizePopupUrl(path), path);
  }
  assert.equal(normalizePopupUrl("  /pricing  "), "/pricing");
  assert.equal(normalizePopupUrl("HTTPS://EXAMPLE.COM/offer"), "https://example.com/offer");
  assert.equal(normalizePopupUrl("http://example.com"), "http://example.com/");
});

function item(id, changes = {}) {
  return { _key: id, title: id, id, version: 1, enabled: true, image: { alt: id, asset: { url: `/qa-${id}.png`, metadata: { dimensions: { width: 600, height: 1800 } } } }, url: "/pricing", ...changes };
}

test("legacy popup is copied as the first item without mutating legacy fields", () => {
  const old = { enabled: true, id: "old-id", image: { alt: "Legacy", asset: { url: "/old.png" } }, url: "/pricing", buttonLabel: "기존 문구" };
  const original = structuredClone(old);
  const copied = legacyPopupItem(old);
  assert.equal(copied._type, "popupItem");
  assert.equal(copied.id, "old-id");
  assert.equal(copied.version, 1);
  assert.equal(popupSourceItems(old)[0].image.asset.url, "/old.png");
  assert.equal(copied.buttonLabel, "기존 문구");
  assert.equal("buttonLabel" in legacyPopupItem({ ...old, buttonLabel: undefined }), false);
  assert.equal("buttonLabel" in preparePopupSlides(old, "https://www.forbebe.co.kr")[0], false);
  assert.deepEqual(old, original);
});

test("explicit empty lists, list mode with an unset list and global disabling never revive legacy data", () => {
  const old = item("legacy");
  for (const settings of [
    { ...old, items: [] }, { ...old, listVersion: 1 }, { ...old, listVersion: 1, items: null },
    { ...old, enabled: false }, { ...old, enabled: false, items: [item("new")] },
  ]) assert.deepEqual(preparePopupSlides(settings, "https://www.forbebe.co.kr"), []);
});

test("slides retain list order and matching media/links, omit removed button labels, and exclude invalid items", () => {
  const items = [
    item("third", { buttonLabel: "세 번째", url: "https://EXAMPLE.COM/offer" }),
    item("off", { enabled: false }), item("no-image", { image: undefined }),
    item("invalid-url", { url: "javascript:alert(1)" }),
    item("missing-id", { id: " " }), item("bad-version", { version: 0 }),
    item("first", { url: "https://www.forbebe.co.kr/pricing" }), item("third"),
  ];
  const slides = preparePopupSlides({ enabled: true, items }, "https://www.forbebe.co.kr");
  assert.deepEqual(slides.map((slide) => slide.id), ["third", "first"]);
  assert.equal("buttonLabel" in slides[0], false);
  assert.equal(slides[0].src, "/qa-third.png");
  assert.equal(slides[0].href, "https://example.com/offer");
  assert.equal(slides[0].height, 1800);
  assert.equal(slides[1].href, "/pricing");
  assert.equal("buttonLabel" in slides[1], false);
});

test("image alt text is optional and falls back without excluding the popup", () => {
  for (const alt of [undefined, "", "   ", " 입력한 안내 "]) {
    const slides = preparePopupSlides({ enabled: true, items: [item("optional-alt", { image: { alt, asset: { url: "/image.png" } } })] }, "https://www.forbebe.co.kr");
    assert.equal(slides.length, 1);
    assert.equal(slides[0].alt, alt?.trim() || "포베베 안내");
  }
});

test("CMS identity repair preserves normal edits and only replaces missing or duplicated IDs", () => {
  const items = [item("stable", { title: "수정된 제목", version: 5 }), item("duplicate", { id: "stable" }), item("missing", { id: undefined }), item("reserved")];
  const original = structuredClone(items);
  const candidates = ["reserved", "new-copy", "new-item"];
  const repairs = popupIdRepairs(items, () => candidates.shift());
  assert.deepEqual(repairs, [{ key: "duplicate", id: "new-copy" }, { key: "missing", id: "new-item" }]);
  assert.deepEqual(items, original);
  assert.deepEqual(popupIdRepairs([item("stable", { title: "다시 수정", version: 6 })]), []);
  assert.notEqual(popupIdentity("stable", 1), popupIdentity("stable", 2));
  assert.notEqual(popupIdentity("a:v2", 1), popupIdentity("a", 2));
});

test("popup links reject missing, malformed, executable and protocol-relative URLs", () => {
  for (const value of [
    undefined, "", "   ", "pricing", "#offer", "?offer=1", "//example.com", "/\\example.com",
    "/\n/example.com", "https://exa\tmple.com", "https://", "https:///", "https:example.com",
    "https://example.com\\@evil.test", "https://user:password@example.com",
    "javascript:alert(1)", "data:text/html,test", "mailto:test@example.com", "ftp://example.com",
  ]) {
    assert.equal(normalizePopupUrl(value), null, String(value));
  }
});

test("hide-today dates follow local midnight, including DST, rather than UTC or 24 hours", () => {
  const moduleUrl = new URL("../src/lib/homePopup.ts", import.meta.url).href;
  const cases = [
    ["Asia/Seoul", "2026-11-01T14:59:59Z", "2026-11-01"],
    ["Asia/Seoul", "2026-11-01T15:00:00Z", "2026-11-02"],
    ["America/Los_Angeles", "2026-11-02T07:59:59Z", "2026-11-01"],
    ["America/Los_Angeles", "2026-11-02T08:00:00Z", "2026-11-02"],
    ["America/Los_Angeles", "2026-03-09T06:59:59Z", "2026-03-08"],
    ["America/Los_Angeles", "2026-03-09T07:00:00Z", "2026-03-09"],
  ];
  for (const [zone, instant, expected] of cases) {
    const child = spawnSync(process.execPath, ["--input-type=module", "-e",
      `import { popupLocalDate } from ${JSON.stringify(moduleUrl)}; console.log(popupLocalDate(new Date(${JSON.stringify(instant)})));`,
    ], { env: { ...process.env, TZ: zone }, encoding: "utf8" });
    assert.equal(child.status, 0, child.stderr);
    assert.equal(child.stdout.trim(), expected, `${zone}: ${instant}`);
  }
});
