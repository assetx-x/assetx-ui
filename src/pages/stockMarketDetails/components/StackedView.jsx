import React from "react";
import DetailViewChart from "../../../components/DetailViewChart.jsx";

const StackedView = ({ config }) => {
  const { charts } = config;
  return (
    <>

      <section className="grid grid-cols-1 mt-6">
        <DetailViewChart config={charts[0]} />
      </section>
      <section className="grid grid-cols-1 mt-6">
        <DetailViewChart config={charts[1]} />
      </section>
    </>
  );
};

export default StackedView;