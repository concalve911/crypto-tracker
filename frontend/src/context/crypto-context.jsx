import { createContext, useState, useEffect, useContext } from "react";
import { fetchCrypto, fetchAssets, fetchCryptoNews } from "../api";
import { percentDifference } from "../utils";

const CryptoContext = createContext({
  assets: [],
  crypto: [],
  loading: false,
  addAsset: () => {},
  removeAsset: () => {},
});

export function CryptoContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [crypto, setCrypto] = useState([]);
  const [assets, setAssets] = useState([]);

  function mapAssets(assets, result) {
    return assets.map((asset) => {
      const coin = result.find((c) => c.id === asset.id);
      return {
        grow: asset.price < coin.price,
        growPercent: percentDifference(asset.price, coin.price),
        totalAmount: asset.amount * coin.price,
        totalProfit: asset.amount * coin.price - asset.amount * asset.price,
        name: coin.name,
        purchasePrice: asset.price,

        ...asset,
      };
    });
  }

  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fetchCrypto();
      const assets = await fetchAssets();
      setAssets(mapAssets(assets, result));
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);

  function addAsset(newAsset) {
    setAssets((prev) => {
      const assetWithUniqueId = {
        ...newAsset,
        uniqueId: `${newAsset.id}-${Date.now()}`,
      };
      const updatedAssets = mapAssets([...prev, assetWithUniqueId], crypto);
      localStorage.setItem("userAssets", JSON.stringify(updatedAssets));

      return updatedAssets;
    });
  }

  function removeAsset(uniqueId) {
    setAssets((prev) => {
      const updatedAssets = prev.filter((asset) => asset.uniqueId !== uniqueId);

      localStorage.setItem("userAssets", JSON.stringify(updatedAssets));
      return [...updatedAssets];
    });
  }

  return (
    <CryptoContext.Provider
      value={{ loading, crypto, assets, addAsset, removeAsset }}
    >
      {children}
    </CryptoContext.Provider>
  );
}

export default CryptoContext;

export function useCrypto() {
  return useContext(CryptoContext);
}
