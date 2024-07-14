import { getRandomNumber } from "../utils/holding";

export const BottomScreenActions = {
    SET_BOTTOM_STATE: "SET_BOTTOM_STATE"
}

export const SCREENERS = ["stock", "forex", "crypto pairs"];

export const FILTERTABS = {
    stock: ["Overview", "Extended Hours", "Valuation", "Dividends", "Margins", "Income Statements", "Balance Sheet", "Oscillators", "Trend-Following"],
    forex: ["Oscillators", "Trend-Following", "Overview"],
    crypto_pairs: ["Overview", "Performance", "Oscillators", "Trend-Following"],
};

export const TIMEINTERVALS = {
    stock: ["1m", "5m", "15m", "30m", "1h", "2h", "4h", "1D", "1W", "1M"],
    forex: ["1m", "5m", "15m", "30m", "1h", "2h", "4h", "1D", "1W", "1M"],
    crypto_pairs: ["1m", "5m", "15m", "30m", "1h", "2h", "4h", "1D", "1W", "1M"],
};

export const GROUPS = ["All", "Exotic", "Major", "Minor"];

export const SCREENS = [
    "General", "Rising pairs", "Falling pairs", "All-time high", "All-time low", "New 52-week high", "New 52-week low", "New monthly high", "New monthly low", "Most volatile", "Overbought", "Oversold", "Outperforming SMA50", "Underperforming SMA50",
]

export const COLUMNS = [
    {
        name: "Price",
        key: "price",
        width: 100,
    },
    {
        name: "CHG %",
        key: "chg_percent",
        width: 100,
    },
    {
        name: "CHG",
        key: "chg",
        width: 120,
    },
    {
        name: "Technical Rating",
        key: "technical_rating",
        width: 150,
    },
    {
        name: "Vol",
        key: "vol",
        width: 80,
    },
    {
        name: "Volume*Price",
        key: "volume_price",
        width: 240,
    },
    {
        name: "Mkt Cap",
        key: "mkt_cap",
        width: 120,
    },
    {
        name: "P/E",
        key: "pe",
        width: 70,
    },
    {
        name: "EPS (TTM)",
        key: "eps_ttm",
        width: 120,
    },
    {
        name: "Employees",
        key: "employees",
        width: 100,
    },
    {
        name: "Sector",
        key: "sector",
        width: 150,
    },
];

export const createData = () => {
    const rows = [];
    for (let i = 0; i < 40; i++) {
        rows.push({
            price: getRandomNumber(0, 100),
            chg_percent: getRandomNumber(0, 100),
            chg: getRandomNumber(-100, 100),
            technical_rating: "Strong Buy",
            vol: getRandomNumber(-100000, 100000),
            volume_price: getRandomNumber(-100000, 100000),
            mkt_cap: getRandomNumber(-100000, 100000),
            pe: getRandomNumber(-100000, 100000),
            eps_ttm: getRandomNumber(-100000, 100000),
            employees: getRandomNumber(-100000, 100000),
            sector: "Technology",
        });
    }
    return rows;
};