import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { showToast } from "../../utilities/showToast";
import { API,BASE_URL } from "../../Api/Api";


export const addToWhishList = createAsyncThunk(
  "wishlist/addToWhishList", 
  async ({ id }, { rejectWithValue }) => {
    try {
      const options = {
        method: "POST",
        url: `${BASE_URL}/wishlist`,
        data: { productId: id },
        headers: Cookies.get("token") ? { authorization: Cookies.get("token") } : {},
      };

      const { data } = await axios.request(options);
      showToast("success", "Product added to wishlist");
      return data;
    } catch (error) {
      return  rejectWithValue(error.response?.data || "Request failed");
    }
  }
);


export const getUserWhishList = createAsyncThunk(
  "userwhishlist/getUserWhishList", 
  async (_, { rejectWithValue }) => {
    try {
      const options = {
        method: "GET",
        url: (API.getWishlist),
        headers: Cookies.get("token") ? { authorization: Cookies.get("token") } : {},
      };
      const { data } = await axios.request(options);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Request failed");
    }
  }
);



export const removefromwishlist = createAsyncThunk(
  "userwhishlist/removefromwishlist", 
  async (id, { rejectWithValue }) => {
    try {
      let options = {
        url: `${BASE_URL}/wishlist/${id}`,
        method: 'DELETE',
        headers: { authorization: Cookies.get("token") },
      };

      await axios.request(options);
      showToast("success","Item removed successfully");
    } catch (error) {
      showToast("error","error occurred")
    }
  }
);

const wishListSlice = createSlice({
  name: "wishlist", 
  initialState: {
    wishListItems: [],
    count: JSON.parse(localStorage.getItem("wishlist"))?.length || 0,
    isLoading: false, 
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    
      .addCase(addToWhishList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(addToWhishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishListItems.push(action.payload);
        state.count = state.wishListItems.length;
        localStorage.setItem("wishlist", JSON.stringify(state.wishListItems));
      })
      .addCase(addToWhishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Something went wrong";
      })

     
      .addCase(getUserWhishList.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.error = null;
      })
      .addCase(getUserWhishList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishListItems = action.payload?.data || action.payload || []
        state.count = state.wishListItems.length;
        localStorage.setItem("wishlist", JSON.stringify(state.wishListItems));
      })
      .addCase(getUserWhishList.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(removefromwishlist.pending, (state) => {
        state.isLoading = false;
        state.isError = false;
        state.error = null;
      })
      .addCase(removefromwishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wishListItems = state.wishListItems.filter(item => item._id !== action.meta.arg);
        state.count = state.wishListItems.length;
        localStorage.setItem("wishlist", JSON.stringify(state.wishListItems));
      })  
      .addCase(removefromwishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default wishListSlice.reducer;
