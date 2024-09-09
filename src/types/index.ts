export interface HistoricalDataPoint {
    date: string;
    value: number;
  }
  
  export interface Asset {
    id: string;
    name: string;
    quantity: number;
    currentValue: number;
    percentageChange: number;
    historicalData: HistoricalDataPoint[];
  }
  
  export const sampleAssets: Asset[] = [
    {
      id: "1",
      name: "AAPL",
      quantity: 10,
      currentValue: 182.01,
      percentageChange: 1.5,
      historicalData: [
        { date: "2023-05-01", value: 169.59 },
        { date: "2023-06-01", value: 1800.95 },
        { date: "2023-07-01", value: 1930.97 },
        { date: "2023-08-01", value: 500.65 },
        { date: "2023-09-01", value: 2400.01 }
      ]
    },
    {
      id: "2",
      name: "GOOGL",
      quantity: 5,
      currentValue: 138.21,
      percentageChange: -0.8,
      historicalData: [
        { date: "2023-05-01", value: 1270.87 },
        { date: "2023-06-01", value: 1230.53 },
        { date: "2023-07-01", value: 781.58 },
        { date: "2023-08-01", value: 389.41 },
        { date: "2023-09-01", value: 1380.21 }
      ]
    },
    {
      id: "3",
      name: "META",
      quantity: 8,
      currentValue: 315.46,
      percentageChange: 2.3,
      historicalData: [
        { date: "2023-05-01", value: 2780.43 },
        { date: "2023-06-01", value: 2850.29 },
        { date: "2023-07-01", value: 1825.13 },
        { date: "2023-08-01", value: 3010.32 },
        { date: "2023-09-01", value: 2814.46 }
      ]
    },
    {
      id: "4",
      name: "NFLX",
      quantity: 3,
      currentValue: 439.88,
      percentageChange: -1.2,
      historicalData: [
        { date: "2023-05-01", value: 2891.70 },
        { date: "2023-06-01", value: 1283.48 },
        { date: "2023-07-01", value: 2445.91 },
        { date: "2023-08-01", value: 3109.97 },
        { date: "2023-09-01", value: 1928.88 }
      ]
    }
  ];