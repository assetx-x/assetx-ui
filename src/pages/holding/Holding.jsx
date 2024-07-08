import React from "react";
import { useResizable } from "react-resizable-layout";
import Chart from "../../components/Holding/Chart";
import WatchList from "../../components/Holding/WatchList";

function Holding() {
  const { position: chartW, separatorProps: chartDragBarProps } = useResizable({
    axis: "x",
    initial: 920,
    min: 650,
    max: 1000,
  });

  return (
    <div className="flex bg-gray-200 flex-col w-screen h-screen gap-[5px]">
      <nav className="bg-white">Nav</nav>
      <div className="flex h-full w-full">
        <div
          className="shrink-0"
          style={{
            width: chartW,
          }}
        >
          <Chart />
        </div>
        <div
          {...chartDragBarProps}
          className="w-[5px] shrink-0 basis-[5px] grow-0 cursor-col-resize hover:bg-gray-300 transition-colors"
          style={{ borderRadius: 5 }}
        />
        <div className="h-full w-full">
          <WatchList />
        </div>
      </div>
    </div>
  );
}

export default Holding;
