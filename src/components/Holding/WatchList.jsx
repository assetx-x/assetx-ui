import React from "react";
import { useResizable } from "react-resizable-layout";

function WatchList() {
  const { position, separatorProps } = useResizable({
    axis: "y",
    initial: 50,
    min: 50,
    max: 400,
    reverse: true,
  });

  return (
    <div className="flex grow flex-col w-full h-full">
      <div className="bg-white grow" style={{ borderTopLeftRadius: 5 }}>
        Whatchlist
      </div>
      <div
        {...separatorProps}
        className="h-[5px] shrink-0 basis-[5px] grow-0 cursor-row-resize hover:bg-gray-300 transition-colors"
        style={{ borderRadius: 5 }}
      />
      <div
        className="bg-white"
        style={{
          height: position,
          borderTopRightRadius: 5,
          borderTopLeftRadius: 5,
        }}
      >
        Details
      </div>
    </div>
  );
}

export default WatchList;
