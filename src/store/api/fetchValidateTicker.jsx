const fetchValidateTicker = async (data) => {
  const tickers = data.map(item => item.ticker).join("_");
  const weights = data.map(item => item.weight).join("_");
  const apiRes = await fetch(`https://assetx-api2-2dywgqiasq-uk.a.run.app/api/v1/asset_x_service/port_validation/${tickers}/${weights}`);

  if (!apiRes.ok) {
    throw new Error(`Problem retrieving tickers data: ${apiRes.status}`);
  }

  return apiRes.json();
};

export default fetchValidateTicker;