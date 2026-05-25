import { ImageResponse } from "next/og";

import { brandColors } from "@/lib/colorTokens";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: `linear-gradient(135deg, ${brandColors.backgroundMain} 0%, ${brandColors.backgroundSoft} 55%, ${brandColors.brandSecondary} 100%)`,
          color: brandColors.brandPrimary,
          display: "flex",
          flexDirection: "column",
          fontFamily: "sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: 80,
          width: "100%",
        }}
      >
        <div style={{ fontSize: 36, fontWeight: 800, marginBottom: 28 }}>포베베</div>
        <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: "-1px", lineHeight: 1.18, textAlign: "center" }}>
          카시트 & 유모차 전문 세탁
        </div>
        <div style={{ color: brandColors.textSub, fontSize: 28, lineHeight: 1.5, marginTop: 28, textAlign: "center" }}>
          아이에게 닿는 용품, 전문 세탁으로 더 안심하세요.
        </div>
      </div>
    ),
    size,
  );
}
