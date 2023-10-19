const AISelectedComparables = ({ data, selector }) => {
  return (
    <section className="mb-20 mt-6">


      <div className="mt-6">
        <div className="relative overflow-x ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-[780px]">
            <h3 className="text-xl font-semibold">
              AssetX Insights
            </h3>

            <p className="text-gray-500 font-light mt-4 mb-4">
              {data?.[selector]?.summary_stats?.overview?.sentence }
            </p>

            <ul className={`w-full text-sm text-left text-gray-500`}>
              <li className="bg-white border-b p-4  hover:bg-gray-50 flex justify-between ">
                <div>Cross Sectional Ranks</div>
                <div>{data?.[selector]?.summary_stats?.overview?.cross_sectional_rank}</div>
              </li>
              <li className="bg-white border-b  p-4  hover:bg-gray-50 flex justify-between ">
                <div>Hit Ratio on Previous Bullish Predictions </div>
                <div>{data?.[selector]?.summary_stats?.overview?.hit_ratio_bull}%</div>
              </li>
              <li className="bg-white border-b  p-4  hover:bg-gray-50 flex justify-between ">
                <div>Hit Ratio on Previous Bearish Predictions</div>
                <div>{data?.[selector]?.summary_stats?.overview?.hit_ratio_bear}%</div>
              </li>
              <li className="bg-white border-b  p-4  hover:bg-gray-50 flex justify-between ">
                <div>Past Occurrences of Cross Sectional</div>
                <div>{data?.[selector]?.summary_stats?.overview?.past_occurances}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISelectedComparables;