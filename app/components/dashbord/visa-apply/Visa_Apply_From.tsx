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
import { createVisaApply } from "../../../lib/features/visaApply/visaApplySlice";
import { useDispatch } from "react-redux";
import {
  uploadDocImage,
  uploadDocImageIf,
  uploadImg,
  uploadPassImage,
} from "../../../lib/features/upload/uploadSlice";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";



const minDate = dayjs().add(6, 'month').startOf('day')

const gender = [
  { label: "MALE" },
  { label: "FEMALE" },
  { label: "OTHERS" },
];
const nationality = [
  { label: "BANGLADESHI" },
  { label: "OTHERS" },
];



const whichCountry = [
  { label: "AFGHANISTAN" },
  { label: "ALBANIA" },
  { label: "ALGERIA" },
  { label: "ANDORRA" },
  { label: "ANGOLA" },
  { label: "ANTIGUA AND BARBUDA" },
  { label: "ARGENTINA" },
  { label: "ARMENIA" },
  { label: "AUSTRALIA" },
  { label: "AUSTRIA" },
  { label: "AZERBAIJAN" },
  { label: "BAHAMAS" },
  { label: "BAHRAIN" },
  { label: "BANGLADESH" },
  { label: "BARBADOS" },
  { label: "BELARUS" },
  { label: "BELGIUM" },
  { label: "BELIZE" },
  { label: "BENIN" },
  { label: "BHUTAN" },
  { label: "BOLIVIA" },
  { label: "BOSNIA AND HERZEGOVINA" },
  { label: "BOTSWANA" },
  { label: "BRAZIL" },
  { label: "BRUNEI" },
  { label: "BULGARIA" },
  { label: "BURKINA FASO" },
  { label: "BURUNDI" },
  { label: "CABO VERDE" },
  { label: "CAMBODIA" },
  { label: "CAMEROON" },
  { label: "CANADA" },
  { label: "CENTRAL AFRICAN REPUBLIC" },
  { label: "CHAD" },
  { label: "CHILE" },
  { label: "CHINA" },
  { label: "COLOMBIA" },
  { label: "COMOROS" },
  { label: "CONGO, DEMOCRATIC REPUBLIC OF THE" },
  { label: "CONGO, REPUBLIC OF THE" },
  { label: "COSTA RICA" },
  { label: "CROATIA" },
  { label: "CUBA" },
  { label: "CYPRUS" },
  { label: "CZECH REPUBLIC" },
  { label: "DENMARK" },
  { label: "DJIBOUTI" },
  { label: "DOMINICA" },
  { label: "DOMINICAN REPUBLIC" },
  { label: "ECUADOR" },
  { label: "EGYPT" },
  { label: "EL SALVADOR" },
  { label: "EQUATORIAL GUINEA" },
  { label: "ERITREA" },
  { label: "ESTONIA" },
  { label: "ESWATINI" },
  { label: "ETHIOPIA" },
  { label: "FIJI" },
  { label: "FINLAND" },
  { label: "FRANCE" },
  { label: "GABON" },
  { label: "GAMBIA" },
  { label: "GEORGIA" },
  { label: "GERMANY" },
  { label: "GHANA" },
  { label: "GREECE" },
  { label: "GRENADA" },
  { label: "GUATEMALA" },
  { label: "GUINEA" },
  { label: "GUINEA-BISSAU" },
  { label: "GUYANA" },
  { label: "HAITI" },
  { label: "HONDURAS" },
  { label: "HUNGARY" },
  { label: "ICELAND" },
  { label: "INDIA" },
  { label: "INDONESIA" },
  { label: "IRAN" },
  { label: "IRAQ" },
  { label: "IRELAND" },
  { label: "ISRAEL" },
  { label: "ITALY" },
  { label: "JAMAICA" },
  { label: "JAPAN" },
  { label: "JORDAN" },
  { label: "KAZAKHSTAN" },
  { label: "KENYA" },
  { label: "KIRIBATI" },
  { label: "KOREA, NORTH" },
  { label: "KOREA, SOUTH" },
  { label: "KOSOVO" },
  { label: "KUWAIT" },
  { label: "KYRGYZSTAN" },
  { label: "LAOS" },
  { label: "LATVIA" },
  { label: "LEBANON" },
  { label: "LESOTHO" },
  { label: "LIBERIA" },
  { label: "LIBYA" },
  { label: "LIECHTENSTEIN" },
  { label: "LITHUANIA" },
  { label: "LUXEMBOURG" },
  { label: "MADAGASCAR" },
  { label: "MALAWI" },
  { label: "MALAYSIA" },
  { label: "MALDIVES" },
  { label: "MALI" },
  { label: "MALTA" },
  { label: "MARSHALL ISLANDS" },
  { label: "MAURITANIA" },
  { label: "MAURITIUS" },
  { label: "MEXICO" },
  { label: "MICRONESIA" },
  { label: "MOLDOVA" },
  { label: "MONACO" },
  { label: "MONGOLIA" },
  { label: "MONTENEGRO" },
  { label: "MOROCCO" },
  { label: "MOZAMBIQUE" },
  { label: "MYANMAR" },
  { label: "NAMIBIA" },
  { label: "NAURU" },
  { label: "NEPAL" },
  { label: "NETHERLANDS" },
  { label: "NEW ZEALAND" },
  { label: "NICARAGUA" },
  { label: "NIGER" },
  { label: "NIGERIA" },
  { label: "NORTH MACEDONIA" },
  { label: "NORWAY" },
  { label: "OMAN" },
  { label: "PAKISTAN" },
  { label: "PALAU" },
  { label: "PALESTINE" },
  { label: "PANAMA" },
  { label: "PAPUA NEW GUINEA" },
  { label: "PARAGUAY" },
  { label: "PERU" },
  { label: "PHILIPPINES" },
  { label: "POLAND" },
  { label: "PORTUGAL" },
  { label: "QATAR" },
  { label: "ROMANIA" },
  { label: "RUSSIA" },
  { label: "RWANDA" },
  { label: "SAINT KITTS AND NEVIS" },
  { label: "SAINT LUCIA" },
  { label: "SAINT VINCENT AND THE GRENADINES" },
  { label: "SAMOA" },
  { label: "SAN MARINO" },
  { label: "SAO TOME AND PRINCIPE" },
  { label: "SAUDI ARABIA" },
  { label: "SENEGAL" },
  { label: "SERBIA" },
  { label: "SEYCHELLES" },
  { label: "SIERRA LEONE" },
  { label: "SINGAPORE" },
  { label: "SLOVAKIA" },
  { label: "SLOVENIA" },
  { label: "SOLOMON ISLANDS" },
  { label: "SOMALIA" },
  { label: "SOUTH AFRICA" },
  { label: "SPAIN" },
  { label: "SRI LANKA" },
  { label: "SUDAN" },
  { label: "SUDAN, SOUTH" },
  { label: "SURINAME" },
  { label: "SWEDEN" },
  { label: "SWITZERLAND" },
  { label: "SYRIA" },
  { label: "TAIWAN" },
  { label: "TAJIKISTAN" },
  { label: "TANZANIA" },
  { label: "THAILAND" },
  { label: "TIMOR-LESTE" },
  { label: "TOGO" },
  { label: "TONGA" },
  { label: "TRINIDAD AND TOBAGO" },
  { label: "TUNISIA" },
  { label: "TURKEY" },
  { label: "TURKMENISTAN" },
  { label: "TUVALU" },
  { label: "UGANDA" },
  { label: "UKRAINE" },
  { label: "UNITED ARAB EMIRATES" },
  { label: "UNITED KINGDOM" },
  { label: "UNITED STATES" },
  { label: "URUGUAY" },
  { label: "UZBEKISTAN" },
  { label: "VANUATU" },
  { label: "VATICAN CITY" },
  { label: "VENEZUELA" },
  { label: "VIETNAM" },
  { label: "YEMEN" },
  { label: "ZAMBIA" },
  { label: "ZIMBABWE" },
];

