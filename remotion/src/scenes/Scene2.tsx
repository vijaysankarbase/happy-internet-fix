import { useCurrentFrame, useVideoConfig, interpolate, spring, staticFile } from "remotion";
import { loadFont } from "@remotion/google-fonts/Orbitron";
import { loadFont as loadRajdhani } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: orbitron } = loadFont("normal", { weights: ["700"], subsets: ["latin"] });
const { fontFamily: rajdhani } = loadRajdhani("normal", { weights: ["600"], subsets: ["latin"] });

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, config: { damping: 20, stiffness: 120 } });
  const x = interpolate(slideIn, [0, 1], [-300, 0]);

  const imageReveal = spring({ frame: frame - 15, fps, config: { damping: 15, stiffness: 80 } });
  const imageScale = interpolate(imageReveal, [0, 1], [0.8, 1]);
  const imageOpacity = interpolate(imageReveal, [0, 1], [0, 1]);

  const labelReveal = spring({ frame: frame - 35, fps, config: { damping: 12, stiffness: 60 } });
  const labelX = interpolate(labelReveal, [0, 1], [200, 0]);

  const cornerSize = 30;
  const cornerColor = "#06b6d4";
      };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 80,
        position: "relative",
      }}
    >
      <div style={{ transform: `translateX(${x}px)` }}>
        <div
          style={{
            position: "relative",
            width: 420,
            height: 500,
            border: "2px solid #06b6d4",
            padding: 12,
            opacity: imageOpacity,
            transform: `scale(${imageScale})`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -2,
              left: -2,
              width: cornerSize,
              height: cornerSize,
              borderTop: `3px solid ${cornerColor}`,
              borderLeft: `3px solid ${cornerColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              top: -2,
              right: -2,
              width: cornerSize,
              height: cornerSize,
              borderTop: `3px solid ${cornerColor}`,
              borderRight: `3px solid ${cornerColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -2,
              left: -2,
              width: cornerSize,
              height: cornerSize,
              borderBottom: `3px solid ${cornerColor}`,
              borderLeft: `3px solid ${cornerColor}`,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: -2,
              right: -2,
              width: cornerSize,
              height: cornerSize,
              borderBottom: `3px solid ${cornerColor}`,
              borderRight: `3px solid ${cornerColor}`,
            }}
          />

          <img
            src={staticFile("images/vincent-pitch.png")}
            alt="Vincent"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>

      <div style={{ transform: `translateX(${labelX}px)` }}>
        <div
          style={{
            color: "#22d3ee",
            fontFamily: rajdhani,
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Subject Identified
        </div>
        <div
          style={{
            color: "#ffffff",
            fontFamily: orbitron,
            fontSize: 80,
            fontWeight: 700,
            letterSpacing: 8,
            textTransform: "uppercase",
            textShadow: "0 0 30px rgba(6, 182, 212, 0.4)",
            marginBottom: 24,
          }}
        >
          Vincent
        </div>
        <div
          style={{
            color: "#94a3b8",
            fontFamily: rajdhani,
            fontSize: 28,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          Role: Tribe Lead
          <br />
          Status: Critical Target
        </div>

        <div
          style={{
            marginTop: 40,
            width: 120,
            height: 3,
            background: "linear-gradient(90deg, #06b6d4, transparent)",
          }}
        />
      </div>
    </div>
  );
};
