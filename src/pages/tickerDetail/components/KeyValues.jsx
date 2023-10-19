const KeyValues = ({ data, selector }) => {


  const renderSentiment = (sentiment) => {
    if (sentiment.toLowerCase() === "positive") {
      return (
        <span
          className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{sentiment}</span>
      );
    } else {
      return (<span
        className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">{sentiment}</span>);
    }
  };

  return (
    <section className="mb-20 mt-6">

      <div className="mt-6">
        <div className="relative overflow-x ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3 h-[780px]">
            <h3 className="text-xl font-semibold">
              Summary Values
            </h3>
            <h4 className="text-sm text-gray-500 font-light">Quality Factors</h4>


            <div className={`w-full text-sm text-left text-gray-500`}>
              {data?.[selector]?.summary_stats?.key_values.map((item, index) => {
                return (
                  <div className="item" key={index}>
                    {Object.keys(item).map((key) => (
                      <ul className="bg-white border-b p-4 hover:bg-gray-50" key={key}>
                        <h3 className="font-bold">{key}</h3>
                        {Object.entries(item[key]).map(([factor, [value, sentiment]]) => (
                          <li className="flex w-full justify-between" key={factor}>
                            <div>{factor}</div>
                            <div> ({value}) {renderSentiment(sentiment)}</div>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default KeyValues;