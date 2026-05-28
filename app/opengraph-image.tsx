import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "German Group — German car repair and diagnostics";

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
          padding: "56px",
          background:
            "linear-gradient(135deg, #0A0F14 0%, #0F1720 55%, #0A0F14 100%)",
          color: "#E6EDF3",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top right, rgba(224,196,138,0.18), transparent 35%)",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 94,
              height: 94,
              borderRadius: 28,
              border: "2px solid rgba(224,196,138,0.4)",
              color: "#E0C48A",
              fontSize: 54,
              fontWeight: 700,
              letterSpacing: "-0.08em",
            }}
          >
            G
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#C6A96B",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Precision · Performance · Trust
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#C6A96B",
              letterSpacing: "0.08em",
            }}
          >
            German Automotive Specialists
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 820,
              fontSize: 72,
              lineHeight: 1.08,
              fontWeight: 700,
              letterSpacing: "-0.05em",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 920,
              fontSize: 30,
              lineHeight: 1.45,
              color: "#A7B0B8",
            }}
          >
            Specialist engine repair, gearbox service, diagnostics, detailing,
            and workshop support for German vehicles.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
            fontSize: 22,
            color: "#A7B0B8",
          }}
        >
          <div style={{ display: "flex" }}>BMW · Mercedes-Benz · Audi · Porsche</div>
          <div style={{ display: "flex", color: "#E0C48A" }}>{siteConfig.siteUrl}</div>
        </div>
      </div>
    ),
    size
  );
}
