import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 70px",
          color: "#0f172a",
          background: "linear-gradient(135deg, #f0f9ff 0%, #ecfeff 60%, #f8fafc 100%)"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 34,
            fontWeight: 700,
            color: "#0369a1"
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              background: "linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)",
              color: "white",
              fontSize: 28,
              fontWeight: 800
            }}
          >
            MK
          </div>
          MarginKit
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 980 }}>
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1.6, lineHeight: 1.05 }}>
            Cost, Margin, and Inventory Calculators for Sellers
          </div>
          <div style={{ fontSize: 30, color: "#334155", lineHeight: 1.25 }}>
            Built for importers, resellers, ecommerce teams, and marketplace operators.
          </div>
        </div>

        <div style={{ fontSize: 24, color: "#0f766e", fontWeight: 600 }}>
          marginkit.app
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}

