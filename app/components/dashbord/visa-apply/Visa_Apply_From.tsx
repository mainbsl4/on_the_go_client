"use client";
import React, { useState } from "react";
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
import { createVisaApply } from "../../../lib/features/visaApply/visaApplySlice";
import { useDispatch } from "react-redux";

const gender = [
  { label: "Male" },
  { label: "Female" },
  { label: "Non-binary" },
  { label: "Genderqueer" },
  { label: "Genderfluid" },
  { label: "Agender" },
  { label: "Bigender" },
  { label: "Demiboy" },
  { label: "Demigirl" },
  { label: "Two-Spirit" },
  { label: "Pangender" },
  { label: "Androgynous" },
  { label: "Intersex" },
  { label: "Transgender" },
  { label: "Transmasculine" },
  { label: "Transfeminine" },
  { label: "Cisgender" },
  { label: "Neutrois" },
  { label: "Polygender" },
  { label: "Third Gender" },
  { label: "Questioning" }
];
const nationality = [
  { label: "Afghan" },
  { label: "Albanian" },
  { label: "Algerian" },
  { label: "American" },
  { label: "Andorran" },
  { label: "Angolan" },
  { label: "Antiguans" },
  { label: "Argentinean" },
  { label: "Armenian" },
  { label: "Australian" },
  { label: "Austrian" },
  { label: "Azerbaijani" },
  { label: "Bahamian" },
  { label: "Bahraini" },
  { label: "Bangladeshi" },
  { label: "Barbadian" },
  { label: "Barbudans" },
  { label: "Batswana" },
  { label: "Belarusian" },
  { label: "Belgian" },
  { label: "Belizean" },
  { label: "Beninese" },
  { label: "Bhutanese" },
  { label: "Bolivian" },
  { label: "Bosnian" },
  { label: "Brazilian" },
  { label: "British" },
  { label: "Bruneian" },
  { label: "Bulgarian" },
  { label: "Burkinabe" },
  { label: "Burmese" },
  { label: "Burundian" },
  { label: "Cambodian" },
  { label: "Cameroonian" },
  { label: "Canadian" },
  { label: "Cape Verdean" },
  { label: "Central African" },
  { label: "Chadian" },
  { label: "Chilean" },
  { label: "Chinese" },
  { label: "Colombian" },
  { label: "Comoran" },
  { label: "Congolese" },
  { label: "Costa Rican" },
  { label: "Croatian" },
  { label: "Cuban" },
  { label: "Cypriot" },
  { label: "Czech" },
  { label: "Danish" },
  { label: "Djibouti" },
  { label: "Dominican" },
  { label: "Dutch" },
  { label: "East Timorese" },
  { label: "Ecuadorean" },
  { label: "Egyptian" },
  { label: "Emirian" },
  { label: "Equatorial Guinean" },
  { label: "Eritrean" },
  { label: "Estonian" },
  { label: "Ethiopian" },
  { label: "Fijian" },
  { label: "Filipino" },
  { label: "Finnish" },
  { label: "French" },
  { label: "Gabonese" },
  { label: "Gambian" },
  { label: "Georgian" },
  { label: "German" },
  { label: "Ghanaian" },
  { label: "Greek" },
  { label: "Grenadian" },
  { label: "Guatemalan" },
  { label: "Guinea-Bissauan" },
  { label: "Guinean" },
  { label: "Guyanese" },
  { label: "Haitian" },
  { label: "Herzegovinian" },
  { label: "Honduran" },
  { label: "Hungarian" },
  { label: "I-Kiribati" },
  { label: "Icelander" },
  { label: "Indian" },
  { label: "Indonesian" },
  { label: "Iranian" },
  { label: "Iraqi" },
  { label: "Irish" },
  { label: "Israeli" },
  { label: "Italian" },
  { label: "Ivorian" },
  { label: "Jamaican" },
  { label: "Japanese" },
  { label: "Jordanian" },
  { label: "Kazakhstani" },
  { label: "Kenyan" },
  { label: "Kittian and Nevisian" },
  { label: "Kuwaiti" },
  { label: "Kyrgyz" },
  { label: "Laotian" },
  { label: "Latvian" },
  { label: "Lebanese" },
  { label: "Liberian" },
  { label: "Libyan" },
  { label: "Liechtensteiner" },
  { label: "Lithuanian" },
  { label: "Luxembourger" },
  { label: "Macedonian" },
  { label: "Malagasy" },
  { label: "Malawian" },
  { label: "Malaysian" },
  { label: "Maldivian" },
  { label: "Malian" },
  { label: "Maltese" },
  { label: "Marshallese" },
  { label: "Mauritanian" },
  { label: "Mauritian" },
  { label: "Mexican" },
  { label: "Micronesian" },
  { label: "Moldovan" },
  { label: "Monacan" },
  { label: "Mongolian" },
  { label: "Moroccan" },
  { label: "Mosotho" },
  { label: "Motswana" },
  { label: "Mozambican" },
  { label: "Namibian" },
  { label: "Nauruan" },
  { label: "Nepalese" },
  { label: "New Zealander" },
  { label: "Ni-Vanuatu" },
  { label: "Nicaraguan" },
  { label: "Nigerien" },
  { label: "North Korean" },
  { label: "Northern Irish" },
  { label: "Norwegian" },
  { label: "Omani" },
  { label: "Pakistani" },
  { label: "Palauan" },
  { label: "Panamanian" },
  { label: "Papua New Guinean" },
  { label: "Paraguayan" },
  { label: "Peruvian" },
  { label: "Polish" },
  { label: "Portuguese" },
  { label: "Qatari" },
  { label: "Romanian" },
  { label: "Russian" },
  { label: "Rwandan" },
  { label: "Saint Lucian" },
  { label: "Salvadoran" },
  { label: "Samoan" },
  { label: "San Marinese" },
  { label: "Sao Tomean" },
  { label: "Saudi" },
  { label: "Scottish" },
  { label: "Senegalese" },
  { label: "Serbian" },
  { label: "Seychellois" },
  { label: "Sierra Leonean" },
  { label: "Singaporean" },
  { label: "Slovakian" },
  { label: "Slovenian" },
  { label: "Solomon Islander" },
  { label: "Somali" },
  { label: "South African" },
  { label: "South Korean" },
  { label: "Spanish" },
  { label: "Sri Lankan" },
  { label: "Sudanese" },
  { label: "Surinamer" },
  { label: "Swazi" },
  { label: "Swedish" },
  { label: "Swiss" },
  { label: "Syrian" },
  { label: "Taiwanese" },
  { label: "Tajik" },
  { label: "Tanzanian" },
  { label: "Thai" },
  { label: "Togolese" },
  { label: "Tongan" },
  { label: "Trinidadian or Tobagonian" },
  { label: "Tunisian" },
  { label: "Turkish" },
  { label: "Tuvaluan" },
  { label: "Ugandan" },
  { label: "Ukrainian" },
  { label: "Uruguayan" },
  { label: "Uzbekistani" },
  { label: "Venezuelan" },
  { label: "Vietnamese" },
  { label: "Welsh" },
  { label: "Yemenite" },
  { label: "Zambian" },
  { label: "Zimbabwean" },
];
const religion = [
  { label: "Christianity" },
  { label: "Islam" },
  { label: "Hinduism" },
  { label: "Buddhism" },
  { label: "Sikhism" },
  { label: "Judaism" },
  { label: "Bahá'í" },
  { label: "Jainism" },
  { label: "Shinto" },
  { label: "Taoism" },
  { label: "Zoroastrianism" },
  { label: "Confucianism" },
  { label: "Rastafarianism" },
  { label: "Paganism" },
  { label: "Animism" },
  { label: "New Age" },
  { label: "Unitarian Universalism" },
  { label: "Tenrikyo" },
  { label: "Druze" },
  { label: "Cao Dai" },
  { label: "Falun Gong" },
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


  const [filePass, setFilePass] = useState(null);
  const [filePassDoc, setFilePassDoc] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const dispatch = useDispatch();
  console.log(filePass);
  const userId = JSON.parse(localStorage?.getItem('userId'));
  console.log(userId);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFilePass(selectedFile);
  };
  const handleFileChange1 = (event) => {
    const selectedFile = event.target.files[0];
    setFilePassDoc(selectedFile);
  };
  const handleFileChange2 = (event) => {
    const selectedFile = event.target.files[0];
    setFileImage(selectedFile);
  };


  const initialValues: CreateVisaApplyFormValues = {
    userId: userId,
    givenName: "",
    surName: "",
    gender: "",
    nationality: "",
    passportNo: "",
    passExpiryDate: "",
    dob: "",
    religion: "",

  };

  const handleSubmit = async (values: CreateVisaApplyFormValues, { setSubmitting }) => {
    const formData = new FormData();
    Object.keys(values).forEach(key => {
      formData.append(key, values[key]);
    });

    if (filePass) formData.append('passportPdf', filePass);
    if (filePassDoc) formData.append('otherDocumentPdf', filePassDoc);
    if (fileImage) formData.append('image', fileImage);

    try {
      const response = await dispatch(createVisaApply(formData)).unwrap();
      console.log(response);
      // Handle successful response
    } catch (error) {
      console.error('API Error:', error);
      // Handle error response
    } finally {
      setSubmitting(false);
    }
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
                    options={nationality.map((option) => option.label)}
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
                    options={religion.map((option) => option.label)}
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
                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
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
                <VisuallyHiddenInput type="file" onChange={handleFileChange1} />
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
                <VisuallyHiddenInput type="file" onChange={handleFileChange2} />
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
