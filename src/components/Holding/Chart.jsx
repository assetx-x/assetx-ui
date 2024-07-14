import React from "react";
import { useResizable } from "react-resizable-layout";
import ChartBottom from "./ChartBottom/ChartBottom";

function Chart() {
  const { position, separatorProps } = useResizable({
    axis: "y",
    initial: 450,
    min: 50,
    max: 600,
    reverse: true,
  });

  return (
    <div className="flex grow flex-col w-full h-full">
      <div className="grow bg-white" style={{ borderRadius: 5 }}>
        Chart
      </div>
      <div
        {...separatorProps}
        className="h-[5px] shrink-0 basis-[5px] grow-0 cursor-row-resize hover:bg-gray-300 transition-colors"
        style={{ borderRadius: 5 }}
      />
      <div
        className="bg-white flex flex-col"
        style={{
          height: position,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}
      >
        <ChartBottom />
      </div>
    </div>
  );
}

export default Chart;
