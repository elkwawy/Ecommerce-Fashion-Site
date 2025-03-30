import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../Api/Api";

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    "allProducts/fetchProducts",
    async (sortTerm, { getState, rejectWithValue }) => {
        const { page, searchTerm, products } = getState().allProducts;

        try {
            const response = await axios.get(API.product, {
                params: { limit: 10, sort: sortTerm || "-createdAt", page, search: searchTerm || null },
            });

            const { data, totalDocuments } = response.data; // Extract totalDocuments from API response

            if (!data.length) {
                return rejectWithValue("No more products");
            }

            return { data, totalDocuments }; // Return both data and totalDocuments
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Error fetching products");
        }
    }
);

const allProducts = createSlice({
    name: "allProducts",
    initialState: {
        products: [],
        loading: false,
        error: null,
        page: 1,
        totalDocs: 0,
        searchTerm: "",
        hasMore: true,
    },
    reducers: {
        resetProducts: (state) => {
            state.products = [];
            state.page = 1;
            state.loading = false;
            state.hasMore = true;
            state.error = null;
            state.totalDocs = 0;
            state.searchTerm= "";
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        resetSearchTerm: (state) => {
            state.searchTerm = "";
        },
        setSortTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        resetSortTerm: (state) => {
            state.searchTerm = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                console.log(action.payload);
                if (action.payload) {
                    const { data, totalDocuments } = action.payload;
                    state.products = [...state.products, ...data];
                    state.page += 1;
                    state.totalDocs = totalDocuments;

                    // Check if we have more products to load
                    state.hasMore = state.products.length < totalDocuments;
                }
                state.loading = false;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error fetching products";
                console.log(action.payload);

                state.hasMore = false;
            });
    },
});

export const { resetProducts, setSearchTerm, resetSearchTerm } = allProducts.actions;
export default allProducts.reducer;
