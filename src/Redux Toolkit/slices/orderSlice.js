import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "../../utilities/showToast";
import { API } from "../../Api/Api";

const getAuthHeaders = () => {
  const token = Cookies.get("token");
  return token ? { authorization: token } : {};
};

// Create Cash Order
export const createCashOrder = createAsyncThunk(
  "order/createCashOrder",
  async ({ cartId, orderData }, { rejectWithValue }) => {
    try {
      const options = {
        method: "POST",
        url: `${API.createCashOrder}/${cartId}`,
        data: orderData,
        headers: getAuthHeaders(),
      };

      const { data } = await axios.request(options);
      showToast("success", "Order placed successfully");
      return data.order;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Cash order failed"
      );
    }
  }
);

// Create Checkout Session (Stripe)
export const createInstantPayment = createAsyncThunk(
  "order/createCheckoutSession",
  async ({ cartId, orderData }, { rejectWithValue }) => {
    try {
      const options = {
        method: "POST",
        url: `${API.createInstantPayment}/${cartId}`,
        data: orderData,
        headers: getAuthHeaders(),
      };
      const { data } = await axios.request(options);
      showToast("success", "Checkout session created");
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Instant payment failed"
      );
    }
  }
);

// Get User Orders
export const getUserOrders = createAsyncThunk(
  "order/getUserOrders",
  async (userId, { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
        url: API.getUserOrders(userId),
        headers: getAuthHeaders(),
      };

      const { data } = await axios.request(options);
      
      return data.orders;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message || "Get user orders failed"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: null,
    status: "idle",
    statusOrder: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Cash Order
      .addCase(createCashOrder.pending, (state) => {
        state.statusOrder = "loading";
      })
      .addCase(createCashOrder.fulfilled, (state, action) => {
        console.log(action.payload);
        state.statusOrder = "succeeded";
        state.order = action.payload;
        // state.orders.push(...action.payload.orderItems);
      })
      .addCase(createCashOrder.rejected, (state, action) => {
        state.statusOrder = "failed";
        state.error = action.payload;
      })
      // Instant Payment
      .addCase(createInstantPayment.pending, (state) => {
        state.statusOrder = "loading";
      })
      .addCase(createInstantPayment.fulfilled, (state, action) => {
        console.log(action.payload);
        state.statusOrder = "succeeded";
        state.order = action.payload;
      })
      .addCase(createInstantPayment.rejected, (state, action) => {
        state.statusOrder = "failed";
        state.error = action.payload;
      })
      // Get User Orders
      .addCase(getUserOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
