import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../../utils/config";
// import { redirect } from "next/navigation";

interface UserState {
  deposit: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  deposit: null,
  loading: false,
  error: null,
};

export const createDepositReq = createAsyncThunk(
  "deposit/createDepositReq",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}deposit/create`, data);
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const getAllDepositReq = createAsyncThunk(
  "deposit/getAllLoanReq",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}deposit/all`);
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);




export const updateDepositStatus = createAsyncThunk(
  "deposit/updateLoanStatus",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}deposit/update-status/${id}`,
        data
      );
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const deleteDeposit = createAsyncThunk(
  "deposit/deleteLoan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${base_url}deposit/delete/${id}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


const depositSlice = createSlice({
  name: "deposit",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDepositReq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepositReq.fulfilled, (state, action) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addCase(createDepositReq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }) .addCase(getAllDepositReq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDepositReq.fulfilled, (state, action) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addCase(getAllDepositReq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(updateDepositStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDepositStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addCase(updateDepositStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(deleteDeposit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeposit.fulfilled, (state, action) => {
        state.loading = false;
        state.deposit = action.payload;
      })
      .addCase(deleteDeposit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     
  },
});

export default depositSlice.reducer;
