import { configureStore } from "@reduxjs/toolkit";
import cardReducer from "../reducers/fetchProducts";

const store = configureStore({
  reducer: {
    card: cardReducer,
  },
});

export default store;
