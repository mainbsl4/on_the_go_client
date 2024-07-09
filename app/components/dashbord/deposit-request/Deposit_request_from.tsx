"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";
import { CreateDepositRequestFormValues } from "../../../types/formTypes";
import { Field, Form, Formik } from "formik";
import { CreateDepositRequestSchema } from "../../../utils/validationSchema";
import dayjs from "dayjs";
import { createDepositReq } from "../../../lib/features/deposit/depositSlice";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { uploadSlipImg } from "../../../lib/features/upload/uploadSlice";
import { useSelector } from "react-redux";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
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
  const [file, setFile] = useState(null);

  const dispatch: AppDispatch = useDispatch();
  const imgState = useSelector((state: RootState) => state?.upload?.uploadSlip);
  console.log(imgState);
  let img = ""
  if (imgState && imgState?.length > 0) {
    img = imgState[0]?.url;
  }
  console.log(img);
  const userId = JSON.parse(localStorage?.getItem("userId"));
  console.log(userId);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      dispatch(uploadSlipImg(selectedFile));
    }
  };

  const initialValues: CreateDepositRequestFormValues = {
    userId: userId,
    dpType: "",
    date: "",
    amount: 0,
    bankName: "",
  };

  // const handleSubmit = (values: CreateDepositRequestFormValues) => {
  //   dispatch(createDepositReq(values))
  // };

  // const handleSubmit = async (values: CreateDepositRequestFormValues, { setSubmitting }) => {
  //   const formData = new FormData();
  //   Object.keys(values).forEach(key => {
  //     const value = key === "amount" ? Number(values[key]) : values[key];
  //     formData.append(key, value);
  //   });

  //   if (file) formData.append('slipImage', file);

  //   try {
  //     const response = await dispatch(createDepositReq(formData)).unwrap();
  //     console.log(response);
  //     // Handle successful response
  //   } catch (error) {
  //     console.error('API Error:', error);
  //     // Handle error response
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

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
      formData.forEach((value, key) => {
        console.log(key, value);
      });

      const response = await dispatch(createDepositReq(formData)).unwrap();
      console.log(response);
      // Handle successful response
    } catch (error) {
      console.error("API Error:", error);
      // Handle error response
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={CreateDepositRequestSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, touched, errors }) => (
        <Form className=" w-6/12">
          <Box className="border grid grid-cols-1 gap-4 p-4">
            <Field name="dpType">
              {({ field, form }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films.map((option) => option.label)}
                  onChange={(event, value) =>
                    form.setFieldValue(field.name, value)
                  }
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
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

            <Field name="amount">
              {({ field }) => (
                <TextField
                  {...field}
                  id="outlined-basic"
                  label="Amount"
                  variant="outlined"
                  type="number"
                  error={touched.amount && !!errors.amount}
                  helperText={touched.amount && errors.amount}
                />
              )}
            </Field>
            <Field name="bankName">
              {({ field, form }) => (
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={top100Films.map((option) => option.label)}
                  onChange={(event, value) =>
                    form.setFieldValue(field.name, value)
                  }
                  // sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...field}
                      {...params}
                      label="Choose Bank"
                      error={touched.bankName && !!errors.bankName}
                      helperText={touched.bankName && errors.bankName}
                    />
                  )}
                />
              )}
            </Field>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              color="info"
              tabIndex={-1}
              startIcon={<Icon icon="ep:upload-filled" />}
            >
              Upload file
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
