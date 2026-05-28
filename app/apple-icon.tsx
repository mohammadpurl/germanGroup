import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
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
          background: "#0A0F14",
          borderRadius: 40,
          border: "6px solid rgba(224,196,138,0.35)",
          color: "#E0C48A",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: "-0.06em",
        }}
      >
        G
      </div>
    ),
    size
  );
}
