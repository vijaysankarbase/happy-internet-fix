import { useCurrentFrame, useVideoConfig, interpolate, staticFile, Img } from "remotion";
import { loadFont } from "@remotion/google-fonts/Rajdhani";

const { fontFamily: rajdhani } = loadFont("normal", { weights: ["500", "600"], subsets: ["latin"] });

type Props = {
  image: string;
  zoomFrom?: number;
  zoomTo?: number;
  panX?: number;
  panY?: number;
  caption?: string;
  timecode?: string;
  durationInFrames: number;
};

export const CinematicShot = ({
  image,
  zoomFrom = 1.0,
  zoomTo = 1.12,
  panX = 0,
  panY = 0,
  caption,
  timecode,
  durationInFrames,
}: Props) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // slow ken-burns
  const t = frame / durationInFrames;
  const scale = interpolate(t, [0, 1], [zoomFrom, zoomTo]);
  const tx = interpolate(t, [0, 1], [0, panX]);
  const ty = interpolate(t, [0, 1], [0, panY]);

  // fade in/out edges of shot
  const inFade = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const outFade = interpolate(frame, [durationInFrames - 20, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
  });
  const opacity = Math.min(inFade, outFade);

  // letterbox bars
  const barH = 110;
  const barReveal = interpolate(frame, [0, 25], [barH, 0], { extrapolateRight: "clamp" });

  // text reveal
  const captionOp = interpolate(frame, [25, 50], [0, 1], { extrapolateRight: "clamp" });
  const captionY = interpolate(frame, [25, 50], [20, 0], { extrapolateRight: "clamp" });

  // subtle gate weave
  const weave = Math.sin(frame * 0.4) * 0.6 + Math.sin(frame * 0.13) * 0.4;

  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", backgroundColor: "#000" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: `scale(${scale}) translate(${tx + weave}px, ${ty}px)`,
          opacity,
        }}
      >
        <Img
          src={staticFile(image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* color grade overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(15,3,30,0.25) 0%, transparent 30%, transparent 70%, rgba(10,2,20,0.5) 100%)",
          mixBlendMode: "multiply",
        }}
      />

      {/* scanlines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.18) 3px, transparent 4px)",
          pointerEvents: "none",
        }}
      />

      {/* film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.12,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "300px 300px",
          backgroundPosition: `${(frame * 7) % 300}px ${(frame * 13) % 300}px`,
        }}
      />

      {/* vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* letterbox bars */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: barH - barReveal,
          background: "#000",
          zIndex: 5,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: barH - barReveal,
          background: "#000",
          zIndex: 5,
        }}
      />

      {/* timecode overlay */}
      {timecode && (
        <div
          style={{
            position: "absolute",
            top: barH + 24,
            left: 40,
            color: "#f0abfc",
            fontFamily: rajdhani,
            fontSize: 16,
            letterSpacing: 4,
            textTransform: "uppercase",
            opacity: 0.85,
            zIndex: 10,
            textShadow: "0 0 8px #ec4899",
          }}
        >
          ● REC {timecode}
        </div>
      )}

      {/* caption */}
      {caption && (
        <div
          style={{
            position: "absolute",
            bottom: barH + 36,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "#ffffff",
            fontFamily: rajdhani,
            fontWeight: 600,
            fontSize: 28,
            letterSpacing: 6,
            textTransform: "uppercase",
            opacity: captionOp,
            transform: `translateY(${captionY}px)`,
            textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 0 30px rgba(236,72,153,0.5)",
            zIndex: 10,
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
};
