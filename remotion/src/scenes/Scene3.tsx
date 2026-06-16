import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["500", "700"], subsets: ["latin"] });

const benefits = [
  { icon: "◆", title: "Sponsorship", desc: "Your name on it" },
  { icon: "◈", title: "Half Day or Day", desc: "Window you choose" },
  { icon: "◎", title: "Kick-off Appearance", desc: "Opening presence" },
  { icon: "◉", title: "Part of the Jury", desc: "Optional role" },
];

export const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();

  const titleSpring = spring({ frame, fps, config: { damping: 15, stiffness: 100 } });
  const titleY = interpolate(titleSpring, [0, 1], [-100, 0]);

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
        padding: "0 100px",
      }}
    >
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          textAlign: "center",
          marginBottom: 60,
        }}
      >
        <div
          style={{
            color: "#22d3ee",
            fontFamily: rajdhani,
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Mission Parameters
        </div>
        <div
          style={{
            color: "#ffffff",
            fontFamily: orbitron,
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 6,
            textTransform: "uppercase",
            textShadow: "0 0 40px rgba(6, 182, 212, 0.4)",
          }}
        >
          AI Hackathon
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px 80px",
          maxWidth: 1200,
        }}
      >
        {benefits.map((benefit, i) => {
          const delay = 20 + i * 15;
          const itemSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 12, stiffness: 80 },
          });
          const itemX = interpolate(itemSpring, [0, 1], [width / 2, 0]);
          const itemOpacity = interpolate(itemSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 20,
                transform: `translateX(${itemX}px)`,
                opacity: itemOpacity,
              }}
            >
              <div
                style={{
                  color: "#06b6d4",
                  fontSize: 36,
                  fontFamily: orbitron,
                  lineHeight: 1,
                  minWidth: 40,
                  textAlign: "center",
                  textShadow: "0 0 20px rgba(6, 182, 212, 0.6)",
                }}
              >
                {benefit.icon}
              </div>
              <div>
                <div
                  style={{
                    color: "#ffffff",
                    fontFamily: orbitron,
                    fontSize: 28,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  {benefit.title}
                </div>
                <div
                  style={{
                    color: "#94a3b8",
                    fontFamily: rajdhani,
                    fontSize: 22,
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  {benefit.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
