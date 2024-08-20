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
  "visaApply/createVisaApply",
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}visa_apply/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getAllVisaApply = createAsyncThunk(
  "visaApply/getAllVisaApply",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${base_url}visa_apply/all`);
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateVisaApplyStatus = createAsyncThunk(
  "visaApply/updateVisaApplyStatus",
  async (
    {
      id,
      data,
      comment,
      buyingPrise,
      applyerEmail,
      applyerEmailPass,
      sellingPrise,
      trackingId,
      deliveredVisa,
      applicationCopy,
      paymentReceive,
    }: {
      id: any;
      data: any;
      comment: any;
      buyingPrise: number;
      applyerEmail: any;
      applyerEmailPass: any;
      sellingPrise: number;
      trackingId: any;
      deliveredVisa: any;
      applicationCopy: any;
      paymentReceive: any;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.put(
        `${base_url}visa_apply/update-status/${id}`,
        {
          status: data,
          comment: comment,
          buyingPrise: buyingPrise,
          applyerEmail: applyerEmail,
          applyerEmailPass: applyerEmailPass,
          sellingPrise: sellingPrise,
          trackingId: trackingId,
          deliveredVisa: deliveredVisa,
          applicationCopy: applicationCopy,
          paymentReceive: paymentReceive,
        }
      );
      console.log(response);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateVisaApply = createAsyncThunk(
  "visaApply/updateVisaApply",
  async ({ id, data }: { id: any; data: any }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${base_url}visa_apply/update/${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteVisa = createAsyncThunk(
  "visaApply/deleteVisa",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${base_url}visa_apply/delete/${id}`);
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
      .addCase(getAllVisaApply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllVisaApply.fulfilled, (state, action) => {
        state.loading = false;
        state.visaApply = action.payload;
      })
      .addCase(getAllVisaApply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateVisaApplyStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVisaApplyStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.visaApply = action.payload;
      })
      .addCase(updateVisaApplyStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateVisaApply.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateVisaApply.fulfilled, (state, action) => {
        state.loading = false;
        state.visaApply = action.payload;
      })
      .addCase(updateVisaApply.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteVisa.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteVisa.fulfilled, (state, action) => {
        state.loading = false;
        state.visaApply = action.payload;
      })
      .addCase(deleteVisa.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default visaApplySlice.reducer;
