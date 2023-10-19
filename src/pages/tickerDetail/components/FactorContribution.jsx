
const FactorContribution = ({renderTableHeader, renderTableRows}) => {

    return (
        <section>
            <h3 className="text-3xl font-semibold">
            Factor Contribution
            </h3>

            <p className="text-gray-500 font-light mt-4 mb-4">
            Here is a breakdown of current factor attribution and based
            on the selected forecast horizon.
            </p>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                {renderTableHeader()}
                </thead>
                <tbody>{renderTableRows()}</tbody>
            </table>
            </div>
        </section>
    )

}

export default FactorContribution