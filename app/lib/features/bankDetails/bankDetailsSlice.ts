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
  async (data:any, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${base_url}mst_bank_details/create`,
        data
      );
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

export const getBankDetails = createAsyncThunk(
  "bankDetails/getBankDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${base_url}mst_bank_details/allBankDetails`
      );
      // console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateBankDetails = createAsyncThunk(
  "bankDetails/updateBankDetails",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}mst_bank_details/update/${id}`,
        data
      );
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteBankDetail = createAsyncThunk(
  "bankDetails/deleteBankDetail",
  async (id:any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${base_url}mst_bank_details/delete/${id}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      .addCase(getBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bankDetails = action.payload;
      })
      .addCase(getBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateBankDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBankDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.bankDetails = action.payload;
      })
      .addCase(updateBankDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteBankDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBankDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.bankDetails = action.payload;
      })
      .addCase(deleteBankDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bankDetailsSlice.reducer;
