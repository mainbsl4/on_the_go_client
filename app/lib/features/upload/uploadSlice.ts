import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../../utils/config";
// import { redirect } from "next/navigation";

interface UploadState {
    uploadPass: any;
    uploadDoc: any;
    uploadImg: any;
    uploadImgIf: any;
    deliveredVisa: any;
    applicationCopy: any;
    paymentReceive: any;
    uploadSlip: any;
    loading: boolean;
    error: string | null;
}

const initialState: UploadState = {
    uploadPass: null,
    uploadDoc: null,
    uploadImg: null,
    uploadImgIf: null,
    deliveredVisa: null,
    applicationCopy: null,
    paymentReceive: null,
    uploadSlip: null,
    loading: false,
    error: null,
};


export const uploadPassImage = createAsyncThunk(
    "upload/uploadPassImage",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("images", file);

            const response = await axios.post(
                `${base_url}upload/pass-image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const uploadDocImage = createAsyncThunk(
    "upload/uploadDocImage",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("images", file);

            const response = await axios.post(
                `${base_url}upload/doc-image`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const uploadDocImageIf = createAsyncThunk(
    "upload/uploadDocImageIf",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("images", file);

            const response = await axios.post(
                `${base_url}upload/previous-visa-img`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const deliveredVisaPdf = createAsyncThunk(
    "upload/deliveredVisaPdf",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("images", file);

            const response = await axios.post(
                `${base_url}upload/delivered-visa-pdf`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const uploadImg = createAsyncThunk(
    "upload/uploadImg",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("images", file);

            const response = await axios.post(
                `${base_url}upload/img`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);
export const uploadSlipImg = createAsyncThunk(
    "upload/uploadSlipImg",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("images", file);

            const response = await axios.post(
                `${base_url}upload/deposit-img`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const applicationCopyImg = createAsyncThunk(
    "upload/applicationCopyImg",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("images", file);

            const response = await axios.post(
                `${base_url}upload/application-img`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);


export const paymentReceiveImg = createAsyncThunk(
    "upload/paymentReceiveImg",
    async (file: File, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append("images", file);

            const response = await axios.post(
                `${base_url}upload/payment-img`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response.data);
        }
    }
);


const uploadSlice = createSlice({
    name: "upload",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(uploadPassImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadPassImage.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadPass = action.payload;
            })
            .addCase(uploadPassImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(uploadDocImage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadDocImage.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadDoc = action.payload;
            })
            .addCase(uploadDocImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(uploadImg.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadImg.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadImg = action.payload;
            })
            .addCase(uploadImg.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(uploadSlipImg.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadSlipImg.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadSlip = action.payload;
            })
            .addCase(uploadSlipImg.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(uploadDocImageIf.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(uploadDocImageIf.fulfilled, (state, action) => {
                state.loading = false;
                state.uploadImgIf = action.payload;
            })
            .addCase(uploadDocImageIf.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(deliveredVisaPdf.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deliveredVisaPdf.fulfilled, (state, action) => {
                state.loading = false;
                state.deliveredVisa = action.payload;
            })
            .addCase(deliveredVisaPdf.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(applicationCopyImg.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(applicationCopyImg.fulfilled, (state, action) => {
                state.loading = false;
                state.applicationCopy = action.payload;
            })
            .addCase(applicationCopyImg.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(paymentReceiveImg.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(paymentReceiveImg.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentReceive = action.payload;
            })
            .addCase(paymentReceiveImg.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    },
});

export default uploadSlice.reducer;
