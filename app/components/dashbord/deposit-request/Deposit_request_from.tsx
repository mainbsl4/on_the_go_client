"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { Box, CircularProgress } from "@mui/material";
import { CreateDepositRequestFormValues } from "../../../types/formTypes";
import { Field, Form, Formik } from "formik";
import { CreateDepositRequestSchema } from "../../../utils/validationSchema";
import dayjs from "dayjs";
import {
  createDepositReq,
  getAllDepositReq,
} from "../../../lib/features/deposit/depositSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { uploadSlipImg } from "../../../lib/features/upload/uploadSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const bankNames = [
  { label: "AB Bank Limited" },
  { label: "Agrani Bank Limited" },
  { label: "Al-Arafah Islami Bank Limited" },
  { label: "Bangladesh Commerce Bank Limited" },
  { label: "Bangladesh Development Bank Limited" },
  { label: "Bank Asia Limited" },
  { label: "BASIC Bank Limited" },
  { label: "BRAC Bank Limited" },
  { label: "Citibank N.A." },
  { label: "Commercial Bank of Ceylon PLC" },
  { label: "Community Bank Bangladesh Limited" },
  { label: "Dhaka Bank Limited" },
  { label: "Dutch-Bangla Bank Limited" },
  { label: "Eastern Bank Limited" },
  { label: "EXIM Bank Limited" },
  { label: "First Security Islami Bank Limited" },
  { label: "Habib Bank Limited" },
  { label: "ICB Islamic Bank Limited" },
  { label: "IFIC Bank Limited" },
  { label: "Islami Bank Bangladesh Limited" },
  { label: "Jamuna Bank Limited" },
  { label: "Janata Bank Limited" },
  { label: "Meghna Bank Limited" },
  { label: "Midland Bank Limited" },
  { label: "Modhumoti Bank Limited" },
  { label: "Mutual Trust Bank Limited" },
  { label: "National Bank Limited" },
  { label: "National Credit and Commerce Bank Limited" },
  { label: "NRB Bank Limited" },
  { label: "NRB Commercial Bank Limited" },
  { label: "NRB Global Bank Limited" },
  { label: "One Bank Limited" },
  { label: "Prime Bank Limited" },
  { label: "Pubali Bank Limited" },
  { label: "Rajshahi Krishi Unnayan Bank" },
  { label: "Rupali Bank Limited" },
  { label: "SBAC Bank Limited" },
  { label: "Shahjalal Islami Bank Limited" },
  { label: "Shimanto Bank Limited" },
  { label: "Social Islami Bank Limited" },
  { label: "Sonali Bank Limited" },
  { label: "Southeast Bank Limited" },
  { label: "Standard Bank Limited" },
  { label: "Standard Chartered Bank" },
  { label: "State Bank of India" },
  { label: "The City Bank Limited" },
  { label: "Trust Bank Limited" },
  { label: "Union Bank Limited" },
  { label: "United Commercial Bank Limited" },
  { label: "Uttara Bank Limited" },
];
const modeOfDepo = [
  { id: 1, label: "Cash / Cheque" },
  { id: 2, label: "Bank Transfer" },
  { id: 3, label: "Branch Deposit" },
];

// for upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  //   width: 1,
});

