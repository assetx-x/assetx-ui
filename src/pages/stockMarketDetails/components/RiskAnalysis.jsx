import React from "react";

function RiskAnalysis({ data }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const dataRefactor = data?.AssetX
      ? Object.keys(data?.AssetX).map((key) => {
          return {
            factor: key,
            your_portfolio: data?.["Your Portfolio"]?.[key],
            assetx: data?.AssetX?.[key],
          };
        })
      : [];

    setItems(dataRefactor);
  }, [data]);

  return (
    <div className="relative overflow-x">
      <div className="relative overflow-x-hidden shadow-md sm:rounded-lg p-3 h-[780px]">
        <h3 className="text-xl font-semibold">Risk Analysis</h3>

        <p className="text-gray-500 font-light mt-4 mb-4">
          Here is how the statistical risk exposures change based on our
          weights. This represents the average exposure of your portfolio to
          various risk factors that are constructed from various factor proxies.
          For a more comprehensive look, visit the Risk Details tab below
        </p>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="px-6 py-3">Metric</th>
              <th className="px-6 py-3">Portfolio</th>
              <th className="px-6 py-3">AssetX</th>
            </tr>
          </thead>
          <tbody>
            {items?.map(({ factor, your_portfolio, assetx }, index) => (
              <tr
                key={index}
                className="bg-white border-b cursor-pointer hover:bg-gray-50 "
                // onClick={() => onClickItem(hedge_factor, symbol)}
              >
                <td className="px-6 py-4">
                  <span>{factor}</span>
                </td>
                <td className="px-6 py-4">
                  <strong
                    className={
                      your_portfolio > 0
                        ? `text-green-600`
                        : your_portfolio < 0
                        ? `text-red-600`
                        : `text-grey-600`
                    }
                  >
                    {your_portfolio}
                  </strong>
                </td>
                <td className="px-6 py-4">
                  <strong
                    className={
                      your_portfolio > 0
                        ? `text-green-600`
                        : your_portfolio < 0
                        ? `text-red-600`
                        : `text-grey-600`
                    }
                  >
                    {assetx}
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RiskAnalysis;
