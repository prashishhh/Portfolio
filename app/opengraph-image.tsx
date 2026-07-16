import { ImageResponse } from "next/og";

export const alt = "Prashish Sapkota — Product Builder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "48px 56px",
        background: "#f4f4f1",
        color: "#171717",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingBottom: 22,
          borderBottom: "2px solid rgba(23,23,23,.14)",
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: "0.04em",
        }}
      >
        <span>PRASHISH SAPKOTA</span>
        <span style={{ color: "#757575" }}>PRASHISHSAPKOTA.COM.NP</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", letterSpacing: "-0.075em" }}>
        <span style={{ fontSize: 144, fontWeight: 900, lineHeight: 0.82 }}>PRODUCT</span>
        <span style={{ fontSize: 144, fontWeight: 900, lineHeight: 0.82, color: "#2f5bff" }}>BUILDER</span>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 22,
          borderTop: "2px solid rgba(23,23,23,.14)",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.08em",
        }}
      >
        <span>DESIGN · DEVELOPMENT · AI</span>
        <span style={{ color: "#2f5bff" }}>KATHMANDU, NEPAL</span>
      </div>
    </div>,
    size,
  );
}
