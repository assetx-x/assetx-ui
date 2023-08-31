import React, { useEffect } from "react";
import Plot from "react-plotly.js";


export function AsymmetricErrorBarsWithConstantOffsetChart({data}) {
  useEffect(() => {

  }, [data]);

  let trace1 = {
    x: data.benchmark.index,
    y: data.benchmark.series,
    fillcolor: "rgba(226, 226, 226,0.7)",
    line: {color: "#537FA0"},
    mode: "lines",
    name: "Ticker",
    type: "scatter"
  };

  let trace2 = {
    x: data.pnl_.index,
    y: data.pnl_.series,
    line: {color: "rgb(226,226,226)",
      dash: 'dot',},
    mode: "lines",
    name: "SPY",
    type: "scatter"
  }


  let finalData = [trace1,
    trace2];
  let layout = {

    plot_bgcolor:'rgba(0,0,0,0)',

    legend: {"orientation": "h"},
    font: {
      family: 'NunitoSans-ExtraBold',
      color: '#537FA0'
    }
  };

  return <Plot data={finalData}  style={{width:"100%"}} layout={layout}/>;
}
