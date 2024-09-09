import React, { useState, useEffect } from 'react';
import PortfolioChart from './components/PortfolioChart';
import AssetManager from './components/AssetManager';
import { Asset, sampleAssets } from './types';

function App() {
  const [assets, setAssets] = useState<Asset[]>(() => {
    const savedAssets = localStorage.getItem('portfolioAssets');
    return savedAssets ? JSON.parse(savedAssets) : sampleAssets;
  });

  useEffect(() => {
    localStorage.setItem('portfolioAssets', JSON.stringify(assets));
  }, [assets]);

  const handleAddAsset = (newAsset: Asset) => {
    setAssets([...assets, newAsset]);
  };

  const handleEditAsset = (updatedAsset: Asset) => {
    setAssets(assets.map(asset => asset.id === updatedAsset.id ? updatedAsset : asset));
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssets(assets.filter(asset => asset.id !== assetId));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Portfolio Overview</h1>
      <PortfolioChart assets={assets} />
      <AssetManager
        assets={assets}
        onAddAsset={handleAddAsset}
        onEditAsset={handleEditAsset}
        onDeleteAsset={handleDeleteAsset}
      />
    </div>
  );
}

export default App;