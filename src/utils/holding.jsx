import {
  faAnglesUp,
  faChevronDown,
  faChevronUp,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function formatNumber(num) {
  if (num >= 1.0e12) {
    return (num / 1.0e12).toFixed(3) + "T";
  } else if (num >= 1.0e9) {
    return (num / 1.0e9).toFixed(3) + "B";
  } else if (num >= 1.0e6) {
    return (num / 1.0e6).toFixed(3) + "M";
  } else if (num >= 1.0e3) {
    return (num / 1.0e3).toFixed(3) + "K";
  } else {
    return num.toString();
  }
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const stockRowsFormat = (rows) => {
  return rows.map((row) => ({
    price: (
      <span className="flex w-full gap-1 items-end justify-end">
        <span className="text-gray-600 font-semibold">
          {row.price.toFixed(2)}
        </span>
        <span className="text-gray-400 text-[10px]">USD</span>
      </span>
    ),
    chg_percent: (
      <span
        className={`font-semibold ${
          row.chg_percent >= 0 ? `text-[#22ab94]` : `text-red-500`
        }`}
      >
        {row.chg_percent.toFixed(2)}%
      </span>
    ),
    chg: (
      <span className="flex gap-1 items-end">
        <span
          className={`font-semibold ${
            row.chg >= 0 ? `text-[#22ab94]` : `text-red-500`
          }`}
        >
          {row.chg.toFixed(2)}
        </span>
        <span className="text-gray-400 text-[10px]">USD</span>
      </span>
    ),
    technical_rating: (
      <span
        className={`flex gap-1 items-center ${
          row.technical_rating.toLowerCase() === "buy" ||
          row.technical_rating.toLowerCase() === "strong buy"
            ? "text-blue-500"
            : row.technical_rating.toLowerCase() === "sell"
            ? "text-red-500"
            : "text-gray-400"
        }`}
      >
        <FontAwesomeIcon
          icon={
            row.technical_rating.toLowerCase() === "buy"
              ? faChevronUp
              : row.technical_rating.toLowerCase() === "strong buy"
              ? faAnglesUp
              : row.technical_rating.toLowerCase() === "sell"
              ? faChevronDown
              : faMinus
          }
        />
        <span className="text-xs font-semibold">{row.technical_rating}</span>
      </span>
    ),
    vol: <span>{formatNumber(row.vol)}</span>,
    volume_price: <span>{formatNumber(row.volume_price)}</span>,
    mkt_cap: (
      <span className="flex gap-1 items-end">
        <span className="text-gray-600">{formatNumber(row.mkt_cap)}</span>
        <span className="text-gray-400 text-[10px]">USD</span>
      </span>
    ),
    pe: <span>{formatNumber(row.vol)}</span>,
    eps_ttm: (
      <span className="flex gap-1 items-end">
        <span className="text-gray-600">{formatNumber(row.mkt_cap)}</span>
        <span className="text-gray-400 text-[10px]">USD</span>
      </span>
    ),
    employees: <span>{formatNumber(row.vol)}</span>,
    sector: <span>{row.sector}</span>,
  }));
};
