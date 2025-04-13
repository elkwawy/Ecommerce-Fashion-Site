import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "../../utilities/showToast";
import { API } from "../../Api/Api";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token ? { authorization: token } : {};
};

// Get User Cart
export const getUserCart = createAsyncThunk(
  "cart/getUserCart",
  async (_, { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
        url: API.getUserCart,
        headers: getAuthHeaders(),
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
        headers: getAuthHeaders(),
      };
      const { data } = await axios.request(options);
      console.log(data);
      if (typeof data === "object" && data.message?.toLowerCase().includes("not enough stock")) {
        return rejectWithValue(data.message);
      }

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
        headers: getAuthHeaders(),
      };
      const { data } = await axios.request(options);
      return data;
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
        headers: getAuthHeaders(),
      };
      const { data } = await axios.request(options);
      return { ...data, idProduct: id };
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
        headers: getAuthHeaders(),
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
    count:
      JSON.parse(localStorage.getItem("cart")) > 0
        ? JSON.parse(localStorage.getItem("cart"))
        : 0,
  },
  reducers: {
    setValues: (state, action) => {
      state.cartItems = [];
      state.totalCartPrice = 0;
      state.count = 0;
      localStorage.setItem("cart", 0);
    },
  },
  extraReducers: (builder) => {
    builder
      // Get User Cart
      .addCase(getUserCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        const {
          cartItems = [],
          totalCartPrice = 0,
          _id,
        } = action.payload || {};

        Object.assign(state, {
          status: "succeeded",
          cartItems,
          totalCartPrice,
          cartId: _id || null,
          count: cartItems.length,
        });

        localStorage.setItem("cart", cartItems.length);
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add to Cart
      .addCase(addToCart.fulfilled, (state, action) => {
        const { isCartExist, data, message } = action.payload;
        const cartData = isCartExist || data;
        console.log("fulfilled => ", message);

        if (cartData) {
          state.cartItems = cartData.cartItems || [];
          state.totalCartPrice = cartData.totalCartPrice ?? 0;
          state.count = cartData.cartItems?.length ?? 0;
          localStorage.setItem("cart", state.count);
        }

          const newMesg = message ==  "Cart updated successfully" ? "Item added to cart" : message;
        showToast("success", newMesg || "Item added to cart");


        showToast("success", message || "Item added to cart");

      })
      .addCase(addToCart.rejected, (state, action) => {
        const message = action.payload?.message || action.payload;
        console.log("error => ", action.payload);
        
        
        state.error = action.payload;
        showToast("error", message || "Something went wrong");
      })
      // Update Quantity
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { cart, message } = action.payload;

        state.cartItems = cart?.cartItems;
        state.totalCartPrice = cart?.totalCartPrice;

        // showToast("success", message || "Cart updated");
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete from Cart
      .addCase(deleteFromCart.fulfilled, (state, action) => {
        // state.cartItems = state.cartItems.filter(
        //   (item) => item.product !== action.payload.idProduct
        // );
        const { cart, message } = action.payload;

        if (cart) {
          state.cartItems = cart.cartItems || [];
          state.totalCartPrice = cart.totalCartPrice ?? 0;
          state.count = cart.cartItems?.length ?? 0;
          localStorage.setItem("cart", state.count);
        }

        // showToast("success", message || "Item removed from cart");
      })
      .addCase(deleteFromCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Clear Cart
      .addCase(clearCart.fulfilled, (state) => {
        Object.assign(state, {
          cartItems: [],
          totalCartPrice: 0,
          count: 0,
        });
        localStorage.setItem("cart", 0);
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { setValues } = cartSlice.actions;
export default cartSlice.reducer;
