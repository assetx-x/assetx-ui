import React from "react";

const columns = [
  {
    label: "Strategy",
    key: "strategy",
  },
  {
    label: "Alpha",
    key: "alpha",
  },
  {
    label: "Beta",
    key: "beta",
  },
  {
    label: "Shape ratio",
    key: "shapeRatio",
  },
  {
    label: "Max drawdown",
    key: "maxDrawdown",
  },
];

const defaultData = [
  {
    id: 1,
    strategy: <Strategy title="Large Cap Value" universe="Russell 1000" />,
    alpha: "1.00",
    beta: "1.00",
    shapeRatio: "1.00",
    maxDrawdown: "1.00",
  },
  {
    id: 1,
    strategy: <Strategy title="Large Cap Value" universe="Russell 1000" />,
    alpha: "1.00",
    beta: "1.00",
    shapeRatio: "1.00",
    maxDrawdown: "1.00",
  },
  {
    id: 1,
    strategy: <Strategy title="R1K Growth" universe="Russell 1000" />,
    alpha: "1.00",
    beta: "1.00",
    shapeRatio: "1.00",
    maxDrawdown: "1.00",
  },
  {
    id: 1,
    strategy: <Strategy title="R1K Growth" universe="Russell 1000" />,
    alpha: "1.00",
    beta: "1.00",
    shapeRatio: "1.00",
    maxDrawdown: "1.00",
  },
];

function Strategy({ title, universe }) {
  return (
    <span className="flex flex-col gap-2 text-sm text-gray-900 text-left">
      <strong>{title}</strong>
      <span>
        <span className="text-gray-600">Universe : </span>
        <span className="text-gray-600 font-medium">{universe}</span>
      </span>
    </span>
  );
}

function KPIModels() {
  return (
    <div className="py-4">
      <p className="text-gray-500 mb-5">
        Upload your portfolio and select the objective function and investment
        horizon to see how our algorithm would weight the portfolio.
      </p>
      <table className="w-full text-sm text-left text-gray-500 border shadow">
        <thead className="sticky text-xs text-gray-500 uppercase bg-gray-50">
          <tr className="border">
            {columns.map((column, i) => (
              <th
                scope="col"
                className="px-6 py-3 font-medium"
                key={i}
                style={{
                  textAlign: i === 0 ? "left" : "center",
                  paddingRight: 35,
                }}
              >
                {column.label}
              </th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {defaultData.map((data, i) => (
            <tr className="bg-white border-b border hover:bg-gray-50 ">
              {columns.map((column, i) => (
                <td className="px-6 py-1 text-center" key={i}>
                  {data[column.key]}
                </td>
              ))}
              <td className="px-6 py-4">
                <button className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 -mt-3 text-center inline-flex items-center mr-4">
                  Subscribe
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KPIModels;
