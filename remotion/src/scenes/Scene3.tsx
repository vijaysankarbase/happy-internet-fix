import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] });
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

  const titleSpring = spring({ frame, fps, config: { damping: 16, stiffness: 90 } });
  const titleY = interpolate(titleSpring, [0, 1], [-120, 0]);
  const titleOpacity = interpolate(titleSpring, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });

  const ab = Math.sin(frame * 0.12) * 3 + 4;

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
        padding: "0 120px",
      }}
    >
      <div
        style={{
          transform: `translateY(${titleY}px)`,
          opacity: titleOpacity,
          textAlign: "center",
          marginBottom: 70,
        }}
      >
        <div
          style={{
            color: "#f0abfc",
            fontFamily: rajdhani,
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            marginBottom: 14,
            textShadow: "0 0 15px #ec4899",
          }}
        >
          ◢ Mission Parameters ◣
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#ec4899",
              fontFamily: orbitron,
              fontSize: 90,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              transform: `translateX(${-ab}px)`,
              mixBlendMode: "screen",
            }}
          >
            AI Hackathon
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#06b6d4",
              fontFamily: orbitron,
              fontSize: 90,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              transform: `translateX(${ab}px)`,
              mixBlendMode: "screen",
            }}
          >
            AI Hackathon
          </div>
          <div
            style={{
              position: "relative",
              color: "#ffffff",
              fontFamily: orbitron,
              fontSize: 90,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              textShadow: "0 0 50px rgba(236, 72, 153, 0.6)",
            }}
          >
            AI Hackathon
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "44px 90px",
          maxWidth: 1300,
        }}
      >
        {benefits.map((benefit, i) => {
          const delay = 25 + i * 18;
          const itemSpring = spring({
            frame: frame - delay,
            fps,
            config: { damping: 14, stiffness: 85 },
          });
          const itemX = interpolate(itemSpring, [0, 1], [width / 3, 0]);
          const itemOpacity = interpolate(itemSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 24,
                transform: `translateX(${itemX}px)`,
                opacity: itemOpacity,
                padding: "18px 22px",
                border: "1px solid rgba(236, 72, 153, 0.4)",
                background: "linear-gradient(135deg, rgba(236,72,153,0.08), rgba(6,182,212,0.05))",
                boxShadow: "inset 0 0 20px rgba(6,182,212,0.1)",
              }}
            >
              <div
                style={{
                  color: "#f0abfc",
                  fontSize: 42,
                  fontFamily: orbitron,
                  lineHeight: 1,
                  minWidth: 48,
                  textAlign: "center",
                  textShadow: "0 0 24px #ec4899",
                }}
              >
                {benefit.icon}
              </div>
              <div>
                <div
                  style={{
                    color: "#ffffff",
                    fontFamily: orbitron,
                    fontSize: 30,
                    fontWeight: 700,
                    letterSpacing: 3,
                    textTransform: "uppercase",
                    marginBottom: 6,
                    textShadow: "0 0 15px rgba(34, 211, 238, 0.6)",
                  }}
                >
                  {benefit.title}
                </div>
                <div
                  style={{
                    color: "#22d3ee",
                    fontFamily: rajdhani,
                    fontSize: 22,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  &gt; {benefit.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
