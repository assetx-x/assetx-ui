export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatDateToDashFormat(dateString) {
  // Create a new Date object using the input string
  const date = new Date(dateString);

  // Extract the year, month, and day from the date object
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');

  // Format the date as "YYYY-MM-DD"
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}

export function formatDataForTickerTable(data) {
  const finalData = [];

  for (const date in data) {
    for (const item of data[date]) {
      finalData.push({
        date: formatDateToDashFormat(date),
        company_name: item.company_name,
        company_logo: item.company_logo,
        status: item.status,
        weight: item.weight,
        ticker: item.ticker
      });
    }
  }
  return finalData;

}

export function formatDataForResultsTable(data) {
  const finalData = [];

  for (const date in data) {
    for (const item of data[date]) {
      finalData.push({
        date: formatDateToDashFormat(date),
        asset_x_weights: item.asset_x_weights,
        client_weights: item.client_weights,
        company_logo: item.company_logo,
        company_name: item.company_name,
        difference: item.difference,
        ticker: item.ticker
      });
    }
  }
  return finalData;

}

export function formatDataToSendOptimization(data) {
  const payloadData = { "data": [] };
  const newData = {};

  data.forEach(({ date, ticker, percentage, weight }) => {
    const formattedDate = formatDateToDashFormat(date);

    if (!newData[formattedDate]) {
      newData[formattedDate] = {};
    }

    if (!newData[formattedDate][ticker]) {
      newData[formattedDate][ticker] = 0;
    }

    newData[formattedDate][ticker] += percentage ? +percentage.toString() : +weight.toString() ;
  });

  payloadData.data.push(newData);

  return payloadData;
}