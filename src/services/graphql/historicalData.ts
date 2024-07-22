import { gql } from "@apollo/client";

export const GET_HISTORICAL_DATA = gql`
  query GetHistoricalData(
    $endTime: String
    $startTime: String
    $ticker: String
    $multiplier: Int
    $timespan: String
  ) {
    historicalData(
      endTime: $endTime
      startTime: $startTime
      ticker: $ticker
      multiplier: $multiplier
      timespan: $timespan
    ) {
      transactions
      volume
      close
      high
      low
      open
      otc
      timestamp
    }
  }
`;
