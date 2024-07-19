import { createChart, CrosshairMode } from "lightweight-charts";
import React, { useEffect, useRef } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";

export const ChartComponent = (props) => {
  const {
    data,
    colors: {
      backgroundColor = "white",
      lineColor = "#2962FF",
      textColor = "black",
      areaTopColor = "#2962FF",
      areaBottomColor = "rgba(41, 98, 255, 0.28)",
    } = {},
  } = props;

  const containerRef = useRef();
  const chartContainerRef = useRef();

  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
        layout: {
          background: {
            type: "solid",
            color: backgroundColor,
          },
          textColor,
        },
        grid: {
          vertLines: {
            color: "#eee",
          },
          horzLines: {
            color: "#eee",
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        priceScale: {
          borderColor: "#485c7b",
        },
        timeScale: {
          borderColor: "#485158",
        },
      });

      const candleSeries = chart.addCandlestickSeries({
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      const volumeSeries = chart.addHistogramSeries({
        color: "#385263",
        lineWidth: 2,
        priceFormat: {
          type: "volume",
        },
        overlay: true,
        scaleMargins: {
          top: 0.9,
          bottom: 0,
        },
      });

      setInterval(() => {
        const bar = nextBar();
        const histogrambar = {
          ...bar,
          color: bar.close < bar.open ? "#f3354550" : "#079a8050",
        };
        console.log(bar);
        candleSeries.update(bar);
        volumeSeries.update(histogrambar);
      }, 3000);

      const nextBar = () => {
        if (!nextBar.date) nextBar.date = new Date(2020, 0, 0);
        if (!nextBar.bar)
          nextBar.bar = { open: 100, high: 104, low: 98, close: 103 };

        nextBar.date.setDate(nextBar.date.getDate() + 1);
        nextBar.bar.time = {
          year: nextBar.date.getFullYear(),
          month: nextBar.date.getMonth() + 1,
          day: nextBar.date.getDate(),
        };

        let old_price = nextBar.bar.close;
        let volatility = 0.1;
        let rnd = Math.random();
        let change_percent = 2 * volatility * rnd;

        if (change_percent > volatility) change_percent -= 2 * volatility;

        let change_amount = old_price * change_percent;
        nextBar.bar.open = nextBar.bar.close;
        nextBar.bar.close = old_price + change_amount;
        nextBar.bar.high =
          Math.max(nextBar.bar.open, nextBar.bar.close) +
          Math.abs(change_amount) * Math.random();
        nextBar.bar.low =
          Math.min(nextBar.bar.open, nextBar.bar.close) -
          Math.abs(change_amount) * Math.random();
        nextBar.bar.value = Math.random() * 100;
        nextBar.bar.color =
          nextBar.bar.close < nextBar.bar.open ? "#f33545" : "#079a80";

        return nextBar.bar;
      };

      for (let i = 0; i < 150; i++) {
        const bar = nextBar();
        const histogrambar = {
          ...bar,
          color: bar.close < bar.open ? "#f3354550" : "#079a8050",
        };
        candleSeries.update(bar);
        volumeSeries.update(histogrambar);
      }

      if (containerRef.current) {
        const resizeObserver = new ResizeObserver((entries) => {
          for (let entry of entries) {
            const h = entry.contentRect.height;
            chart.applyOptions({
              width: entry.contentRect.width,
              height: h > 300 ? h : 300,
            });
            setTimeout(() => chart.timeScale().fitContent(), 0);
          }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
          resizeObserver.unobserve(containerRef.current);
          chart.remove();
        };
      }
    }
  }, [
    containerRef,
    data,
    backgroundColor,
    lineColor,
    textColor,
    areaTopColor,
    areaBottomColor,
  ]);

  return (
    <div className="w-full h-full overflow-y-auto" ref={containerRef}>
      <div ref={chartContainerRef} />
    </div>
  );
};

const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

function Graph(props) {
  return (
    <PerfectScrollbar>
      <ChartComponent {...props} data={initialData}></ChartComponent>
    </PerfectScrollbar>
  );
}

export default Graph;
