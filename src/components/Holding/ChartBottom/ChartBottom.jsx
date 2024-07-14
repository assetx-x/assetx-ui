import React from "react";
import NavBottom from "./Nav";
import {
  BottomScreenActions,
  COLUMNS,
  createData,
  FILTERTABS,
} from "../../../constants/holding";
import Toolbar from "./Toolbar/Toolbar";
import { useHolding } from "../../../store/context/HoldingProvider";
import Table from "./Table/Table";
import { stockRowsFormat } from "../../../utils/holding";

function ChartBottom() {
  const { state, dispatch } = useHolding();
  const [filterTab, setFilterTab] = React.useState(FILTERTABS.stock[0]);
  const [groups, setGroups] = React.useState([]);

  const handleFilterTab = (filterTab) => {
    setFilterTab(filterTab);
  };

  const handleGroups = (groups) => {
    setGroups(groups);
  };

  React.useEffect(() => {
    dispatch({
      type: BottomScreenActions.SET_BOTTOM_STATE,
      payload: {
        tab: 0,
      },
    });
  }, [state.bottomState.screener]);

  return (
    <>
      <NavBottom />
      <Toolbar
        tab={filterTab}
        handleTab={handleFilterTab}
        groups={groups}
        handleGroups={handleGroups}
      />
      <Table columns={COLUMNS} rows={stockRowsFormat(createData())} />
    </>
  );
}

export default ChartBottom;
