import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

import React, { useMemo, useEffect, useState } from "react";

const StatRadar = React.memo(function StatRadar({ stats }) {

  // Used to stop loading crashes
  if (!stats) return null;

  // prevents re-renders during typing animation
  const data = useMemo(() => [
    { stat: "HP", value: stats.hp },
    { stat: "ATK", value: stats.attack },
    { stat: "DEF", value: stats.defense },
    { stat: "SpA", value: stats.sp_atk },
    { stat: "SpD", value: stats.sp_def },
    { stat: "SPD", value: stats.speed }
  ], [stats]);

  // only animate ONCE per Pokémon
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(false); // reset when stats change
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [stats]);

  return (
    <div className="w-64 h-64">
        <RadarChart width={320} height={320} data={data}>
          <PolarGrid stroke="#2a2f3a" strokeOpacity={0.6} />

          <PolarAngleAxis
            dataKey="stat"
            stroke="#9ca3af"
            tick={({ payload, x, y }) => {
              const stat = data.find(d => d.stat === payload.value);

              return (
                <g transform={`translate(${x},${y})`}>
                  <text
                    y={-12}
                    textAnchor="middle"
                    fill="#9ca3af"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>

                  <text
                    y={6}
                    textAnchor="middle"
                    fill="#f97316"
                    fontSize={13}
                    fontWeight="600"
                  >
                    {stat?.value}
                  </text>
                </g>
              );
            }}
          />

          <PolarRadiusAxis
            domain={[0, 255]}
            stroke="#4b5563"
            tick={false}
            axisLine={false}
          />

          <Radar
            dataKey="value"
            stroke="#f97316"
            fill="#f97316"
            fillOpacity={0.35}
            isAnimationActive={!hasAnimated} // 🔥 animate only once
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </RadarChart>
    </div>
  );
});

export default StatRadar;