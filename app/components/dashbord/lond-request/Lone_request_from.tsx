"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { CreateLoneRequestValues } from "../../../types/formTypes";
import { Field, Form, Formik } from "formik";
import { CreateLoneRequestSchema } from "../../../utils/validationSchema";
import dayjs from "dayjs";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

export default function Lone_request_from() {
  const initialValues: CreateLoneRequestValues = {
    reqDate: "", // Change to null if reqDate is a Date object
    settlmentDate: "", // Change to null if settlmentDate is a Date object
    amount: 0,
    remarks: "",
    refNo: "",
  };

  const handleSubmit = (values: CreateLoneRequestValues) => {
    console.log(values);
  };

  return (
    <div className="border p-3 w-6/12">
      <Formik
        initialValues={initialValues}
        validationSchema={CreateLoneRequestSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-1 gap-2">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ padding: "0px" }}
                >
                  <Field name="reqDate">
                    {({ field }) => (
                      <DatePicker
                        {...field}
                        label="Request Date"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          setFieldValue(
                            "reqDate",
                            date ? date.format("YYYY-MM-DD") : ""
                          )
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            error={touched.reqDate && !!errors.reqDate}
                            helperText={touched.reqDate && errors.reqDate}
                            sx={{ width: "100%" }}
                          />
                        )}
                      />
                    )}
                  </Field>
                </DemoContainer>
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ padding: "0px" }}
                >
                  <Field name="settlmentDate">
                    {({ field }) => (
                      <DatePicker
                        {...field}
                        label="Settlement Date"
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date) =>
                          setFieldValue(
                            "settlmentDate",
                            date ? date.format("YYYY-MM-DD") : ""
                          )
                        }
                        error={touched.settlmentDate && !!errors.settlmentDate}
                        helperText={
                          touched.settlmentDate && errors.settlmentDate
                        }
                        sx={{ width: "100%" }}
                      />
                    )}
                  </Field>
                </DemoContainer>
              </LocalizationProvider>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ padding: "0px" }}
                >
                  <Field name="settlmentDate">
                  {({ field }) => (
                  <DatePicker
                   {...field}
                    label="Settlement Date"
                    value={field.value}
                    onChange={(date) => setFieldValue("settlmentDate", date)}
                    error={touched.settlmentDate && !!errors.settlmentDate}
                    helperText={touched.settlmentDate && errors.settlmentDate}
                    sx={{ width: "100%" }} />
                )}
                  </Field>
                </DemoContainer>
              </LocalizationProvider> */}
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
              <Field name="remarks">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Remarks (Optional)"
                    variant="outlined"
                    type="text"
                    error={touched.remarks && !!errors.remarks}
                    helperText={touched.remarks && errors.remarks}
                  />
                )}
              </Field>
              <Field name="refNo">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Reference Number"
                    variant="outlined"
                    type="tel"
                    error={touched.refNo && !!errors.refNo}
                    helperText={touched.refNo && errors.refNo}
                  />
                )}
              </Field>
            </div>
            <div className="text-center mt-3">
              <Button
                type="submit"
                variant="contained"
                sx={{ width: "100px" }}
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
