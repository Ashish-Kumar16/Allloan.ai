import { configureStore } from "@reduxjs/toolkit";
import stocksReducer from "./features/stocksSlice";

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});
