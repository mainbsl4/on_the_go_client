import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../../utils/config";

interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}user/register`, userData);
      console.log(response);
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        // localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const signinUser = createAsyncThunk(
  "user/signinUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}user/login`, userData);
      console.log(response);
      if (response.data) {
        localStorage.setItem("token", response.data.token);
        // localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      if(response.data.token){
        window.location.href = "/dashbord";
      }

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signinUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signinUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signinUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
