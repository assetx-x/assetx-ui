import React from "react";
import DetailViewChart from "../../../components/DetailViewChart.jsx";

const DetailView = ({ config }) => {
  const { chart } = config;
  return (
    <section className="grid grid-cols-1 mt-6">
      <DetailViewChart config={chart} />
    </section>
  );
};

export default DetailView;