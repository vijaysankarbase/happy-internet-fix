import { useCurrentFrame, useVideoConfig } from "remotion";

export const PersistentBackground = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const gridOpacity = 0.08;
  const gridSize = 60;

  const scanY = (frame * 4) % (height + 200) - 100;

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width,
        height,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      <svg width={width} height={height} style={{ position: "absolute" }}>
        <defs>
          <pattern
            id="grid"
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
              fill="none"
              stroke="#06b6d4"
              strokeWidth={0.5}
              opacity={gridOpacity}
            />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#grid)" />
      </svg>

      <div
        style={{
          position: "absolute",
          top: scanY,
          left: 0,
          width: "100%",
          height: 2,
          background: "linear-gradient(90deg, transparent, #06b6d4, transparent)",
          opacity: 0.3,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.05) 0%, transparent 70%)",
        }}
      />

      {Array.from({ length: 6 }).map((_, i) => {
        const size = 3 + Math.random() * 4;
        const x = (Math.sin(frame * 0.01 + i * 1.5) * 0.5 + 0.5) * width;
        const y = ((frame * (0.3 + i * 0.1) + i * 150) % (height + 100)) - 50;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: "#22d3ee",
              opacity: 0.2 + Math.sin(frame * 0.05 + i) * 0.1,
              boxShadow: `0 0 ${size * 2}px #22d3ee`,
            }}
          />
        );
      })}
    </div>
  );
};
