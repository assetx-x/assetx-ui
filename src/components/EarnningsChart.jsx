import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";

export function EarningsChart({ data, onClick }) {


  const {xValue, yValue, xForecast, yForecast} = data;
  const [settings, updateSettings] = useState({
    trace1 : {
      x: xValue,
      y: yValue,
      type: 'bar',
      text: yValue.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: '#1E8FCC',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    },
    trace2 : {
      x: xForecast,
      y: yForecast,
      type: 'bar',
      text: yForecast.map(String),
      textposition: 'auto',
      hoverinfo: 'none',
      marker: {
        color: 'rgb(226,226,226)',
        opacity: 0.6,
        line: {
          color: 'rgb(8,48,107)',
          width: 1.5
        }
      }
    },

    layout: {
      showlegend:false,
    }

  });

  useEffect(() => {
    updateSettings((settings) => ({
      ...settings,
    }));
  }, [data]);


  let config = { responsive: true };

  return <Plot
    data={[settings.trace1, settings.trace2]}
    layout={settings.layout}
    style={{ width: "100%", height: "780px" }}
    config={config}
    onClick={onClick}
  />;
}