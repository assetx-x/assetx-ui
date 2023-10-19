import React, { useState } from 'react';
import { BasicWaterfallChart } from '../../../components/BasicWaterfallChart';
import { useParams } from 'react-router-dom';
import { BetaChart } from "../../../components/BetaChart.jsx";
import { useMain } from "../../../store/context/MainContext.jsx";

const PerformanceDetails = ({data, keywords, selector}) => {
    const context = useMain();
    const { ticker } = useParams();
    const [selectedKey, setSelectedKey] = useState("Overall");

    const extractString = (str) => {
        const parts = str.split("=");
        if (parts.length >= 2) {
        return parts[1].trim();
        }
        return null; // or any other default value you prefer
    };
    
    const handleDeepInsights = (data) => {
        let pts = "";
        for (let i = 0; i < data.points.length; i++) {
        pts = data.points[i].x;
        }
        window.open(
        `/us/ticker/${ticker}/deep-insight/${extractString(pts)}`,
        "_blank"
        );
    };

    return(
        <>
            <div className="pl-[10px] pr-[10px] mt-40">
                <div
                    className="mt-10 "
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                        flexWrap:'wrap',
                        gap: 20
                    }}
                >
                    <div>
                        <h3 className="text-3xl font-semibold">Details</h3>
                    </div>

                    <div>
                        <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              name="feature_importance_historical"
                              id="feature_importance_historical"
                              value="feature_importance_historical"
                              checked={context.featureImportance === "feature_importance_historical"}
                              onChange={() =>  context.setFeatureImportance("feature_importance_historical")}
                            />
                            <label
                              className={`
                              px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
                              focus:text-blue-700 rounded-l-lg`}
                              htmlFor="feature_importance_historical"
                            >
                                Historical Analysis
                            </label>
                        </button>
                        <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              name="feature_importance"
                              id="feature_importance"
                              value="feature_importance"
                              checked={context.featureImportance === "feature_importance"}
                              onChange={() => context.setFeatureImportance("feature_importance")}
                            />
                            <label
                              className={`
                              px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 
                              hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 
                              focus:text-blue-700 rounded-r-md`}
                              htmlFor="feature_importance"
                            >
                                Current Analysis
                            </label>
                        </button>
                    </div>

                    <div>
                    {keywords?.length > 0 &&
                        keywords.map((key, index) => (
                        <button type="button" key={index}>
                            <input
                            className="hidden"
                            type="radio"
                            id={`id_${key}_${index}`}
                            name="detailsKeywords"
                            value={key}
                            checked={selectedKey === key}
                            onChange={() => setSelectedKey(key)}
                            />
                            <label
                            className={` px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 ${
                                index === 0 ? "rounded-l-lg" : ""
                            } ${
                                index === keywords?.length - 1
                                ? "rounded-r-md"
                                : ""
                            } `}
                            htmlFor={`id_${key}_${index}`}
                            >
                            {key}
                            </label>
                        </button>
                        ))}
                    </div>
                </div>
                </div>
                {context.featureImportance === 'feature_importance' && selectedKey && (
                <BasicWaterfallChart
                    data={
                    data?.[selector]?.feature_importance?.[selectedKey]
                    }
                    key={selectedKey}
                    onClick={handleDeepInsights}
                />
                )}
                {context.featureImportance === 'feature_importance_historical' &&  selectedKey &&
                  <BetaChart
                    data={ data?.[selector]?.feature_importance_historical?.[selectedKey]}
                    key={selectedKey}
                    layoutParameters={{legend: {"orientation": "h"}}} />
                }
        </>
    )
}


export default PerformanceDetails