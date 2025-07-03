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
    editData: (state, action: PayloadAction<Data>) => {
      const { numberValue, name, date } = action.payload;
      const selected = state.items.find((item) => {
        return item.id === action.payload.id;
      });
      if (selected) {
        selected.numberValue = numberValue;
        selected.name = name;
        selected.date = date;
      }
    },
  },
});

export const dataReducer = dataSlice.reducer;
export const { addToTable, removeFromTable, getData, editData } = dataSlice.actions;