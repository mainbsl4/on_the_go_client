import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../../utils/config";
// import { redirect } from "next/navigation";

interface UserState {
  visaApply: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  visaApply: null,
  loading: false,
  error: null,
};

export const createVisaApply = createAsyncThunk(
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





const visaApplySlice = createSlice({
  name: "visaApply",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createVisaApply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createVisaApply.fulfilled, (state, action) => {
        state.loading = false;
        state.visaApply = action.payload;
      })
      .addCase(createVisaApply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     
  },
});

export default visaApplySlice.reducer;
