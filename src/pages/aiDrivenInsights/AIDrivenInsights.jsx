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

const AiDrivenInsights = () => {
  const navigate = useNavigate();

  const [pageRequestOffset, setPageRequestOffset] = useState(0);
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
        { value: "All", label: "All", default: true },
        { value: "Value", label: "Value" },
        { value: "Growth", label: "Growth" },
        { value: "Momentum", label: "Momentum" },
        { value: "Trend Following", label: "Trend Following" },
        { value: "Other", label: "Other" },
      ],
    },
    {
      id: "direction",
      name: "Direction",
      options: [
        { value: "bullish", label: "Bullish" },
        { value: "bearish", label: "Bearish" },
      ],
    },
    {
      id: "horizon",
      name: "Horizon",
      options: [
        { value: "1W", label: "1 Week Forecast" },
        { value: "1M", label: "1 Month Forecast" },
        { value: "2M", label: "2 Month Forecast" },
      ],
    },
    {
      id: "sector",
      name: "Sector",
      options: [
        { value: "Consumer Discretionary", label: "Consumer Discretionary" },
        { value: "Consumer Staples", label: "Consumer Staples" },
        { value: "Communications", label: "Communications" },
        { value: "Energy", label: "Energy" },
        { value: "Financials", label: "Financials" },
        { value: "Health Care", label: "Health Care" },
        { value: "Industrials", label: "Industrials" },
        { value: "Materials", label: "Materials" },
        { value: "Technology", label: "Technology" },
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
            {/*Section*/}
            <section className="mt-4">
              <div className="pb-24 pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
                <aside>
                  <h2 className="sr-only">Filters</h2>

                  <button
                    type="button"
                    className="inline-flex items-center lg:hidden"
                  >
                    <span className="text-sm font-medium text-gray-700">
                      Filters
                    </span>
                    <PlusIcon
                      className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  </button>

                  <div className="hidden lg:block">
                    <form className="space-y-10 divide-y divide-gray-200">
                      {filters.map((section, sectionIdx) => (
                        <div key={section.name} className={sectionIdx === 0 ? null : "pt-10"}>
                          <label
                            htmlFor={section.id}
                            className="block text-sm font-medium text-gray-900"
                          >
                            {section.name}
                          </label>
                          {section.options.map((option) => (
                            <div key={option.value} className="flex items-center">
                              <input
                                id={`${section.id}-${option.value}`}
                                name={section.id}
                                value={option.value}
                                checked={option.default}
                                type="radio"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                onChange={(e) => handleOptionChange(section.id, e.target.value)}
                              />
                              <label
                                htmlFor={`${section.id}-${option.value}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      ))}
                    </form>
                  </div>
                </aside>

                <section
                  aria-labelledby="item-heading"
                  className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3"
                >
                  {data?.results && (
                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:gap-x-8 xl:grid-cols-3">
                      {data.results.map((item) => (
                        <div
                          onClick={() =>
                            navigate(`/us/ticker/${item.symbol}`, {
                              replace: true,
                            })
                          }
                          key={item.ticker}
                          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white"
                        >
                          <div className="flex justify-between items-center">
                            <h3 className="text-xl font-medium text-gray-900 m-4">
                              <span
                                aria-hidden="true"
                                className="absolute inset-0"
                              />
                              {item.symbol}
                            </h3>
                            <img
                              src={item.header_info.company_logo}
                              alt=""
                              className="w-10 h-10 rounded-full m-2 mr-4"
                            />
                          </div>
                          <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
                            <div className="h-full w-full object-cover object-center sm:h-full sm:w-full">
                              <CombinedLinearChart
                                data={item?.forecast}
                                height={385}
                              />
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col space-y-2 p-4">
                            <p className="text-sm text-gray-500">
                              {item.sentence}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              <nav className="mt-5 flex flex-row-reverse pb-20">
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={Math.ceil(totalItems / itemsPerPage)}
                  onPageChange={handlePageClick}
                  containerClassName={"inline-flex -space-x-px"}
                  pageLinkClassName={
                    "px-3 py-2 border border-gray-300 text-gray-500 hover:text-gray-700 leading-tight hover:bg-gray-100"
                  }
                  activeLinkClassName={
                    "text-white bg-blue-500 hover:bg-blue-600"
                  }
                  previousLinkClassName={
                    "px-3 py-2 leading-tight text-gray-500 border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                  }
                  nextLinkClassName={
                    "px-3 py-2 leading-tight text-gray-500 border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 "
                  }
                  disabledClassName={" hover:cursor-not-allowed"}
                  disabledLinkClassName={
                    "px-3 py-2 text-gray-500 border border-gray-300 bg-gray-100 hover:cursor-not-allowed"
                  }
                />
              </nav>
            </section>
          </Container>
        </BlockUi>
      </main>
    </>
  );
};

export default AiDrivenInsights;
