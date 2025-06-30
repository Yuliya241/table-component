import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Data } from '../interfaces/interfaces';

export interface DataState {
  items: Data[];
}

const initialState: DataState = {
  items: [],
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    addToTable: (state, action: PayloadAction<Data>) => {
      state.items.push(action.payload);
    },
    removeFromTable: (state, action: PayloadAction<Data>) => {
      state.items = state.items.filter((item) => {
        return item.id !== action.payload.id;
      });
    },
    getData: (state, action: PayloadAction<Data[]>) => {
      state.items = action.payload;
    },
  },
});

export const dataReducer = dataSlice.reducer;
export const { addToTable, removeFromTable, getData } = dataSlice.actions;