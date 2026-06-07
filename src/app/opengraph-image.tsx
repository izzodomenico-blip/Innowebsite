import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = `${company.name} — Material handling e automazione industriale`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CYAN = "#22d3ee";
const corner = (pos: React.CSSProperties): React.CSSProperties => ({
  position: "absolute",
  width: "30px",
  height: "30px",
  display: "flex",
  ...pos,
});

/** OG card generata a build-time (brandizzata, nessuna immagine stock). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#09090b",
          padding: "72px",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow superiore */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "440px",
            backgroundImage:
              "radial-gradient(60% 80% at 50% 0%, rgba(34,211,238,0.20), rgba(9,9,11,0))",
            display: "flex",
          }}
        />

        {/* Tacche di registro */}
        <div style={corner({ top: "34px", left: "34px", borderTop: `2px solid ${CYAN}`, borderLeft: `2px solid ${CYAN}` })} />
        <div style={corner({ top: "34px", right: "34px", borderTop: `2px solid ${CYAN}`, borderRight: `2px solid ${CYAN}` })} />
        <div style={corner({ bottom: "34px", left: "34px", borderBottom: `2px solid ${CYAN}`, borderLeft: `2px solid ${CYAN}` })} />
        <div style={corner({ bottom: "34px", right: "34px", borderBottom: `2px solid ${CYAN}`, borderRight: `2px solid ${CYAN}` })} />

        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", color: CYAN, fontSize: "22px", letterSpacing: "4px" }}>
            {"MATERIAL HANDLING & AUTOMAZIONE INDUSTRIALE"}
          </div>
          <div style={{ display: "flex", fontSize: "30px", fontWeight: 700, color: "#ffffff" }}>
            <span>{"INNO"}</span>
            <span style={{ color: CYAN }}>{".TEC"}</span>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
          <div
            style={{
              display: "flex",
              fontSize: "88px",
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.02,
              letterSpacing: "-2px",
              maxWidth: "920px",
            }}
          >
            {"Diamo movimento all'industria."}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
          <div style={{ display: "flex", width: "52px", height: "3px", backgroundColor: CYAN, marginRight: "20px" }} />
          <div style={{ display: "flex", color: "#a1a1aa", fontSize: "26px" }}>
            {"Inno.Tec S.r.l. · Marcianise (CE)"}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
