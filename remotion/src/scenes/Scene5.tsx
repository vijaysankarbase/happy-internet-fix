import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["500"], subsets: ["latin"] });

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 16, stiffness: 60 } });
  const y = interpolate(enter, [0, 1], [120, 0]);
  const opacity = interpolate(enter, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const lineExpand = interpolate(frame, [12, 50], [0, 400], { extrapolateRight: "clamp" });
  const blink = Math.sin(frame * 0.25) > 0 ? 1 : 0.25;
  const ab = Math.sin(frame * 0.1) * 2 + 3;

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
            background: "linear-gradient(90deg, transparent, #f0abfc, #22d3ee, transparent)",
            margin: "0 auto 48px",
            boxShadow: "0 0 10px #ec4899",
          }}
        />

        <div style={{ position: "relative", marginBottom: 32 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#ec4899",
              fontFamily: orbitron,
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: 10,
              textTransform: "uppercase",
              transform: `translateX(${-ab}px)`,
              mixBlendMode: "screen",
            }}
          >
            Awaiting Your
            <br />
            Response
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#06b6d4",
              fontFamily: orbitron,
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: 10,
              textTransform: "uppercase",
              transform: `translateX(${ab}px)`,
              mixBlendMode: "screen",
            }}
          >
            Awaiting Your
            <br />
            Response
          </div>
          <div
            style={{
              position: "relative",
              color: "#ffffff",
              fontFamily: orbitron,
              fontSize: 78,
              fontWeight: 900,
              letterSpacing: 10,
              textTransform: "uppercase",
              textShadow: "0 0 50px rgba(236, 72, 153, 0.6)",
            }}
          >
            Awaiting Your
            <br />
            Response
          </div>
        </div>

        <div
          style={{
            color: "#f0abfc",
            fontFamily: rajdhani,
            fontSize: 24,
            letterSpacing: 8,
            textTransform: "uppercase",
            opacity: blink,
            textShadow: "0 0 12px #ec4899",
          }}
        >
          ▌ Transmission End ▐
        </div>

        <div
          style={{
            width: lineExpand,
            height: 2,
            background: "linear-gradient(90deg, transparent, #22d3ee, #f0abfc, transparent)",
            margin: "48px auto 0",
            boxShadow: "0 0 10px #06b6d4",
          }}
        />
      </div>
    </div>
  );
};
