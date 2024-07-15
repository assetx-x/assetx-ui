const AISelectedComparables = ({data, selector}) => {
    return (
        <section className="mb-20 mt-6">


            <div className="mt-6">
            <div className="relative overflow-x ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-[780px]">
                  <h3 className="text-xl font-semibold">
                    AI Selected Comparables
                  </h3>

                  <p className="text-gray-500 font-light mt-4 mb-4">
                    Here are some other names to consider in your portfolio that
                    I am currently bullish on based on your selected forecast
                    horizon.
                  </p>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className=" sticky  text-xs text-gray-700 uppercase bg-gray-50 "></thead>
                    {data?.[selector] && (
                    <tbody>
                    {/*TODO: move data*/}
                        {Object.entries(
                        data?.[selector]?.summary_stats?.comparables
                        ).map(([symbol, company]) => (
                        <tr
                            key={symbol}
                            className="bg-white border-b  hover:bg-gray-50 "
                        >
                            <td className="px-6 py-4">
                            <div className="flex items-center">
                                <img
                                className="w-10 h-10 rounded-full"
                                src={
                                    company.company_logo ||
                                    "https://www.ortodonciasyv.cl/wp-content/uploads/2016/10/orionthemes-placeholder-image-2.png"
                                }
                                alt={company.company_name + " image"}
                                />
                                <div className="pl-3">
                                <div className="text-base font-semibold">
                                    {company.company_name}
                                </div>
                                <div className="font-normal text-gray-500">
                                    {company.sector}
                                </div>
                                </div>
                            </div>
                            {/*<th  scope="col" className="px-6 py-4">*/}
                            {/*  <p>{symbol}</p>*/}
                            {/*  <p>{company.company_name}</p>*/}
                            {/*  <p>{company.sector}</p>*/}
                            {/*  <img src={company.company_logo} alt="Company Logo" />*/}
                            {/*</th>*/}
                            {/*<td className="px-6 py-4">*/}
                            {/*  {company.ticker}*/}
                            {/*</td>*/}
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    )}
                </table>
                </div>
            </div>
            </div>
        </section>
    )
}

export default AISelectedComparables