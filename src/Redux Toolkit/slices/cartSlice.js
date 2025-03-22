import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "../../utilities/showToast";
import { API } from "../../Api/Api";

// Get User Cart
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
        url: API.getUserCart,
        headers: Cookies.get("token")
          ? { authorization: Cookies.get("token") }
          : {},
      };

      const { data } = await axios.request(options);
      return data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const options = {
        method: "POST",
        url: API.getUserCart,
        data: { product: id, quantity },
        headers: Cookies.get("token")
          ? { authorization: Cookies.get("token") }
          : {},
      };

      const { data } = await axios.request(options);
      showToast("success", "Product added to cart");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Update Quantity
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const options = {
        method: "PUT",
        url: `${API.getUserCart}/${id}`,
        data: { quantity },
        headers: Cookies.get("token")
          ? { authorization: Cookies.get("token") }
          : {},
      };

      const { data } = await axios.request(options);
      showToast("success", "Cart updated");
      return data.cart.cartItems;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Delete from Cart
export const deleteFromCart = createAsyncThunk(
  "cart/deleteFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const options = {
        method: "DELETE",
        url: `${API.getUserCart}/${id}`,
        headers: Cookies.get("token")
          ? { authorization: Cookies.get("token") }
          : {},
      };

      await axios.request(options);
      showToast("success", "Item removed from cart");
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unexpected error occurred"
      );
    }
  }
);

// Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async (_, { rejectWithValue }) => {
    try {
      const options = {
        method: "DELETE",
        url: API.getUserCart,
        headers: Cookies.get("token")
          ? { authorization: Cookies.get("token") }
          : {},
      };

      await axios.request(options);
      showToast("success", "Cart cleared");
      return [];
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "An unexpected error occurred"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalCartPrice: 0,
    cartId: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems = action.payload.cartItems || [];
        state.totalCartPrice = action.payload.totalCartPrice || 0;
        state.cartId = action.payload._id || null;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        console.log(action.payload);
        
        state.cartItems = state.cartItems.filter(
          (item) => item.product !== action.payload
        );
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
      });
  },
});

export default cartSlice.reducer;
