export type InstallEnvironment =
  | "standalone"
  | "android"
  | "android-samsung"
  | "kakao-android"
  | "kakao-ios"
  | "inapp-android"
  | "inapp-ios"
  | "ios-safari"
  | "ios-other"
  | "unsupported";

export type InstallGuide = {
  title: string;
  notes: readonly string[];
  steps: readonly string[];
  copyLink: boolean;
};

const iosSafariSteps = [
  "Safari에서 포베베 홈페이지를 열어주세요.",
  "공유 메뉴를 선택해 주세요.",
  "'홈 화면에 추가'를 선택해 주세요.",
  "추가를 완료하면 홈 화면에서 포베베를 실행할 수 있습니다.",
];
const externalBrowserTitle = "포베베 앱을 설치하려면 외부 브라우저로 열어주세요.";
const externalBrowserNotes = ["갤럭시: 크롬 또는 삼성 인터넷 권장", "아이폰: Safari 권장"];

export const installGuides: Record<InstallEnvironment, InstallGuide | null> = {
  standalone: null,
  unsupported: null,
  android: {
    title: "홈 화면에 포베베 앱 설치하기",
    notes: [],
    steps: [
      "Chrome 오른쪽 위의 ⋮ 메뉴를 눌러주세요.",
      "'홈 화면에 추가' 또는 '앱 설치'를 선택해 주세요.",
      "추가를 완료하면 홈 화면에서 포베베를 실행할 수 있습니다.",
    ],
    copyLink: false,
  },
  "android-samsung": {
    title: "삼성 인터넷에서 포베베 앱 설치하기",
    notes: [],
    steps: [
      "화면 하단의 ≡ 메뉴를 눌러주세요.",
      "'현재 페이지 추가'를 선택해 주세요.",
      "'홈 화면'을 선택해 주세요.",
      "추가를 완료하면 홈 화면에서 포베베를 실행할 수 있습니다.",
    ],
    copyLink: false,
  },
  "kakao-android": {
    title: externalBrowserTitle,
    notes: externalBrowserNotes,
    steps: [
      "카카오톡 화면 우측 하단 또는 상단의 ⋮ 메뉴를 눌러주세요.",
      "'다른 브라우저로 열기'를 선택해 주세요.",
      "열린 브라우저에서 '포베베 앱 설치하기'를 다시 눌러주세요.",
    ],
    copyLink: true,
  },
  "kakao-ios": {
    title: externalBrowserTitle,
    notes: externalBrowserNotes,
    steps: [
      "카카오톡 화면 우측 하단의 공유(또는 ⋯) 버튼을 눌러주세요.",
      "'Safari로 열기'를 선택해 주세요.",
      "Safari에서 공유 메뉴를 열고 '홈 화면에 추가'를 선택해 주세요.",
    ],
    copyLink: true,
  },
  "inapp-android": {
    title: externalBrowserTitle,
    notes: externalBrowserNotes,
    steps: [
      "화면의 ⋮ 또는 ⋯ 메뉴를 눌러주세요.",
      "'다른 브라우저로 열기'를 선택해 주세요.",
      "메뉴가 없다면 링크를 복사해 크롬 또는 삼성 인터넷에 붙여넣어 주세요.",
    ],
    copyLink: true,
  },
  "inapp-ios": {
    title: externalBrowserTitle,
    notes: externalBrowserNotes,
    steps: [
      "화면의 공유 또는 ⋯ 버튼을 눌러주세요.",
      "'Safari로 열기'를 선택해 주세요.",
      "메뉴가 없다면 링크를 복사해 Safari에 붙여넣어 주세요.",
    ],
    copyLink: true,
  },
  "ios-safari": {
    title: "아이폰에서 포베베 앱 설치하기",
    notes: [],
    steps: iosSafariSteps,
    copyLink: false,
  },
  "ios-other": {
    title: "아이폰에서 포베베 앱 설치하기",
    notes: ["홈 화면 추가는 Safari에서 해주세요. 링크를 복사해 Safari에 붙여넣으면 됩니다."],
    steps: iosSafariSteps,
    copyLink: true,
  },
};

// Android WebViews mark themselves with "; wv)". iOS WebViews omit the "Safari/" token that Safari and other iOS browsers send.
const inAppToken = /NAVER\(inapp|DaumApps|Instagram|FBAN|FBAV|FB_IAB| Line\/|BAND\//;
const iosOtherBrowserToken = /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|Whale|YaBrowser|DuckDuckGo|GSA\//;

export function detectInstallEnvironment({
  userAgent,
  isStandalone,
  maxTouchPoints = 0,
}: {
  userAgent: string;
  isStandalone: boolean;
  maxTouchPoints?: number;
}): InstallEnvironment {
  if (isStandalone) return "standalone";
  // iPadOS Safari requests the desktop site by default and reports itself as a Mac with a touch screen.
  const ios = /iPhone|iPad|iPod/.test(userAgent) || (/Macintosh/.test(userAgent) && maxTouchPoints > 1);
  const android = !ios && /Android/.test(userAgent);
  if (!ios && !android) return "unsupported";
  if (/KAKAOTALK/i.test(userAgent)) return ios ? "kakao-ios" : "kakao-android";
  if (inAppToken.test(userAgent) || (android && /; wv\)/.test(userAgent)) || (ios && !/Safari\//.test(userAgent))) {
    return ios ? "inapp-ios" : "inapp-android";
  }
  if (ios) return iosOtherBrowserToken.test(userAgent) ? "ios-other" : "ios-safari";
  return /SamsungBrowser/.test(userAgent) ? "android-samsung" : "android";
}

const installedKey = "forbebe:app-install:installed";
const dismissedAtKey = "forbebe:app-install:dismissed-at";
const dismissDurationMs = 7 * 24 * 60 * 60 * 1000;

export function isInstallBannerSuppressed(now = Date.now()): boolean {
  try {
    const storage = window.localStorage;
    if (storage.getItem(installedKey) === "1") return true;
    const elapsed = now - Number(storage.getItem(dismissedAtKey));
    return elapsed >= 0 && elapsed < dismissDurationMs;
  } catch {
    return false;
  }
}

export function dismissInstallBanner(now = Date.now()) {
  try {
    window.localStorage.setItem(dismissedAtKey, String(now));
  } catch { /* The banner still closes for this visit. It returns on the next full load. */ }
}

export function markAppInstalled() {
  try {
    window.localStorage.setItem(installedKey, "1");
  } catch { /* The installed app opens standalone, which hides the banner without storage. */ }
}
