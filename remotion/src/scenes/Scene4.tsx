import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["600"], subsets: ["latin"] });

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const mainSpring = spring({ frame, fps, config: { damping: 16, stiffness: 75 } });
  const scale = interpolate(mainSpring, [0, 1], [0.6, 1]);
  const opacity = interpolate(mainSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const glitchActive = (frame > 18 && frame < 26) || (frame > 80 && frame < 86);
  const glitchOffset = glitchActive ? (frame % 2 === 0 ? 14 : -14) : 0;
  const ab = Math.sin(frame * 0.15) * 4 + 5;

  const pulse = Math.sin(frame * 0.18) * 0.18 + 0.82;

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
            color: "#f0abfc",
            fontFamily: rajdhani,
            fontSize: 30,
            letterSpacing: 10,
            textTransform: "uppercase",
            marginBottom: 24,
            textShadow: "0 0 18px #ec4899",
          }}
        >
          ◢ Objective ◣
        </div>

        <div style={{ position: "relative", marginBottom: 36 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#ec4899",
              fontFamily: orbitron,
              fontSize: 110,
              fontWeight: 900,
              letterSpacing: 12,
              textTransform: "uppercase",
              transform: `translateX(${-ab}px)`,
              mixBlendMode: "screen",
              lineHeight: 1.1,
            }}
          >
            We Want
            <br />
            Your Buy-In
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#06b6d4",
              fontFamily: orbitron,
              fontSize: 110,
              fontWeight: 900,
              letterSpacing: 12,
              textTransform: "uppercase",
              transform: `translateX(${ab}px)`,
              mixBlendMode: "screen",
              lineHeight: 1.1,
            }}
          >
            We Want
            <br />
            Your Buy-In
          </div>
          <div
            style={{
              position: "relative",
              color: "#ffffff",
              fontFamily: orbitron,
              fontSize: 110,
              fontWeight: 900,
              letterSpacing: 12,
              textTransform: "uppercase",
              textShadow: "0 0 60px rgba(236, 72, 153, 0.7)",
              lineHeight: 1.1,
            }}
          >
            We Want
            <br />
            Your Buy-In
          </div>
        </div>

        <div
          style={{
            color: "#22d3ee",
            fontFamily: rajdhani,
            fontSize: 26,
            letterSpacing: 5,
            textTransform: "uppercase",
            marginBottom: 52,
          }}
        >
          ░ Tribe Lead Authorization Required ░
        </div>

        <div
          style={{
            width: 70,
            height: 70,
            border: "3px solid #f0abfc",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            transform: `scale(${pulse})`,
            boxShadow: `0 0 40px rgba(236, 72, 153, ${pulse * 0.6})`,
          }}
        >
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "18px solid #f0abfc",
              borderTop: "12px solid transparent",
              borderBottom: "12px solid transparent",
              marginLeft: 5,
            }}
          />
        </div>
      </div>
    </div>
  );
};
