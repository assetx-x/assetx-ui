import React from "react";
import { useResizable } from "react-resizable-layout";
import ChartBottom from "./ChartBottom/ChartBottom";
import Graph from "./Chart/Graph";

function Chart({ bodyHeight }) {
  const { position, separatorProps, isDragging } = useResizable({
    axis: "y",
    initial: 450,
    min: 50,
    max: 600,
    reverse: false,
  });

  return (
    <>
      <div
        className="bg-white shrink-0"
        style={{ height: position, borderRadius: 5 }}
      >
        <Graph />
      </div>
      <div
        {...separatorProps}
        className="h-[5px] shrink-0 basis-[5px] grow-0 cursor-row-resize hover:bg-gray-300 transition-colors"
        style={{ borderRadius: 5 }}
      />
      <div
        className="bg-white flex flex-col"
        style={{
          height: bodyHeight - 5 - position,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}
      >
        <ChartBottom />
      </div>
    </>
  );
}

export default Chart;
