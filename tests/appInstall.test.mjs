import assert from "node:assert/strict";
import test from "node:test";

const { detectInstallEnvironment, dismissInstallBanner, installGuides, isInstallBannerSuppressed, markAppInstalled } = await import("../src/lib/appInstall.ts");

const userAgents = {
  galaxyChrome: "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  samsungInternet: "Mozilla/5.0 (Linux; Android 14; SAMSUNG SM-S921N) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/26.0 Chrome/122.0.0.0 Mobile Safari/537.36",
  galaxyKakao: "Mozilla/5.0 (Linux; Android 14; SM-S921N Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.6778.135 Mobile Safari/537.36;KAKAOTALK 2410100",
  galaxyNaverApp: "Mozilla/5.0 (Linux; Android 14; SM-S921N Build/UP1A.231005.007; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/131.0.6778.135 Mobile Safari/537.36 NAVER(inapp; search; 2000; 12.10.1)",
  iphoneSafari: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Mobile/15E148 Safari/604.1",
  iphoneKakao: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 KAKAOTALK 10.9.1",
  iphoneInstagram: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 Instagram 357.0.0.25.101 (iPhone15,3; iOS 18_1; ko_KR; ko; scale=3.00; 1290x2796; 653040011)",
  iphoneChrome: "Mozilla/5.0 (iPhone; CPU iPhone OS 18_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/131.0.6778.73 Mobile/15E148 Safari/604.1",
  macSafari: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.1 Safari/605.1.15",
  desktopChrome: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
  desktopKakao: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 KAKAOTALK 4.2.1",
};

function detect(userAgent, extra = {}) {
  return detectInstallEnvironment({ userAgent, isStandalone: false, ...extra });
}

test("real mobile user agents map to the install path the customer can actually use", () => {
  assert.equal(detect(userAgents.galaxyChrome), "android");
  assert.equal(detect(userAgents.samsungInternet), "android-samsung");
  assert.equal(detect(userAgents.galaxyKakao), "kakao-android");
  assert.equal(detect(userAgents.galaxyNaverApp), "inapp-android");
  assert.equal(detect(userAgents.iphoneSafari), "ios-safari");
  assert.equal(detect(userAgents.iphoneKakao), "kakao-ios");
  assert.equal(detect(userAgents.iphoneInstagram), "inapp-ios");
  assert.equal(detect(userAgents.iphoneChrome), "ios-other");
});

test("iPad in desktop mode counts as iOS Safari only when it has a touch screen", () => {
  assert.equal(detect(userAgents.macSafari, { maxTouchPoints: 5 }), "ios-safari");
  assert.equal(detect(userAgents.macSafari, { maxTouchPoints: 0 }), "unsupported");
});

test("desktop browsers, including the KakaoTalk PC browser, get no install banner", () => {
  for (const userAgent of [userAgents.desktopChrome, userAgents.desktopKakao, userAgents.macSafari]) {
    assert.equal(detect(userAgent), "unsupported");
    assert.equal(installGuides[detect(userAgent)], null);
  }
});

test("an app already running from the home screen gets no banner on any platform", () => {
  for (const userAgent of Object.values(userAgents)) {
    assert.equal(detect(userAgent, { isStandalone: true, maxTouchPoints: 5 }), "standalone");
  }
  assert.equal(installGuides.standalone, null);
});

test("in-app browsers offer link copying and the iPhone Safari guide uses the agreed copy", () => {
  for (const userAgent of [userAgents.galaxyKakao, userAgents.iphoneKakao, userAgents.galaxyNaverApp, userAgents.iphoneInstagram]) {
    const guide = installGuides[detect(userAgent)];
    assert.equal(guide.title, "포베베 앱을 설치하려면 외부 브라우저로 열어주세요.");
    assert.equal(guide.copyLink, true);
  }
  assert.deepEqual(installGuides[detect(userAgents.iphoneSafari)], {
    title: "아이폰에서 포베베 앱 설치하기",
    notes: [],
    steps: [
      "Safari에서 포베베 홈페이지를 열어주세요.",
      "공유 메뉴를 선택해 주세요.",
      "'홈 화면에 추가'를 선택해 주세요.",
      "추가를 완료하면 홈 화면에서 포베베를 실행할 수 있습니다.",
    ],
    copyLink: false,
  });
  assert.equal(installGuides[detect(userAgents.iphoneChrome)].copyLink, true);
});

function storage() {
  const records = new Map();
  return { getItem: (key) => records.get(key) ?? null, setItem: (key, value) => records.set(key, value) };
}
const day = 24 * 60 * 60 * 1000;
const closedAt = Date.parse("2026-11-24T09:00:00+09:00");

test("closing the banner hides it for 7 days, then it returns", () => {
  globalThis.window = { localStorage: storage() };
  assert.equal(isInstallBannerSuppressed(closedAt), false);
  dismissInstallBanner(closedAt);
  assert.equal(isInstallBannerSuppressed(closedAt + 6 * day), true);
  assert.equal(isInstallBannerSuppressed(closedAt + 7 * day - 1), true);
  assert.equal(isInstallBannerSuppressed(closedAt + 7 * day), false);
});

test("installing hides the banner permanently, even after an old dismissal expired", () => {
  globalThis.window = { localStorage: storage() };
  dismissInstallBanner(closedAt);
  markAppInstalled();
  assert.equal(isInstallBannerSuppressed(closedAt + 365 * day), true);
});

test("unreadable or future dismissal records do not hide the banner", () => {
  globalThis.window = { localStorage: storage() };
  window.localStorage.setItem("forbebe:app-install:dismissed-at", "not-a-time");
  assert.equal(isInstallBannerSuppressed(closedAt), false);
  dismissInstallBanner(closedAt + day);
  assert.equal(isInstallBannerSuppressed(closedAt), false);
});

test("denied storage never crashes and leaves the banner available", () => {
  globalThis.window = {};
  Object.defineProperty(window, "localStorage", { get() { throw new Error("Denied"); } });
  assert.doesNotThrow(() => dismissInstallBanner(closedAt));
  assert.doesNotThrow(() => markAppInstalled());
  assert.equal(isInstallBannerSuppressed(closedAt), false);
});
