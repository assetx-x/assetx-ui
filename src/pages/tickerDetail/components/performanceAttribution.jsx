import React from "react"
import PerformanceAttributionTable from "../../../components/PerformanceAttributionTable"

const PerformanceAttribution = ({data, selector}) => {
    return (
        <section className="mt-40">
            <h3 className="text-3xl font-semibold">
            Performance Attribution
            </h3>
            <p className="text-gray-500 font-light mt-4 mb-4">
            Here is a breakdown of current factor attribution and based
            on the selected forecast horizon.
            </p>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
            <PerformanceAttributionTable
                data={data?.[selector]?.factor_attribution}
            />
            </div>
        </section>
    )
}

export default PerformanceAttribution