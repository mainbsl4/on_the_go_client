"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Form, Formik, Field, useField, ErrorMessage } from "formik";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";
import { CreateVisaApplyFormValues } from "../../../types/formTypes";
import { CreateVisaApplySchema } from "../../../utils/validationSchema";
import dayjs from "dayjs";

const gender = [
  { label: "Male", year: 1994 },
  { label: "Female", year: 1972 },
];
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
});

export default function Visa_Apply_Form() {
  const initialValues: CreateVisaApplyFormValues = {
    givenName: "",
    surName: "",
    gender: "",
    nationality: "",
    passportNo: "",
    passExpiryDate: "",
    dob: "",
    religion: "",
  };

  const handleSubmit = (values: CreateVisaApplyFormValues) => {
    console.log(values);
  };

  return (
    <div className="border p-3">
      <Formik
        initialValues={initialValues}
        validationSchema={CreateVisaApplySchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, setFieldValue }) => (
          <Form>
            <div className="grid grid-cols-2 gap-2 ">
              <Field name="givenName">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Given Name"
                    variant="outlined"
                    type="text"
                    error={touched.givenName && !!errors.givenName}
                    helperText={touched.givenName && errors.givenName}
                  />
                )}
              </Field>
              <Field name="surName">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Sur Name"
                    variant="outlined"
                    type="text"
                    error={touched.surName && !!errors.surName}
                    helperText={touched.surName && errors.surName}
                  />
                )}
              </Field>
              <Field name="gender">
                {({ field, form }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={gender.map((option) => option.label)}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...field}
                        {...params}
                        label="Select Gender"
                        error={touched.gender && !!errors.gender}
                        helperText={touched.gender && errors.gender}
                      />
                    )}
                  />
                )}
              </Field>
              <Field name="nationality">
                {({ field, form }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films.map((option) => option.label)}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...field}
                        {...params}
                        label="Select Nationality"
                        error={touched.nationality && !!errors.nationality}
                        helperText={touched.nationality && errors.nationality}
                      />
                    )}
                  />
                )}
              </Field>

              <Field name="passportNo">
                {({ field }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Passport Number"
                    variant="outlined"
                    type="text"
                    error={touched.passportNo && !!errors.passportNo}
                    helperText={touched.passportNo && errors.passportNo}
                  />
                )}
              </Field>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ padding: "0px" }}
                >
                  <Field name="passExpiryDate">
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        label="Passport Expiry Date"
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
                            error={
                              touched.passExpiryDate && !!errors.passExpiryDate
                            }
                            helperText={
                              touched.passExpiryDate && errors.passExpiryDate
                            }
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
                  <Field name="dob">
                    {({ field, form }) => (
                      <DatePicker
                        {...field}
                        label="DOB"
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
                            error={touched.dob && !!errors.dob}
                            helperText={touched.dob && errors.dob}
                          />
                        )}
                      />
                    )}
                  </Field>
                </DemoContainer>
              </LocalizationProvider>

              <Field name="religion">
                {({ field, form }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films.map((option) => option.label)}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        {...field}
                        label="Select Religion"
                        error={touched.religion && !!errors.religion}
                        helperText={touched.religion && errors.religion}
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
                Upload Passport
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                color="info"
                tabIndex={-1}
                startIcon={<Icon icon="ep:upload-filled" />}
              >
                Upload Photo
                <VisuallyHiddenInput type="file" />
              </Button>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                color="info"
                tabIndex={-1}
                startIcon={<Icon icon="ep:upload-filled" />}
              >
                Others Documents
                <VisuallyHiddenInput type="file" />
              </Button>
            </div>
            <div className="text-center mt-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                sx={{ width: "120px" }}
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
