import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";

const { fontFamily } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });

  const lineWidth = interpolate(frame, [10, 40], [0, 400], { extrapolateRight: "clamp" });
  const lineOpacity = interpolate(frame, [40, 55], [1, 0], { extrapolateLeft: "clamp" });

  const textScale = spring({ frame: frame - 15, fps, config: { damping: 12, stiffness: 80 } });

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
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          color: "#22d3ee",
          fontSize: 28,
          letterSpacing: 8,
          textTransform: "uppercase",
          marginBottom: 24,
        }}
      >
        Priority Alert
      </div>

      <div
        style={{
          width: lineWidth,
          height: 2,
          background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
          opacity: lineOpacity,
        }}
      />

      <div
        style={{
          transform: `scale(${Math.max(0, textScale)})`,
          color: "#ffffff",
          fontSize: 96,
          fontWeight: 700,
          letterSpacing: 12,
          textAlign: "center",
          textTransform: "uppercase",
          marginTop: 24,
          textShadow: "0 0 40px rgba(6, 182, 212, 0.5)",
        }}
      >
        Incoming
        <br />
        Transmission
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: interpolate(frame, [30, 50], [0, 0.6], { extrapolateRight: "clamp" }),
        }}
      >
        <div
          style={{
            width: 200,
            height: 3,
            background: "#06b6d4",
            margin: "0 auto",
          }}
        />
        <div
          style={{
            color: "#22d3ee",
            fontSize: 16,
            letterSpacing: 4,
            textAlign: "center",
            marginTop: 12,
            textTransform: "uppercase",
          }}
        >
          Decoding...
        </div>
      </div>
    </div>
  );
};
