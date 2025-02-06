import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStocks } from "./features/stocksSlice";
import StockDropdown from "./components/StockDropdown";
import DurationSwitcher from "./components/DurationSwitcher";
import StockGraph from "./components/StockGraph";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStocks());
  }, [dispatch]);

  return (
    <div>
      <h1>Alloan.ai Stock Tracker</h1>
      <StockDropdown />
      <DurationSwitcher />
      <StockGraph />
    </div>
  );
};

export default App;
