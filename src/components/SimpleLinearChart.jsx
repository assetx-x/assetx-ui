import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import * as LightweightCharts from "lightweight-charts";

export const SimpleLinearChartComponent = ({ data, height = 750 }) => {
  const chartContainerRef = useRef();

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const width = chartContainerRef.current.clientWidth;

      let chart = LightweightCharts.createChart(chartContainerRef.current, {
        width,
        height,

        timeScale: {
          borderColor: "rgba(197, 203, 206, 0.4)"
        },
        grid: {
          vertLines: {
            color: "rgba(197, 203, 206, 0.4)",
            style: LightweightCharts.LineStyle.Dotted
          },
          horzLines: {
            color: "rgba(197, 203, 206, 0.4)",
            style: LightweightCharts.LineStyle.Dotted
          }
        }
      });

      let lineSeries = chart.addLineSeries({
        color: "rgb(49,130,189)"
      });

      lineSeries.setData(
        data
      );

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);

        chart.remove();
      };
    },
    [data]
  );

  return (
    <div
      ref={chartContainerRef}
    />
  );
};


export function SimpleLinearChart(props) {
  return (
    <SimpleLinearChartComponent {...props}></SimpleLinearChartComponent>
  );
}