import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../../utils/config";
// import { redirect } from "next/navigation";

interface UserState {
  loan: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  loan: null,
  loading: false,
  error: null,
};

export const createLoanReq = createAsyncThunk(
  "loan/createLoanReq",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}loan_request/create`, data);
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const getAllLoanReq = createAsyncThunk(
  "loan/getAllLoanReq",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}loan_request/all`);
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);




export const updateLoanStatus = createAsyncThunk(
  "loan/updateLoanStatus",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}loan_request/update-status/${id}`,
        data
      );
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const deleteLoan = createAsyncThunk(
  "loan/deleteLoan",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${base_url}loan_request/delete/${id}`
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);


const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createLoanReq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createLoanReq.fulfilled, (state, action) => {
        state.loading = false;
        state.loan = action.payload;
      })
      .addCase(createLoanReq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }) .addCase(getAllLoanReq.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLoanReq.fulfilled, (state, action) => {
        state.loading = false;
        state.loan = action.payload;
      })
      .addCase(getAllLoanReq.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(updateLoanStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLoanStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.loan = action.payload;
      })
      .addCase(updateLoanStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }).addCase(deleteLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteLoan.fulfilled, (state, action) => {
        state.loading = false;
        state.loan = action.payload;
      })
      .addCase(deleteLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
     
  },
});

export default loanSlice.reducer;
