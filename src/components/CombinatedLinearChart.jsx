import { createChart } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import * as LightweightCharts from "lightweight-charts";

export const CombinedLinearChartComponent = ({ data, height=750 }) => {
  const chartContainerRef = useRef();

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const width = chartContainerRef.current.clientWidth;
      // const height = 750;


      const chart = createChart(chartContainerRef.current, {
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
      chart.timeScale();

      const top_forecast_series = chart.addAreaSeries({
        topColor: "rgba(226, 226, 226,0.7)",
        bottomColor: "rgba(226, 226, 226,0.7)",
        lineColor: "rgba(226, 226, 226,0.7)",
        lineWidth: 2
      });

      const bottom_forecast_series = chart.addAreaSeries({
        topColor: "#ffffff",
        bottomColor: "#ffffff",
        lineColor: "rgba(226, 226, 226,0.7)",
        lineWidth: 2
      });

      const lineSeries = chart.addLineSeries({
        color: "rgb(49,130,189)"
      });

      lineSeries.setData(
        data.lineSeries
      );

      const average_series = chart.addLineSeries({
        color: "rgb(49,130,189)",
        lineWidth: 2,
        lineStyle: 1
      });

      average_series.setData(
        data.average_series
      );

      top_forecast_series.setData(
        data.top_forecast_series
      );

      bottom_forecast_series.setData(
        data.bottom_forecast_series
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


export function CombinedLinearChart(props) {
  return (
    <CombinedLinearChartComponent {...props}></CombinedLinearChartComponent>
  );
}