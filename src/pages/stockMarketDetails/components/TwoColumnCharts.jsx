import React from "react";
import CardChart from "../../../components/CardChart.jsx";

const TwoColumnCharts = ({ config }) => {
  const { charts } = config;
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 ms:grid-cols-2 mt-6">
      {charts.map((e, i) => {
        return (
          <CardChart config={e} key={i} />
        );
      })}
    </section>
  );
};

export default TwoColumnCharts;