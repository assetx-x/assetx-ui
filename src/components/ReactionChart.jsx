import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export function ReactionChart({ data, onClick }) {


  for (const key in data) {
    if (key.startsWith("historicaltrace")) {
      data[key].mode = "lines";
      data[key].type = "scatter";
      data[key].opacity = 0.3;
      data[key].line = {
        color: "rgb(226, 226, 226)",
        width: 3
      };
    }

    if (key.startsWith("average_trace")) {
      data[key].mode = "lines";
      data[key].type = "scatter";
      data[key].line = {
        color: "rgb(49,130,189)",
        width: 3
      };
    }

    if (key.startsWith("average_point")) {
      data[key].mode = "markers+text";
      data[key].type = "scatter";
      data[key].texy = ["1.47%"];
      data[key].textfont = {
        family: "sans serif"
      };
      data[key].textposition = "bottom center";
      data[key].marker = {
        size: 12,
        color: "rgb(49,130,189)"
      };
    }
  }

  const ladata = Object.keys(data).map(key => data[key]);

  console.log("-> data", ladata);

  const [settings, updateSettings] = useState({
    layout: {
      plot_bgcolor: "rgba(0,0,0,0)",
      showlegend: false,
      xaxis: {
        showgrid: false,
        title: {
          text: "Days"
        }
      },
      yaxis: {
        title: { "text": "<b>%</b> (Cumulative Return)" },
        showgrid: false
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
    data={[...ladata]}
    layout={settings.layout}
    style={{ width: "100%" }}
    config={config}
    onClick={onClick}
  />;
}