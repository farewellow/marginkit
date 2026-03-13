import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 42,
          background: "linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)"
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 84,
            fontWeight: 800,
            letterSpacing: -4,
            lineHeight: 1
          }}
        >
          MK
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
