import { ImageResponse } from "next/og";

export const size = {
  width: 512,
  height: 512
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)"
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 236,
            fontWeight: 800,
            letterSpacing: -12,
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
