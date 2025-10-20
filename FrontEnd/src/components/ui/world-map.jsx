import { useRef, useMemo, memo, useCallback } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

export const WorldMap = memo(function WorldMap({
  dots = [],
  lineColor = "#0ea5e9",
  darkMode = false,
}) {
  const svgRef = useRef(null);
  
  // Memoize the map and SVG generation to prevent recreation on every render
  const svgMap = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    return map.getSVG({
      radius: 0.22,
      color: darkMode ? "#FFFFFF40" : "#00000040",
      shape: "circle",
      backgroundColor: darkMode ? "black" : "white",
    });
  }, [darkMode]);

  // Use useCallback for functions instead of useMemo
  const projectPoint = useCallback((lat, lng) => {
    const x = (lng + 180) * (800 / 360);
    const y = (90 - lat) * (400 / 180);
    return { x, y };
  }, []);

  const createCurvedPath = useCallback((start, end) => {
    const midX = (start.x + end.x) / 2;
    const midY = Math.min(start.y, end.y) - 50;
    return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100%",
    minHeight: "400px",
    backgroundColor: darkMode ? "black" : "white",
    position: "relative",
    fontFamily: "system-ui, -apple-system, sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const imageStyle = {
    height: "120%",
    width: "120%",
    transform: "scale(1.2)",
    WebkitMaskImage:
      "linear-gradient(to bottom, transparent, white 5%, white 95%, transparent)",
    maskImage:
      "linear-gradient(to bottom, transparent, white 5%, white 95%, transparent)",
    pointerEvents: "none",
    userSelect: "none",
  };

  const svgStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    userSelect: "none",
    paddingTop: "40px",
    paddingLeft: "10px",
    transform: "scale(1.4)",
  };

  return (
    <motion.div
      style={containerStyle}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <img
        src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`}
        style={imageStyle}
        alt="world map"
        height="495"
        width="1056"
        draggable={false}
      />
      <svg ref={svgRef} viewBox="0 0 800 400" style={svgStyle}>
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="5%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="95%" stopColor={lineColor} stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>

        {dots.map((dot, i) => {
          const startPoint = projectPoint(dot.start.lat, dot.start.lng);
          const endPoint = projectPoint(dot.end.lat, dot.end.lng);
          return (
            <g key={`path-group-${i}`}>
              <motion.path
                d={createCurvedPath(startPoint, endPoint)}
                fill="none"
                stroke="url(#path-gradient)"
                strokeWidth="1"
                variants={{
                  hidden: { pathLength: 0 },
                  visible: {
                    pathLength: 1,
                    transition: {
                      duration: 1,
                      delay: 0.15 * i,
                      ease: "easeOut",
                    },
                  },
                }}
              />
            </g>
          );
        })}

        {dots.map((dot, i) => (
          <g key={`points-group-${i}`}>
            <g key={`start-${i}`}>
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.start.lat, dot.start.lng).x}
                cy={projectPoint(dot.start.lat, dot.start.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            <g key={`end-${i}`}>
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
              />
              <circle
                cx={projectPoint(dot.end.lat, dot.end.lng).x}
                cy={projectPoint(dot.end.lat, dot.end.lng).y}
                r="2"
                fill={lineColor}
                opacity="0.5"
              >
                <animate
                  attributeName="r"
                  from="2"
                  to="8"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.5"
                  to="0"
                  dur="1.5s"
                  begin="0s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        ))}
      </svg>
    </motion.div>
  );
});

// Demo Component - Memoized to prevent re-renders when parent state changes
const WorldMapDemo = memo(function WorldMapDemo() {
  return (
    <div
      style={{
        flex: "1 1 60%",
        minWidth: "300px",
        backgroundColor: "#f9f9f9",
        borderRadius: "12px",
        overflow: "hidden",
        display: "flex",
        alignItems: "stretch",
      }}
    >
      <WorldMap
        darkMode={false}
        lineColor="#0ea5e9"
        dots={[
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska
            end: { lat: 34.0522, lng: -118.2437 }, // Los Angeles
          },
          {
            start: { lat: 64.2008, lng: -149.4937 }, // Alaska
            end: { lat: -15.7975, lng: -47.8919 }, // Brazil
          },
          {
            start: { lat: -15.7975, lng: -47.8919 }, // Brazil
            end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
          },
          {
            start: { lat: 51.5074, lng: -0.1278 }, // London
            end: { lat: 28.6139, lng: 77.209 }, // New Delhi
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
          },
          {
            start: { lat: 28.6139, lng: 77.209 }, // New Delhi
            end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
          },
        ]}
      />
    </div>
  );
});

export default WorldMapDemo;
