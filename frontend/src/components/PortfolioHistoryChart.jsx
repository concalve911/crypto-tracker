import { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { useCrypto } from "../context/crypto-context";
import { Button } from "antd";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PortfolioHistoryChart() {
  const { assets, crypto } = useCrypto();
  const [timeFrame, setTimeFrame] = useState("day");

  const cryptoPriceMap = crypto.reduce((acc, coin) => {
    acc[coin.id] = coin;
    return acc;
  }, {});

  let labels;
  let priceChangeKey;

  if (timeFrame === "hour") {
    labels = ["Now", "-15m", "-30m", "-45m", "-60m"];
    priceChangeKey = "priceChange1h";
  } else if (timeFrame === "week") {
    labels = ["Now", "-1d", "-3d", "-5d", "-7d"];
    priceChangeKey = "priceChange1w";
  } else {
    labels = ["Now", "-6h", "-12h", "-18h", "-24h"];
    priceChangeKey = "priceChange1d";
  }

  const currentValues = labels.map((_, i) => {
    const factor = (labels.length - 1 - i) / (labels.length - 1);
    return assets
      .reduce((acc, asset) => {
        const coin = cryptoPriceMap[asset.id];
        if (!coin) return acc;

        const pastPrice =
          coin.price / (1 + (coin[priceChangeKey] / 100) * (1 - factor));
        return acc + asset.amount * pastPrice;
      }, 0)
      .toFixed(2);
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Current Wallet Value ($)",
        data: currentValues,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: `Portfolio History (${timeFrame})`,
      },
    },
  };

  return (
    <div>
      <div style={{ marginBottom: "1rem" }}>
        <Button
          onClick={() => setTimeFrame("hour")}
          type={timeFrame === "hour" ? "primary" : "default"}
        >
          1 Hour
        </Button>
        <Button
          onClick={() => setTimeFrame("day")}
          type={timeFrame === "day" ? "primary" : "default"}
          style={{ marginLeft: "0.5rem" }}
        >
          1 Day
        </Button>
        <Button
          onClick={() => setTimeFrame("week")}
          type={timeFrame === "week" ? "primary" : "default"}
          style={{ marginLeft: "0.5rem" }}
        >
          1 Week
        </Button>
      </div>
      <Line options={options} data={data} style={{ marginBottom: "2rem" }} />
    </div>
  );
}
