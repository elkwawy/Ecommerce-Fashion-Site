import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {BASE_URL } from "../../Api/Api";


export const updateProfile = createAsyncThunk(
  "profile/updateProfile", 
  async ({ name, email }) => {
    try {
      const options = {
        method: "PUT",
        url: `${BASE_URL}/user/updateMe`,
        data: {
            name,  
            email
        },
        headers: Cookies.get("token") ? { authorization: Cookies.get("token") } : {},
      };
      const { data } = await axios.request(options);
     
      return data;
    } catch (error) {
      return (error.response?.data || "Request failed");
    }
  }
);

const profileSlice = createSlice({
  name: "profile", 
  initialState: {
    userData: null,
     loading: false,
    isError: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.isError = false
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.error = action.payload;
    })
   
     
  },
});

export default profileSlice.reducer;
