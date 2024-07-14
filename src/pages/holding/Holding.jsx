import React from "react";
import { useResizable } from "react-resizable-layout";
import Chart from "../../components/Holding/Chart";
import WatchList from "../../components/Holding/WatchList";
import { HoldingProvider } from "../../store/context/HoldingProvider";

import "react-perfect-scrollbar/dist/css/styles.css";

function Holding() {
  const { position, separatorProps } = useResizable({
    axis: "x",
    initial: 1200,
    min: 950,
    max: 1400,
  });

  return (
    <HoldingProvider>
      <div
        className="flex bg-gray-200 flex-col w-screen h-screen gap-[5px] overflow-hidden select-none"
        style={{
          fontFamily:
            "-apple-system,BlinkMacSystemFont,Trebuchet MS,Roboto,Ubuntu,sans-serif",
        }}
      >
        <nav className="bg-white">Nav</nav>
        <div className="flex h-full w-full">
          <div
            className="shrink-0"
            style={{
              width: position,
            }}
          >
            <Chart />
          </div>
          <div
            {...separatorProps}
            className="w-[5px] shrink-0 basis-[5px] grow-0 cursor-col-resize hover:bg-gray-300 transition-colors"
            style={{ borderRadius: 5 }}
          />
          <div
            className="h-full w-full"
            style={{
              width: position,
            }}
          >
            <WatchList />
          </div>
        </div>
      </div>
    </HoldingProvider>
  );
}

export default Holding;
