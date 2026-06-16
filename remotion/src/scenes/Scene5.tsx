import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["500", "600"], subsets: ["latin"] });

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 60 } });
  const y = interpolate(enter, [0, 1], [120, 0]);
  const opacity = interpolate(enter, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const lineExpand = interpolate(frame, [12, 50], [0, 900], { extrapolateRight: "clamp" });
  const ab = Math.sin(frame * 0.12) * 3 + 4;
  const glitch = (frame > 40 && frame < 46) || (frame > 110 && frame < 116) ? (frame % 2 === 0 ? 10 : -10) : 0;

  const subSpring = spring({ frame: frame - 35, fps, config: { damping: 18, stiffness: 70 } });
  const subY = interpolate(subSpring, [0, 1], [40, 0]);
  const subOp = interpolate(subSpring, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div style={{ transform: `translateY(${y}px)`, opacity, textAlign: "center" }}>
        <div
          style={{
            color: "#22d3ee",
            fontFamily: rajdhani,
            fontSize: 26,
            letterSpacing: 14,
            textTransform: "uppercase",
            marginBottom: 28,
            textShadow: "0 0 14px #06b6d4",
          }}
        >
          ░ Operation Codename ░
        </div>

        <div
          style={{
            width: lineExpand,
            height: 2,
            background: "linear-gradient(90deg, transparent, #f0abfc, #22d3ee, transparent)",
            margin: "0 auto 40px",
            boxShadow: "0 0 10px #ec4899",
          }}
        />

        <div style={{ position: "relative", marginBottom: 36, transform: `translateX(${glitch}px)` }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#ec4899",
              fontFamily: orbitron,
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              transform: `translateX(${-ab}px)`,
              mixBlendMode: "screen",
              lineHeight: 1,
            }}
          >
            GenAI
            <br />
            Débrouille
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#06b6d4",
              fontFamily: orbitron,
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              transform: `translateX(${ab}px)`,
              mixBlendMode: "screen",
              lineHeight: 1,
            }}
          >
            GenAI
            <br />
            Débrouille
          </div>
          <div
            style={{
              position: "relative",
              color: "#ffffff",
              fontFamily: orbitron,
              fontSize: 140,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              textShadow: "0 0 60px rgba(236, 72, 153, 0.7)",
              lineHeight: 1,
            }}
          >
            GenAI
            <br />
            Débrouille
          </div>
        </div>

        <div
          style={{
            transform: `translateY(${subY}px)`,
            opacity: subOp,
            color: "#f0abfc",
            fontFamily: rajdhani,
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: 10,
            textTransform: "uppercase",
            textShadow: "0 0 18px #ec4899",
          }}
        >
          The AI Hackathon
        </div>

        <div
          style={{
            width: lineExpand,
            height: 2,
            background: "linear-gradient(90deg, transparent, #22d3ee, #f0abfc, transparent)",
            margin: "40px auto 0",
            boxShadow: "0 0 10px #06b6d4",
          }}
        />
      </div>
    </div>
  );
};
