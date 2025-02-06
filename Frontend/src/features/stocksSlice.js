import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchStocks, fetchStockData } from "../services/api";

export const getStocks = createAsyncThunk("stocks/getStocks", async () => {
  const response = await fetchStocks();
  return response;
});

export const getStockData = createAsyncThunk(
  "stocks/getStockData",
  async ({ stockId, duration }) => {
    const response = await fetchStockData(stockId, duration);
    return response.data; 
  },
);

const stocksSlice = createSlice({
  name: "stocks",
  initialState: {
    stocks: [],
    selectedStock: null,
    selectedDuration: "5y",
    stockData: [],
    loading: false,
  },
  reducers: {
    setSelectedStock: (state, action) => {
      state.selectedStock = action.payload;
      state.selectedDuration = action.payload?.available[0] || "5y";
    },
    setSelectedDuration: (state, action) => {
      state.selectedDuration = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getStocks.fulfilled, (state, action) => {
        state.stocks = action.payload;
      })
      .addCase(getStockData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getStockData.fulfilled, (state, action) => {
        state.stockData = action.payload;
        state.loading = false;
      });
  },
});

export const { setSelectedStock, setSelectedDuration } = stocksSlice.actions;
export default stocksSlice.reducer;
