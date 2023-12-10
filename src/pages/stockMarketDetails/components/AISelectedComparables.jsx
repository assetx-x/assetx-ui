import React from "react";

function AISelectedComparablesMarket({ data }) {
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    const dataRefactor = data?.AssetX
      ? Object.keys(data?.AssetX).map((key) => {
          return {
            metric: key,
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
        <h3 className="text-xl font-semibold">Comparative Analysis</h3>

        <p className="text-gray-500 font-light mt-4 mb-4">
          Here is how the adjusted portfolio compares to the original trading
          book in various performance metrics
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
            {items?.map(({ metric, your_portfolio, assetx }, index) => (
              <tr
                key={index}
                className="bg-white border-b cursor-pointer hover:bg-gray-50 "
                // onClick={() => onClickItem(hedge_factor, symbol)}
              >
                <td className="px-6 py-4">
                  <strong>{metric}</strong>
                </td>
                <td className="px-6 py-4">
                  <span>{your_portfolio}</span>
                </td>
                <td className="px-6 py-4">
                  <span>{assetx}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AISelectedComparablesMarket;
