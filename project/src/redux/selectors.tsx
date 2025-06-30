import type { RootState } from "./store";

export const selectItems = () => (state: RootState) => state.data.items;