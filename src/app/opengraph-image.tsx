import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social share image (WhatsApp, LinkedIn, X, Facebook previews).
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          color: "#fafaf8",
          padding: 80,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              background: "#fafaf8",
              color: "#111111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            KA
          </div>
          <div style={{ fontSize: 26, letterSpacing: 8, textTransform: "uppercase" }}>{site.name}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 900 }}>
            Architecture shaped by light, material and the way you live.
          </div>
          <div style={{ marginTop: 32, fontSize: 26, color: "#a8a6a2" }}>{site.tagline}</div>
        </div>
      </div>
    ),
    size,
  );
}
