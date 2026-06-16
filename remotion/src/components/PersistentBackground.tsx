import { useCurrentFrame, useVideoConfig, random } from "remotion";

export const PersistentBackground = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const gridSize = 80;
  const scanY = (frame * 6) % (height + 200) - 100;

  // perspective floor grid lines
  const horizonY = height * 0.62;
  const floorLines = 14;

  // city skyline buildings
  const buildings = Array.from({ length: 22 }).map((_, i) => {
    const w = 40 + random(`bw-${i}`) * 80;
    const h = 80 + random(`bh-${i}`) * 280;
    const x = (i * 95) - 60;
    return { x, w, h, key: i };
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
        background:
          "radial-gradient(ellipse at 50% 110%, #4a044e 0%, #1e1b4b 30%, #020617 70%)",
      }}
    >
      {/* sun / moon disc */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: horizonY - 280,
          transform: "translateX(-50%)",
          width: 380,
          height: 380,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #ec4899 0%, #be185d 40%, transparent 70%)",
          opacity: 0.55,
          filter: "blur(2px)",
        }}
      />

      {/* skyline */}
      <svg width={width} height={height} style={{ position: "absolute", inset: 0 }}>
        {buildings.map((b) => (
          <g key={b.key}>
            <rect
              x={b.x}
              y={horizonY - b.h}
              width={b.w}
              height={b.h}
              fill="#0b0420"
              stroke="#06b6d4"
              strokeWidth={0.8}
              opacity={0.85}
            />
            {Array.from({ length: Math.floor(b.h / 18) }).map((_, r) =>
              Array.from({ length: Math.floor(b.w / 12) }).map((_, c) => {
                const lit = random(`w-${b.key}-${r}-${c}`) > 0.55;
                if (!lit) return null;
                const flicker =
                  random(`f-${b.key}-${r}-${c}`) > 0.92
                    ? (Math.sin(frame * 0.4 + r + c) > 0 ? 1 : 0.2)
                    : 1;
                return (
                  <rect
                    key={`${r}-${c}`}
                    x={b.x + c * 12 + 3}
                    y={horizonY - b.h + r * 18 + 4}
                    width={4}
                    height={6}
                    fill={random(`co-${b.key}-${r}-${c}`) > 0.7 ? "#f0abfc" : "#22d3ee"}
                    opacity={0.85 * flicker}
                  />
                );
              })
            )}
          </g>
        ))}

        {/* perspective floor */}
        {Array.from({ length: floorLines }).map((_, i) => {
          const t = i / floorLines;
          const y = horizonY + Math.pow(t + (frame * 0.004) % (1 / floorLines), 2) * (height - horizonY) * 2;
          if (y > height) return null;
          return (
            <line
              key={i}
              x1={0}
              x2={width}
              y1={y}
              y2={y}
              stroke="#ec4899"
              strokeWidth={1}
              opacity={0.5 * (1 - (y - horizonY) / (height - horizonY)) + 0.1}
            />
          );
        })}
        {Array.from({ length: 21 }).map((_, i) => {
          const x = (i - 10) / 10;
          return (
            <line
              key={`v-${i}`}
              x1={width / 2 + x * 60}
              y1={horizonY}
              x2={width / 2 + x * width}
              y2={height}
              stroke="#06b6d4"
              strokeWidth={1}
              opacity={0.35}
            />
          );
        })}

        {/* upper grid */}
        <defs>
          <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
            <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke="#22d3ee" strokeWidth={0.5} opacity={0.15} />
          </pattern>
        </defs>
        <rect width={width} height={horizonY} fill="url(#grid)" />
      </svg>

      {/* scanline */}
      <div
        style={{
          position: "absolute",
          top: scanY,
          left: 0,
          width: "100%",
          height: 3,
          background: "linear-gradient(90deg, transparent, #f0abfc, #22d3ee, transparent)",
          opacity: 0.35,
        }}
      />

      {/* horizontal scanline overlay (CRT) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 4px)",
          pointerEvents: "none",
          mixBlendMode: "multiply",
        }}
      />

      {/* vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* drifting embers */}
      {Array.from({ length: 30 }).map((_, i) => {
        const seed = i / 30;
        const size = 2 + random(`s-${i}`) * 3;
        const x = (random(`x-${i}`) * width + Math.sin(frame * 0.02 + i) * 40) % width;
        const y = ((frame * (0.6 + random(`v-${i}`) * 1.2) + seed * height * 2) % (height + 100)) - 50;
        const hue = random(`h-${i}`) > 0.5 ? "#22d3ee" : "#f0abfc";
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: height - y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: hue,
              opacity: 0.5,
              boxShadow: `0 0 ${size * 4}px ${hue}`,
            }}
          />
        );
      })}

      {/* film grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.08,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "300px 300px",
          backgroundPosition: `${(frame * 7) % 300}px ${(frame * 13) % 300}px`,
        }}
      />
    </div>
  );
};
