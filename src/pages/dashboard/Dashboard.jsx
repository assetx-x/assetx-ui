import React, { useState } from "react";
import { Header } from "../../components/Header.jsx";
import { Container } from "../../components/Container.jsx";
import usFlag from "../../assets/images/us.png";
import { Button } from "../../components/Button.jsx";
import Tabs from "../../components/Tabs.jsx";

const Dashboard = (props) => {

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
                    <input type="checkbox" className="sr-only peer"  id="manual" name="manual" value="manual"/>
                    <div
                      className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                    <span
                      className="ml-3 text-sm font-normal dark:text-gray-300">Manual Upload (CSV)</span>
                  </label>
                </div>
                {/*End Toggle*/}
                {/*Objective Function*/}
                <div>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                      Minimum Variance
                    </button>
                    <button type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                      Max Return
                    </button>
                  </div>

                </div>
                {/*End Objective Function*/}
                {/*Investment Horizon*/}
                <div>
                  <div className="inline-flex rounded-md shadow-sm" role="group">
                    <button type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                      Years
                    </button>
                    <button type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                      Months
                    </button>
                    <button type="button"
                            className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white">
                      Days
                    </button>
                  </div>

                </div>
                {/*End Investment Horizon*/}
              </div>
            </div>
            {/*End Selectable options*/}
            {/*Drag and drop*/}
            <div className="pt-5">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file"
                       className="flex flex-col items-center justify-center w-full h-[400px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span
                      className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX.
                      800x400px)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
            {/*End Drag and drop*/}
            {/*Table*/}
            <div className="mt-10">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead
                    className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Ticker
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Percentage %
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="w-10 h-10 rounded-full"
                           src="https://flowbite.com/docs/images/people/profile-picture-1.jpg" alt="Jese image" />
                      <div className="pl-3">
                        <div className="text-base font-semibold">Microsoft</div>
                        <div className="font-normal text-gray-500">BCBA: MSFT</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      30.45
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        Online
                      </div>
                    </td>
                  </tr>
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row"
                        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="w-10 h-10 rounded-full"
                           src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                      <div className="pl-3">
                        <div className="text-base font-semibold">Alphabet</div>
                        <div className="font-normal text-gray-500">BCBA: GOOGL</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      10.13
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        Online
                      </div>
                    </td>
                  </tr>
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row"
                        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="w-10 h-10 rounded-full"
                           src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese image" />
                      <div className="pl-3">
                        <div className="text-base font-semibold">Amazon</div>
                        <div className="font-normal text-gray-500">BCBA: AMZN</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      15.56
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        Online
                      </div>
                    </td>
                  </tr>
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row"
                        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="w-10 h-10 rounded-full"
                           src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Jese image" />
                      <div className="pl-3">
                        <div className="text-base font-semibold">Apple</div>
                        <div className="font-normal text-gray-500">AAPL</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      44.76
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                        Online
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row"
                        className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <img className="w-10 h-10 rounded-full"
                           src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Jese image" />
                      <div className="pl-3">
                        <div className="text-base font-semibold">Meta Platforms</div>
                        <div className="font-normal text-gray-500">Meta Platforms</div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      12.00
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                        Offline
                      </div>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/*End Table*/}
            {/*Button*/}
            <div className="mt-10 flex flex-row-reverse">
              <Button color="blue">
                Optimize
              </Button>
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
