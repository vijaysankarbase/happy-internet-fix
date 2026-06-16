import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["500"], subsets: ["latin"] });

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 15, stiffness: 60 } });
  const y = interpolate(enter, [0, 1], [100, 0]);
  const opacity = interpolate(enter, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const lineExpand = interpolate(frame, [15, 50], [0, 300], { extrapolateRight: "clamp" });

  const blink = Math.sin(frame * 0.2) > 0 ? 1 : 0.3;

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
      <div
        style={{
          transform: `translateY(${y}px)`,
          opacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: lineExpand,
            height: 2,
            background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
            margin: "0 auto 40px",
          }}
        />

        <div
          style={{
            color: "#ffffff",
            fontFamily: orbitron,
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            textShadow: "0 0 40px rgba(6, 182, 212, 0.5)",
            marginBottom: 24,
          }}
        >
          Awaiting Your
          <br />
          Response
        </div>

        <div
          style={{
            color: "#22d3ee",
            fontFamily: rajdhani,
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: blink,
          }}
        >
          Transmission End
        </div>

        <div
          style={{
            width: lineExpand,
            height: 2,
            background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
            margin: "40px auto 0",
          }}
        />
      </div>
    </div>
  );
};
