/**
 * V1 — Quebra de Crença
 * "A estratégia que funcionava aos 30 não funciona mais."
 *
 * Sequência de animação (30fps):
 *  F0-18   → canvas fade in
 *  F20-50  → label + linha vertical
 *  F47-70  → régua dourada cresce
 *  F65-130 → headline linha por linha (3x)
 *  F148-175→ subline
 *  F210-255→ divisória se desenha
 *  F257-285→ footer desliza
 *  F285-450→ hold com glow pulsante
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

export const Video1: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── background ──────────────────────────────────────
  const bgOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const glowPulse = 0.12 + Math.sin(frame * 0.04) * 0.04;

  // ── label + linha vertical ───────────────────────────
  const vertOpacity = interpolate(frame, [20, 45], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });
  const labelSp = spring({ frame: frame - 22, fps, config: { damping: 75, stiffness: 90 } });
  const labelY  = interpolate(labelSp, [0, 1], [18, 0]);
  const labelOp = interpolate(frame, [22, 50], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── régua dourada ────────────────────────────────────
  const ruleSp = spring({ frame: frame - 47, fps, config: { damping: 70, stiffness: 80 } });
  const ruleW  = interpolate(ruleSp, [0, 1], [0, 80]);

  // ── headline (3 linhas) ──────────────────────────────
  const h1Sp = spring({ frame: frame - 65,  fps, config: { damping: 75, stiffness: 95 } });
  const h2Sp = spring({ frame: frame - 85,  fps, config: { damping: 75, stiffness: 95 } });
  const h3Sp = spring({ frame: frame - 105, fps, config: { damping: 75, stiffness: 95 } });

  const h1Y = interpolate(h1Sp, [0, 1], [38, 0]);
  const h2Y = interpolate(h2Sp, [0, 1], [38, 0]);
  const h3Y = interpolate(h3Sp, [0, 1], [38, 0]);

  const h1Op = interpolate(frame, [65,  83],  [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const h2Op = interpolate(frame, [85,  103], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const h3Op = interpolate(frame, [105, 123], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── subline ──────────────────────────────────────────
  const subSp = spring({ frame: frame - 148, fps, config: { damping: 72, stiffness: 88 } });
  const subY  = interpolate(subSp, [0, 1], [22, 0]);
  const subOp = interpolate(frame, [148, 170], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── divisória ────────────────────────────────────────
  const divW = interpolate(frame, [210, 255], [0, 100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── footer ───────────────────────────────────────────
  const footSp = spring({ frame: frame - 257, fps, config: { damping: 75, stiffness: 90 } });
  const footX  = interpolate(footSp, [0, 1], [-18, 0]);
  const footOp = interpolate(frame, [257, 280], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>

      {/* fundo gradiente */}
      <AbsoluteFill style={{
        background: "linear-gradient(145deg, #2D1B2E 0%, #3A1630 45%, #4A1F3A 100%)",
      }} />

      {/* glows atmosféricos */}
      <AbsoluteFill style={{
        background: `
          radial-gradient(ellipse 65% 55% at 90% 10%, rgba(201,169,110,${glowPulse}) 0%, transparent 55%),
          radial-gradient(ellipse 45% 40% at 10% 95%, rgba(201,114,106,0.08) 0%, transparent 50%)
        `,
        pointerEvents: "none",
      }} />

      {/* linha vertical decorativa */}
      <div style={{
        position: "absolute",
        left: 128, top: 162, bottom: 162,
        width: 2,
        background: "linear-gradient(180deg, transparent, rgba(201,169,110,0.45) 20%, rgba(201,169,110,0.45) 80%, transparent)",
        opacity: vertOpacity,
      }} />

      {/* área segura (15% = 162px; left offset para linha vertical) */}
      <div style={{
        position: "absolute",
        top: 162, left: 196, right: 162, bottom: 162,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>

        {/* label */}
        <div style={{
          fontFamily: INTER,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#C9A96E",
          marginBottom: 32,
          opacity: labelOp,
          transform: `translateY(${labelY}px)`,
        }}>
          Guia Digital
        </div>

        {/* régua dourada */}
        <div style={{
          height: 2,
          width: ruleW,
          background: "linear-gradient(90deg, #C9A96E, rgba(201,169,110,0.15))",
          marginBottom: 50,
        }} />

        {/* headline linha 1 */}
        <div style={{ overflow: "hidden", marginBottom: 2 }}>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 84, fontWeight: 700,
            lineHeight: 1.07, color: "#F5EBE0",
            opacity: h1Op, transform: `translateY(${h1Y}px)`,
          }}>
            A estratégia que
          </div>
        </div>

        {/* headline linha 2 */}
        <div style={{ overflow: "hidden", marginBottom: 2 }}>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 84, fontWeight: 700, lineHeight: 1.07,
            opacity: h2Op, transform: `translateY(${h2Y}px)`,
          }}>
            <span style={{ color: "#F5EBE0" }}>funcionava </span>
            <span style={{ color: "#C9726A", fontStyle: "italic" }}>aos 30</span>
          </div>
        </div>

        {/* headline linha 3 */}
        <div style={{ overflow: "hidden", marginBottom: 44 }}>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 84, fontWeight: 700,
            lineHeight: 1.07, color: "#F5EBE0",
            opacity: h3Op, transform: `translateY(${h3Y}px)`,
          }}>
            não funciona mais.
          </div>
        </div>

        {/* subline */}
        <div style={{
          fontFamily: PLAYFAIR, fontStyle: "italic",
          fontSize: 50, lineHeight: 1.2,
          color: "rgba(245,235,224,0.55)",
          marginBottom: 58,
          opacity: subOp, transform: `translateY(${subY}px)`,
        }}>
          E não é culpa sua.
        </div>

        {/* divisória */}
        <div style={{
          height: 1,
          width: `${divW}%`,
          background: "linear-gradient(90deg, rgba(201,169,110,0.5), rgba(201,169,110,0.04))",
          marginBottom: 38,
        }} />

        {/* footer */}
        <div style={{
          display: "flex", alignItems: "center", gap: 14,
          fontFamily: INTER, fontSize: 30, fontWeight: 500,
          color: "#C9A96E",
          opacity: footOp, transform: `translateX(${footX}px)`,
        }}>
          Descubra o porquê{" "}
          <span style={{ color: "#C9726A", fontSize: 34, fontWeight: 700 }}>→</span>
        </div>

      </div>
    </AbsoluteFill>
  );
};
