import React, { useState } from "react";
import { useMain } from "../store/context/MainContext.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip as ReactTooltip } from 'react-tooltip'

const Tabs = (props) => {
  const context = useMain();
  const { tabs, type, isMain, isCentered } = props.config;

  const [activeTab, setActiveTab] = useState(0);
  const handleTabClick = (tabNumber) => {
    isMain ? context.setSelectedTab(tabNumber) : setActiveTab(tabNumber);
  };

  const themeSwitch = (type) =>
    ({
      underline: {
        container:
          "text-sm font-medium text-center text-gray-500 border-b border-gray-200",
        active:
          "inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active ",
        normal:
          "inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 ",
      },
      pills: {
        container:
          "flex flex-wrap text-sm font-medium text-center text-gray-500",
        active:
          "inline-block px-4 py-3 text-blue-600 bg-gray-200 rounded-lg active",
        normal:
          "inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100",
      },
    }[type] || themeSwitch("underline"));

  return (
    <>
      <div className={themeSwitch(type).container}>
        <ul className={`flex flex-wrap -mb-px ${isCentered && 'justify-around'}`}>
          {tabs.map((tab, index) => {
            return (
              <li className="mr-2" key={index}>
                <div
                  data-tooltip-id="tooltip"
                  data-tooltip-content={tab.desc}
                  onClick={() =>
                    tab.onClickHandler?.() || handleTabClick(index)
                  }
                  key={tab.name}
                  className={
                    (
                      isMain
                        ? context.selectedTab === index
                        : activeTab === index || tab?.selected
                    )
                      ? themeSwitch(type).active
                      : themeSwitch(type).normal
                  }
                >
                  {tab.name}
                  {tab.icon &&
                    <FontAwesomeIcon icon={tab.icon} className="h-7"/>
                  }
                </div>
              </li>
            );
          })}
        </ul>
        <ReactTooltip id="tooltip" />
      </div>
      <div className="tab-content">
        {tabs.map((object, i) => {
          return (
            <div key={`${object.name}-content`}>
              {isMain
                ? context.selectedTab === i && object.content
                : activeTab === i && object.content}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
