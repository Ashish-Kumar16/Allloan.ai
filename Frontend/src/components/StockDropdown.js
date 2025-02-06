import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedStock } from "../features/stocksSlice";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";

const StockDropdown = () => {
  const { stocks, selectedStock } = useSelector((state) => state.stocks);
  const dispatch = useDispatch();

  return (
    <FormControl fullWidth>
      <InputLabel>Select Stock</InputLabel>
      <Select
        value={selectedStock?.id || ""}
        onChange={(e) =>
          dispatch(
            setSelectedStock(stocks.find((s) => s.id === e.target.value)),
          )
        }
      >
        {stocks.map((stock) => (
          <MenuItem key={stock.id} value={stock.id}>
            {stock.name} ({stock.symbol})
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default StockDropdown;
