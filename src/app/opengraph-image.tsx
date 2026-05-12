import { ImageResponse } from "next/og";

export const alt =
  "Erik Cativo — I build tools for private, uncensorable money.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fdfdfd",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#5c5c5c",
            letterSpacing: "-0.01em",
            fontWeight: 500,
          }}
        >
          Erik Cativo
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#171717",
            fontWeight: 700,
            fontSize: 88,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            marginTop: 64,
            flex: 1,
          }}
        >
          <div style={{ display: "flex" }}>I build tools</div>
          <div style={{ display: "flex" }}>for private,</div>
          <div style={{ display: "flex" }}>uncensorable money.</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#5c5c5c",
            letterSpacing: "-0.01em",
          }}
        >
          <div style={{ display: "flex" }}>
            Design engineer · Stockholm
          </div>
          <div style={{ display: "flex" }}>erik.day</div>
        </div>
      </div>
    ),
    { ...size }
  );
}
