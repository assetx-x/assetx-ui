import React from "react";
import Table from "../../../components/Table.jsx";

const ResultsTable = ({columns,data}) => {
  return (
    <section>
      {/*Table*/}
      <div className={"overflow-x"}>
        <Table data={data} columns={columns} paginated={true} />
      </div>
      {/*End Table*/}
    </section>
  );
};

export default ResultsTable;