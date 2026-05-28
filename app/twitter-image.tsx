import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "German Group social preview";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "56px",
          background:
            "linear-gradient(160deg, #0A0F14 0%, #131C26 60%, #0A0F14 100%)",
          color: "#E6EDF3",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top left, rgba(198,169,107,0.18), transparent 36%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 128,
              height: 128,
              borderRadius: 36,
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid rgba(224,196,138,0.4)",
              color: "#E0C48A",
              fontSize: 72,
              fontWeight: 700,
              letterSpacing: "-0.08em",
            }}
          >
            G
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                display: "flex",
                fontSize: 70,
                fontWeight: 700,
                letterSpacing: "-0.05em",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                color: "#A7B0B8",
                maxWidth: 820,
                lineHeight: 1.45,
              }}
            >
              German car diagnostics, engine repair, gearbox service, and
              premium workshop support.
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