const religion = [
  { label: "ISLAM" },
  { label: "HINDUISM" },
  { label: "CHRISTIANITY" },
  { label: "BUDDHISM" },
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
  // for button loading
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [loadingBtn1, setLoadingBtn1] = useState(false);
  const [loadingBtn2, setLoadingBtn2] = useState(false);
  const [loadingBtn3, setLoadingBtn3] = useState(false);

  const [userId, setUserId] = useState(null);
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
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
  const previousPassState = useSelector(
    (state: RootState) => state?.upload?.uploadImgIf
  );

  let imgPass = "";
  let imgDoc = "";
  let img = "";
  let previousPass = "";
  if (imgPassState && imgPassState.length > 0) {
    imgPass = imgPassState[0].url;
  }
  if (imgDocState && imgDocState.length > 0) {
    imgDoc = imgDocState[0].url;
  }
  if (imgState && imgState.length > 0) {
    img = imgState[0].url;
  }
  if (previousPassState && previousPassState.length > 0) {
    previousPass = previousPassState[0].url;
  }

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const selectedFile = event.target.files?.[0];
  //   if (selectedFile) {
  //     dispatch(uploadPassImage(selectedFile));
  //   }

  //   // file information
  //   const file = event.target.files[0];
  //   if (file) {
  //     setFileInfo({
  //       name: file.name,
  //       size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
  //     });
  //   }
  // };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setLoadingBtn(true); // Set loading to true before the API call
      await dispatch(uploadPassImage(selectedFile));
      setLoadingBtn(false); // Set loading to false after the API call
    }

    // File information
    const file = event.target.files[0];
    if (file) {
      setFileInfo({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };

  const handleFileChange1 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn1(true);
      await dispatch(uploadImg(selectedFile));
      setLoadingBtn1(false);
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
  const handleFileChange2 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn2(true);
      await dispatch(uploadDocImageIf(selectedFile));

      setLoadingBtn2(false);
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
  const handleFileChange3 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn3(true);
      await dispatch(uploadDocImage(selectedFile));
      setLoadingBtn3(false);
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
    applyForCountry: "",
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
    if (previousPass) formData.append("previousPassPdf", previousPass);

    try {
      const response = await dispatch(createVisaApply(formData)).unwrap();
      // console.log("pagla", response);
      if (response?.status === 200) {
        toast.success("Your visa applycation created successfully", {
          position: "top-center",
        });
        setTimeout(() => {
          // window.location.href = "/dashbord/visa-application-list";
          router.push("/dashbord/visa-application-list");
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
              <Field name="applyForCountry">
                {({ field, form }) => (
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={whichCountry.map((option) => option.label)}
                    onChange={(event, value) =>
                      form.setFieldValue(field.name, value)
                    }
                    renderInput={(params) => (
                      <TextField
                        required
                        {...field}
                        {...params}
                        label="Which country for visa"
                        error={
                          touched.applyForCountry && !!errors.applyForCountry
                        }
                        helperText={
                          touched.applyForCountry && errors.applyForCountry
                        }
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
                        minDate={minDate}
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
                  startIcon={
                    loadingBtn ? <></> : <Icon icon="ep:upload-filled" />
                  }
                  sx={{ width: "100%" }}
                >
                  {loadingBtn ? (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-2xl"
                    />
                  ) : (
                    <>Upload Passport</>
                  )}

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
                  startIcon={
                    loadingBtn1 ? <></> : <Icon icon="ep:upload-filled" />
                  }
                  sx={{ width: "100%" }}
                >
                  {loadingBtn1 ? (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-2xl"
                    />
                  ) : (
                    <>Upload Photo</>
                  )}

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
                  // startIcon={<Icon icon="ep:upload-filled" />}
                  startIcon={
                    loadingBtn2 ? <></> : <Icon icon="ep:upload-filled" />
                  }
                  sx={{ width: "100%" }}
                >
                  {loadingBtn2 ? (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-2xl"
                    />
                  ) : (
                    <>Upload Previous Visa (If Any)</>
                  )}
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
                  startIcon={
                    loadingBtn3 ? <></> : <Icon icon="ep:upload-filled" />
                  }
                  sx={{ width: "100%" }}
                >
                  {loadingBtn3 ? (
                    <Icon
                      icon="line-md:loading-twotone-loop"
                      className="text-2xl"
                    />
                  ) : (
                    <>Upload Others Documents (If Any)</>
                  )}
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
