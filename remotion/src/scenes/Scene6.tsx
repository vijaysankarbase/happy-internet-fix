import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["500", "600"], subsets: ["latin"] });

export const Scene6 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 330;

  const t = frame / durationInFrames;
  const scale = interpolate(t, [0, 1], [1.05, 1.18]);

  const inFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const outFade = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(inFade, outFade);

  const mainSpring = spring({ frame: frame - 30, fps, config: { damping: 16, stiffness: 70 } });
  const textScale = interpolate(mainSpring, [0, 1], [0.7, 1]);
  const textOp = interpolate(mainSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });

  const glitch = (frame > 50 && frame < 56) || (frame > 130 && frame < 136) ? (frame % 2 === 0 ? 12 : -12) : 0;
  const ab = Math.sin(frame * 0.15) * 4 + 5;

  const barH = 110;
  const barReveal = interpolate(frame, [0, 25], [barH, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", backgroundColor: "#000" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale})`,
          opacity,
        }}
      >
        <Img
          src={staticFile("images/vincent-cyberpunk-4.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* darken for text legibility */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.55) 35%, rgba(0,0,0,0.15) 60%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(180deg, rgba(10,2,20,0.4) 0%, transparent 30%, transparent 70%, rgba(10,2,20,0.6) 100%)",
        }}
      />

      {/* scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.2) 3px, transparent 4px)",
        }}
      />

      {/* text panel on left */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: 100,
          transform: `translateY(-50%) scale(${textScale}) translateX(${glitch}px)`,
          opacity: textOp,
          maxWidth: 900,
          zIndex: 10,
        }}
      >
        <div
          style={{
            color: "#f0abfc",
            fontFamily: rajdhani,
            fontSize: 28,
            letterSpacing: 10,
            textTransform: "uppercase",
            marginBottom: 24,
            textShadow: "0 0 18px #ec4899",
          }}
        >
          ◢ The Ask ◣
        </div>

        <div style={{ position: "relative", marginBottom: 36 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#ec4899",
              fontFamily: orbitron,
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              transform: `translateX(${-ab}px)`,
              mixBlendMode: "screen",
              lineHeight: 1.05,
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
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              transform: `translateX(${ab}px)`,
              mixBlendMode: "screen",
              lineHeight: 1.05,
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
              fontSize: 96,
              fontWeight: 900,
              letterSpacing: 8,
              textTransform: "uppercase",
              textShadow: "0 4px 30px rgba(0,0,0,0.95), 0 0 60px rgba(236, 72, 153, 0.7)",
              lineHeight: 1.05,
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
            textShadow: "0 2px 12px rgba(0,0,0,0.9)",
          }}
        >
          ░ Tribe Lead Authorization Required ░
        </div>
      </div>

      {/* letterbox */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: barH - barReveal, background: "#000", zIndex: 5 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: barH - barReveal, background: "#000", zIndex: 5 }} />
    </div>
  );
};
