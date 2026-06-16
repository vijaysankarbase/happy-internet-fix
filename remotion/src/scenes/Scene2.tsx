import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700", "900"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["500", "600"], subsets: ["latin"] });

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, config: { damping: 22, stiffness: 110 } });
  const x = interpolate(slideIn, [0, 1], [-400, 0]);

  const imageReveal = spring({ frame: frame - 10, fps, config: { damping: 18, stiffness: 80 } });
  const imageOpacity = interpolate(imageReveal, [0, 1], [0, 1]);
  const clipReveal = interpolate(imageReveal, [0, 1], [100, 0]);

  const labelReveal = spring({ frame: frame - 30, fps, config: { damping: 14, stiffness: 70 } });
  const labelX = interpolate(labelReveal, [0, 1], [300, 0]);
  const labelOpacity = interpolate(labelReveal, [0, 0.7], [0, 1], { extrapolateRight: "clamp" });

  const glitch = frame > 35 && frame < 42 ? (frame % 2 === 0 ? 6 : -6) : 0;
  const ab = Math.sin(frame * 0.1) * 2 + 3;

  const cornerSize = 36;
  const cornerColor = "#f0abfc";

  // scanning line over image
  const imgScan = ((frame * 6) % 540);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 100,
        position: "relative",
      }}
    >
      <div style={{ transform: `translateX(${x}px)` }}>
        <div
          style={{
            position: "relative",
            width: 460,
            height: 540,
            border: "2px solid #f0abfc",
            padding: 14,
            opacity: imageOpacity,
            boxShadow: "0 0 60px rgba(236, 72, 153, 0.5), inset 0 0 30px rgba(34, 211, 238, 0.2)",
          }}
        >
          {[
            { top: -2, left: -2, t: true, l: true },
            { top: -2, right: -2, t: true, r: true },
            { bottom: -2, left: -2, b: true, l: true },
            { bottom: -2, right: -2, b: true, r: true },
          ].map((c, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                ...c,
                width: cornerSize,
                height: cornerSize,
                borderTop: c.t ? `4px solid ${cornerColor}` : "none",
                borderBottom: c.b ? `4px solid ${cornerColor}` : "none",
                borderLeft: c.l ? `4px solid ${cornerColor}` : "none",
                borderRight: c.r ? `4px solid ${cornerColor}` : "none",
                boxShadow: "0 0 15px #ec4899",
              }}
            />
          ))}

          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              overflow: "hidden",
              clipPath: `inset(${clipReveal}% 0 0 0)`,
            }}
          >
            <img
              src={staticFile("images/vincent-pitch.png")}
              alt="Vincent"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                filter: "contrast(1.1) saturate(1.2) hue-rotate(-5deg)",
              }}
            />
            {/* magenta/cyan duotone overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, rgba(236,72,153,0.25), rgba(6,182,212,0.25))",
                mixBlendMode: "color",
              }}
            />
            {/* scanlines */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(0deg, transparent 0, transparent 2px, rgba(0,0,0,0.4) 3px, transparent 4px)",
              }}
            />
            {/* scanning beam */}
            <div
              style={{
                position: "absolute",
                top: imgScan,
                left: 0,
                width: "100%",
                height: 30,
                background: "linear-gradient(180deg, transparent, rgba(34,211,238,0.5), transparent)",
              }}
            />
            {/* targeting reticle */}
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 80,
                height: 80,
                border: "1.5px solid #22d3ee",
                borderRadius: "50%",
                opacity: 0.7,
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "30%",
                left: 0,
                right: 0,
                height: 1,
                background: "#22d3ee",
                opacity: 0.4,
              }}
            />
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 1,
                background: "#22d3ee",
                opacity: 0.4,
              }}
            />
          </div>

          {/* data readout */}
          <div
            style={{
              position: "absolute",
              bottom: -30,
              left: 14,
              right: 14,
              display: "flex",
              justifyContent: "space-between",
              color: "#22d3ee",
              fontFamily: rajdhani,
              fontSize: 13,
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            <span>ID: 0x{(frame * 7 + 4096).toString(16).toUpperCase()}</span>
            <span>● LIVE</span>
          </div>
        </div>
      </div>

      <div style={{ transform: `translateX(${labelX}px)`, opacity: labelOpacity }}>
        <div
          style={{
            color: "#f0abfc",
            fontFamily: rajdhani,
            fontSize: 26,
            letterSpacing: 8,
            textTransform: "uppercase",
            marginBottom: 18,
            textShadow: "0 0 15px #ec4899",
          }}
        >
          ▌ Subject Identified
        </div>
        <div style={{ position: "relative", marginBottom: 28 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#ec4899",
              fontFamily: orbitron,
              fontSize: 110,
              fontWeight: 900,
              letterSpacing: 10,
              textTransform: "uppercase",
              transform: `translateX(${-ab + glitch}px)`,
              mixBlendMode: "screen",
            }}
          >
            Vincent
          </div>
          <div
            style={{
              position: "absolute",
              inset: 0,
              color: "#06b6d4",
              fontFamily: orbitron,
              fontSize: 110,
              fontWeight: 900,
              letterSpacing: 10,
              textTransform: "uppercase",
              transform: `translateX(${ab - glitch}px)`,
              mixBlendMode: "screen",
            }}
          >
            Vincent
          </div>
          <div
            style={{
              position: "relative",
              color: "#ffffff",
              fontFamily: orbitron,
              fontSize: 110,
              fontWeight: 900,
              letterSpacing: 10,
              textTransform: "uppercase",
              textShadow: "0 0 40px rgba(236, 72, 153, 0.6)",
            }}
          >
            Vincent
          </div>
        </div>
        <div
          style={{
            color: "#cbd5e1",
            fontFamily: rajdhani,
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            lineHeight: 1.6,
          }}
        >
          <div>
            <span style={{ color: "#22d3ee" }}>// Role: </span>Tribe Lead
          </div>
          <div>
            <span style={{ color: "#22d3ee" }}>// Status: </span>
            <span style={{ color: "#f0abfc" }}>Critical Target</span>
          </div>
          <div>
            <span style={{ color: "#22d3ee" }}>// Clearance: </span>Level 9
          </div>
        </div>

        <div
          style={{
            marginTop: 40,
            width: 180,
            height: 4,
            background: "linear-gradient(90deg, #ec4899, #06b6d4, transparent)",
            boxShadow: "0 0 12px #ec4899",
          }}
        />
      </div>
    </div>
  );
};
