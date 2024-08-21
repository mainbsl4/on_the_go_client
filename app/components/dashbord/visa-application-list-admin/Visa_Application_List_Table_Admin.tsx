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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteVisa,
  getAllVisaApply,
  updateVisaApply,
  updateVisaApplyStatus,
} from "../../../lib/features/visaApply/visaApplySlice";
import {
  applicationCopyImg,
  deliveredVisaPdf,
  paymentReceiveImg,
  uploadDocImage,
  uploadImg,
  uploadPassImage,
} from "../../../lib/features/upload/uploadSlice";

const gender = [{ label: "MALE" }, { label: "FEMALE" }, { label: "OTHERS" }];
const nationality = [{ label: "BANGLADESHI" }, { label: "OTHERS" }];

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

const styleForView = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  height: "80vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  //i will set overflow scroll
  overflow: "auto",
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
  // for search
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [passportNoSearchQuery, setPassportNoSearchQuery] = React.useState("");
  const [regNoSearchQuery, setRegNoSearchQuery] = React.useState("");
  const [conpanyNameSearchQuery, setConpanyNameSearchQuery] =
    React.useState("");

  // file information
  const [fileInfo3, setFileInfo3] = React.useState(null);
  const [fileInfo4, setFileInfo4] = React.useState(null);
  const [fileInfo5, setFileInfo5] = React.useState(null);
  const [fileInfo6, setFileInfo6] = React.useState(null);

  // for get data from status and comment
  const [status, setStatus] = React.useState(null);
  const [comment, setComment] = React.useState("");
  const [buyingPrise, setbuyingPrise] = React.useState(null);
  const [applyerEmail, setapplyerEmail] = React.useState(null);
  const [applyerEmailPass, setapplyerEmailPass] = React.useState(null);
  const [sellingPrise, setsellingPrise] = React.useState(null);
  const [trackingId, setTrackingId] = React.useState(null);
  const [loadingBtn4, setLoadingBtn4] = React.useState(false);
  const [loadingBtn5, setLoadingBtn5] = React.useState(false);
  const [loadingBtn6, setLoadingBtn6] = React.useState(false);

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
      setFileInfo4({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };
  const handleFileChange5 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn5(true);
      await dispatch(applicationCopyImg(selectedFile));
      setLoadingBtn5(false);
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo5({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };
  const handleFileChange6 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn6(true);
      await dispatch(paymentReceiveImg(selectedFile));
      setLoadingBtn6(false);
    }

    // file information
    const file = event.target.files[0];
    if (file) {
      setFileInfo6({
        name: file.name,
        size: (file.size / 1024).toFixed(2), // Convert size to KB and format it
      });
    }
  };

  const deliveredVisaState = useSelector(
    (state: RootState) => state?.upload?.deliveredVisa
  );

  let deliveredVisa = "";

  if (deliveredVisaState && deliveredVisaState.length > 0) {
    deliveredVisa = deliveredVisaState[0].url;
  }

  const applicationCopyState = useSelector(
    (state: RootState) => state?.upload?.applicationCopy
  );

  let applicationCopy = "";

  if (applicationCopyState && applicationCopyState.length > 0) {
    applicationCopy = applicationCopyState[0]?.url;
  }

  const paymentReceivedState = useSelector(
    (state: RootState) => state?.upload?.paymentReceive
  );

  let paymentReceive = "";

  if (paymentReceivedState && paymentReceivedState.length > 0) {
    paymentReceive = paymentReceivedState[0]?.url;
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

  // for search
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const handlePassportNoSearchQueryChange = (event) => {
    setPassportNoSearchQuery(event.target.value);
  };

  const handleRegSearchQueryChange = (e) => {
    setRegNoSearchQuery(e.target.value);
  };
  const handleCompanyNameSearchQueryChange = (e) => {
    setConpanyNameSearchQuery(e.target.value);
  };

  const filteredData = reversedgetVesaApplyData.filter((data) => {
    const itemDate = dayjs(data.created_at);
    const from = fromDate ? dayjs(fromDate) : null;
    const to = toDate ? dayjs(toDate) : null;
    return (
      data?.passportNo
        .toLowerCase()
        .includes(passportNoSearchQuery.toLowerCase()) &&
      data?.user?.regNo
        .toLowerCase()
        .includes(regNoSearchQuery.toLowerCase()) &&
      data?.user?.companyName
        .toLowerCase()
        .includes(conpanyNameSearchQuery.toLowerCase()) &&
      (!from ||
        itemDate.isAfter(from, "day") ||
        itemDate.isSame(from, "day")) &&
      (!to || itemDate.isBefore(to, "day") || itemDate.isSame(to, "day"))
    );
  });

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
    applyForCountry: selectedDataForEdit?.applyForCountry || "",
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
    // console.log("Selected Status:", status);
    const response = await dispatch(
      updateVisaApplyStatus({
        id: selectedDataForView?.id,
        data: status,
        comment: comment ? comment : selectedDataForView?.comment,
        buyingPrise: +buyingPrise
          ? +buyingPrise
          : selectedDataForView?.buyingPrise,
        applyerEmail: applyerEmail ? applyerEmail : selectedDataForView?.applyerEmail,
        applyerEmailPass: applyerEmailPass ? applyerEmailPass : selectedDataForView?.applyerEmailPass,
        sellingPrise: +sellingPrise
          ? +sellingPrise
          : selectedDataForView?.sellingPrise,
        trackingId: trackingId ? trackingId : selectedDataForView?.trackingId,
        deliveredVisa: deliveredVisa
          ? deliveredVisa
          : selectedDataForView?.deliveredVisa,
        applicationCopy: applicationCopy
          ? applicationCopy
          : selectedDataForView?.applicationCopy,
        paymentReceive: paymentReceive
          ? paymentReceive
          : selectedDataForView?.paymentReceive,
      })
    );

    if (response) {
      toast.success(`status updated to ${status}`, {
        position: "top-center",
      });
      setOpenModalForView(false);
      actionDataGet(500);
    }
  };

  // const handleUpdate = async () => {
  //   const response = await dispatch(
  //     updateVisaApplyStatus({
  //       id: selectedDataForView?.id,
  //       data: status,
  //       comment: comment || selectedDataForView?.comment,
  //       buyingPrise: +buyingPrise || +selectedDataForView?.buyingPrise,
  //       applyerEmail: applyerEmail || selectedDataForView?.applyerEmail,
  //       applyerEmailPass:
  //         applyerEmailPass || selectedDataForView?.applyerEmailPass,
  //       sellingPrise: +sellingPrise || +selectedDataForView?.sellingPrise,
  //       trackingId: trackingId || selectedDataForView?.trackingId,
  //       deliveredVisa: deliveredVisa || selectedDataForView?.deliveredVisa,
  //       applicationCopy:
  //         applicationCopy || selectedDataForView?.applicationCopy,
  //       paymentReceive: paymentReceive || selectedDataForView?.paymentReceive,
  //     })
  //   );

  //   if (response) {
  //     toast.success(`status updated to ${status}`, {
  //       position: "top-center",
  //     });
  //     setOpenModalForView(false);
  //     actionDataGet(500);
  //   }
  // };

  const handleDownloadPass = (data: any) => {
    const imageUrl = data?.passportPdf;
    const fileExtension = imageUrl.split(".").pop() || "file";
    const fileName = `${data?.givenName}-passport.${fileExtension}`;

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success(`Passport download successfully`, {
          position: "top-center",
        });
      })
      .catch(() => alert("An error occurred while downloading the image."));
  };

  const handleDownloadDoc = (data: any) => {
    const imageUrl = data?.otherDocumentPdf;
    const fileExtension = imageUrl.split(".").pop() || "file";
    const fileName = `${data?.givenName}-document.${fileExtension}`;

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success(`Document download successfully`, {
          position: "top-center",
        });
      })
      .catch(() => alert("An error occurred while downloading the image."));
  };

  const handleDownloadPrevDoc = (data: any) => {
    const imageUrl = data?.previousPassPdf;

    const fileExtension = imageUrl.split(".").pop() || "file";
    const fileName = `${data?.givenName}-previous-visa.${fileExtension}`;

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success(`Document download successfully`, {
          position: "top-center",
        });
      })
      .catch(() => alert("An error occurred while downloading the image."));
  };

  const handleDownloadVisa = (data: any) => {
    const imageUrl = data?.deliveredVisa;
    const fileExtension = imageUrl.split(".").pop() || "file";
    const fileName = `${data?.givenName}-visa.${fileExtension}`;

    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.style.display = "none";
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        toast.success(`Visa download successfully`, {
          position: "top-center",
        });
      })
      .catch(() => alert("An error occurred while downloading the image."));
  };

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <div className="mb-4 flex gap-4">
        <TextField
          label="From Date"
          type="date"
          variant="outlined"
          value={fromDate}
          onChange={handleFromDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="To Date"
          type="date"
          variant="outlined"
          value={toDate}
          onChange={handleToDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Search by Passport"
          variant="outlined"
          value={passportNoSearchQuery}
          onChange={handlePassportNoSearchQueryChange}
        />

        <TextField
          label="Search by Reg No"
          variant="outlined"
          value={regNoSearchQuery}
          onChange={handleRegSearchQueryChange}
        />

        <TextField
          label="company name"
          variant="outlined"
          value={conpanyNameSearchQuery}
          onChange={handleCompanyNameSearchQueryChange}
        />
      </div>
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
            <Tab label="DELIVERED" {...a11yProps(7)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>

                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reg NO
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
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
              {filteredData?.map((reversedgetVesaApplyData, index) => (
                <tr
                  className="bg-white border-b "
                  key={reversedgetVesaApplyData?.id}
                >
                  <td
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {index + 1}
                  </td>

                  <td className="px-6 py-4">
                    {reversedgetVesaApplyData?.user?.companyName}
                  </td>
                  <td className="px-6 py-4">
                    {reversedgetVesaApplyData?.user?.regNo}
                  </td>

                  <td className="px-6 py-4">
                    {reversedgetVesaApplyData &&
                      new Date(
                        reversedgetVesaApplyData.created_at
                      ).toLocaleDateString("en-GB")}
                  </td>

                  <td className="px-6 py-4">
                    {reversedgetVesaApplyData?.givenName}
                  </td>
                  {/* <td className="px-6 py-4">{reversedgetVesaApplyData.dob}</td> */}
                  <td className="px-6 py-4">
                    {reversedgetVesaApplyData &&
                      new Date(reversedgetVesaApplyData.dob).toLocaleDateString(
                        "en-GB"
                      )}
                  </td>

                  <td className="px-6 py-4">
                    {reversedgetVesaApplyData.passportNo}
                  </td>
                  <td className="px-6 py-4">
                    {reversedgetVesaApplyData &&
                      new Date(
                        reversedgetVesaApplyData.passExpiryDate
                      ).toLocaleDateString("en-GB")}
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
                    ) : reversedgetVesaApplyData?.isApproved === "CANCELLED" ? (
                      <Chip label="CANCELLED" color="warning" />
                    ) : reversedgetVesaApplyData?.isApproved === "RECEIVED" ? (
                      <Chip label="RECEIVED" color="success" />
                    ) : reversedgetVesaApplyData?.isApproved === "APPLIED" ? (
                      <Chip label="APPLIED" color="primary" />
                    ) : reversedgetVesaApplyData?.isApproved === "APPROVED" ? (
                      <Chip label="APPROVED" color="info" />
                    ) : reversedgetVesaApplyData?.isApproved === "REJECTED" ? (
                      <Chip label="REJECTED" color="error" />
                    ) : reversedgetVesaApplyData?.isApproved === "DELIVERED" ? (
                      <Chip label="DELIVERED" color="success" />
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

                      {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      {/* {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      )} */}
                    </Stack>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>

                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reg NO
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
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
              {filteredData?.map((reversedgetVesaApplyData, index) => {
                if (reversedgetVesaApplyData?.isApproved === "SUBMITTED") {
                  return (
                    <tr
                      className="bg-white border-b "
                      key={reversedgetVesaApplyData?.id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.companyName}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.regNo}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.created_at
                        ).toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.dob
                          ).toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData.passportNo}
                      </td>
                      {/* <td className="px-6 py-4">
                        {reversedgetVesaApplyData.passExpiryDate}
                      </td> */}

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.passExpiryDate
                        ).toLocaleDateString("en-GB")}
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
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip label="DELIVERED" color="success" />
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
                          {/* {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      )} */}
                        </Stack>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>

                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reg NO
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
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
              {filteredData?.map((reversedgetVesaApplyData, index) => {
                if (reversedgetVesaApplyData?.isApproved === "CANCELLED") {
                  return (
                    <tr
                      className="bg-white border-b "
                      key={reversedgetVesaApplyData?.id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.regNo}
                      </td>
                      {/* <td className="px-6 py-4">
                        {reversedgetVesaApplyData &&
                          new Date(reversedgetVesaApplyData.created_at)
                            .toISOString()
                            .split("T")[0]}
                      </td> */}
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.dob
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData.passportNo}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.passExpiryDate
                        ).toLocaleDateString("en-GB")}
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
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip label="DELIVERED" color="success" />
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
                          {/* {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      )} */}
                        </Stack>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>

                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reg NO
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
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
              {filteredData?.map((reversedgetVesaApplyData, index) => {
                if (reversedgetVesaApplyData?.isApproved === "RECEIVED") {
                  return (
                    <tr
                      className="bg-white border-b "
                      key={reversedgetVesaApplyData?.id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.regNo}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.created_at
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.dob
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData.passportNo}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.passExpiryDate
                        ).toLocaleDateString("en-GB")}
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
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip label="DELIVERED" color="success" />
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
                          {/* {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      )} */}
                        </Stack>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>

                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>

                <th scope="col" className="px-6 py-3">
                  Reg NO
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
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
              {filteredData?.map((reversedgetVesaApplyData, index) => {
                if (reversedgetVesaApplyData?.isApproved === "APPLIED") {
                  return (
                    <tr
                      className="bg-white border-b "
                      key={reversedgetVesaApplyData?.id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.regNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.dob
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData.passportNo}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.passExpiryDate
                        ).toLocaleDateString("en-GB")}
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
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip label="DELIVERED" color="success" />
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
                          {/* {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      )} */}
                        </Stack>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>{" "}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={5}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>

                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reg NO
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
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
              {filteredData?.map((reversedgetVesaApplyData, index) => {
                if (reversedgetVesaApplyData?.isApproved === "APPROVED") {
                  return (
                    <tr
                      className="bg-white border-b "
                      key={reversedgetVesaApplyData?.id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.regNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.dob
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData.passportNo}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.passExpiryDate
                        ).toLocaleDateString("en-GB")}
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
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip label="DELIVERED" color="success" />
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
                          {/* {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      )} */}
                        </Stack>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>{" "}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={6}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>

                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reg NO
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
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
              {filteredData?.map((reversedgetVesaApplyData, index) => {
                if (reversedgetVesaApplyData?.isApproved === "REJECTED") {
                  return (
                    <tr
                      className="bg-white border-b "
                      key={reversedgetVesaApplyData?.id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.regNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.dob
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData.passportNo}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.passExpiryDate
                        ).toLocaleDateString("en-GB")}
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
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip label="DELIVERED" color="success" />
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
                          {/* {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      )} */}
                        </Stack>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>{" "}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={7}>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SL
                </th>

                <th scope="col" className="px-6 py-3">
                  Company Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Reg NO
                </th>
                <th scope="col" className="px-6 py-3">
                  DATE
                </th>
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
              {filteredData?.map((reversedgetVesaApplyData, index) => {
                if (reversedgetVesaApplyData?.isApproved === "DELIVERED") {
                  return (
                    <tr
                      className="bg-white border-b "
                      key={reversedgetVesaApplyData?.id}
                    >
                      <td
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                      >
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.companyName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.user?.regNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.dob
                        ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData.passportNo}
                      </td>

                      <td className="px-6 py-4">
                        {new Date(
                          reversedgetVesaApplyData.passExpiryDate
                        ).toLocaleDateString("en-GB")}
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
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip label="DELIVERED" color="success" />
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
                          {/* {reversedgetVesaApplyData?.isApproved === "SUBMITTED" && (
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
                      )} */}
                        </Stack>
                      </td>
                    </tr>
                  );
                }
              })}
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
        <Box sx={styleForView}>
          {selectedDataForView && (
            <div className="flex ">
              <div className="w-6/12 ">
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
                  {/* <p>{selectedDataForView?.dob}</p> */}
                  <p>
                    {new Date(selectedDataForView.dob).toLocaleDateString(
                      "en-GB"
                    )}
                  </p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Passport Number : </p>
                  <p>{selectedDataForView?.passportNo}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Passport EXP : </p>
                  {/* <p>{selectedDataForView?.passExpiryDate}</p> */}
                  <p>
                    {new Date(
                      selectedDataForView.passExpiryDate
                    ).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Religion : </p>
                  <p>{selectedDataForView?.religion}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Buying Price : </p>
                  <p>{selectedDataForView?.buyingPrise}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Selling Price : </p>
                  <p>{selectedDataForView?.sellingPrise}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Email : </p>
                  <p>{selectedDataForView?.applyerEmail}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Password : </p>
                  <p>{selectedDataForView?.applyerEmailPass}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Comment : </p>
                  <p>{selectedDataForView?.comment}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Application Id : </p>
                  <p>{selectedDataForView?.trackingId}</p>
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
                    ) : selectedDataForView?.isApproved === "DELIVERED" ? (
                      <Chip label="DELIVERED" color="success" />
                    ) : (
                      <Chip label="REJECTED" color="error" />
                    )}
                  </p>
                </div>

                {/* now i will add dropwown for status  */}
                <div className="border mt-1 py-2 pl-2">
                  <p>Update Status : </p>
                  {/* i want to set deafult value  */}
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={statusCatagory}
                    sx={{ marginBottom: "10px" }}
                    defaultValue={selectedDataForView?.isApproved}
                    onChange={(event, newValue) => setStatus(newValue?.label)}
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                  />

                  {/* {status === "SUBMITTED" && (
                    <></>
                  )} */}

                  {status === "RECEIVED" && (
                    <>
                      <TextField
                        required
                        id="input1"
                        label="Bying Price"
                        sx={{ marginTop: "10px" }}
                        type="number"
                        // value={buyingPrise}
                        defaultValue={selectedDataForView?.buyingPrise}
                        onChange={(e) => setbuyingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input2"
                        label="Saleing Price"
                        sx={{ marginTop: "10px" }}
                        type="number"
                        // value={sellingPrise}
                        defaultValue={selectedDataForView?.sellingPrise}
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
                        sx={{ marginTop: "10px" }}
                        type="number"
                        // value={buyingPrise}
                        defaultValue={selectedDataForView?.buyingPrise}
                        onChange={(e) => setbuyingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input2"
                        label="Saleing Price"
                        sx={{ marginTop: "10px" }}
                        type="number"
                        // value={sellingPrise}
                        defaultValue={selectedDataForView?.sellingPrise}
                        onChange={(e) => setsellingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input3"
                        label="Application ID"
                        sx={{ marginTop: "10px" }}
                        type="text"
                        // value={trackingId}
                        defaultValue={selectedDataForView?.trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input3"
                        label="Email"
                        sx={{ marginTop: "10px" }}
                        type="text"
                        // value={trackingId}
                        defaultValue={selectedDataForView?.applyerEmail}
                        onChange={(e) => setapplyerEmail(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input3"
                        label="Password"
                        sx={{ marginTop: "10px" }}
                        type="text"
                        // value={trackingId}
                        defaultValue={selectedDataForView?.applyerEmailPass}
                        onChange={(e) => setapplyerEmailPass(e.target.value)}
                      />
                      <div className=" mt-3">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          color="info"
                          tabIndex={-1}
                          startIcon={
                            loadingBtn5 ? (
                              <></>
                            ) : (
                              <Icon icon="ep:upload-filled" />
                            )
                          }
                          sx={{ width: "100%" }}
                        >
                          {loadingBtn5 ? (
                            <Icon
                              icon="line-md:loading-twotone-loop"
                              className="text-2xl"
                            />
                          ) : (
                            "Upload Application Copy"
                          )}

                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange5}
                          />
                        </Button>
                        {fileInfo5 && (
                          <div>
                            <p>File Name: {fileInfo5.name}</p>
                            <p>File Size: {fileInfo5.size} KB</p>
                          </div>
                        )}
                      </div>
                      <div className=" mt-3">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          color="info"
                          tabIndex={-1}
                          startIcon={
                            loadingBtn6 ? (
                              <></>
                            ) : (
                              <Icon icon="ep:upload-filled" />
                            )
                          }
                          // startIcon={<Icon icon="ep:upload-filled" />}
                          sx={{ width: "100%" }}
                        >
                          {loadingBtn6 ? (
                            <Icon
                              icon="line-md:loading-twotone-loop"
                              className="text-2xl"
                            />
                          ) : (
                            "Upload Payment Received"
                          )}
                          {/* Upload Payment Received */}
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange6}
                          />
                        </Button>
                        {fileInfo6 && (
                          <div>
                            <p>File Name: {fileInfo6.name}</p>
                            <p>File Size: {fileInfo6.size} KB</p>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                  {status === "APPROVED" && (
                    <>
                      <TextField
                        required
                        id="input1"
                        label="Bying Price"
                        sx={{ marginTop: "10px" }}
                        type="number"
                        // value={buyingPrise}
                        defaultValue={selectedDataForView?.buyingPrise}
                        onChange={(e) => setbuyingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input2"
                        label="Saleing Price"
                        sx={{ marginTop: "10px" }}
                        type="number"
                        // value={sellingPrise}
                        defaultValue={selectedDataForView?.sellingPrise}
                        onChange={(e) => setsellingPrise(e.target.value)}
                      />
                      <br />
                      <TextField
                        required
                        id="input3"
                        label="Application ID"
                        sx={{ marginTop: "10px" }}
                        type="text"
                        // value={trackingId}
                        defaultValue={selectedDataForView?.trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                      />

                      <div className=" mt-3">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          color="info"
                          tabIndex={-1}
                          startIcon={
                            loadingBtn4 ? (
                              <></>
                            ) : (
                              <Icon icon="ep:upload-filled" />
                            )
                          }
                          // startIcon={<Icon icon="ep:upload-filled" />}
                          sx={{ width: "100%" }}
                        >
                          {loadingBtn4 ? (
                            <Icon
                              icon="line-md:loading-twotone-loop"
                              className="text-2xl"
                            />
                          ) : (
                            "Upload Visa"
                          )}
                          {/* Upload Visa */}
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange4}
                          />
                        </Button>
                        {fileInfo4 && (
                          <div>
                            <p>File Name: {fileInfo4.name}</p>
                            <p>File Size: {fileInfo4.size} KB</p>
                          </div>
                        )}
                      </div>
                      {/* <div className=" mt-3">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          color="info"
                          tabIndex={-1}
                          startIcon={<Icon icon="ep:upload-filled" />}
                          sx={{ width: "100%" }}
                        >
                          Upload Application Copy
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange5}
                          />
                        </Button>
                        {fileInfo3 && (
                          <div>
                            <p>File Name: {fileInfo3.name}</p>
                            <p>File Size: {fileInfo3.size} KB</p>
                          </div>
                        )}
                      </div> */}
                      {/* <div className=" mt-3">
                        <Button
                          component="label"
                          role={undefined}
                          variant="contained"
                          color="info"
                          tabIndex={-1}
                          startIcon={<Icon icon="ep:upload-filled" />}
                          sx={{ width: "100%" }}
                        >
                          Upload Payment Received
                          <VisuallyHiddenInput
                            type="file"
                            onChange={handleFileChange6}
                          />
                        </Button>
                        {fileInfo3 && (
                          <div>
                            <p>File Name: {fileInfo3.name}</p>
                            <p>File Size: {fileInfo3.size} KB</p>
                          </div>
                        )}
                      </div> */}
                    </>
                  )}

                  {status === "REJECTED" && (
                    <>
                      <TextField
                        required
                        id="input1"
                        label="Bying Price"
                        sx={{ marginTop: "10px" }}
                        type="number"
                        // value={buyingPrise}
                        defaultValue={selectedDataForView?.comment}
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
                    // value={comment}
                    defaultValue={selectedDataForView?.comment}
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
              <div className="w-6/12">
                <div className="grid min-h-[140px] w-8/12 place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                  <Image
                    className=" w-full rounded-lg h-96"
                    width={600}
                    height={600}
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
                    onClick={() => handleDownloadPass(selectedDataForView)}
                  >
                    Download Passport
                  </Button>
                  <Button
                    variant="contained"
                    size="large"
                    startIcon={<Icon icon="material-symbols:download-sharp" />}
                    onClick={() => handleDownloadDoc(selectedDataForView)}
                  >
                    Download Other Documents
                  </Button>

                  {selectedDataForView?.previousPassPdf ? (
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={
                        <Icon icon="material-symbols:download-sharp" />
                      }
                      onClick={() => handleDownloadPrevDoc(selectedDataForView)}
                    >
                      Download Previous Visa
                    </Button>
                  ) : (
                    <></>
                  )}

                  {selectedDataForView?.isApproved === "APPROVED" ||
                  selectedDataForView?.isApproved === "DELIVERED" ? (
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={
                        <Icon icon="material-symbols:download-sharp" />
                      }
                      onClick={() => handleDownloadVisa(selectedDataForView)}
                    >
                      Download Visa
                    </Button>
                  ) : (
                    <></>
                  )}
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
              {({ isSubmitting, touched, errors, setFieldValue, values }) => (
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
                          value={field.value}
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
                          value={field.value}
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
                          value={field.value}
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
