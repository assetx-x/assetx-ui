// const BASE_URL = 'https://assetx-djngo-2dywgqiasq-uk.a.run.app';
const BASE_URL = "https://development-2dywgqiasq-uk.a.run.app";

export const API_URL = {
  VALIDATIONS: `${BASE_URL}/portfolio_validation/data/`,
  PREDICTIONS: `${BASE_URL}/holdings_v3/`,
  DETAILS: `${BASE_URL}/forecast/`,
  DETAILS_V2: `${BASE_URL}/forecast_test/`,
  DASH: `${BASE_URL}/insights/`,
  PRICE: `${BASE_URL}/prices/`,
  LOGIN: `${BASE_URL}/auth/token/`,
  REGISTER: `${BASE_URL}/auth/users/`,
  HOLDINGS: `${BASE_URL}/holdings_test2/`,
  HOLDINGS_V3: `${BASE_URL}/holdings_v3/`,
  DEEP_INSIGHTS: `${BASE_URL}/deep_insight/grab_insights/`,
  TICKER_SEARCH: `${BASE_URL}/tickers/`,
  GTP_SEARCH: `${BASE_URL}/ax_llm`,
  FACTOR_HACK: `${BASE_URL}/factor_hack/`,
};
