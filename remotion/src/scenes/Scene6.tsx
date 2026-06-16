import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile, Img } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["500", "600", "700"], subsets: ["latin"] });

const ASKS = [
  { code: "01", label: "Sponsorship" },
  { code: "02", label: "Half a day of participants' time" },
  { code: "03", label: "Kickoff appearance" },
  { code: "04", label: "Seat on the jury panel" },
];

export const Scene6 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const durationInFrames = 330;

  const t = frame / durationInFrames;
  const scale = interpolate(t, [0, 1], [1.05, 1.18]);

  const inFade = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const outFade = interpolate(frame, [durationInFrames - 25, durationInFrames], [1, 0], { extrapolateLeft: "clamp" });
  const opacity = Math.min(inFade, outFade);

  const headSpring = spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 80 } });
  const headOp = interpolate(headSpring, [0, 0.5], [0, 1], { extrapolateRight: "clamp" });
  const headY = interpolate(headSpring, [0, 1], [30, 0]);

  const ab = Math.sin(frame * 0.15) * 3 + 4;
  const barH = 110;
  const barReveal = interpolate(frame, [0, 25], [barH, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", backgroundColor: "#000" }}>
      <div style={{ position: "absolute", inset: 0, transform: `scale(${scale})`, opacity }}>
        <Img
          src={staticFile("images/vincent-cyberpunk-4.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.78) 45%, rgba(0,0,0,0.35) 75%, transparent 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.2) 3px, transparent 4px)",
        }}
      />

      {/* Header */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 100,
          right: 100,
          transform: `translateY(${headY}px)`,
          opacity: headOp,
          zIndex: 10,
        }}
      >
        <div
          style={{
            color: "#f0abfc",
            fontFamily: rajdhani,
            fontSize: 26,
            letterSpacing: 12,
            textTransform: "uppercase",
            marginBottom: 18,
            textShadow: "0 0 18px #ec4899",
          }}
        >
          ◢ Mission Briefing · The Ask ◣
        </div>

        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#ec4899",
              fontFamily: orbitron,
              fontSize: 82,
              fontWeight: 900,
              letterSpacing: 6,
              textTransform: "uppercase",
              transform: `translateX(${-ab}px)`,
              mixBlendMode: "screen",
              lineHeight: 1.05,
            }}
          >
            We Need You,
            <br />
            Tribe Lead
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#06b6d4",
              fontFamily: orbitron,
              fontSize: 82,
              fontWeight: 900,
              letterSpacing: 6,
              textTransform: "uppercase",
              transform: `translateX(${ab}px)`,
              mixBlendMode: "screen",
              lineHeight: 1.05,
            }}
          >
            We Need You,
            <br />
            Tribe Lead
          </div>
          <div
            style={{
              position: "relative",
              color: "#ffffff",
              fontFamily: orbitron,
              fontSize: 82,
              fontWeight: 900,
              letterSpacing: 6,
              textTransform: "uppercase",
              textShadow: "0 4px 30px rgba(0,0,0,0.95), 0 0 60px rgba(236, 72, 153, 0.7)",
              lineHeight: 1.05,
            }}
          >
            We Need You,
            <br />
            Tribe Lead
          </div>
        </div>
      </div>

      {/* Ask list */}
      <div
        style={{
          position: "absolute",
          top: 460,
          left: 100,
          right: 100,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: 22,
        }}
      >
        {ASKS.map((ask, i) => {
          const startFrame = 70 + i * 28;
          const s = spring({ frame: frame - startFrame, fps, config: { damping: 16, stiffness: 90 } });
          const op = interpolate(s, [0, 0.6], [0, 1], { extrapolateRight: "clamp" });
          const x = interpolate(s, [0, 1], [-60, 0]);
          const lineW = interpolate(s, [0, 1], [0, 1100]);
          return (
            <div
              key={ask.code}
              style={{
                opacity: op,
                transform: `translateX(${x}px)`,
                display: "flex",
                alignItems: "center",
                gap: 28,
              }}
            >
              <div
                style={{
                  color: "#22d3ee",
                  fontFamily: orbitron,
                  fontSize: 38,
                  fontWeight: 700,
                  letterSpacing: 4,
                  minWidth: 90,
                  textShadow: "0 0 14px #06b6d4",
                }}
              >
                /{ask.code}
              </div>
              <div
                style={{
                  width: 4,
                  height: 56,
                  background: "linear-gradient(180deg, #f0abfc, #22d3ee)",
                  boxShadow: "0 0 10px #ec4899",
                }}
              />
              <div
                style={{
                  color: "#ffffff",
                  fontFamily: rajdhani,
                  fontSize: 46,
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  textShadow: "0 2px 14px rgba(0,0,0,0.95)",
                  flex: 1,
                }}
              >
                {ask.label}
                <div
                  style={{
                    width: lineW,
                    maxWidth: "100%",
                    height: 1,
                    background: "linear-gradient(90deg, #22d3ee, transparent)",
                    marginTop: 4,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* letterbox */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: barH - barReveal, background: "#000", zIndex: 5 }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: barH - barReveal, background: "#000", zIndex: 5 }} />
    </div>
  );
};
