import { combineReducers } from "@reduxjs/toolkit";
import { dataReducer } from "./slices";

export const rootReducer = combineReducers({
  data: dataReducer,
});
