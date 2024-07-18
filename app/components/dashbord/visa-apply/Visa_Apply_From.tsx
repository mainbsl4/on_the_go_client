"use client";
import React, { useEffect, useState } from "react";
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
import { Box, CircularProgress } from "@mui/material";
import { CreateVisaApplyFormValues } from "../../../types/formTypes";
import { CreateVisaApplySchema } from "../../../utils/validationSchema";
import dayjs from "dayjs";
import { createVisaApply } from "../../../lib/features/visaApply/visaApplySlice";
import { useDispatch } from "react-redux";
import {
  uploadDocImage,
  uploadImg,
  uploadPassImage,
} from "../../../lib/features/upload/uploadSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const gender = [
  { label: "Male" },
  { label: "Female" },
  { label: "Others" },
  // { label: "Non-binary" },
  // { label: "Genderqueer" },
  // { label: "Genderfluid" },
  // { label: "Agender" },
  // { label: "Bigender" },
  // { label: "Demiboy" },
  // { label: "Demigirl" },
  // { label: "Two-Spirit" },
  // { label: "Pangender" },
  // { label: "Androgynous" },
  // { label: "Intersex" },
  // { label: "Transgender" },
  // { label: "Transmasculine" },
  // { label: "Transfeminine" },
  // { label: "Cisgender" },
  // { label: "Neutrois" },
  // { label: "Polygender" },
  // { label: "Third Gender" },
  // { label: "Questioning" },
];
const nationality = [
  // { label: "Afghan" },
  // { label: "Albanian" },
  // { label: "Algerian" },
  // { label: "American" },
  // { label: "Andorran" },
  // { label: "Angolan" },
  // { label: "Antiguans" },
  // { label: "Argentinean" },
  // { label: "Armenian" },
  // { label: "Australian" },
  // { label: "Austrian" },
  // { label: "Azerbaijani" },
  // { label: "Bahamian" },
  // { label: "Bahraini" },
  { label: "Bangladeshi" },
  // { label: "Barbadian" },
  // { label: "Barbudans" },
  // { label: "Batswana" },
  // { label: "Belarusian" },
  // { label: "Belgian" },
  // { label: "Belizean" },
  // { label: "Beninese" },
  // { label: "Bhutanese" },
  // { label: "Bolivian" },
  // { label: "Bosnian" },
  // { label: "Brazilian" },
  // { label: "British" },
  // { label: "Bruneian" },
  // { label: "Bulgarian" },
  // { label: "Burkinabe" },
  // { label: "Burmese" },
  // { label: "Burundian" },
  // { label: "Cambodian" },
  // { label: "Cameroonian" },
  // { label: "Canadian" },
  // { label: "Cape Verdean" },
  // { label: "Central African" },
  // { label: "Chadian" },
  // { label: "Chilean" },
  // { label: "Chinese" },
  // { label: "Colombian" },
  // { label: "Comoran" },
  // { label: "Congolese" },
  // { label: "Costa Rican" },
  // { label: "Croatian" },
  // { label: "Cuban" },
  // { label: "Cypriot" },
  // { label: "Czech" },
  // { label: "Danish" },
  // { label: "Djibouti" },
  // { label: "Dominican" },
  // { label: "Dutch" },
  // { label: "East Timorese" },
  // { label: "Ecuadorean" },
  // { label: "Egyptian" },
  // { label: "Emirian" },
  // { label: "Equatorial Guinean" },
  // { label: "Eritrean" },
  // { label: "Estonian" },
  // { label: "Ethiopian" },
  // { label: "Fijian" },
  // { label: "Filipino" },
  // { label: "Finnish" },
  // { label: "French" },
  // { label: "Gabonese" },
  // { label: "Gambian" },
  // { label: "Georgian" },
  // { label: "German" },
  // { label: "Ghanaian" },
  // { label: "Greek" },
  // { label: "Grenadian" },
  // { label: "Guatemalan" },
  // { label: "Guinea-Bissauan" },
  // { label: "Guinean" },
  // { label: "Guyanese" },
  // { label: "Haitian" },
  // { label: "Herzegovinian" },
  // { label: "Honduran" },
  // { label: "Hungarian" },
  // { label: "I-Kiribati" },
  // { label: "Icelander" },
  // { label: "Indian" },
  // { label: "Indonesian" },
  // { label: "Iranian" },
  // { label: "Iraqi" },
  // { label: "Irish" },
  // { label: "Israeli" },
  // { label: "Italian" },
  // { label: "Ivorian" },
  // { label: "Jamaican" },
  // { label: "Japanese" },
  // { label: "Jordanian" },
  // { label: "Kazakhstani" },
  // { label: "Kenyan" },
  // { label: "Kittian and Nevisian" },
  // { label: "Kuwaiti" },
  // { label: "Kyrgyz" },
  // { label: "Laotian" },
  // { label: "Latvian" },
  // { label: "Lebanese" },
  // { label: "Liberian" },
  // { label: "Libyan" },
  // { label: "Liechtensteiner" },
  // { label: "Lithuanian" },
  // { label: "Luxembourger" },
  // { label: "Macedonian" },
  // { label: "Malagasy" },
  // { label: "Malawian" },
  // { label: "Malaysian" },
  // { label: "Maldivian" },
  // { label: "Malian" },
  // { label: "Maltese" },
  // { label: "Marshallese" },
  // { label: "Mauritanian" },
  // { label: "Mauritian" },
  // { label: "Mexican" },
  // { label: "Micronesian" },
  // { label: "Moldovan" },
  // { label: "Monacan" },
  // { label: "Mongolian" },
  // { label: "Moroccan" },
  // { label: "Mosotho" },
  // { label: "Motswana" },
  // { label: "Mozambican" },
  // { label: "Namibian" },
  // { label: "Nauruan" },
  // { label: "Nepalese" },
  // { label: "New Zealander" },
  // { label: "Ni-Vanuatu" },
  // { label: "Nicaraguan" },
  // { label: "Nigerien" },
  // { label: "North Korean" },
  // { label: "Northern Irish" },
  // { label: "Norwegian" },
  // { label: "Omani" },
  // { label: "Pakistani" },
  // { label: "Palauan" },
  // { label: "Panamanian" },
  // { label: "Papua New Guinean" },
  // { label: "Paraguayan" },
  // { label: "Peruvian" },
  // { label: "Polish" },
  // { label: "Portuguese" },
  // { label: "Qatari" },
  // { label: "Romanian" },
  // { label: "Russian" },
  // { label: "Rwandan" },
  // { label: "Saint Lucian" },
  // { label: "Salvadoran" },
  // { label: "Samoan" },
  // { label: "San Marinese" },
  // { label: "Sao Tomean" },
  // { label: "Saudi" },
  // { label: "Scottish" },
  // { label: "Senegalese" },
  // { label: "Serbian" },
  // { label: "Seychellois" },
  // { label: "Sierra Leonean" },
  // { label: "Singaporean" },
  // { label: "Slovakian" },
  // { label: "Slovenian" },
  // { label: "Solomon Islander" },
  // { label: "Somali" },
  // { label: "South African" },
  // { label: "South Korean" },
  // { label: "Spanish" },
  // { label: "Sri Lankan" },
  // { label: "Sudanese" },
  // { label: "Surinamer" },
  // { label: "Swazi" },
  // { label: "Swedish" },
  // { label: "Swiss" },
  // { label: "Syrian" },
  // { label: "Taiwanese" },
  // { label: "Tajik" },
  // { label: "Tanzanian" },
  // { label: "Thai" },
  // { label: "Togolese" },
  // { label: "Tongan" },
  // { label: "Trinidadian or Tobagonian" },
  // { label: "Tunisian" },
  // { label: "Turkish" },
  // { label: "Tuvaluan" },
  // { label: "Ugandan" },
  // { label: "Ukrainian" },
  // { label: "Uruguayan" },
  // { label: "Uzbekistani" },
  // { label: "Venezuelan" },
  // { label: "Vietnamese" },
  // { label: "Welsh" },
  // { label: "Yemenite" },
  // { label: "Zambian" },
  // { label: "Zimbabwean" },
  { label: "Others" },
];
const religion = [
  { label: "Islam" },
  { label: "Hinduism" },
  { label: "Christianity" },
  { label: "Buddhism" },
  // { label: "Sikhism" },
  // { label: "Judaism" },
  // { label: "Bahá'í" },
  // { label: "Jainism" },
  // { label: "Shinto" },
  // { label: "Taoism" },
  // { label: "Zoroastrianism" },
  // { label: "Confucianism" },
  // { label: "Rastafarianism" },
  // { label: "Paganism" },
  // { label: "Animism" },
  // { label: "New Age" },
  // { label: "Unitarian Universalism" },
  // { label: "Tenrikyo" },
  // { label: "Druze" },
  // { label: "Cao Dai" },
  // { label: "Falun Gong" },
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
  // file information
  const [fileInfo, setFileInfo] = useState(null);
  const [fileInfo1, setFileInfo1] = useState(null);
  const [fileInfo2, setFileInfo2] = useState(null);
  const [fileInfo3, setFileInfo3] = useState(null);

  const [filePass, setFilePass] = useState(null);
  const [filePassDoc, setFilePassDoc] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  // loading
  const [loading, setLoading] = useState(true);

  const [userId, setUserId] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const userIdFromLocalStorage = JSON.parse(
        localStorage?.getItem("userId")
      );
      setUserId(userIdFromLocalStorage);
    }

    // loading
    // Simulate a loading period
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds loading period

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // loading function
  // useEffect(() => {}, []);

  const imgPassState = useSelector(
    (state: RootState) => state?.upload?.uploadPass
  );
  const imgDocState = useSelector(
    (state: RootState) => state?.upload?.uploadDoc
  );
  const imgState = useSelector((state: RootState) => state?.upload?.uploadImg);

  let imgPass = "";
  let imgDoc = "";
  let img = "";
  if (imgPassState && imgPassState.length > 0) {
    imgPass = imgPassState[0].url;
  }
  if (imgDocState && imgDocState.length > 0) {
    imgDoc = imgDocState[0].url;
  }
  if (imgState && imgState.length > 0) {
    img = imgState[0].url;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      dispatch(uploadPassImage(selectedFile));
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };
  const handleFileChange1 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      dispatch(uploadImg(selectedFile));
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo1({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };
  const handleFileChange2 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      dispatch(uploadDocImage(selectedFile));
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo2({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };
  const handleFileChange3 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      dispatch(uploadDocImage(selectedFile));
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo3({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
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

  const handleSubmit = async (
    values: CreateVisaApplyFormValues,
    { setSubmitting }
  ) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    if (imgPass) formData.append("passportPdf", imgPass);
    if (imgDoc) formData.append("otherDocumentPdf", imgDoc);
    if (img) formData.append("image", img);

    try {
      const response = await dispatch(createVisaApply(formData)).unwrap();
      console.log("pagla", response);
      if (response?.status === 200) {
        toast.success("Your visa applycation created successfully", {
          position: "top-center",
        });
        setTimeout(() => {
          window.location.href = "/dashbord/visa-application-list";
        }, 3000);
        // success
        // window.location.reload();
        // window.location.replace("/main")
        // window.location.assign("/main")
        // window.location.reload(true)
        // window.location.href = "http://localhost:3000/main"
        // window.location.replace("http://localhost:3000/main")
        // window.location.assign("http://localhost:3000/main")
        // window.location.reload(true)
        // window.location.href = "/main"
        // window.location.replace("/main")
        // window.location.assign("/main")
        // window.location.reload(true)
        // window.location.href = "http://localhost:3000/main"
        // window.location.replace("http://localhost:3000/main")
        // window.history.push("/main")

        // tostify
      }

      // Handle successful response
    } catch (error) {
      toast.error("Something Worng, please try again", {
        position: "top-center",
      });
      console.error("API Error:", error);
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
                {({ field, form }) => (
                  <TextField
                    required
                    {...field}
                    id="outlined-basic"
                    label="Full Name"
                    variant="outlined"
                    type="text"
                    error={touched.givenName && !!errors.givenName}
                    helperText={touched.givenName && errors.givenName}
                    onChange={(event) => {
                      const upperCaseValue = event.target.value.toUpperCase();
                      form.setFieldValue(field.name, upperCaseValue);
                    }}
                  />
                )}
              </Field>
              <Field name="surName">
                {({ field, form }) => (
                  <TextField
                    {...field}
                    id="outlined-basic"
                    label="Father Name"
                    variant="outlined"
                    type="text"
                    error={touched.surName && !!errors.surName}
                    helperText={touched.surName && errors.surName}
                    onChange={(event) => {
                      const upperCaseValue = event.target.value.toUpperCase();
                      form.setFieldValue(field.name, upperCaseValue);
                    }}
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
                        required
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
                        required
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
                {({ field, form }) => (
                  <TextField
                    required
                    {...field}
                    id="outlined-basic"
                    label="Passport Number"
                    variant="outlined"
                    type="text"
                    error={touched.passportNo && !!errors.passportNo}
                    helperText={touched.passportNo && errors.passportNo}
                    onChange={(event) => {
                      const upperCaseValue = event.target.value.toUpperCase();
                      form.setFieldValue(field.name, upperCaseValue);
                    }}
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
                            required
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
                        label="Date Of Birth"
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
                        required
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

              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="info"
                  tabIndex={-1}
                  startIcon={<Icon icon="ep:upload-filled" />}
                  sx={{ width: "100%" }}
                >
                  Upload Passport
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange}
                  />
                </Button>
                {fileInfo && (
                  <div>
                    <p>File Name: {fileInfo.name}</p>
                    <p>File Size: {fileInfo.size} KB</p>
                  </div>
                )}
              </div>

              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="info"
                  tabIndex={-1}
                  startIcon={<Icon icon="ep:upload-filled" />}
                  sx={{ width: "100%" }}
                >
                  Upload Photo
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange1}
                  />
                </Button>
                {fileInfo1 && (
                  <div>
                    <p>File Name: {fileInfo1.name}</p>
                    <p>File Size: {fileInfo1.size} KB</p>
                  </div>
                )}
              </div>
              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="info"
                  tabIndex={-1}
                  startIcon={<Icon icon="ep:upload-filled" />}
                  sx={{ width: "100%" }}
                >
                  Pervious Visa (If Any)
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange2}
                  />
                </Button>
                {fileInfo2 && (
                  <div>
                    <p>File Name: {fileInfo2.name}</p>
                    <p>File Size: {fileInfo2.size} KB</p>
                  </div>
                )}
              </div>
              <div>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  color="info"
                  tabIndex={-1}
                  startIcon={<Icon icon="ep:upload-filled" />}
                  sx={{ width: "100%" }}
                >
                  Others Documents
                  <VisuallyHiddenInput
                    type="file"
                    onChange={handleFileChange3}
                  />
                </Button>
                {fileInfo3 && (
                  <div>
                    <p>File Name: {fileInfo3.name}</p>
                    <p>File Size: {fileInfo3.size} KB</p>
                  </div>
                )}
              </div>
            </div>
            <div className="text-center mt-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="contained"
                sx={{
                  width: "150px",
                  height: "50px",
                  fontSize: "17px",
                  marginTop: "6px",
                }}
                // size="large"
              >
                Apply
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
