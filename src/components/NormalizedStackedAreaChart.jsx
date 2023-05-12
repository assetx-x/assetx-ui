import React from "react";
import Plot from "react-plotly.js";


export function NormalizedStackedAreaChart({ data }) {
  let layout = {

    plot_bgcolor:'rgba(0,0,0,0)',
    xaxis: {
      showgrid: false},
    yaxis: {
      showgrid: false},
    legend: {"orientation": "h"},
    font: {
      family: 'NunitoSans-ExtraBold',
      color: '#1E8FCC'
    },
    yaxis: {
      title: '(%) Risk Contribution',
      zeroline: false
    }

  };
  return <Plot data={data}  style={{width:"100%"}} layout={layout}/>;
}
