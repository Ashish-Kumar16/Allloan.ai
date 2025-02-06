import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDuration } from "../features/stocksSlice";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

const DurationSwitcher = () => {
  const { selectedStock, selectedDuration } = useSelector(
    (state) => state.stocks,
  );
  const dispatch = useDispatch();

  return (
    <ToggleButtonGroup
      value={selectedDuration}
      exclusive
      onChange={(e, newValue) => dispatch(setSelectedDuration(newValue))}
    >
      {selectedStock?.available.map((duration) => (
        <ToggleButton key={duration} value={duration}>
          {duration}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default DurationSwitcher;
