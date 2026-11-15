import { useEffect, useRef } from "react";

// Fixed coordinates keep the composition stable across renders and resizing.
function createNetwork(columns, rows, gapX, gapY, offsetX, offsetY) {
  const nodes = Array.from({ length: columns * rows }, (_, index) => {
    const column = index % columns;
    const row = Math.floor(index / columns);
    return {
      x: offsetX + column * gapX + Math.sin(row * 2 + column) * 22,
      y: offsetY + row * gapY + Math.cos(column * 2 + row) * 24,
    };
  });
  const edges = [];
  const seen = new Set();
  nodes.forEach((node, index) => {
    nodes
      .map((other, otherIndex) => ({
        index: otherIndex,
        distance: Math.hypot(other.x - node.x, other.y - node.y),
      }))
      .filter((other) => other.index !== index)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 3)
      .forEach((other) => {
        const key = [index, other.index].sort((a, b) => a - b).join("-");
        if (!seen.has(key)) {
          seen.add(key);
          edges.push({ key, from: node, to: nodes[other.index] });
        }
      });
  });
  return { nodes, edges };
}

const desktopNetwork = createNetwork(6, 4, 230, 205, 25, 40);
const mobileNetwork = createNetwork(3, 5, 185, 185, 10, 20);

function NetworkDrawing({ network, className, viewBox }) {
  return (
    <svg
      className={className}
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <g className="network-constellation">
        {network.edges.map(({ key, from, to }) => (
          <g key={key}>
            <path
              className="network-edge"
              d={`M ${from.x} ${from.y} L ${to.x} ${to.y}`}
            />
          </g>
        ))}
        {network.nodes.map(({ x, y }, index) => (
          <g key={index}>
            {index % 5 === 0 && (
              <circle className="network-node-halo" cx={x} cy={y} r="10" />
            )}
            <circle
              className="network-node"
              cx={x}
              cy={y}
              r={index % 5 === 0 ? 4 : 2.5}
            />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function NetworkBackground({ paused }) {
  const element = useRef(null);

  useEffect(() => {
    const target = element.current;
    const update = () => {
      target.dataset.running = String(!document.hidden);
    };
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div
      ref={element}
      className="site-network"
      data-paused={paused}
      aria-hidden="true"
    >
      <NetworkDrawing
        network={desktopNetwork}
        className="network-desktop"
        viewBox="0 0 1200 700"
      />
      <NetworkDrawing
        network={mobileNetwork}
        className="network-mobile"
        viewBox="0 0 400 780"
      />
    </div>
  );
}
