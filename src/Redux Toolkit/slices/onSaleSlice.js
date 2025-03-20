import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";

export const fetchOnSaleProducts = createAsyncThunk(
  "onSale/fetchOnSaleProducts",
  async ({ page, limit }, {  rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API.product}?limit=${limit}&sort=-createdAt&page=${page}`
      );

      const filteredProducts = response.data.data.filter(
        (product) => product.priceAfterDiscount < product.price
      );

      return {
        data: filteredProducts,
        totalDocuments: response.data.totalDocuments,
        page, 
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const onSaleSlice = createSlice({
  name: "onSale",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    limit: 10,
    currentPage: 7,
    totalDocuments: 0,
  },
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOnSaleProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOnSaleProducts.fulfilled, (state, action) => {
        state.status = "succeeded";

        state.products = [...state.products, ...action.payload.data];

        state.totalDocuments = action.payload.totalDocuments;

        if (state.products.length < 10) {
          state.currentPage = action.payload.page + 1;
        }
      })
      .addCase(fetchOnSaleProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});


export default onSaleSlice.reducer;
