import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export function IsolationReturnChart({ data, onClick }) {


  const { x, y } = data;

  const [settings, updateSettings] = useState({
    trace1: {
      x,
      y,
      mode: "lines",
      name: "Nothing",
      marker: {
        color: "#084d96"
      }
    },
    layout: {

      plot_bgcolor: "rgba(0,0,0,0)",
      xaxis: {
        title: "Number of active trading days"
      },
      yaxis: {
        title: "<b>%</b>"
      },
      showlegend: false,
      font: {
        family: "NunitoSans-ExtraBold",
        color: "#537FA0"
      }
    }

  });

  useEffect(() => {
    updateSettings((settings) => ({
      ...settings
    }));
  }, [data]);


  let config = { responsive: true };

  return <Plot
    data={[settings.trace1]}
    layout={settings.layout}
    style={{ width: "100%" }}
    config={config}
    onClick={onClick}
  />;
}