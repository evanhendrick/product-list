import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: false,
  cards: [],
  error: "",
  totalProducts: 0,
  allCategories: []
};

export const fetchCards = createAsyncThunk("card/fetchCards", async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const cardSlice = createSlice({
  name: "card",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        console.log("redux state", action)
        state.loading = false;
        state.cards = action.payload.products;
        state.error = "";
        state.totalProducts = action.payload.numOfProducts;
        state.allCategories = action.payload.categories
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.loading = false;
        state.cards = [];
        state.error = action.error.message;
      });
  },
});

export default cardSlice.reducer;
