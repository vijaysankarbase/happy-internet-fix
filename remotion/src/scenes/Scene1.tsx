import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily } = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["500"], subsets: ["latin"] });

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const textSpring = spring({ frame: frame - 12, fps, config: { damping: 14, stiffness: 80 } });
  const textScale = interpolate(textSpring, [0, 1], [1.3, 1]);
  const lineWidth = interpolate(frame, [8, 45], [0, 600], { extrapolateRight: "clamp" });

  // chromatic aberration shimmer
  const ab = Math.sin(frame * 0.3) * 4 + (frame < 25 ? 8 : 2);
  const glitch = frame > 22 && frame < 28 ? (frame % 2 === 0 ? 12 : -12) : 0;

  // bracket reveal
  const bracket = interpolate(frame, [5, 30], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily,
        position: "relative",
      }}
    >
      {/* warning chevrons */}
      <div
        style={{
          position: "absolute",
          top: 80,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          gap: 12,
          opacity,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              color: i % 2 === 0 ? "#f0abfc" : "#22d3ee",
              fontSize: 24,
              opacity: Math.sin(frame * 0.2 + i * 0.5) * 0.4 + 0.6,
            }}
          >
            ▲
          </div>
        ))}
      </div>

      <div
        style={{
          opacity,
          color: "#f0abfc",
          fontFamily: rajdhani,
          fontSize: 30,
          letterSpacing: 14,
          textTransform: "uppercase",
          marginBottom: 28,
          textShadow: "0 0 20px #ec4899",
        }}
      >
        ◢ Priority Alert ◣
      </div>

      <div
        style={{
          width: lineWidth,
          height: 2,
          background: "linear-gradient(90deg, transparent, #f0abfc, #22d3ee, transparent)",
          marginBottom: 28,
          boxShadow: "0 0 10px #ec4899",
        }}
      />

      <div style={{ position: "relative", transform: `scale(${Math.max(0, textScale)})` }}>
        {/* chromatic layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            color: "#ec4899",
            fontSize: 130,
            fontWeight: 900,
            letterSpacing: 14,
            textAlign: "center",
            textTransform: "uppercase",
            transform: `translateX(${-ab + glitch}px)`,
            mixBlendMode: "screen",
            opacity: 0.85,
          }}
        >
          Incoming
          <br />
          Transmission
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            color: "#06b6d4",
            fontSize: 130,
            fontWeight: 900,
            letterSpacing: 14,
            textAlign: "center",
            textTransform: "uppercase",
            transform: `translateX(${ab - glitch}px)`,
            mixBlendMode: "screen",
            opacity: 0.85,
          }}
        >
          Incoming
          <br />
          Transmission
        </div>
        <div
          style={{
            position: "relative",
            color: "#ffffff",
            fontSize: 130,
            fontWeight: 900,
            letterSpacing: 14,
            textAlign: "center",
            textTransform: "uppercase",
            textShadow: "0 0 60px rgba(236, 72, 153, 0.6)",
          }}
        >
          Incoming
          <br />
          Transmission
        </div>
      </div>

      {/* corner brackets */}
      {[
        { top: 40, left: 40, b: "TL" },
        { top: 40, right: 40, b: "TR" },
        { bottom: 40, left: 40, b: "BL" },
        { bottom: 40, right: 40, b: "BR" },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            ...pos,
            width: 60 * bracket,
            height: 60 * bracket,
            borderTop: pos.b.startsWith("T") ? "3px solid #22d3ee" : "none",
            borderBottom: pos.b.startsWith("B") ? "3px solid #22d3ee" : "none",
            borderLeft: pos.b.endsWith("L") ? "3px solid #22d3ee" : "none",
            borderRight: pos.b.endsWith("R") ? "3px solid #22d3ee" : "none",
            boxShadow: "0 0 20px #06b6d4",
          }}
        />
      ))}

      <div
        style={{
          position: "absolute",
          bottom: 100,
          color: "#22d3ee",
          fontFamily: rajdhani,
          fontSize: 18,
          letterSpacing: 6,
          textTransform: "uppercase",
          opacity: interpolate(frame, [30, 50], [0, 0.8], { extrapolateRight: "clamp" }),
        }}
      >
        ░░ Decoding signal ░░ {String(Math.floor(frame * 1.5) % 100).padStart(2, "0")}%
      </div>
    </div>
  );
};
