import React from "react";
import Plot from "react-plotly.js";

export function BetaChart({ data, layoutParameters }) {
  const datas = data
    ? Object.keys(data).map((key) => {
        return {
          x: data?.[key].y,
          y: data?.[key].x,
          name: key,
          stackgroup: "one",
          groupnorm: "percent",
        };
      })
    : [];

  console.log(datas);

  let layout = {
    plot_bgcolor: "rgba(0,0,0,0)",
    xaxis: {
      showgrid: false,
    },
    // yaxis: {
    //   showgrid: false,
    // },
    legend: { orientation: "h" },
    font: {
      family: "NunitoSans-ExtraBold",
      color: "rgb(226,226,226)",
    },
    height: 500,
    yaxis: {
      showgrid: false,
      title: "(%) Risk Contribution",
      zeroline: false,
    },
    ...layoutParameters,
  };

  return <Plot data={datas} style={{ width: "100%" }} layout={layout} />;
}