export default function Deposit_request_from() {
  // select id of depo mode
  const [selectedId, setSelectedId] = useState(null);

  const [file, setFile] = useState(null);
  const [userId, setUserId] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  const imgState = useSelector((state: RootState) => state?.upload?.uploadSlip);
  // for loading define
  const loading = useSelector((state: RootState) => state?.deposit?.loading);

  // for button loading
  const [loadingBtn, setLoadingBtn] = useState(false);
  const router = useRouter();
  let img = "";
  if (imgState && imgState?.length > 0) {
    img = imgState[0]?.url;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromLocalStorage = JSON.parse(
        localStorage?.getItem("userId")
      );
      setUserId(userIdFromLocalStorage);
    }

    // dispatch(getAllDepositReq())
  }, []);

  console.log("pagla", userId);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn(true)
      await dispatch(uploadSlipImg(selectedFile));
      setLoadingBtn(false)
    }
  };

  const initialValues: CreateDepositRequestFormValues = {
    userId: userId,
    dpType: "",
    date: "",
    trnId: "",
    amount: 0,
    bankName: "",
  };

  const handleSubmit = async (
    values: CreateDepositRequestFormValues,
    { setSubmitting }
  ) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      const value = key === "amount" ? Number(values[key]) : values[key];
      formData.append(key, value.toString());
    });

    if (img) formData.append("slipImage", img);

    try {
      // Log formData to check if amount is correctly converted

      const response = await dispatch(createDepositReq(formData)).unwrap();
      console.log("rajakar", response);
      if (response?.status === 200) {
        toast.success("Your deposite request successfully", {
          position: "top-center",
        });
        setTimeout(() => {
          // window.location.href = "/dashbord/deposit-request-list";
          router.push("/dashbord/lone-request-list");

        }, 3000);
      }
      // Handle successful response
    } catch (error) {
      toast.error("Something Worng, please try again", {
        position: "top-center",
      });
      // console.error("API Error:", error);
      // Handle error response
    } finally {
      setSubmitting(false);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress />
    </div>
  ) : (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateDepositRequestSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, touched, errors, setFieldValue, values }) => (
        <Form className=" w-6/12">
          <Box className="border grid grid-cols-1 gap-4 p-4">
            {/* <Field name="dpType">
              {({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={modeOfDepo.map((option) => option.label)}
                  onChange={(event, value) => setFieldValue(field.name, value)} 
                  value={values.dpType}

                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Mode of Deposit"
                      error={touched.dpType && !!errors.dpType}
                      helperText={touched.dpType && errors.dpType}
                    />
                  )}
                />
              )}
            </Field> */}

            <Field name="dpType">
              {({ field }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={modeOfDepo}
                  getOptionLabel={(option) => option.label}
                  onChange={(event, value) => {
                    setFieldValue(field.name, value ? value.label : "");
                    setSelectedId(value ? value.id : null);
                  }}
                  value={
                    modeOfDepo.find(
                      (option) => option.label === values.dpType
                    ) || null
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Mode of Deposit"
                      error={touched.dpType && !!errors.dpType}
                      helperText={touched.dpType && errors.dpType}
                    />
                  )}
                />
              )}
            </Field>

            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <Field name="date">
                  {({ field, form }) => (
                    <DatePicker
                      {...field}
                      label="Date"
                      sx={{ width: "100%" }}
                      value={field.value ? dayjs(field.value) : null}
                      onChange={(date) =>
                        form.setFieldValue(
                          field.name,
                          date ? date.format("YYYY-MM-DD") : ""
                        )
                      }
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          error={touched.date && !!errors.date}
                          helperText={touched.date && errors.date}
                        />
                      )}
                    />
                  )}
                </Field>
              </DemoContainer>
            </LocalizationProvider>



            <Field name="trnId">
              {({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Transaction ID"
                  variant="outlined"
                  type="text"
                  error={touched.trnId && !!errors.trnId}
                  helperText={touched.trnId && errors.trnId}
                />
              )}
            </Field>
            <Field name="amount">
              {({ field }) => (
                <TextField
                  {...field}
                  required
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  error={touched.amount && !!errors.amount}
                  helperText={touched.amount && errors.amount}
                />
              )}
            </Field>

            {
              selectedId === 2 ? (
                <Field name="bankName">
                  {({ field }) => (
                    <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      options={bankNames.map((option) => option.label)}
                      onChange={(event, value) => setFieldValue(field.name, value)}
                      value={values.bankName}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          required
                          label="Choose Bank"
                          error={touched.bankName && !!errors.bankName}
                          helperText={touched.bankName && errors.bankName}
                        />
                      )}
                    />
                  )}
                </Field>
              ) : (<></>)
            }

            <Button
              component="label"
              role={undefined}
              variant="contained"
              color="info"
              tabIndex={-1}
              startIcon={loadingBtn ? (
                <></>
              ) : (
                <Icon icon="ep:upload-filled" />
              )
              }

            >
              {loadingBtn ? (
                <Icon icon="line-md:loading-twotone-loop" className="text-2xl" />
              ) : (
                <>Upload file</>
              )}

              <VisuallyHiddenInput type="file" onChange={handleFileChange} />
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Submit
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
}
