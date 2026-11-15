import { useEffect, useRef } from "react";

// Keep the traces in narrow edge panels so they never cross the reading area.
const traces = [
  { path: "M 20 0 V 130 Q 20 138 28 146 L 70 188 Q 78 196 78 204 V 290", x: 78, y: 290 },
  { path: "M 0 350 H 36 Q 44 350 44 358 V 410 Q 44 418 52 426 L 112 486 Q 120 494 120 502 V 570", x: 120, y: 570 },
  { path: "M 0 660 H 62 Q 70 660 70 668 V 740 Q 70 748 62 756 L 32 786 Q 24 794 24 802 V 900", x: 70, y: 700 },
  { path: "M 0 95 H 66 Q 74 95 82 103 L 120 141 Q 128 149 128 157 V 210", x: 128, y: 210 },
];

function CircuitEdge({ side }) {
  return (
    <svg
      className={`circuit-edge circuit-edge-${side}`}
      viewBox="0 0 160 900"
      preserveAspectRatio="none"
      focusable="false"
    >
      {traces.map(({ path, x, y }, index) => (
        <g key={path} className={index === 3 ? "circuit-detail" : undefined}>
          <path className="circuit-trace" d={path} />
          <circle className="circuit-terminal" cx={x} cy={y} r="3" />
          {index === 0 && (
            <circle className="circuit-glow" cx={x} cy={y} r="8" />
          )}
        </g>
      ))}
    </svg>
  );
}

export function CircuitBackground({ paused }) {
  const element = useRef(null);

  useEffect(() => {
    const target = element.current;
    const update = () => {
      target.dataset.running = String(!document.hidden);
    };
    document.addEventListener("visibilitychange", update);
    update();
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (
    <div ref={element} className="tech-background" data-paused={paused} aria-hidden="true">
      <div className="tech-dot-grid" />
      <CircuitEdge side="left" />
      <CircuitEdge side="right" />
    </div>
  );
}
