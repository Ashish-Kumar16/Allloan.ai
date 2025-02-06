const BASE_URL = "http://localhost:3000";

export const fetchStocks = async () => {
  const response = await fetch(`${BASE_URL}/api/stocks`);
  return response.json();
};

export const fetchStockData = async (stockId, duration) => {
  const response = await fetch(`${BASE_URL}/api/stocks/${stockId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ duration }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch stock data");
  }

  return response.json();
};
