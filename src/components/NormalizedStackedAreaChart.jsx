import React from "react";
import Plot from "react-plotly.js";


export function NormalizedStackedAreaChart({ data }) {

  return <Plot data={data}  style={{width:"100%"}}/>;
}
