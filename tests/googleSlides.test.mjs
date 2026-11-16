import assert from "node:assert/strict";
import test from "node:test";

import { googleSlidesEmbedUrl, normalizeRefreshMinutes, parseGoogleSlidesLink, parseSlideAspect } from "../src/lib/googleSlides.ts";

const id = "14i-LT-dh-H1iA7wZqxISekdU8ftG2bB8hlu52fd2UpA";

test("edit, share, preview and account-scoped links resolve to the same presentation", () => {
  for (const link of [
    `https://docs.google.com/presentation/d/${id}/edit?usp=sharing`,
    `https://docs.google.com/presentation/d/${id}/edit#slide=id.p`,
    `https://docs.google.com/presentation/d/${id}`,
    `https://docs.google.com/presentation/d/${id}/preview`,
    `https://docs.google.com/presentation/u/1/d/${id}/edit`,
    `  docs.google.com/presentation/d/${id}/edit  `,
  ]) {
    assert.deepEqual(parseGoogleSlidesLink(link), { presentationId: id });
  }
});

test("non-Slides, fake domains, published-to-web and incomplete links are rejected with a reason", () => {
  for (const link of [
    undefined, "", " ", "not a url",
    `http://docs.google.com/presentation/d/${id}/edit`,
    `https://docs.google.com.evil.test/presentation/d/${id}/edit`,
    `https://evil.test/presentation/d/${id}/edit`,
    `https://docs.google.com/document/d/${id}/edit`,
    "https://docs.google.com/presentation/d/e/2PACX-1vQabcdefghijklmnopqrstuvwxyz/pub",
    "https://docs.google.com/presentation/d/short/edit",
    `https://docs.google.com/presentation/d/${id}%2F..%2Fx/edit`,
  ]) {
    const result = parseGoogleSlidesLink(link);
    assert.equal(result.presentationId, undefined, String(link));
    assert.ok(result.error, String(link));
  }
});

test("embed URL only auto-advances with a delay Google supports", () => {
  assert.equal(googleSlidesEmbedUrl(id), `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false`);
  assert.equal(googleSlidesEmbedUrl(id, 0), `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false`);
  assert.equal(googleSlidesEmbedUrl(id, 7), `https://docs.google.com/presentation/d/${id}/embed?start=false&loop=false`);
  assert.equal(googleSlidesEmbedUrl(id, 10), `https://docs.google.com/presentation/d/${id}/embed?start=true&loop=true&delayms=10000`);
});

test("refresh interval falls back to 5 minutes and slide ratio is read from the embed page", () => {
  assert.equal(normalizeRefreshMinutes(1), 1);
  assert.equal(normalizeRefreshMinutes(10), 10);
  for (const value of [undefined, null, 0, 2, "5", -1]) assert.equal(normalizeRefreshMinutes(value), 5);
  assert.equal(parseSlideAspect("x viewBox\\x3d\\x220.0 0.0 960.0 540.0\\x22 y"), 960 / 540);
  assert.equal(parseSlideAspect('<svg viewBox="0 0 1024 768">'), 1024 / 768);
  assert.equal(parseSlideAspect("no slides here"), null);
});
