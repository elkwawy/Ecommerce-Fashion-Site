import axios from "axios";
import { API } from "../../Api/Api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getSubcategoryProducts = createAsyncThunk(
  "subcategory/getSubcategoryProducts",
  async (id) => {
    try {
      const response = await axios.get(API.getSpecificSubcategory(id));
      if (response && response.data && response.data.data.SubCategoryProducts)
        return response.data.data.SubCategoryProducts;
    } catch (err) {
      return err;
    }
    return [];
  }
);

export const getAllProducts = createAsyncThunk(
  "subcategory/getAllProducts",
  async ({ categoryID, page }) => {
    console.log("page L", page);
    const response = await axios.get(
      API.getAllSubcategoriesForSpecificCategory(categoryID),
      {
        params: {
          limit: 3,
          page,
        },
      }
    );

    console.log(response);

    if (response && response.data && response.data.data) {
      const products = response.data.data.reduce((allProducts, subcat) => {
        if (subcat.SubCategoryProducts) {
          return [...allProducts, ...subcat.SubCategoryProducts];
        }
        return allProducts;
      }, []);
      if (Math.ceil(response.data.totalDocuments / 3) <= page) {
        return { products: products, hasMore: false };
      }
      return { products: products, hasMore: true };
    }
    return [];
  }
);

const getSubcatProducts = createAsyncThunk(
  "subcategory/getSubcatProducts",
  async (page, subcatId) => {
    const response = await axios.get(API.getSpecificSubcategory(subcatId), {
      params: {
        limit: 3, // 3 products for each subcategory
        page: 2,
      },
    });
  }
);

const subcategorySlice = createSlice({
  name: "subcategory",
  initialState: {
    products: [],
    status: "idle",
    showMoreLoading: false,
    hasMore: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubcategoryProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSubcategoryProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(getSubcategoryProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "An error occurred";
      })
      .addCase(getAllProducts.pending, (state, action) => {
        if (action.meta.arg.page === 1) state.status = "loading";
        else state.showMoreLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.products = action.payload.products; // Replace only on first page
        } else {
          state.products = [...state.products, ...action.payload.products]; // Append new products
        }
        state.hasMore = action.payload.hasMore;
        state.status = "succeeded";
        state.showMoreLoading = false;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.showMoreLoading = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

export default subcategorySlice.reducer;
