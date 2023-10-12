import React, { useState } from 'react';
import { BasicWaterfallChart } from '../../../components/BasicWaterfallChart';
import { useParams } from 'react-router-dom';

const PerformanceDetails = ({data, keywords, selector}) => {
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
            <div className="pl-[10px] pr-[10px]">
                <div
                    className="mt-10 "
                    style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    }}
                >
                    <div>
                        <h3 className="text-3xl font-semibold">Details</h3>
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
                <div
                    className="mt-10"
                    style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    }}
                >
                    {/*Investment Horizon*/}

                    {/*End Investment Horizon*/}
                </div>
                </div>
                {selectedKey && (
                <BasicWaterfallChart
                    data={
                    data?.[selector]?.feature_importance_graph?.[selectedKey]
                    }
                    key={selectedKey}
                    onClick={handleDeepInsights}
                />
                )}
        </>
    )
}

export default PerformanceDetails