import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fieldSizeHandler } from "../../utils/fieldSizeHendler";
import { Mode } from "../types";
import { InitialState } from "./types";

const initialState: InitialState = {
  data: null,
  error: null,
  status: null,
  fields: [],
};

export const fetchModes = createAsyncThunk<Mode[]>(
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
    hoverHandler: (state, action) => {
      const field = state.fields[action.payload].isActive;
      state.fields[action.payload].isActive = !field;
    },
    startHandler: (state, action) => {
      state.fields = fieldSizeHandler(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchModes.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchModes.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.status = "resolved";
    });
    builder.addCase(fetchModes.rejected, (state, { payload }) => {
      state.error = payload;
      state.status = "rejected";
    });
  },
});

export const { hoverHandler, startHandler } = dataSlice.actions;
export default dataSlice.reducer