/**
 * V2 — Identificação / Dor
 * Bullets que o público reconhece em si mesmo + resolução.
 *
 * Sequência de animação (30fps):
 *  F0-18   → canvas fade in
 *  F25-52  → label centralizado
 *  F60-100 → bullet 1 desliza da esquerda
 *  F100-140→ bullet 2 desliza
 *  F143-183→ bullet 3 (destaque) desliza
 *  F210-248→ régua inferior se desenha
 *  F242-275→ linha de resolução lead
 *  F268-308→ linha de resolução principal
 *  F308-450→ hold
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

export const Video2: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // ── background ───────────────────────────────────────
  const bgOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const glowPulse = 0.10 + Math.sin(frame * 0.038) * 0.03;

  // ── label ────────────────────────────────────────────
  const labelOp = interpolate(frame, [25, 52], [0, 1], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  // ── bullets (deslize da esquerda) ────────────────────
  const b1Sp = spring({ frame: frame - 60,  fps, config: { damping: 65, stiffness: 85 } });
  const b2Sp = spring({ frame: frame - 100, fps, config: { damping: 65, stiffness: 85 } });
  const b3Sp = spring({ frame: frame - 143, fps, config: { damping: 65, stiffness: 85 } });

  const b1X = interpolate(b1Sp, [0, 1], [-55, 0]);
  const b2X = interpolate(b2Sp, [0, 1], [-55, 0]);
  const b3X = interpolate(b3Sp, [0, 1], [-55, 0]);

  const b1Op = interpolate(frame, [60,  78],  [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b2Op = interpolate(frame, [100, 118], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const b3Op = interpolate(frame, [143, 161], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // ── divisória + resolução ────────────────────────────
  const ruleW = interpolate(frame, [210, 248], [0, 100], {
    extrapolateLeft: "clamp", extrapolateRight: "clamp",
  });

  const r1Sp = spring({ frame: frame - 242, fps, config: { damping: 72, stiffness: 90 } });
  const r1Y  = interpolate(r1Sp, [0, 1], [20, 0]);
  const r1Op = interpolate(frame, [242, 265], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  const r2Sp = spring({ frame: frame - 268, fps, config: { damping: 72, stiffness: 90 } });
  const r2Y  = interpolate(r2Sp, [0, 1], [20, 0]);
  const r2Op = interpolate(frame, [268, 295], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ opacity: bgOpacity }}>

      {/* fundo */}
      <AbsoluteFill style={{
        background: "linear-gradient(155deg, #2D1B2E 0%, #421A38 55%, #4A1F3A 100%)",
      }} />

      {/* glows */}
      <AbsoluteFill style={{
        background: `
          radial-gradient(ellipse 55% 50% at 5% 5%,   rgba(201,169,110,${glowPulse}) 0%, transparent 55%),
          radial-gradient(ellipse 60% 40% at 100% 100%, rgba(201,114,106,0.07) 0%, transparent 50%)
        `,
        pointerEvents: "none",
      }} />

      {/* área segura */}
      <div style={{
        position: "absolute",
        top: 162, left: 162, right: 162, bottom: 162,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>

        {/* label com linhas dos dois lados */}
        <div style={{
          display: "flex", alignItems: "center", gap: 18, opacity: labelOp,
        }}>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, rgba(201,169,110,0.5), transparent)" }} />
          <span style={{
            fontFamily: INTER, fontSize: 22, fontWeight: 600,
            letterSpacing: 5, textTransform: "uppercase",
            color: "#C9A96E", whiteSpace: "nowrap",
          }}>
            Você se reconhece?
          </span>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(201,169,110,0.5))" }} />
        </div>

        {/* bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>

          <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: b1Op, transform: `translateX(${b1X}px)` }}>
            <span style={{ fontSize: 30, color: "#C9A96E", flexShrink: 0 }}>✦</span>
            <span style={{ fontFamily: INTER, fontSize: 58, fontWeight: 600, color: "#F5EBE0", lineHeight: 1.1, letterSpacing: -0.5 }}>
              Come com cuidado
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: b2Op, transform: `translateX(${b2X}px)` }}>
            <span style={{ fontSize: 30, color: "#C9A96E", flexShrink: 0 }}>✦</span>
            <span style={{ fontFamily: INTER, fontSize: 58, fontWeight: 600, color: "#F5EBE0", lineHeight: 1.1, letterSpacing: -0.5 }}>
              Tenta se movimentar
            </span>
          </div>

          {/* último bullet em destaque */}
          <div style={{ display: "flex", alignItems: "center", gap: 20, opacity: b3Op, transform: `translateX(${b3X}px)` }}>
            <span style={{ fontSize: 30, color: "#C9726A", flexShrink: 0 }}>✦</span>
            <span style={{ fontFamily: INTER, fontSize: 54, fontWeight: 600, color: "#C9726A", lineHeight: 1.1, letterSpacing: -0.5 }}>
              Ainda assim não vê resultado
            </span>
          </div>

        </div>

        {/* resolução */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{
            height: 1,
            width: `${ruleW}%`,
            background: "linear-gradient(90deg, rgba(201,169,110,0.45), transparent 70%)",
            marginBottom: 28,
          }} />
          <div style={{
            fontFamily: PLAYFAIR, fontStyle: "italic",
            fontSize: 44, color: "rgba(245,235,224,0.5)", lineHeight: 1.25,
            marginBottom: 8,
            opacity: r1Op, transform: `translateY(${r1Y}px)`,
          }}>
            Se você se identificou —
          </div>
          <div style={{
            fontFamily: PLAYFAIR, fontSize: 52, fontWeight: 700,
            color: "#F5EBE0", lineHeight: 1.15,
            opacity: r2Op, transform: `translateY(${r2Y}px)`,
          }}>
            a <span style={{ color: "#C9A96E" }}>explicação</span> está aqui.
          </div>
        </div>

      </div>
    </AbsoluteFill>
  );
};
