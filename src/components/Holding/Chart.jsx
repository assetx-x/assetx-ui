import React from "react";
import { useResizable } from "react-resizable-layout";
import ChartBottom from "./ChartBottom/ChartBottom";
import Graph from "./Chart/Graph";

function Chart({ bodyHeight }) {
  const { position, separatorProps, isDragging, setPosition } = useResizable({
    axis: "y",
    initial: 450,
    min: 50,
    max: 600,
    reverse: false,
  });
  const [isExpand, setExpand] = React.useState(false);
  const [isMinimize, setMinimize] = React.useState(false);
  const [lastPosition, setLastPosition] = React.useState(position);

  const toggleExpand = () => {
    const _expand = isExpand;
    if (_expand) {
      setPosition(lastPosition);
    } else {
      setLastPosition(position);
      setPosition(0);
    }
    setExpand(!isExpand);
  };

  const toggleMinimize = () => {
    const _minimize = isMinimize;
    if (_minimize) {
      setPosition(lastPosition);
    } else {
      setLastPosition(position);
      setPosition(bodyHeight - 46);
    }
    setMinimize(!isMinimize);
  };

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
        <ChartBottom
          expand={toggleExpand}
          isExpand={isExpand}
          minimize={toggleMinimize}
          isMinimize={isMinimize}
        />
      </div>
    </>
  );
}

export default Chart;
