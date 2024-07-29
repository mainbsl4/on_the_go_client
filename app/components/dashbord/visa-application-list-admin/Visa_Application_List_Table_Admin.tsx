"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";

import img from "../../../assets/images/dashbord/dashbord_page/plain1.jpg";
import Image from "next/image";
import { UpdateVisaApplyFormValues } from "../../../types/formTypes";
import { Field, Form, Formik } from "formik";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { UpdateVisaApplySchema } from "../../../utils/validationSchema";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { useDispatch } from "react-redux";
import {
  deleteVisa,
  getAllVisaApply,
  updateVisaApply,
  updateVisaApplyStatus,
} from "../../../lib/features/visaApply/visaApplySlice";
import {
  deliveredVisaPdf,
  uploadDocImage,
  uploadImg,
  uploadPassImage,
} from "../../../lib/features/upload/uploadSlice";

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
  { label: "Questioning" },
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

const statusCatagory = [
  { id: 1, label: "CANCELLED" },
  { id: 2, label: "RECEIVED" },
  { id: 3, label: "APPLIED" },
  { id: 4, label: "APPROVED" },
  { id: 5, label: "REJECTED" },
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

//for modal style
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  // display:"grid",
  // gridTemplateColumns: "40% 40%",
  // justifyContent:"space-between",
  // gridGap:"5px"
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Visa_Application_List_Table_Admin() {
  // file information
  const [fileInfo3, setFileInfo3] = React.useState(null);

  // for get data from status and comment
  const [status, setStatus] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [buyingPrise, setbuyingPrise] = React.useState(null);
  const [sellingPrise, setsellingPrise] = React.useState(null);
  const [trackingId, setTrackingId] = React.useState(null);
  const [loadingBtn4, setLoadingBtn4] = React.useState(false);

  // const [comment, setComment] = React.useState("");

  const [value, setValue] = React.useState(0);
  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };






  const handleFileChange4 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
     setLoadingBtn4(true);
      await dispatch(deliveredVisaPdf(selectedFile));
     setLoadingBtn4(false);
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



  const deliveredVisaState = useSelector((state: RootState) => state?.upload?.deliveredVisa);

  let deliveredVisa = "";

  if (deliveredVisaState && deliveredVisaState.length > 0) {
    deliveredVisa = deliveredVisaState[0].url;
  }

  // for modal
  // for view modal
  // for select data
  const [selectedDataForView, setSelectedDataForVie] = React.useState(null);

  const [openModalForView, setOpenModalForView] = React.useState(false);
  // const handleOpenModalForView = () => setOpenModalForView(true);
  const handleOpenModalForView = (data: any) => {
    setSelectedDataForVie(data);
    setOpenModalForView(true);
  };
  // const handleCloseModalForView = () => setOpenModalForView(false);
  const handleCloseModalForView = () => {
    setSelectedDataForVie(null);
    setOpenModalForView(false);
  };
  // for edit modal
  const [selectedDataForEdit, setSelectedDataForEdit] = React.useState(null);

  const [openModalForEdit, setOpenModalForEdit] = React.useState(false);
  // const handleOpenModalForEdit = () => setOpenModalForEdit(true);
  const handleOpenModalForEdit = (data: any) => {
    setOpenModalForEdit(true);
    setSelectedDataForEdit(data);
  };
  // const handleCloseModalForEdit = () => setOpenModalForEdit(false);
  const handleCloseModalForEdit = () => {
    setOpenModalForEdit(false);
    setSelectedDataForEdit(null);
  };

  // for cancle modal

  const [openModalForDelete, setOpenModalForDelete] = React.useState(false);
  const [idForDelete, setIdForDelete] = React.useState(null);

  const handleClickOpenModalForDelete = (id: any) => {
    setOpenModalForDelete(true);
    setIdForDelete(id);
  };

  const handleCloseModalForDelete = () => {
    setOpenModalForDelete(false);
  };

  const actionDataGet = (sec: number) => {
    setTimeout(() => {
      dispatch(getAllVisaApply());
    }, sec);
  };

  const handleDataDelete = () => {
    dispatch(deleteVisa(idForDelete));
    setOpenModalForDelete(false);
    actionDataGet(500);
  };

  // get data
  const getVesaApplyData = useSelector(
    (state: RootState) => state?.visaApply?.visaApply?.data || []
  );

  // loading
  const loading = useSelector((state: RootState) => state?.visaApply?.loading);

  React.useEffect(() => {
    dispatch(getAllVisaApply());
  }, []);

  const reversedgetVesaApplyData = Array.isArray(getVesaApplyData)
    ? getVesaApplyData.slice().reverse() // Reverse the array if needed
    : [];

  // formik validation
  const initialValues: UpdateVisaApplyFormValues = {
    userId: selectedDataForEdit?.userId,
    givenName: selectedDataForEdit?.givenName || "",
    surName: selectedDataForEdit?.surName || "",
    gender: selectedDataForEdit?.gender || "",
    nationality: selectedDataForEdit?.nationality || "",
    passportNo: selectedDataForEdit?.passportNo || "",
    passExpiryDate: selectedDataForEdit?.passExpiryDate || "",
    dob: selectedDataForEdit?.dob || "",
    religion: selectedDataForEdit?.religion || "",
  };
  const handleSubmit = async (
    values: UpdateVisaApplyFormValues,
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
      const response = await dispatch(
        updateVisaApply({ id: selectedDataForEdit?.id, data: formData })
      ).unwrap();
      // Handle successful response
    } catch (error) {
      console.error("API Error:", error);
      // Handle error response
    } finally {
      setSubmitting(false);
    }
  };

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
    imgPass = imgPassState[0].url
      ? imgPassState[0].url
      : selectedDataForEdit?.passportPdf;
  }
  if (imgDocState && imgDocState.length > 0) {
    imgDoc = imgDocState[0].url
      ? imgDocState[0].url
      : selectedDataForEdit?.otherDocumentPdf;
  }
  if (imgState && imgState.length > 0) {
    img = imgState[0].url ? imgState[0].url : selectedDataForEdit?.image;
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      dispatch(uploadPassImage(selectedFile));
    }
  };
  const handleFileChange1 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      dispatch(uploadImg(selectedFile));
    }
  };
  const handleFileChange2 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      dispatch(uploadDocImage(selectedFile));
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

  const handleUpdate = async () => {
    console.log("Selected Status:", status);
    const response = await dispatch(
      updateVisaApplyStatus({
        id: selectedDataForView?.id,
        data: status,
        comment: comment,
        buyingPrise: + buyingPrise,
        sellingPrise: + sellingPrise,
        trackingId: trackingId,
        deliveredVisa: deliveredVisa ? deliveredVisa :  deliveredVisa
        
      })
    );

    if (response) {
      setOpenModalForView(false);
      actionDataGet(500);
    }
  };

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="All" {...a11yProps(0)} />
            <Tab label="SUBMITTED" {...a11yProps(1)} />
            <Tab label="CANCELLED" {...a11yProps(2)} />
            <Tab label="RECEIVED" {...a11yProps(3)} />
            <Tab label="APPLIED" {...a11yProps(5)} />
            <Tab label="APPROVED" {...a11yProps(4)} />
            <Tab label="REJECTED" {...a11yProps(6)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  SL
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport EXP
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Religion
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Father Name
                </th> */}

                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedgetVesaApplyData?.map(
                (reversedgetVesaApplyData, index) => (
                  <tr
                    className="bg-white border-b "
                    key={reversedgetVesaApplyData?.id}
                  >
                    {/* <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index}
                    </td> */}

                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData?.givenName}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData.dob}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData.passportNo}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData.passExpiryDate}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData.nationality}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData.gender}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData.religion}
                    </td>
                    {/* <td className="px-6 py-4">
                      {reversedgetVesaApplyData.surName}
                    </td> */}

                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData?.isApproved === "SUBMITTED" ? (
                        <Chip label="SUBMITTED" color="default" />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "CANCELLED" ? (
                        <Chip label="CANCELLED" color="warning" />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "RECEIVED" ? (
                        <Chip label="RECEIVED" color="success" />
                      ) : reversedgetVesaApplyData?.isApproved === "APPLIED" ? (
                        <Chip label="APPLIED" color="primary" />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "APPROVED" ? (
                        <Chip label="APPROVED" color="info" />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "REJECTED" ? (
                        <Chip label="REJECTED" color="error" />
                      ) : (
                        <Chip label="REJECTED" color="error" />
                      )}
                      {/* <Chip label={reversedgetVesaApplyData?.isApproved} color="default" /> */}
                    </td>
                    <td className="px-6 py-4">
                      <Stack direction="row" spacing={1}>
                        <IconButton
                          aria-label="view"
                          color="success"
                          onClick={() =>
                            handleOpenModalForView(reversedgetVesaApplyData)
                          }
                        >
                          <Icon icon="hugeicons:view" />
                        </IconButton>

                        {reversedgetVesaApplyData?.isApproved ===
                          "SUBMITTED" && (
                          <IconButton
                            aria-label="edit"
                            color="info"
                            onClick={() =>
                              handleOpenModalForEdit(reversedgetVesaApplyData)
                            }
                          >
                            <Icon icon="mingcute:edit-line" />
                          </IconButton>
                        )}
                        {reversedgetVesaApplyData?.isApproved ===
                          "SUBMITTED" && (
                          <IconButton
                            aria-label="delete"
                            color="error"
                            onClick={() =>
                              handleClickOpenModalForDelete(
                                reversedgetVesaApplyData?.id
                              )
                            }
                          >
                            <Icon icon="lets-icons:cancel" />
                          </IconButton>
                        )}
                      </Stack>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  SL
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport EXP
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Religion
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Father Name
                </th> */}

                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedgetVesaApplyData?.map(
                (reversedgetVesaApplyData, index) => {
                  if (reversedgetVesaApplyData?.isApproved === "SUBMITTED") {
                    return (
                      <tr
                        className="bg-white border-b "
                        key={reversedgetVesaApplyData?.id}
                      >
                        {/* <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index}
                    </td> */}

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.givenName}
                        </td>

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.dob}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passportNo}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passExpiryDate}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.nationality}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.gender}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.religion}
                        </td>
                        {/* <td className="px-6 py-4">
                          {reversedgetVesaApplyData.surName}
                        </td> */}

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.isApproved ===
                          "SUBMITTED" ? (
                            <Chip label="SUBMITTED" color="default" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "CANCELLED" ? (
                            <Chip label="CANCELLED" color="warning" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "RECEIVED" ? (
                            <Chip label="RECEIVED" color="success" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPLIED" ? (
                            <Chip label="APPLIED" color="primary" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPROVED" ? (
                            <Chip label="APPROVED" color="info" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "REJECTED" ? (
                            <Chip label="REJECTED" color="error" />
                          ) : (
                            <Chip label="REJECTED" color="error" />
                          )}
                          {/* <Chip label={reversedgetVesaApplyData?.isApproved} color="default" /> */}
                        </td>
                        <td className="px-6 py-4">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              aria-label="view"
                              color="success"
                              onClick={handleOpenModalForView}
                            >
                              <Icon icon="hugeicons:view" />
                            </IconButton>
                            <IconButton
                              aria-label="edit"
                              color="info"
                              onClick={handleOpenModalForEdit}
                            >
                              <Icon icon="mingcute:edit-line" />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={handleClickOpenModalForDelete}
                            >
                              <Icon icon="lets-icons:cancel" />
                            </IconButton>
                          </Stack>
                        </td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </table>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  SL
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport EXP
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Religion
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Father Name
                </th> */}

                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedgetVesaApplyData?.map(
                (reversedgetVesaApplyData, index) => {
                  if (reversedgetVesaApplyData?.isApproved === "CANCELLED") {
                    return (
                      <tr
                        className="bg-white border-b "
                        key={reversedgetVesaApplyData?.id}
                      >
                        {/* <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index}
                    </td> */}

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.givenName}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.dob}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passportNo}
                        </td>

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passExpiryDate}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.nationality}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.gender}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.religion}
                        </td>

                        {/* <td className="px-6 py-4">
                          {reversedgetVesaApplyData.surName}
                        </td> */}

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.isApproved ===
                          "SUBMITTED" ? (
                            <Chip label="SUBMITTED" color="default" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "CANCELLED" ? (
                            <Chip label="CANCELLED" color="warning" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "RECEIVED" ? (
                            <Chip label="RECEIVED" color="success" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPLIED" ? (
                            <Chip label="APPLIED" color="primary" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPROVED" ? (
                            <Chip label="APPROVED" color="info" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "REJECTED" ? (
                            <Chip label="REJECTED" color="error" />
                          ) : (
                            <Chip label="REJECTED" color="error" />
                          )}
                          {/* <Chip label={reversedgetVesaApplyData?.isApproved} color="default" /> */}
                        </td>
                        <td className="px-6 py-4">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              aria-label="view"
                              color="success"
                              onClick={handleOpenModalForView}
                            >
                              <Icon icon="hugeicons:view" />
                            </IconButton>
                            {/* <IconButton
                              aria-label="edit"
                              color="info"
                              onClick={handleOpenModalForEdit}
                            >
                              <Icon icon="mingcute:edit-line" />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={handleClickOpenModalForDelete}
                            >
                              <Icon icon="lets-icons:cancel" />
                            </IconButton> */}
                          </Stack>
                        </td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </table>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  SL
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport EXP
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Religion
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Father Name
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedgetVesaApplyData?.map(
                (reversedgetVesaApplyData, index) => {
                  if (reversedgetVesaApplyData?.isApproved === "RECEIVED") {
                    return (
                      <tr
                        className="bg-white border-b "
                        key={reversedgetVesaApplyData?.id}
                      >
                        {/* <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index}
                    </td> */}

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.givenName}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.dob}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passportNo}
                        </td>

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passExpiryDate}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.nationality}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.gender}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.religion}
                        </td>

                        {/* <td className="px-6 py-4">
                          {reversedgetVesaApplyData.surName}
                        </td> */}
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.isApproved ===
                          "SUBMITTED" ? (
                            <Chip label="SUBMITTED" color="default" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "CANCELLED" ? (
                            <Chip label="CANCELLED" color="warning" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "RECEIVED" ? (
                            <Chip label="RECEIVED" color="success" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPLIED" ? (
                            <Chip label="APPLIED" color="primary" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPROVED" ? (
                            <Chip label="APPROVED" color="info" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "REJECTED" ? (
                            <Chip label="REJECTED" color="error" />
                          ) : (
                            <Chip label="REJECTED" color="error" />
                          )}
                          {/* <Chip label={reversedgetVesaApplyData?.isApproved} color="default" /> */}
                        </td>
                        <td className="px-6 py-4">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              aria-label="view"
                              color="success"
                              onClick={handleOpenModalForView}
                            >
                              <Icon icon="hugeicons:view" />
                            </IconButton>
                            {/* <IconButton
                              aria-label="edit"
                              color="info"
                              onClick={handleOpenModalForEdit}
                            >
                              <Icon icon="mingcute:edit-line" />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={handleClickOpenModalForDelete}
                            >
                              <Icon icon="lets-icons:cancel" />
                            </IconButton> */}
                          </Stack>
                        </td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </table>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  SL
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport EXP
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Religion
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Father Name
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedgetVesaApplyData?.map(
                (reversedgetVesaApplyData, index) => {
                  if (reversedgetVesaApplyData?.isApproved === "APPLIED") {
                    return (
                      <tr
                        className="bg-white border-b "
                        key={reversedgetVesaApplyData?.id}
                      >
                        {/* <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index}
                    </td> */}

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.givenName}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.dob}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passportNo}
                        </td>

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passExpiryDate}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.nationality}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.gender}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.religion}
                        </td>

                        {/* <td className="px-6 py-4">
                          {reversedgetVesaApplyData.surName}
                        </td> */}
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.isApproved ===
                          "SUBMITTED" ? (
                            <Chip label="SUBMITTED" color="default" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "CANCELLED" ? (
                            <Chip label="CANCELLED" color="warning" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "RECEIVED" ? (
                            <Chip label="RECEIVED" color="success" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPLIED" ? (
                            <Chip label="APPLIED" color="primary" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPROVED" ? (
                            <Chip label="APPROVED" color="info" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "REJECTED" ? (
                            <Chip label="REJECTED" color="error" />
                          ) : (
                            <Chip label="REJECTED" color="error" />
                          )}
                          {/* <Chip label={reversedgetVesaApplyData?.isApproved} color="default" /> */}
                        </td>
                        <td className="px-6 py-4">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              aria-label="view"
                              color="success"
                              onClick={handleOpenModalForView}
                            >
                              <Icon icon="hugeicons:view" />
                            </IconButton>
                            {/* <IconButton
                              aria-label="edit"
                              color="info"
                              onClick={handleOpenModalForEdit}
                            >
                              <Icon icon="mingcute:edit-line" />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={handleClickOpenModalForDelete}
                            >
                              <Icon icon="lets-icons:cancel" />
                            </IconButton> */}
                          </Stack>
                        </td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </table>{" "}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  SL
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport EXP
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Religion
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Father Name
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedgetVesaApplyData?.map(
                (reversedgetVesaApplyData, index) => {
                  if (reversedgetVesaApplyData?.isApproved === "APPROVED") {
                    return (
                      <tr
                        className="bg-white border-b "
                        key={reversedgetVesaApplyData?.id}
                      >
                        {/* <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index}
                    </td> */}

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.givenName}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.dob}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passportNo}
                        </td>

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passExpiryDate}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.nationality}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.gender}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.religion}
                        </td>

                        {/* <td className="px-6 py-4">
                          {reversedgetVesaApplyData.surName}
                        </td> */}
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.isApproved ===
                          "SUBMITTED" ? (
                            <Chip label="SUBMITTED" color="default" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "CANCELLED" ? (
                            <Chip label="CANCELLED" color="warning" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "RECEIVED" ? (
                            <Chip label="RECEIVED" color="success" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPLIED" ? (
                            <Chip label="APPLIED" color="primary" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPROVED" ? (
                            <Chip label="APPROVED" color="info" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "REJECTED" ? (
                            <Chip label="REJECTED" color="error" />
                          ) : (
                            <Chip label="REJECTED" color="error" />
                          )}
                          {/* <Chip label={reversedgetVesaApplyData?.isApproved} color="default" /> */}
                        </td>
                        <td className="px-6 py-4">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              aria-label="view"
                              color="success"
                              onClick={handleOpenModalForView}
                            >
                              <Icon icon="hugeicons:view" />
                            </IconButton>
                            {/* <IconButton
                              aria-label="edit"
                              color="info"
                              onClick={handleOpenModalForEdit}
                            >
                              <Icon icon="mingcute:edit-line" />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={handleClickOpenModalForDelete}
                            >
                              <Icon icon="lets-icons:cancel" />
                            </IconButton> */}
                          </Stack>
                        </td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </table>{" "}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                {/* <th scope="col" className="px-6 py-3">
                  SL
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  DOB
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport EXP
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Religion
                </th>
                {/* <th scope="col" className="px-6 py-3">
                  Father Name
                </th> */}
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {reversedgetVesaApplyData?.map(
                (reversedgetVesaApplyData, index) => {
                  if (reversedgetVesaApplyData?.isApproved === "REJECTED") {
                    return (
                      <tr
                        className="bg-white border-b "
                        key={reversedgetVesaApplyData?.id}
                      >
                        {/* <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                    >
                      {index}
                    </td> */}

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.givenName}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.dob}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passportNo}
                        </td>

                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.passExpiryDate}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.nationality}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.gender}
                        </td>
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData.religion}
                        </td>

                        {/* <td className="px-6 py-4">
                          {reversedgetVesaApplyData.surName}
                        </td> */}
                        <td className="px-6 py-4">
                          {reversedgetVesaApplyData?.isApproved ===
                          "SUBMITTED" ? (
                            <Chip label="SUBMITTED" color="default" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "CANCELLED" ? (
                            <Chip label="CANCELLED" color="warning" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "RECEIVED" ? (
                            <Chip label="RECEIVED" color="success" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPLIED" ? (
                            <Chip label="APPLIED" color="primary" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "APPROVED" ? (
                            <Chip label="APPROVED" color="info" />
                          ) : reversedgetVesaApplyData?.isApproved ===
                            "REJECTED" ? (
                            <Chip label="REJECTED" color="error" />
                          ) : (
                            <Chip label="REJECTED" color="error" />
                          )}
                          {/* <Chip label={reversedgetVesaApplyData?.isApproved} color="default" /> */}
                        </td>
                        <td className="px-6 py-4">
                          <Stack direction="row" spacing={1}>
                            <IconButton
                              aria-label="view"
                              color="success"
                              onClick={handleOpenModalForView}
                            >
                              <Icon icon="hugeicons:view" />
                            </IconButton>
                            {/* <IconButton
                              aria-label="edit"
                              color="info"
                              onClick={handleOpenModalForEdit}
                            >
                              <Icon icon="mingcute:edit-line" />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              color="error"
                              onClick={handleClickOpenModalForDelete}
                            >
                              <Icon icon="lets-icons:cancel" />
                            </IconButton> */}
                          </Stack>
                        </td>
                      </tr>
                    );
                  }
                }
              )}
            </tbody>
          </table>{" "}
        </CustomTabPanel>
      </Box>

      {/* for view modal  */}
      <Modal
        open={openModalForView}
        onClose={handleCloseModalForView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedDataForView && (
            <div>
              <div>
                <div className=" border flex py-2 pl-2">
                  <p>Full Name : </p>
                  <p>{selectedDataForView?.givenName}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Father Name : </p>
                  <p>{selectedDataForView?.surName}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Gender : </p>
                  <p>{selectedDataForView?.gender}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Nationality : </p>
                  <p>{selectedDataForView?.nationality}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>DOB : </p>
                  <p>{selectedDataForView?.dob}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Passport Number : </p>
                  <p>{selectedDataForView?.passportNo}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Passport EXP : </p>
                  <p>{selectedDataForView?.passExpiryDate}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Religion : </p>
                  <p>{selectedDataForView?.religion}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Status : </p>
                  <p>
                    {selectedDataForView?.isApproved === "SUBMITTED" ? (
                      <Chip label="SUBMITTED" color="default" />
                    ) : selectedDataForView?.isApproved === "CANCELLED" ? (
                      <Chip label="CANCELLED" color="warning" />
                    ) : selectedDataForView?.isApproved === "RECEIVED" ? (
                      <Chip label="RECEIVED" color="success" />
                    ) : selectedDataForView?.isApproved === "APPLIED" ? (
                      <Chip label="APPLIED" color="primary" />
                    ) : selectedDataForView?.isApproved === "APPROVED" ? (
                      <Chip label="APPROVED" color="info" />
                    ) : selectedDataForView?.isApproved === "REJECTED" ? (
                      <Chip label="REJECTED" color="error" />
                    ) : (
                      <Chip label="REJECTED" color="error" />
                    )}
                  </p>
                </div>

                {/* now i will add dropwown for status  */}
                <div className="border mt-1 py-2 pl-2">
                  <p>Update Status : </p>
                  {/* <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={statusCatagory}
                    sx={{ width: 300, marginBottom: "10px" }}
                    onChange={(event, newValue) => setStatus(newValue?.label)}
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                  /> */}

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={statusCatagory}
                    sx={{ marginBottom: "10px" }}
                    onChange={(event, newValue) => setStatus(newValue?.label)}
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                  />

                  {status === "RECEIVED" && (
                    <>
                      <TextField
                        required
                        id="input1"
                        label="Bying Price"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="number"
                        value={buyingPrise}
                        onChange={(e) => setbuyingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input2"
                        label="Saleing Price"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="number"
                        value={sellingPrise}
                        onChange={(e) => setsellingPrise(e.target.value)}
                      />
                    </>
                  )}
                  {status === "APPLIED" && (
                    <>
                      <TextField
                        required
                        id="input1"
                        label="Bying Price"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="number"
                        value={buyingPrise}
                        onChange={(e) => setbuyingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input2"
                        label="Saleing Price"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="number"
                        value={sellingPrise}
                        onChange={(e) => setsellingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input3"
                        label="Application ID"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                      />
                    </>
                  )}
                  {status === "APPROVED" && (
                    <>
                      <TextField
                        required
                        id="input1"
                        label="Bying Price"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="number"
                        value={buyingPrise}
                        onChange={(e) => setbuyingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input2"
                        label="Saleing Price"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="number"
                        value={sellingPrise}
                        onChange={(e) => setsellingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input3"
                        label="Application ID"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                      />

                      <div className=" mt-3">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          color="info"
                          tabIndex={-1}
                          startIcon={<Icon icon="ep:upload-filled" />}
                          sx={{ width: "100%" }}
                        >
                          Upload Visa
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange4}
                          />
                        </Button>
                        {fileInfo3 && (
                          <div>
                            <p>File Name: {fileInfo3.name}</p>
                            <p>File Size: {fileInfo3.size} KB</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {status === "REJECTED" && (
                    <>
                      <TextField
                        required
                        id="input1"
                        label="Bying Price"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="number"
                        value={buyingPrise}
                        onChange={(e) => setbuyingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input2"
                        label="Saleing Price"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="number"
                        value={sellingPrise}
                        onChange={(e) => setsellingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input3"
                        label="Application ID"
                        defaultValue=""
                        sx={{ marginTop: "10px" }}
                        type="text"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                      />
                    </>
                  )}
                  <br />
                  <TextField
                    id="outlined-required"
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  {/* <TextField
                    id="outlined-basic"
                    label="Comment"
                    variant="outlined"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ marginBottom: "5px" }}
                  /> */}
                  <br />
                  <Button
                    variant="contained"
                    onClick={handleUpdate}
                    sx={{ marginTop: "10px" }}
                  >
                    Update
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                  <Image
                    className=" w-full rounded-lg h-96"
                    width={100}
                    height={100}
                    src={selectedDataForView?.image}
                    alt="nature image"
                  />
                  <div className="block mt-2 font-sans text-sm antialiased font-normal leading-normal text-center text-inherit">
                    IMAGE
                  </div>
                </div>
                <div className="flex flex-col items-start justify-center gap-2">
                  <Button
                    variant="contained"
                    startIcon={<Icon icon="material-symbols:download-sharp" />}
                  >
                    <a
                      href="https://res.cloudinary.com/db7ovrkki/image/upload/v1720440973/p2sc2lwtvr8jhjdt0wus.jpg"
                      download
                    >
                      Download Passport
                    </a>
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Icon icon="material-symbols:download-sharp" />}
                  >
                    Download Other Documents
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>

      {/* for edit modal  */}

      <Modal
        open={openModalForEdit}
        onClose={handleCloseModalForEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-2xl">Edit Informations</h2>
          {selectedDataForEdit && (
            <Formik
              initialValues={initialValues}
              validationSchema={UpdateVisaApplySchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ isSubmitting, touched, errors, setFieldValue }) => (
                <Form>
                  <div className="grid grid-cols-2 gap-2">
                    {/* <div>
                      {selectedDataForEdit?.givenName}
                    </div> */}
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
                              error={
                                touched.nationality && !!errors.nationality
                              }
                              helperText={
                                touched.nationality && errors.nationality
                              }
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

                    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                  touched.passExpiryDate &&
                                  !!errors.passExpiryDate
                                }
                                helperText={
                                  touched.passExpiryDate &&
                                  errors.passExpiryDate
                                }
                              />
                            )}
                          />
                        )}
                      </Field>
                    </DemoContainer>
                  </LocalizationProvider> */}

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
                              textFieldProps={{
                                error:
                                  touched.passExpiryDate &&
                                  !!errors.passExpiryDate,
                                helperText:
                                  touched.passExpiryDate &&
                                  errors.passExpiryDate,
                              }}
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
                  </LocalizationProvider> */}

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
                              textFieldProps={{
                                error: touched.dob && !!errors.dob,
                                helperText: touched.dob && errors.dob,
                              }}
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
                      variant="contained"
                      startIcon={<Icon icon="material-symbols:upload" />}
                    >
                      Update Passport
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Icon icon="material-symbols:upload" />}
                    >
                      Update Photo
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange1}
                      />
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<Icon icon="material-symbols:upload" />}
                    >
                      Update Other Document
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange2}
                      />
                    </Button>
                  </div>
                  <div className="flex justify-center mt-4">
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Update
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Modal>

      {/* for cancle  */}

      <React.Fragment>
        <Dialog
          open={openModalForDelete}
          onClose={handleCloseModalForDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to cancel it"}
          </DialogTitle>
          {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            
          </DialogContentText>
        </DialogContent> */}
          <DialogActions>
            <Button
              onClick={handleDataDelete}
              variant="contained"
              color="error"
            >
              YES
            </Button>
            <Button
              onClick={handleCloseModalForDelete}
              autoFocus
              variant="contained"
              color="success"
            >
              NO
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
}
