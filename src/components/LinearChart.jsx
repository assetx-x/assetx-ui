import { createChart } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

export const LinearChartComponent = props => {
  const {
    data,
    placeholderData
  } = props;

  const {chartTitle, chartSubtitle, chartLegend} = placeholderData;

  const chartContainerRef = useRef();

  useEffect(
    () => {
      const handleResize = () => {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth });
      };

      const width = chartContainerRef.current.clientWidth;
      const height = 300;


      const chart = createChart(chartContainerRef.current, {
        width,
        height,
        rightPriceScale: {
          scaleMargins: {
            top: 0.35,
            bottom: 0.2,
          },
          borderVisible: false,
        },
        timeScale: {
          borderVisible: false,
        },
        grid: {
          horzLines: {
            color: '#eee',
            visible: false,
          },
          vertLines: {
            color: '#ffffff',
          },
        },
        crosshair: {
          horzLine: {
            visible: false,
            labelVisible: false
          },
          vertLine: {
            visible: true,
            style: 0,
            width: 2,
            color: 'rgba(32, 38, 46, 0.1)',
            labelVisible: false,
          }
        },
      });
      chart.timeScale();

      const series = chart.addAreaSeries({
        topColor: 'rgba(19, 68, 193, 0.4)',
        bottomColor: 'rgba(0, 120, 255, 0.0)',
        lineColor: 'rgb(83, 127, 160)',
        lineWidth: 3
      });

      series.setData(data);

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);

        chart.remove();
      };
    },
    [data]
  );

  return (
    <div style={{position:"relative"}}>
      <div className="three-line-legend">
        <div style={{fontSize: 24, color: "#20262E"}}>{chartTitle}</div>
        <div style={{fontSize: 22, color: "#20262E"}}>{chartSubtitle}</div>
        <div>{chartLegend}</div>
      </div>
      <div
        ref={chartContainerRef}
      />
    </div>
  );
};


export function LinearChart(props) {
  return (
    <LinearChartComponent {...props}></LinearChartComponent>
  );
}