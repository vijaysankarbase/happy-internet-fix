import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["600"], subsets: ["latin"] });

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const mainSpring = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });
  const scale = interpolate(mainSpring, [0, 1], [0.7, 1]);
  const opacity = interpolate(mainSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const glitchOffset =
    frame > 20 && frame < 25 ? (frame % 2 === 0 ? 8 : -8) : 0;

  const pulse = Math.sin(frame * 0.15) * 0.15 + 0.85;

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
          transform: `scale(${scale}) translateX(${glitchOffset}px)`,
          opacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: "#22d3ee",
            fontFamily: rajdhani,
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Objective
        </div>

        <div
          style={{
            color: "#ffffff",
            fontFamily: orbitron,
            fontSize: 90,
            fontWeight: 700,
            letterSpacing: 10,
            textTransform: "uppercase",
            textShadow: "0 0 50px rgba(6, 182, 212, 0.5)",
            lineHeight: 1.1,
            marginBottom: 32,
          }}
        >
          We Want
          <br />
          Your Buy-In
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontFamily: rajdhani,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          Focus: Important Tribe Lead Buy-In
        </div>

        <div
          style={{
            width: 60,
            height: 60,
            border: "3px solid #06b6d4",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            transform: `scale(${pulse})`,
            boxShadow: `0 0 30px rgba(6, 182, 212, ${pulse * 0.4})`,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "16px solid #06b6d4",
              borderTop: "10px solid transparent",
              borderBottom: "10px solid transparent",
              marginLeft: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
};
