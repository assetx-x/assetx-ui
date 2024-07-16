import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container.jsx";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "react-query";
import fetchInsightsDash from "../../store/models/details/fetchInsightsDash.jsx";
import { Loader } from "react-loaders";
import BlockUi from "@availity/block-ui";
import Table from '../../components/Table.jsx';


const tdata = [
  { date: "Name1", percentage: 23, ticker: "ticker1"},
  { date: "Name2", percentage: 22, ticker: "true"},
  { date: "Name3", percentage: 25, ticker: "false"},
  { date: "Name4", percentage: 21, ticker: "true"},
  { date: "Name5", percentage: 20, ticker: "false"},
]

const MyToggle = () => {
  const navigate = useNavigate();

  const [pageRequestOffset, setPageRequestOffset] = useState(0);
  const [checked, isChecked] = useState();
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;
  const [selectedFilters, setSelectedFilters] = useState({});

  const columns = useMemo(
    () => [
      // {
      //   Header: "Ticker",
      //   accessor: "ticker",
      //   Cell: ({ row }) => (
      //     <div className="flex items-center">
      //       <div className="pl-3">
      //         <div className="font-normal text-gray-500">
      //           {row.original.ticker}
      //         </div>
      //       </div>
      //     </div>
      //   ),
      // },
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => (
          <span style={{color: "greenyellow"}}>{row.original.ticker}</span>
        ),
      },
      {
        Header: "Percentage %",
        accessor: "percentage",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ row }) => row.original.date + "Changed",
      },
    ],
    []
  );


  const { data, error, isLoading } = useQuery(
    ["dash", pageRequestOffset, selectedFilters], // Add selectedFilters as a dependency
    () => fetchInsightsDash({ offset: pageRequestOffset, limit: itemsPerPage, filters: selectedFilters }) // Pass selectedFilters to fetchInsightsDash function
  );

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % totalItems;
    setPageRequestOffset(newOffset);
  };

  useEffect(() => {
    if (data) setTotalItems(data.count);
  }, [data]);

  const filters = [
    {
      id: "themes",
      name: "Themes",
      options: [
        { value: "All", label: "All" },
        { value: "Value", label: "Value" },
        { value: "Growth", label: "Growth" },
        { value: "Momentum Slow", label: "Momentum" },
        { value: "Trend Following", label: "Trend Following" },
        { value: "Other Factors", label: "Other Factors" },
      ],
    },
    {
      id: "direction",
      name: "Direction",
      options: [
        { value: "bullish", label: "Bullish", disabled: true },
        { value: "bearish", label: "Bearish", disabled: true },
      ],
    },
    {
      id: "horizon",
      name: "Horizon",
      options: [
        { value: "1W", label: "1 Week Forecast",  disabled: true },
        { value: "1M", label: "1 Month Forecast",  disabled: true, checked: true },
        { value: "2M", label: "2 Month Forecast",  disabled: true },
      ],
    },
    {
      id: "sector",
      name: "Sector",
      options: [
        {value: "Financials", label: "Financials" },
        {value: "Industrials", label: "Industrials" },
        {value: "Consumer Discretionary", label: "Consumer Discretionary" },
        {value: "Information Technology", label: "Information Technology" },
        {value: "Health Care", label: "Health Care" },
        {value: "Real Estate", label: "Real Estate" },
        {value: "Materials", label: "Materials" },
        {value: "Energy", label: "Energy" },
        {value: "Consumer Staples", label: "Consumer Staples" },
        {value: "Communication Services", label: "Communication Services" },
        {value: "Utilities", label: "Utilities" }
      ],
    },
  ];

  // Update selectedFilters when checkboxes are changed
  const handleOptionChange = (sectionId, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [sectionId]: value,
    }));
  };

  return (
    <>
      <main>
        <BlockUi
          blocking={isLoading}
          loader={<Loader active type="ball-scale" color="#0248C7" />}
        >
          <Container>
            <div>
              <h3>My Securities</h3>
              <section>
                <Table data={tdata} columns={columns} paginated={true} itemsPerPage={10} handleRowClick={handlePageClick} />
              </section>
            </div>
          </Container>
        </BlockUi>
      </main>
    </>
  );
};

export default MyToggle;
