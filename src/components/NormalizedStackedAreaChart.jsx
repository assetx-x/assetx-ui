import React from "react";
import Plot from "react-plotly.js";


export function NormalizedStackedAreaChart({ data }) {
  const normalLayout = {
    plot_bgcolor:'rgba(0,0,0,0)',
    xaxis: {
      showgrid: false},
    yaxis: {
      title: '(%) Risk Contribution',
      zeroline: false,
      showgrid: false
    },
    legend: {"orientation": "h"},
    font: {
      family: 'NunitoSans-ExtraBold',
      color: '#1E8FCC'
    },
  };

  const compactLayout = {
    plot_bgcolor:'rgba(0,0,0,0)',
    xaxis: {
      showgrid: false},
    yaxis: {
      title: '(%) Risk Contribution',
      zeroline: false,
      showgrid: false},
    legend: {showlegend: false},
    font: {
      family: 'NunitoSans-ExtraBold',
      color: '#1E8FCC'
    },
  };

  let layout = data.length > 10 ? compactLayout : normalLayout;

  return <Plot data={data}  style={{width:"100%"}} layout={layout}/>;
}
