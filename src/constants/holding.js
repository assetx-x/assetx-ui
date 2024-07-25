import { getRandomNumber } from "../utils/holding";

export const BottomScreenActions = {
    SET_BOTTOM_STATE: "SET_BOTTOM_STATE"
}

export const SCREENERS = ["stock", "forex", "crypto pairs"];

export const FILTERTABS = {
    stock: ["Overall", "Macro", "Value", "Growth", "Quality", "Momentum Fast", "Momentum Slow", "Other Factors", "Trend Following"],
    forex: ["Overall", "Macro", "Value", "Growth", "Quality", "Momentum Fast", "Momentum Slow", "Other Factors", "Trend Following"],
    crypto_pairs: ["Overall", "Macro", "Value", "Growth", "Quality", "Momentum Fast", "Momentum Slow", "Other Factors", "Trend Following"],
};

export const TIMEINTERVALS = {
    stock: ["1W", "1M"],
    forex: ["1W", "1M"],
    crypto_pairs: ["1W", "1M"],
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
        width: 120,
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
            technical_rating: "Buy",
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

export const tableHeadFilter = [
    "Below", "Below or Equal", "Above", "Above or Equal", "Crosses", "Crosses Up", "Crosses down", "Between", "Outside", "Equal", "Not Equal"
]

export const graphTimespan = [
    {
        label : "1D",
        value: "day",
    },
    {
        label : "1W",
        value: "week",
    },
    {
        label : "1M",
        value: "month",
    },
    {
        label : "1Y",
        value: "year",
    },
]