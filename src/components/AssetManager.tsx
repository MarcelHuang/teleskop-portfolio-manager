import React, { useState } from 'react';
import { Asset, HistoricalDataPoint } from '../types';

interface AssetManagerProps {
  assets: Asset[];
  onAddAsset: (asset: Asset) => void;
  onEditAsset: (asset: Asset) => void;
  onDeleteAsset: (assetId: string) => void;
}

const AssetManager: React.FC<AssetManagerProps> = ({ assets, onAddAsset, onEditAsset, onDeleteAsset }) => {
  const [ticker, setTicker] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentValue, setCurrentValue] = useState('');
  const [percentageChange, setPercentageChange] = useState('');
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAddHistoricalDataPoint = () => {
    setHistoricalData([...historicalData, { date: '', value: 0 }]);
  };

  const handleHistoricalDataChange = (index: number, field: 'date' | 'value', value: string) => {
    const updatedData = historicalData.map((point, i) => 
      i === index ? { ...point, [field]: field === 'value' ? parseFloat(value) : value } : point
    );
    setHistoricalData(updatedData);
  };

  const handleRemoveHistoricalDataPoint = (index: number) => {
    setHistoricalData(historicalData.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!ticker || !quantity || !currentValue || !percentageChange) {
      setError('All fields are required');
      return;
    }

    const newAsset: Asset = {
      id: editingAsset ? editingAsset.id : Date.now().toString(),
      name: ticker,
      quantity: parseInt(quantity),
      currentValue: parseFloat(currentValue),
      percentageChange: parseFloat(percentageChange),
      historicalData: historicalData
    };

    if (editingAsset) {
      onEditAsset(newAsset);
    } else {
      onAddAsset(newAsset);
    }

    resetForm();
  };

  const resetForm = () => {
    setTicker('');
    setQuantity('');
    setCurrentValue('');
    setPercentageChange('');
    setHistoricalData([]);
    setEditingAsset(null);
  };

  const handleEdit = (asset: Asset) => {
    setEditingAsset(asset);
    setTicker(asset.name);
    setQuantity(asset.quantity.toString());
    setCurrentValue(asset.currentValue.toString());
    setPercentageChange(asset.percentageChange.toString());
    setHistoricalData(asset.historicalData);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Manage Assets</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2 flex flex-wrap">
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
            placeholder="Ticker symbol"
            className="mr-2 mb-2 p-2 border rounded"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="mr-2 mb-2 p-2 border rounded"
          />
          <input
            type="number"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            placeholder="Current Value"
            className="mr-2 mb-2 p-2 border rounded"
          />
          <input
            type="number"
            value={percentageChange}
            onChange={(e) => setPercentageChange(e.target.value)}
            placeholder="Percentage Change"
            className="mr-2 mb-2 p-2 border rounded"
          />
        </div>
        <div className="mb-2">
          <h3 className="text-lg font-medium mb-1">Historical Data</h3>
          {historicalData.map((point, index) => (
            <div key={index} className="mb-2 flex">
              <input
                type="date"
                value={point.date}
                onChange={(e) => handleHistoricalDataChange(index, 'date', e.target.value)}
                className="mr-2 p-2 border rounded"
              />
              <input
                type="number"
                value={point.value}
                onChange={(e) => handleHistoricalDataChange(index, 'value', e.target.value)}
                placeholder="Value"
                className="mr-2 p-2 border rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveHistoricalDataPoint(index)}
                className="bg-red-500 text-white p-2 rounded"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddHistoricalDataPoint}
            className="bg-green-500 text-white p-2 rounded mb-2"
          >
            Add Historical Data Point
          </button>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editingAsset ? 'Update Asset' : 'Add Asset'}
        </button>
        {editingAsset && (
          <button
            type="button"
            onClick={resetForm}
            className="ml-2 bg-gray-500 text-white p-2 rounded"
          >
            Cancel Edit
          </button>
        )}
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Ticker</th>
              <th className="px-4 py-2 text-left">Quantity</th>
              <th className="px-4 py-2 text-left">Current Value</th>
              <th className="px-4 py-2 text-left">% Change</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map(asset => (
              <tr key={asset.id} className="border-b">
                <td className="px-4 py-2">{asset.name}</td>
                <td className="px-4 py-2">{asset.quantity}</td>
                <td className="px-4 py-2">${asset.currentValue.toFixed(2)}</td>
                <td className={`px-4 py-2 ${asset.percentageChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {asset.percentageChange.toFixed(2)}%
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleEdit(asset)}
                    className="bg-yellow-500 text-white p-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteAsset(asset.id)}
                    className="bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetManager;