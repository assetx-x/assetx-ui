import React, { useEffect, useRef, useState } from "react";
import { useHolding } from "../../../../store/context/HoldingProvider";
import { ButtonSelect } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";

function FavoriteTabs({ tabs, handleTab }) {
  const { state } = useHolding();
  const containerRef = useRef(null);
  const prevWidthRef = useRef(0);
  const [width, setWidth] = useState(0);
  const [indexShow, setIndexShow] = useState(0);
  const [direction, setDirection] = useState("");

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const children = container.children;
      const lastChild = children[children.length - 1];
      const offset = lastChild.offsetLeft + lastChild.offsetWidth;

      if (
        width &&
        direction == "decreased" &&
        container.offsetLeft + width - offset <= 50
      ) {
        setIndexShow(indexShow + 1);
      } else if (
        direction == "increased" &&
        indexShow > 0 &&
        container.offsetLeft + width - offset >= 100
      ) {
        setIndexShow(indexShow - 1);
      }
    }
  }, [width]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const newWidth = entry.contentRect.width;
          const prevWidth = prevWidthRef.current;

          if (prevWidth !== 0) {
            if (newWidth > prevWidth) {
              setDirection("increased");
            } else if (newWidth < prevWidth) {
              setDirection("decreased");
            }
          }
          setWidth(entry.contentRect.width);
          prevWidthRef.current = newWidth;
        }
      });

      resizeObserver.observe(container);

      return () => {
        resizeObserver.unobserve(container);
      };
    }
  }, []);

  return (
    <div className="basis-0 grow flex gap-2 items-center" ref={containerRef}>
      {tabs.slice(0, tabs.length - indexShow).map((item, index) => {
        return (
          <button
            key={index}
            onClick={() => handleTab(item)}
            className={`text-gray-600 bg-gray-100 rounded-sm whitespace-nowrap w-[calc(100% - 50px)] transition-colors px-3 py-1 font-medium text-xs${
              state.bottomState.filterTab === item
                ? " bg-gray-400 text-white"
                : " hover:bg-gray-200"
            }`}
          >
            {item}
          </button>
        );
      })}
      {indexShow > 0 && (
        <ButtonSelect
          value={
            <FontAwesomeIcon icon={faSortDown} className="-translate-y-1" />
          }
          showDropdownIcon={false}
          className="text-gray-600 bg-gray-100 rounded-sm transition-colors border-none px-3 py-0 font-medium text-xs hover:bg-gray-200 h-[24px]"
        >
          <ul className="py-2">
            {tabs.slice(tabs.length - indexShow, tabs.length).map((_tab, i) => (
              <li key={i}>
                <button
                  className={`flex gap-2 items-center cursor-default w-full px-3 py-2 text-gray-600 text-sm hover:bg-gray-100 hover:text-gray-800 transition-colors whitespace-nowrap ${
                    _tab === state.bottomState.filterTab ? "bg-slate-200" : ""
                  }`}
                  onClick={() => {
                    handleTab(_tab);
                  }}
                >
                  {_tab}
                </button>
              </li>
            ))}
          </ul>
        </ButtonSelect>
      )}
    </div>
  );
}

export default FavoriteTabs;
