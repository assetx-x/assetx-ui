import { EarningsChart } from "../../../components/EarnningsChart.jsx";
import { SimpleLinearChart } from "../../../components/SimpleLinearChart.jsx";

const HistoricalPricePerformance = ({ data, handleTimeScope, selector }) => {
  console.log(selector);
  return (
    <>

      <section>
        <div
          className="mt-10"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <h3 className="text-3xl font-semibold">
              Historical Performance
            </h3>
          </div>
          <div>
            <div role="group">
              <button type="button">
                <input
                  id="earnings"
                  name="model"
                  className="hidden"
                  type="radio"
                  value="earnings"
                  checked={selector === "earnings"}
                  onChange={handleTimeScope}
                />
                <label
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                  htmlFor="earnings"
                >
                  Earnings Model
                </label>
              </button>
              <button type="button">
                <input
                  id="returns"
                  name="model"
                  className="hidden"
                  type="radio"
                  value="returns"
                  checked={selector === "returns"}
                  onChange={handleTimeScope}
                />
                <label
                  className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                  htmlFor="returns"
                >
                  1M Returns Model
                </label>
              </button>
            </div>
          </div>
          <div>
            {/*<span className="text-xs font-medium">Forecast Horizon</span>*/}
            {/*<span*/}
            {/*  className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1W</span>*/}
            {/*<span*/}
            {/*  className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1M</span>*/}
            {/*<span*/}
            {/*  className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">1Y</span>*/}
          </div>

          {/*End Objective Function*/}
        </div>
        {selector === "returns" ? (
          <SimpleLinearChart data={data?.["returns"]?.forecast} />
        ) : null}
        {selector === "earnings" ? (
          <EarningsChart data={data?.["earnings"]?.forecast} />
        ) : null}
        {/*<AsymmetricErrorBarsWithConstantOffsetChart data={context.predictionData?.["1M"]?.portfolio} />*/}
      </section>
    </>
  );
};


export default HistoricalPricePerformance;