import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../../utils/config";
// import { redirect } from "next/navigation";

interface UserState {
  bankDetails: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  bankDetails: null,
  loading: false,
  error: null,
};

export const createBankDetails = createAsyncThunk(
  "bankDetails/createBankDetails",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}mst_bank_details/create`, data);
      console.log(response);
    //   if (response.data) {
    //     // localStorage.setItem("token", response.data.token);
    //     // localStorage.setItem('user', JSON.stringify(response.data.user));
    //   }
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);
// export const signinUser = createAsyncThunk(
//   "user/signinUser",
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${base_url}user/login`, userData);
//       console.log(response);
//       if (response.data) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem('userId', JSON.stringify(response.data.user.id));
//       }
//       // if(response.data.token){
//       //   window.location.href = "/dashbord";
//       //   redirect('/dashbord')
//       // }

//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const getUser = createAsyncThunk(
//   "user/getUser",
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(`${base_url}user/${id}`);
//       console.log(response);
//       return response.data;
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const bankDetailsSlice = createSlice({
  name: "bankDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bankDetails = action.payload;
      })
      .addCase(createBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     
  },
});

export default bankDetailsSlice.reducer;
