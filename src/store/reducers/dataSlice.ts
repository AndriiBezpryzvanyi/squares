import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fieldSizeHandler } from "../../utils/fieldSizeHendler";
import { InitialState } from "./types";

const initialState: InitialState = {
  modes: null,
  error: null,
  status: null,
  fields: [],
};

export const fetchModes = createAsyncThunk(
  "data/fetchModes",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch("https://demo7919674.mockable.io/");
      if (!response.ok) {
        throw new Error("Server Error");
      }
      const data = await response.json();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const dataSlice = createSlice({
  name: "dataSlice",
  initialState,
  reducers: {
    hoverHandler: (state, action: PayloadAction<number>) => {
      const field = state.fields[action.payload].isActive;
      state.fields[action.payload].isActive = !field;
    },
    startHandler: (state, action: PayloadAction<number>) => {
      state.fields = fieldSizeHandler(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchModes.fulfilled, (state, { payload }) => {
      state.modes = payload;
      state.status = "resolved";
    });
    builder.addCase(fetchModes.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = "rejected";
    });
  },
});

export const { hoverHandler, startHandler } = dataSlice.actions;
export default dataSlice.reducer;
