import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  temperature: null,
  cityName: "London",
};

const temperature = createSlice({
  name: "temperature",
  initialState,
  reducers: {
    updateTemperature(state, action) {
      state.temperature = action.payload.temperature;
      state.cityName = action.payload.cityName;
    },
  },
});

export const { updateTemperature } = temperature.actions;

export default temperature.reducer;
