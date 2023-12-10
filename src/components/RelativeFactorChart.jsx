import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

const color_map = {
  Size: "#e1edf8",
  Profitability: "#ccdff1",
  Investment: "#abd0e6",
  Growth: "#82bbdb",
  Value: "#58a1cf",
  Momentum: "#3787c0",
  "Short Term Reversal": "#1b69af",
  "Long Term Reversal": "#084d96",
};

export function RelativeFactorChart({ data, key, onClick }) {
  const datas = data
    ? Object.keys(data).map((key) => {
        return {
          x: data?.[key].y,
          y: data?.[key].x,
          mode: "lines",
          name: key,
          marker: {
            color: color_map[key],
          },
        };
      })
    : [];
  const [settings, updateSettings] = useState({
    data: datas,

    layout: {
      yaxis: {
        title: "<b>β</b> Factor Exposure",
      },
      plot_bgcolor: "rgba(0,0,0,0)",
      font: {
        family: "NunitoSans-ExtraBold",
        color: "#537FA0",
      },
      legend: { orientation: "h" },
    },
  });

  let config = { responsive: true };

  return (
    <Plot
      data={settings?.data}
      layout={settings.layout}
      style={{ width: "100%" }}
      config={config}
      revision={key}
      onClick={onClick}
    />
  );
}
