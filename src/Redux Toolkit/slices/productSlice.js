import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { API } from "../../Api/Api";

// Fetch all products
export const allProduct = createAsyncThunk(
  "product/allProduct",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API.product}?limit=${limit}&sort=-createdAt&page=${page}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    limit: 10,
    currentPage: 1,
    totalDocuments: 0,
  },
  reducers: {
    resetProducts: (state) => {
      state.products = [];
      state.currentPage = 1;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allProduct.pending, (state) => {
        state.loading = true;
        state.status = "loading";
      })
      .addCase(allProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
        state.totalDocuments = action.payload.totalDocuments;
      })
      .addCase(allProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
