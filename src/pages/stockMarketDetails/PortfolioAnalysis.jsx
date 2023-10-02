import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import usFlag from "../../assets/images/us.png";
import { Button } from "../../components/Button.jsx";
import Tabs from "../../components/Tabs.jsx";
import Table, { StatusPill } from "../../components/Table.jsx";
import { useNavigate } from "react-router-dom";
import BlockUi from "@availity/block-ui";
import "loaders.css/loaders.min.css";
import { useMain } from "../../store/context/MainContext.jsx";
import { useDropzone } from "react-dropzone";
import fetchHoldings from "../../store/models/validations/fetchHoldings.jsx";
import { useQuery } from "react-query";
import Dropdown from "../../components/Dropdown.jsx";
import {
  formatDataForTickerTable,
  formatDataToSendOptimization,
  formatDateToDashFormat,
} from "../../utils/index.js";
import fetchPredictions from "../../store/models/predicton/fetchPredictions.jsx";
import fetchValidations from "../../store/models/holdings/fetchValidations.jsx";
import { Loader } from "react-loaders";

const PortfolioAnalysis = () => {
  const navigate = useNavigate();
  const context = useMain();
  const [isChecked, setIsChecked] = useState(false);
  const [isDragAndDropVisible, setIsDragAndDropVisible] = useState(true);
  const [isUploadTableVisible, setIsUploadTableVisible] = useState(false);
  const [isFinalTableVisible, setIsFinalTableVisible] = useState(false);
  const [jsonData, setJsonData] = useState([]);
  const [jsonFinalData, setJsonFinalData] = useState([]);
  const [validatedResponse, setValidatedResponse] = useState(null);
  const tabsConfig = {
    isMain: true,
    type: "underline",
    tabs: [
      {
        name: "A.I. Driven insights",
        // onClickHandler: () => navigate("/us/ai-driven-insights")
      },
      { name: "Regime Analysis" },
      {
        name: "Portfolio Analysis",
        onClickHandler: () => {},
        selected: true,
      },
    ],
  };

  // Optimize data
  const [investingHorizonOption, setInvestingHorizonsOption] = useState("1D");
  const [objectiveFunctionOption, setObjectiveFunctionOption] =
    useState("max_sharpe");
  const [validationsParams, setValidationParams] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const [editID, setEditID] = useState();

  const {
    data: validationData,
    error: validationError,
    isLoading: validationIsLoading,
    refetch: validationRefetch,
  } = useQuery(["validations", validationsParams], fetchValidations, {
    enabled: false,
  });

  const [optimizationsParams, setOptimizationsParams] = useState(null);
  const {
    data: optimizationsData,
    error: optimizationsError,
    isLoading: optimizationsIsLoading,
    refetch: optimizationsRefetch,
  } = useQuery(["optimizations", optimizationsParams], fetchPredictions, {
    enabled: false,
  });

  let {
    data: holdingsData,
    error: holdingsError,
    isLoading: holdingsIsLoading,
    refetch: holdingsRefetch,
  } = useQuery(["holdings"], fetchHoldings, { enabled: false });

  useEffect(() => {
    holdingsRefetch();
  }, []);

  // Handle Optimizations
  useEffect(() => {
    if (optimizationsData) {
      const data = optimizationsData;
      context.setPredictionData(data);
      navigate(`/us/portfolio-analysis/${data.id}`, { replace: true });
      // navigate(`/us/portfolio-analysis/results`, { replace: true });
    }
  }, [optimizationsData]);

  useEffect(() => {
    if (optimizationsParams) {
      optimizationsRefetch();
    }
  }, [optimizationsParams, optimizationsRefetch]);

  // Handle Validations
  useEffect(() => {
    if (validationsParams) {
      validationRefetch();
    }
  }, [validationsParams, validationRefetch]);

  // Handle Errors
  useEffect(() => {
    if (validationError) {
      console.log("validationError", validationError);
    }
    if (optimizationsError) {
      console.log("optimizationError", optimizationsError);
    }
  }, [validationError, optimizationsError]);

  const handleValidateButtonClick = async (json) => {
    const payloadData = formatDataToSendOptimization(json);
    setValidationParams(payloadData);
  };

  const handleObjectiveFunctionChange = (event) => {
    setObjectiveFunctionOption(event.target.value);
  };
  const handleInvestingHorizonsChange = (event) => {
    setInvestingHorizonsOption(event.target.value);
  };
  const handleOptimizeButtonClick = async (json) => {
    try {
      const tickersArray = [];

      for (let i = 0; i < json.length; i++) {
        if (json[i].status !== "Inactive") {
          tickersArray.push(json[i].ticker);
        }
      }
      setOptimizationsParams({ data: [validatedResponse], id: editID });
    } catch (error) {
      console.error(error);
    }
  };

  const handleFileChange = (files) => {
    const selectedFile = files[0];
    setIsChecked(false);
    setIsDragAndDropVisible(false);
    setIsUploadTableVisible(true);
    Papa.parse(selectedFile, {
      header: true,
      transformHeader: function (h) {
        return h.toLowerCase();
      },
      skipEmptyLines: true,
      complete: function (results) {
        const finalData = results.data.map((obj) => ({
          date: obj.date,
          ticker: obj.ticker,
          percentage: obj.nmv
            ? parseFloat(obj.nmv / obj.nav).toFixed(2)
            : parseFloat(obj.percentage).toFixed(2),
        }));

        setJsonData(finalData);
      },
    });
  };
  const handleOptimize = () => {
    handleOptimizeButtonClick(jsonFinalData);
  };
  const handleValidate = () => {
    handleValidateButtonClick(jsonData);
  };

  const uploadedColumns = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <div className="pl-3">
              <div className="font-normal text-gray-500">
                {row.original.ticker}
              </div>
            </div>
          </div>
        ),
      },
      {
        Header: "Percentage %",
        accessor: "percentage",
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ row }) => formatDateToDashFormat(row.original.date),
      },
    ],
    []
  );

  const finalColumns = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full"
              src={row.original.company_logo}
              alt={row.original.company_name + " image"}
            />
            <div className="pl-3">
              <div className="text-base font-semibold">
                {row.original.company_name}
              </div>
              <div className="font-normal text-gray-500">
                {row.original.ticker}
              </div>
            </div>
          </div>
        ),
      },
      {
        Header: "Percentage %",
        accessor: "weight",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: StatusPill,
      },
      {
        Header: "Date",
        accessor: "date",
        Cell: ({ row }) => formatDateToDashFormat(row.original.date),
      },
    ],
    []
  );

  const listPortfolioColumns = useMemo(
    () => [
      {
        Header: "Portfolio ID",
        accessor: "id",
      },
      // {
      //   Header: "Sharpe Ratio (Recommendations)",
      //   accessor: "sharpe_ratio",
      //   Cell: (props) =>
      //     props.value !== "NaN" ? (props.value * 1).toFixed(2) : 0.0,
      // },
      // {
      //   Header: "Annualized Return",
      //   accessor: "annual_return",
      //   Cell: (props) =>
      //     props.value !== "NaN"
      //       ? (props.value * 100).toFixed(2) + "%"
      //       : 0.0 + "%",
      // },
      // {
      //   Header: "Annualized Vol.",
      //   accessor: "annual_volatility",
      //   Cell: (props) =>
      //     props.value !== "NaN" ? (props.value * 1).toFixed(2) : 0.0,
      // },
      {
        Header: "Actions",
        Cell: (props) => (
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("clicked", props.row.original.id);
                handleNewPorfolioButtonClick(props.row.original.id);
              }}
            >
              <svg
                className="h-8 w-8 text-blue-700"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                <line x1="16" y1="5" x2="19" y2="8" />
              </svg>
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const handleReset = () => {
    navigate(0);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: ".csv",
    onDrop: handleFileChange,
  });

  useEffect(() => {
    if (validationData) {
      console.log("validationData", validationData);
      setJsonFinalData(formatDataForTickerTable(validationData));
      setValidatedResponse(validationData);
      // Table view
      setIsChecked(false);
      setIsDragAndDropVisible(false);
      setIsUploadTableVisible(false);
      setIsFinalTableVisible(true);
    }
  }, [validationData]);
  const handleDemoButtonClick = () => {
    const file = new File(
      [
        "Date,Ticker,Percentage\n" +
          "6/6/23,NKE,0.1284\n" +
          "6/6/23,AAPL,0.1205\n" +
          "6/6/23,SNOW,0.1593\n" +
          "6/6/23,DHR,0.082\n" +
          "6/6/23,JPM,0.1226\n" +
          "6/6/23,MSFT,0.01373\n" +
          "5/30/23,NKE,0.1186\n" +
          "5/30/23,AAPL,0.0643\n" +
          "5/30/23,SNOW,0.1068\n" +
          "5/30/23,DHR,0.0792\n" +
          "5/30/23,JPM,0.245\n" +
          "5/30/23,MSFT,0.1161\n" +
          "5/26/23,NKE,0.1503\n" +
          "5/26/23,AAPL,0.1237\n" +
          "5/26/23,SNOW,0.2459\n" +
          "5/26/23,DHR,0.0774\n" +
          "5/26/23,JPM,0.1654\n" +
          "5/26/23,MSFT,0.02373\n" +
          "5/19/23,NKE,0.1111\n" +
          "5/19/23,AAPL,0.1782\n" +
          "5/19/23,SNOW,0.2258\n" +
          "5/19/23,DHR,0.2511\n" +
          "5/19/23,JPM,0.0423\n" +
          "5/19/23,MSFT,0.0915\n" +
          "5/5/23,NKE,0.1541\n" +
          "5/5/23,AAPL,0.1228\n" +
          "5/5/23,SNOW,0.2481\n" +
          "5/5/23,DHR,0.0282\n" +
          "5/5/23,JPM,0.1071\n" +
          "5/5/23,MSFT,0.1097\n" +
          "4/21/23,NKE,0.248\n" +
          "4/21/23,AAPL,0.2863\n" +
          "4/21/23,SNOW,0.0173\n" +
          "4/21/23,DHR,0.092\n" +
          "4/21/23,JPM,0.2226\n" +
          "4/21/23,MSFT,0.1338\n" +
          "3/24/23,NKE,0.2348\n" +
          "3/24/23,AAPL,0.0203\n" +
          "3/24/23,SNOW,0.1331\n" +
          "3/24/23,DHR,0.095\n" +
          "3/24/23,JPM,0.2031\n" +
          "3/24/23,MSFT,0.1337\n" +
          "2/24/23,NKE,0.1237\n" +
          "2/24/23,AAPL,0.2459\n" +
          "2/24/23,SNOW,0.0774\n" +
          "2/24/23,DHR,0.1654\n" +
          "2/24/23,JPM,0.02373\n" +
          "2/24/23,MSFT,0.1111\n" +
          "1/6/23,NKE,0.1782\n" +
          "1/6/23,AAPL,0.2258\n" +
          "1/6/23,SNOW,0.2511\n" +
          "1/6/23,DHR,0.1071\n" +
          "1/6/23,JPM,0.1097\n" +
          "1/6/23,MSFT,0.248",
      ],
      "demo.csv",
      { type: "text/csv" }
    );
    handleFileChange([file]);
  };

  const handleNewPorfolioButtonClick = (id) => {
    if (id) setEditID(id);
    setShowUploader(true);
  };

  return (
    <>
      <main>
        <BlockUi
          blocking={holdingsIsLoading}
          loader={<Loader active type="ball-scale" color="#0248C7" />}
        >
          <Container>
            {holdingsData?.count === 0 || showUploader ? (
              <>
                {/*Section*/}
                <section className="mt-8">
                  {/*Title*/}
                  <div>
                    <h3 className="text-3xl font-semibold">
                      Portfolio Calibration
                    </h3>
                    <p className="text-gray-500 font-light mt-4">
                      Upload your portfolio and select the objective function
                      and investment horizon to see how our algorithm would
                      weight the portfolio.
                    </p>
                  </div>
                  {/*End Title*/}
                  {/*Selectable options*/}
                  <div className="pl-[100px] pr-[100px]">
                    <div className="mt-10 flex justify-between ">
                      {/*Sample portfolio*/}
                      <Dropdown
                        demoButtonEnable
                        demoButtonHandler={handleDemoButtonClick}
                      />
                      {/*End Sample Portfolio*/}
                      {/*Objective Function*/}
                      <div>
                        <div
                          className="inline-flex rounded-md shadow-sm"
                          role="group"
                        >
                          <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              id="min_variance"
                              name="objectiveFunction"
                              value="min_variance"
                              checked={
                                objectiveFunctionOption === "min_variance"
                              }
                              onChange={handleObjectiveFunctionChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                              htmlFor="min_variance"
                            >
                              Minimum Variance
                            </label>
                          </button>
                          <button type="button" className="">
                            <input
                              className="hidden"
                              type="radio"
                              id="max_sharpe"
                              name="objectiveFunction"
                              value="max_sharpe"
                              checked={objectiveFunctionOption === "max_sharpe"}
                              onChange={handleObjectiveFunctionChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                              htmlFor="max_sharpe"
                            >
                              Max Return
                            </label>
                          </button>
                        </div>
                      </div>
                      {/*End Objective Function*/}
                      {/*Investment Horizon*/}
                      <div>
                        <div
                          className="inline-flex rounded-md shadow-sm"
                          role="group"
                        >
                          <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              id="1D"
                              name="investingHorizons"
                              value="1D"
                              checked={investingHorizonOption === "1D"}
                              onChange={handleInvestingHorizonsChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700"
                              htmlFor="1D"
                            >
                              Daily
                            </label>
                          </button>
                          <button type="button">
                            <input
                              className="hidden"
                              type="radio"
                              id="21D"
                              name="investingHorizons"
                              value="21D"
                              checked={investingHorizonOption === "21D"}
                              onChange={handleInvestingHorizonsChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                              htmlFor="21D"
                            >
                              Monthly
                            </label>
                          </button>
                          <button type="button" className="">
                            <input
                              className="hidden"
                              type="radio"
                              id="42D"
                              name="investingHorizons"
                              value="42D"
                              checked={investingHorizonOption === "42D"}
                              onChange={handleInvestingHorizonsChange}
                            />
                            <label
                              className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 "
                              htmlFor="42D"
                            >
                              Bi-Monthly
                            </label>
                          </button>
                        </div>
                      </div>
                      {/*End Investment Horizon*/}
                    </div>
                  </div>
                  {/*End Selectable options*/}

                  {/*Drag and drop*/}
                  {!isChecked && isDragAndDropVisible && (
                    <div className="pt-5">
                      <form>
                        <div className="flex items-center justify-center w-full">
                          <div
                            {...getRootProps()}
                            className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                aria-hidden="true"
                                className="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">
                                CSV (MAX. 800KB)
                              </p>
                            </div>
                            <input
                              {...getInputProps()}
                              id="csv-file"
                              type="file"
                              accept=".csv"
                              className="hidden"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  )}
                  {/*End Drag and drop*/}

                  {/*Upload Table*/}
                  {jsonData && isUploadTableVisible && (
                    <BlockUi
                      blocking={validationIsLoading}
                      message="Validating, please wait"
                      loader={
                        <Loader active type="ball-scale" color="#0248C7" />
                      }
                    >
                      <Table
                        data={jsonData}
                        columns={uploadedColumns}
                        paginated={true}
                        itemsPerPage={10}
                      />
                    </BlockUi>
                  )}
                  {/*End Upload Table*/}

                  {/*Final Table*/}
                  {isFinalTableVisible &&
                    !isChecked &&
                    !isUploadTableVisible && (
                      <BlockUi
                        blocking={optimizationsIsLoading}
                        message="Optimizing your portfolio, please wait"
                        loader={
                          <Loader active type="ball-scale" color="#0248C7" />
                        }
                      >
                        <div className="mt-10">
                          <Table
                            data={jsonFinalData}
                            columns={finalColumns}
                            paginated={true}
                            itemsPerPage={10}
                          />
                        </div>
                      </BlockUi>
                    )}
                  {/*End Fonal Table*/}
                  {/*Button*/}
                  <div className="mt-10 flex flex-row-reverse pb-20">
                    <Button
                      disabled={
                        (!isChecked && isDragAndDropVisible) ||
                        optimizationsIsLoading
                      }
                      color="blue"
                      onClick={
                        isFinalTableVisible &&
                        !isChecked &&
                        !isUploadTableVisible
                          ? handleOptimize
                          : handleValidate
                      }
                    >
                      {isFinalTableVisible &&
                      !isChecked &&
                      !isUploadTableVisible
                        ? "Optimize"
                        : "Validate"}
                    </Button>
                    <Button
                      onClick={handleReset}
                      variant="outline"
                      className="mr-4"
                      color="blue"
                    >
                      Cancel
                    </Button>
                  </div>
                  {/*End Button*/}
                </section>
              </>
            ) : (
              <>
                <section className="mt-4">
                  {/*<BlockUi blocking={optimizationsIsLoading} message="Optimizing your portfolio, please wait"*/}
                  {/*         loader={<Loader active type="ball-scale" color="#0248C7" />}>*/}
                  <div className="mt-10">
                    <div className="flex flex-row-reverse">
                      <Button
                        variant="outline"
                        onClick={()=>handleNewPorfolioButtonClick()}
                      >
                        New Portfolio
                      </Button>
                    </div>
                    {holdingsData && <Table
                      data={holdingsData?.results}
                      columns={listPortfolioColumns}
                      paginated={true}
                      itemsPerPage={10}
                      handleRowClick={(id) =>
                        navigate(`/us/portfolio-analysis/${id}`, {
                          replace: true
                        })
                      }
                    />}
                  </div>
                  {/*</BlockUi>)}*/}
                </section>
              </>
            )}
          </Container>
        </BlockUi>
      </main>
    </>
  );
};

export default PortfolioAnalysis;
