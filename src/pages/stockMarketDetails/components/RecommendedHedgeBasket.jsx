import React from "react";

function RecommendedHedgeBasket({ datas, selectedTickers, onClickItem }) {
  return (
    <div className="relative overflow-x">
      <div className="relative overflow-x-hidden shadow-md sm:rounded-lg p-3 h-[650px]">
        <h3 className="text-xl font-semibold">A.I Recommended Hedge Basket</h3>

        <p className="text-gray-500 font-light mt-4 mb-4">
          Based on your current portfolio's exposures; here are some names we
          have collected that we recommend adding in order to hedge against
          them. Click any of the tickers to see how their addition would effect
          your portfolio's underlying exposure from your most recent rebalancing
          period - Today.
        </p>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3">Ticker</th>
              <th className="px-6 py-3">Sector</th>
            </tr>
          </thead>
          <tbody>
            {datas?.map(
              ({ sector, company_logo, company_name, symbol }, index) => (
                <tr
                  key={index}
                  className={`bg-white border-b cursor-pointer hover:bg-gray-50`}
                  onClick={() => onClickItem(symbol)}
                >
                  <td
                    className={`px-6 py-4 ${
                      selectedTickers.includes(symbol) ? "bg-blue-100" : ""
                    }`}
                  >
                    <div
                      className="flex items-center"
                      onClick={() => console.log}
                      title={company_name}
                    >
                      <img
                        className="w-10 h-10 rounded-full"
                        src={
                          company_logo ||
                          "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"
                        }
                        alt={company_name + " image"}
                      />
                      <div className="pl-3">
                        <div className="text-base font-semibold">
                          {company_name}
                        </div>
                        <div className="font-normal text-gray-500">
                          {symbol}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      selectedTickers.includes(symbol) ? "bg-blue-100" : ""
                    }`}
                  >
                    <span>{sector}</span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecommendedHedgeBasket;
