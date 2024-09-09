import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Asset, HistoricalDataPoint } from '../types';

interface PortfolioChartProps {
  assets: Asset[];
}

interface CombinedDataPoint {
  date: string;
  [key: string]: string | number;
}

const PortfolioChart: React.FC<PortfolioChartProps> = ({ assets }) => {
  if (assets.length === 0) {
    return <div className="text-center p-4">No assets to display</div>;
  }

  const combinedData: CombinedDataPoint[] = assets[0].historicalData.map((_, index) => {
    const dataForDate: CombinedDataPoint = { date: assets[0].historicalData[index].date };
    assets.forEach((asset: Asset) => {
      dataForDate[asset.name] = asset.historicalData[index]?.value || 0;
    });
    return dataForDate;
  });

  return (
    <div className="w-full h-64 mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {assets.map((asset, index) => (
            <Line
              key={asset.id}
              type="monotone"
              dataKey={asset.name}
              stroke={`hsl(${index * 137.5}, 70%, 50%)`}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;