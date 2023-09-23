import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export function BasicWaterfallChart({ data, key, onClick }) {
  const [settings, updateSettings] = useState({
    data: [
      {
        type: "waterfall",
        orientation: "v",
        measure: data?.measure,
        x: data?.x,
        y: data?.y,
        textposition: "inside",
        text: data?.text,
        increasing: { marker: { color: "rgb(30,143,204)" } },
        decreasing: { marker: { color: "rgb(225,0,75.54)" } },
        connector: {
          line: {
            color: "rgba(0, 0,0, 0)"
          }
        }
      }
    ],

    layout: {
      plot_bgcolor: "rgba(0,0,0,0)",
      autosize: true,
      showlegend: false,
      xaxis: {
        showgrid: false
      },
      yaxis: {
        title: "<b>(β)</b> Model Output",
        showgrid: false
      },

      font: {
        family: "NunitoSans-ExtraBold",
        color: "rgb(226,226,226)"
      }
    }
  });

  useEffect(() => {
    updateSettings((settings) => ({
      ...settings,
      data: [{ ...settings.data[0], y: data?.y, x: data?.x }]
    }));
  }, [data]);

  let config = { responsive: true };

  return <Plot
    data={settings?.data}
    layout={settings.layout}
    style={{ width: "100%" }}
    config={config}
    revision={key}
    onClick={onClick}
  />;
}