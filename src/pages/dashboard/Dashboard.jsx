import React, { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import usFlag from "../../assets/images/us.png";
import { Button } from "../../components/Button.jsx";
import Tabs from "../../components/Tabs.jsx";
import Table from "../../components/Table.jsx";

const Dashboard = (props) => {

  const [isChecked, setIsChecked] = useState(false);
  const [isEditableTableVisible, setIsEditableTableVisible] = useState(false);
  const [isDragAndDropVisible, setIsDragAndDropVisible] = useState(true);
  const [isUploadTableVisible, setIsUploadTableVisible] = useState(false);
  const [isFinalTableVisible, setIsFinalTableVisible] = useState(false);
  const [jsonData, setJsonData] = useState([
    {
      "ticker": "",
      "weight": ""
    },
    {
      "ticker": "",
      "weight": ""
    },
    {
      "ticker": "",
      "weight": ""
    },
    {
      "ticker": "",
      "weight": ""
    },
    {
      "ticker": "",
      "weight": ""
    },
    {
      "ticker": "",
      "weight": ""
    }
  ]);
  const [jsonFinalData, setJsonFinalData] = useState([
    {
      ticker: "MSFT",
      weight: 30.45,
      status: "Online",
      image:
        "https://flowbite.com/docs/images/people/profile-picture-1.jpg",
      name: "Microsoft",
      exchange: "BCBA"
    },
    {
      ticker: "GOOGL",
      weight: 10.13,
      status: "Online",
      image:
        "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      name: "Alphabet",
      exchange: "BCBA"
    },
    {
      ticker: "AMZN",
      weight: 15.56,
      status: "Online",
      image:
        "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
      name: "Amazon",
      exchange: "BCBA"
    },
    {
      ticker: "AAPL",
      weight: 44.76,
      status: "Offline",
      image:
        "https://flowbite.com/docs/images/people/profile-picture-5.jpg",
      name: "Apple",
      exchange: ""
    }
  ]);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setIsEditableTableVisible(!isChecked)
  };

  useEffect(() => {
    console.log(jsonData);
  }, [jsonData]);


  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setIsChecked(false);
    setIsDragAndDropVisible(false);
    setIsUploadTableVisible(true);
    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function(results) {
        console.log(results.data);
        setJsonData(results.data);
      }
    });
  };

  const handleOptimize = () => {
    setIsChecked(false);
    setIsEditableTableVisible(false);
    setIsDragAndDropVisible(false);
    setIsUploadTableVisible(false);
    setIsFinalTableVisible(true);
  };

  const handleAddRow =()=>{
    setJsonData([...jsonData,  {
      "ticker": "",
      "weight": ""
    }])
  }

  const uploadedColumns = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <div className="pl-3">
              <div className="font-normal text-gray-500">{row.original.ticker}</div>
            </div>
          </div>
        )
      },
      {
        Header: "Percentage %",
        accessor: "weight"
      }
    ],
    []
  );

  const editableColumns = useMemo(
    () => [
      {
        Header: "Ticker",
        accessor: "ticker",
        Cell: ({ row }) => {
          const [value, setValue] = useState(row.original.ticker);
          const onChange = e => {
            setValue(e.target.value);
          };
          return (
            <input
              type="text"
              value={value}
              onChange={onChange}
              onBlur={() => row.original.ticker = value}
              className="w-full p-1"
            />
          );
        }
      },
      {
        Header: "Percentage %",
        accessor: "weight",
        Cell: ({ row }) => {
          const [value, setValue] = useState(row.original.weight);
          const onChange = e => {
            setValue(e.target.value);
          };
          return (
            <input
              type="text"
              value={value}
              onChange={onChange}
              onBlur={() => row.original.weight = value}
              className="w-full p-1"
            />
          );
        }
      }
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
              src={row.original.image}
              alt={row.original.name + " image"}
            />
            <div className="pl-3">
              <div className="text-base font-semibold">{row.original.name}</div>
              <div className="font-normal text-gray-500">BCBA: {row.original.ticker}</div>
            </div>
          </div>
        )
      },
      {
        Header: "Percentage %",
        accessor: "weight"
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => (
          <div className="flex items-center">
            <div
              className={`h-2.5 w-2.5 rounded-full ${row.original.status === "Online" ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
            {row.original.status}
          </div>
        )
      }
    ],
    []
  );

  return (
    <>
      <Header />
      <main>
        <Container>
          {/*Title*/}
          <div className="flex">
            <img
              className="w-10 h-10 rounded-full"
              src={usFlag}
              alt="Rounded avatar"
            />
            <h1 className="text-4xl font-semibold pl-4	uppercase">US Stock Market</h1>
          </div>
          {/*End Title*/}
          {/*Tabs*/}
          <Tabs />
          {/*End Tabs*/}
          {/*Section*/}
          <section className="mt-4">
            {/*Title*/}
            <div>
              <h3 className="text-3xl font-semibold">Portfolio Calibration</h3>
              <p className="text-gray-500 font-light mt-4">Upload your portfolio and select the objective
                function and investment horizon to see how our algorithm would weight the portfolio.</p>
            </div>
            {/*End Title*/}
            {/*Selectable options*/}
            <div className="pl-[100px] pr-[100px]">
              <div className="mt-10 flex justify-between ">
                {/*Toggle*/}
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox"
                           className="sr-only peer"
                           id="manual"
                           name="manual"
                           value="manual"
                           checked={isChecked}
                           onChange={handleOnChange} />
                    <div
                      className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span
                      className="ml-3 text-sm font-normal dark:text-gray-300">Manual Upload</span>
                  </label>
                </div>
                {/*End Toggle*/}
                {/*Objective Function*/}
                <div>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button">
                      <input className="hidden" type="radio" id="minVariance" name="objectiveFunction"
                             value="minVariance" />
                      <label
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        htmlFor="minVariance">
                        Minimum Variance
                      </label>
                    </button>
                    <button type="button"
                            className="">
                      <input className="hidden" type="radio" id="maxReturn" name="objectiveFunction"
                             value="maxReturn" />
                      <label
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        htmlFor="maxReturn">
                        Max Return
                      </label>
                    </button>
                  </div>

                </div>
                {/*End Objective Function*/}
                {/*Investment Horizon*/}
                <div>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button">
                      <input className="hidden" type="radio" id="years" name="investingHorizons" value="years" />
                      <label
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        htmlFor="years">
                        Years
                      </label>
                    </button>
                    <button type="button"
                            className="">
                      <input className="hidden" type="radio" id="months" name="investingHorizons" value="months" />
                      <label
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        htmlFor="months">
                        Months
                      </label>
                    </button>
                    <button type="button"
                            className="">
                      <input className="hidden" type="radio" id="days" name="investingHorizons" value="days" />
                      <label
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                        htmlFor="days">
                        Days
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
                    <label htmlFor="csv-file"
                           className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                             stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                          className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">CSV (MAX.
                          800KB)</p>
                      </div>
                      <input id="csv-file" type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
                    </label>
                  </div>
                </form>
              </div>
            )}
            {/*End Drag and drop*/}
            {isChecked && (
              <Table data={jsonData} columns={editableColumns} />
            )}

            {/*Upload Table*/}
            {jsonData && isUploadTableVisible && (
              <Table data={jsonData} columns={uploadedColumns} />
            )}
            {/*End Upload Table*/}

            {/*Final Table*/}
            {isFinalTableVisible && !isChecked && !isUploadTableVisible && (
              <div className="mt-10">
                <Table data={jsonFinalData} columns={finalColumns} />
              </div>)}
            {/*End Fonal Table*/}
            {/*Button*/}
            <div className="mt-10 flex flex-row-reverse">

              <Button
                color="blue"
                onClick={handleOptimize}
              >
                Validate
              </Button>
              {isEditableTableVisible && (<Button
                color="blue"
                variant="outline"
                className="mr-4"
                onClick={handleAddRow}
              >
                Add row
              </Button>)}
            </div>
            {/*End Button*/}

          </section>
          {/*Section*/}

        </Container>
      </main>
    </>
  );
};

export default Dashboard;
