/**
 * V3 — Curiosidade / Revelação
 * Pergunta suspensa no centro + reticências + revelação.
 *
 * Sequência de animação (30fps):
 *  F0-35   → fundo + arcos concêntricos aparecem devagar
 *  F50-72  → label "Guia Digital"
 *  F75-162 → pergunta linha por linha (3x)
 *  F188-260→ reticências com stagger (3 pontos)
 *  F288-348→ régua + texto de revelação
 *  F348-450→ hold com glow pulsante
 */
import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PLAYFAIR, INTER } from "./fonts";

export const Video3: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── background + arcos ──────────────────────────────
  const bgOp    = interpolate(frame, [0, 35], [0, 1],  { extrapolateRight: "clamp" });
  const arcsOp  = interpolate(frame, [0, 50], [0, 0.12], { extrapolateRight: "clamp" });
  const glowInt = 0.13 + Math.sin(frame * 0.035) * 0.045;

  // ── label ────────────────────────────────────────────
  const labelOp = interpolate(frame, [50, 72], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── linhas da pergunta ───────────────────────────────
  const q1Sp = spring({ frame: frame - 75,  fps, config: { damping: 72, stiffness: 85 } });
  const q2Sp = spring({ frame: frame - 108, fps, config: { damping: 72, stiffness: 85 } });
  const q3Sp = spring({ frame: frame - 140, fps, config: { damping: 72, stiffness: 85 } });

  const q1Y = interpolate(q1Sp, [0, 1], [34, 0]);
  const q2Y = interpolate(q2Sp, [0, 1], [34, 0]);
  const q3Y = interpolate(q3Sp, [0, 1], [34, 0]);

  const q1Op = interpolate(frame, [75,  95],  [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const q2Op = interpolate(frame, [108, 128], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const q3Op = interpolate(frame, [140, 162], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── reticências (stagger) ────────────────────────────
  const d1Op = interpolate(frame, [188, 215], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const d2Op = interpolate(frame, [212, 238], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const d3Op = interpolate(frame, [235, 260], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const d1Scale = interpolate(d1Op, [0, 1], [0.5, 1]);
  const d2Scale = interpolate(d2Op, [0, 1], [0.5, 1]);
  const d3Scale = interpolate(d3Op, [0, 1], [0.5, 1]);

  // ── revelação ────────────────────────────────────────
  const ruleOp = interpolate(frame, [288, 318], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const revSp  = spring({ frame: frame - 320, fps, config: { damping: 72, stiffness: 85 } });
  const revY   = interpolate(revSp, [0, 1], [18, 0]);
  const revOp  = interpolate(frame, [320, 350], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: bgOp }}>

      {/* fundo */}
      <AbsoluteFill style={{
        background: "linear-gradient(160deg, #2D1B2E 0%, #381530 50%, #4A1F3A 100%)",
      }} />

      {/* glow central pulsante */}
      <AbsoluteFill style={{
        background: `radial-gradient(ellipse 72% 68% at 50% 50%,
          rgba(201,169,110,${glowInt}) 0%,
          rgba(74,31,58,0.22) 45%,
          transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* arcos concêntricos via SVG inline */}
      <AbsoluteFill style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        opacity: arcsOp,
        pointerEvents: "none",
      }}>
        <svg width="680" height="680" viewBox="0 0 680 680" fill="none">
          <circle cx="340" cy="340" r="308" stroke="#C9A96E" strokeWidth="1" />
          <circle cx="340" cy="340" r="242" stroke="#C9A96E" strokeWidth="0.6" />
          <circle cx="340" cy="340" r="178" stroke="#C9A96E" strokeWidth="0.4" />
        </svg>
      </AbsoluteFill>

      {/* área segura */}
      <div style={{
        position: "absolute",
        top: 162, left: 162, right: 162, bottom: 162,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
      }}>

        {/* label topo */}
        <div style={{
          fontFamily: INTER, fontSize: 22, fontWeight: 500,
          letterSpacing: 5, textTransform: "uppercase",
          color: "rgba(201,169,110,0.5)",
          opacity: labelOp,
        }}>
          Guia Digital
        </div>

        {/* bloco central — pergunta */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          <div style={{ overflow: "hidden" }}>
            <div style={{
              fontFamily: PLAYFAIR, fontStyle: "italic",
              fontSize: 82, fontWeight: 700,
              lineHeight: 1.08, color: "#F5EBE0", letterSpacing: -1,
              opacity: q1Op, transform: `translateY(${q1Y}px)`,
            }}>
              Por que você
            </div>
          </div>

          <div style={{ overflow: "hidden" }}>
            <div style={{
              fontFamily: PLAYFAIR, fontStyle: "italic",
              fontSize: 82, fontWeight: 700,
              lineHeight: 1.08, color: "rgba(245,235,224,0.68)", letterSpacing: -1,
              opacity: q2Op, transform: `translateY(${q2Y}px)`,
            }}>
              come menos
            </div>
          </div>

          <div style={{ overflow: "hidden", marginBottom: 28 }}>
            <div style={{
              fontFamily: PLAYFAIR, fontStyle: "italic",
              fontSize: 82, fontWeight: 700,
              lineHeight: 1.08, color: "#F5EBE0", letterSpacing: -1,
              opacity: q3Op, transform: `translateY(${q3Y}px)`,
            }}>
              e mesmo assim...
            </div>
          </div>

          {/* reticências com stagger */}
          <div style={{ display: "flex", gap: 16, alignItems: "center", justifyContent: "center" }}>
            <span style={{
              fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: 80,
              color: "#C9726A", lineHeight: 1,
              opacity: d1Op, transform: `scale(${d1Scale})`,
            }}>.</span>
            <span style={{
              fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: 80,
              color: "#C9726A", lineHeight: 1,
              opacity: d2Op, transform: `scale(${d2Scale})`,
            }}>.</span>
            <span style={{
              fontFamily: PLAYFAIR, fontStyle: "italic", fontSize: 80,
              color: "rgba(201,114,106,0.4)", lineHeight: 1,
              opacity: d3Op, transform: `scale(${d3Scale})`,
            }}>.</span>
          </div>

        </div>

        {/* revelação rodapé */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
          <div style={{
            width: 56, height: 2,
            background: "linear-gradient(90deg, transparent, #C9A96E, transparent)",
            opacity: ruleOp,
          }} />
          <div style={{
            fontFamily: INTER, fontSize: 30, fontWeight: 500,
            color: "#C9A96E", letterSpacing: 0.3,
            opacity: revOp, transform: `translateY(${revY}px)`,
          }}>
            A resposta que ninguém te deu.{" "}
            <span style={{ color: "#C9726A", fontWeight: 700 }}>→</span>
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
