import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../../components/Container.jsx";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useQuery } from "react-query";
import fetchInsightsDash from "../../store/models/details/fetchInsightsDash.jsx";
import { Loader } from "react-loaders";
import BlockUi from "@availity/block-ui";
import { CombinedLinearChart } from "../../components/CombinatedLinearChart.jsx";
import ReactPaginate from "react-paginate";


const MyToggle = () => {
  const navigate = useNavigate();

  const [pageRequestOffset, setPageRequestOffset] = useState(0);
  const [checked, isChecked] = useState();
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 6;
  const [selectedFilters, setSelectedFilters] = useState({});


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
                <table>

                </table>
              </section>
            </div>
          </Container>
        </BlockUi>
      </main>
    </>
  );
};

export default MyToggle;
