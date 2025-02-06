import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStockData } from "../features/stocksSlice";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale, 
  Title,
  Tooltip,
  Legend,
);

const StockGraph = () => {
  const { selectedStock, selectedDuration } = useSelector(
    (state) => state.stocks,
  );
  const dispatch = useDispatch();
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedStock || !selectedDuration) return;
    setLoading(true);
    setError(null);
    setGraphData([]); 
    let attempts = 0;
    const fetchData = async () => {
      if (attempts >= 5) {
        setLoading(false);
        return;
      }
      attempts++;

      try {
        const data = await dispatch(
          getStockData({
            stockId: selectedStock.id,
            duration: selectedDuration,
          }),
        ).unwrap();

        if (data.length > 0) {
          setGraphData(data);
          setLoading(false);
        } else {
          setTimeout(fetchData, 1000);
        }
      } catch (err) {
        setError("Failed to fetch stock data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedStock, selectedDuration, dispatch]);


  // Chart.js Data Configuration
  const chartData = {
    labels: graphData.map((point) => point.timestamp),
    datasets: [
      {
        label: selectedStock?.name || "Stock Data",
        data: graphData.map((point) => point.price),
        borderColor: "blue",
        fill: false,
      },
    ],
  };


  return (
    <div>
      <h2>
        {selectedStock
          ? `${selectedStock.name} (${selectedStock.symbol})`
          : "Select a Stock"}
      </h2>

      {loading && <p>Loading stock data...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {graphData.length > 0 ? (
        <Line data={chartData} />
      ) : (
        !loading && <p>No data available.</p>
      )}
    </div>
  );
};

export default StockGraph;
