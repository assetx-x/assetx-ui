import React, { useEffect } from "react";
import Plot from "react-plotly.js";

export function AsymmetricErrorBarsWithConstantOffsetChart({
  data,
  layoutParameters = {},
}) {
  // console.log('data', data)
  useEffect(() => {}, [data]);

  let trace1 = {
    x: data.pnl_.index,
    y: data.pnl_.series,
    fillcolor: "rgba(226, 226, 226,0.7)",
    line: { color: "#537FA0" },
    mode: "lines",
    name: "Your portfolio",
    type: "scatter",
  };

  let trace2 = {
    x: data.benchmark.index,
    y: data.benchmark.series,
    line: { color: "#537FA0", dash: "dot" },
    mode: "lines",
    name: "AssetX re-weighted portfolio",
    type: "scatter",
  };

  let finalData = [trace1, trace2];
  let layout = {
    plot_bgcolor: "rgba(0,0,0,0)",

    legend: { orientation: "h" },
    font: {
      family: "NunitoSans-ExtraBold",
      color: "#537FA0",
    },
    height: 800,
    ...layoutParameters,
  };

  return <Plot data={finalData} style={{ width: "100%" }} layout={layout} />;
}
