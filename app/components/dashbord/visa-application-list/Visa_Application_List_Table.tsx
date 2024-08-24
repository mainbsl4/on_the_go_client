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
} from "@mui/material";
import { Icon } from "@iconify/react";

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
  uploadDocImage,
  uploadDocImageIf,
  uploadImg,
  uploadPassImage,
} from "../../../lib/features/upload/uploadSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUser } from "../../../lib/features/users/userSlice";
import { useRouter } from "next/navigation";

const gender = [{ label: "MALE" }, { label: "FEMALE" }, { label: "OTHERS" }];
const nationality = [{ label: "BANGLADESHI" }, { label: "OTHERS" }];

const religion = [
  { label: "ISLAM" },
  { label: "HINDUISM" },
  { label: "CHRISTIANITY" },
  { label: "BUDDHISM" },
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

export default function Visa_Application_List_Table() {
  // get data
  const [data, setData] = React.useState([]);

  // for search
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [passportNoSearchQuery, setPassportNoSearchQuery] = React.useState("");

  // const [regNumber, setRegNumber] = React.useState([]);

  // loading
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(0);

  // for button loading
  const [loadingBtn, setLoadingBtn] = React.useState(false);
  const [loadingBtn1, setLoadingBtn1] = React.useState(false);
  const [loadingBtn2, setLoadingBtn2] = React.useState(false);
  const [loadingBtn3, setLoadingBtn3] = React.useState(false);

  const dispatch: AppDispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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

  // visa download conformation
  const [openVisaDownload, setOpenVisaDownload] = React.useState(false);

  const handleClickOpenVisaDownload = () => {
    setOpenVisaDownload(true);
  };

  const handleCloseVisaDownload = () => {
    setOpenVisaDownload(false);
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
  // const getVesaApplyData = useSelector(
  //   (state: RootState) => state?.visaApply?.visaApply?.data
  // );
  const getVesaApplyData = useSelector(
    (state: RootState) => state?.user?.user?.user?.visa_apply
  );

  const getVisaApply = useSelector(
    (state: RootState) => state?.user?.user?.data?.visa_apply
  );

  // const regNumberBeforeSingin = useSelector(
  //   (state: RootState) => state?.user?.user?.user?.regNo
  // );

  // const regNumberAfterSingin = useSelector(
  //   (state: RootState) => state?.user?.user?.data?.regNo
  // );

  // loading
  // const loading = useSelector((state: RootState) => state?.visaApply?.loading);

  // data
  React.useEffect(() => {
    // setLoading(true)
    const userVisaApplyData = getVisaApply ? getVisaApply : getVesaApplyData;
    const reversedgetVesaApplyData = userVisaApplyData?.slice().reverse();
    setData(reversedgetVesaApplyData);

    // const regNo = regNumberAfterSingin ? regNumberAfterSingin : regNumberBeforeSingin;
    // setRegNumber(regNo);

    setLoading(false);
  }, [getVisaApply, getVesaApplyData]);
  React.useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    dispatch(getUser(JSON.parse(storedUserId)));
  }, []);

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

  const filteredData = data?.filter((data) => {
    const itemDate = dayjs(data.created_at);
    const from = fromDate ? dayjs(fromDate) : null;
    const to = toDate ? dayjs(toDate) : null;
    return (
      data?.passportNo
        .toLowerCase()
        .includes(passportNoSearchQuery.toLowerCase()) &&
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
    if (img) formData.append("image", img);
    if (previousPass) formData.append("previousPassPdf", previousPass);
    try {
      const response = await dispatch(
        updateVisaApply({ id: selectedDataForEdit?.id, data: formData })
      ).unwrap();
      // Handle successful response

      if (response?.status === 200) {
        toast.success("Your visa updated successfully", {
          position: "top-center",
        });
        const storedUserId = localStorage.getItem("userId");
        dispatch(getUser(JSON.parse(storedUserId)));
      }
    } catch (error) {
      console.error("API Error:", error);
      // Handle error response
    } finally {
      setSubmitting(false);
      setOpenModalForEdit(false);
      dispatch(getAllVisaApply());
    }
  };

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

  if (previousPassState && previousPassState.length > 0) {
    previousPass = previousPassState[0].url
      ? previousPassState[0].url
      : selectedDataForEdit?.previousPassPdf;
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setLoadingBtn(true); // Set loading to true before the API call
      await dispatch(uploadPassImage(selectedFile));
      setLoadingBtn(false); // Set loading to false after the API call
    }
  };
  const handleFileChange1 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn1(true); // Set loading to true before the API call
      await dispatch(uploadImg(selectedFile));
      setLoadingBtn1(false); // Set loading to false after the API call
    }
  };
  const handleFileChange2 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn2(true); // Set loading to true before the API call
      await dispatch(uploadDocImage(selectedFile));
      setLoadingBtn2(false); // Set loading to false after the API call
    }
  };
  const handleFileChange3 = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setLoadingBtn3(true); // Set loading to true before the API call
      await dispatch(uploadDocImageIf(selectedFile));
      setLoadingBtn3(false); // Set loading to false after the API call
    }
  };

  // const handleDownload = () => {
  //   const element = document.createElement("a");
  //   const file = new Blob(["Hello, world!"], { type: "text/plain" });
  //   element.href = URL.createObjectURL(file);
  //   element.download = "sample.txt";
  //   document.body.appendChild(element);
  //   element.click();
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

  // paymentReceive
  const handleDownloadpaymentReceive = (data: any) => {
    const imageUrl = data?.paymentReceive;

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

  // applicationCopy
  const handleDownloadApplicationCopy = (data: any) => {
    const imageUrl = data?.applicationCopy;

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

  // const handleDownloadVisa = (data: any) => {
  //   const imageUrl = data?.deliveredVisa;
  //   const fileName = `${data?.givenName}-visa.pdf`;

  //   fetch(imageUrl)
  //     .then(response => response.blob())
  //     .then(blob => {
  //       const url = window.URL.createObjectURL(blob);
  //       const a = document.createElement('a');
  //       a.style.display = 'none';
  //       a.href = url;
  //       a.download = fileName;
  //       document.body.appendChild(a);
  //       a.click();
  //       window.URL.revokeObjectURL(url);
  //       document.body.removeChild(a);
  //     })
  //     .catch(() => alert('An error occurred while downloading the image.'));
  // };
  const router = useRouter();

  const handleDownloadVisa = async (data: any) => {
    const imageUrl = data?.deliveredVisa;
    const fileExtension = imageUrl.split(".").pop() || "file";
    const fileName = `${data?.givenName}-visa.${fileExtension}`;

    // Call the API to notify success
    const status = "DELIVERED";

    const updateStatus = await dispatch(
      updateVisaApplyStatus({
        id: data?.id,
        data: status,
        comment: data?.comment,
        buyingPrise: +data?.buyingPrise,
        applyerEmail: data?.applyerEmail,
        applyerEmailPass: data?.applyerEmailPass,
        sellingPrise: +data?.sellingPrise,
        trackingId: data?.trackingId,
        deliveredVisa: data?.deliveredVisa,
        applicationCopy: data?.applicationCopy,
        paymentReceive: data?.paymentReceive,
      })
    );
    if (updateStatus.payload.status === 200) {
      setTimeout(() => {
        const storedUserId = localStorage.getItem("userId");
        dispatch(getUser(JSON.parse(storedUserId)));
        handleCloseVisaDownload();
        setOpenModalForView(false);
      }, 2000);

      const response = await fetch(imageUrl);

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Trigger the download
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
    }
  };

  const handleDownloadVisa2 = (data: any) => {
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

        toast.success(`Document download successfully`, {
          position: "top-center",
        });
      })
      .catch(() => alert("An error occurred while downloading the image."));
  };

  // const handleDownload = async (data) => {
  //   try {
  //     const imageObject = JSON.parse(data?.passportPdf);
  //     const response = await axios.get(
  //       `https://nanofirst.onrender.com/api/upload/download/${imageObject?.id}`,
  //       {
  //         responseType: "blob", // Important for handling binary data
  //       }
  //     );

  //     // Create a link element to trigger download
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "file.pdf"); // or get filename from response headers
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error("Error downloading file:", error);
  //   }
  // };

  // const getImageUrl = (data) => {
  //   try {
  //     const imageObject = JSON.parse(data?.image);
  //     return imageObject?.url;
  //   } catch (error) {
  //     console.error("Error parsing image string:", error);
  //     return "";
  //   }
  // };

  // balance
  const balance = useSelector(
    (state: RootState) => state?.balance?.totalAddedBalance
  );

  // console.log("balance", balance);

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
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  VISA APPLY COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  APPLICATION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                ?.sort((a, b) => {
                  const order = [
                    "SUBMITTED",
                    "RECEIVED",
                    "APPLIED",
                    "APPROVED",
                    "DELIVERED",
                    "CANCELLED",
                    "REJECTED",
                  ];
                  return (
                    order.indexOf(a.isApproved) - order.indexOf(b.isApproved)
                  );
                })
                ?.map((reversedgetVesaApplyData, index) => (
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
                      {reversedgetVesaApplyData &&
                        new Date(
                          reversedgetVesaApplyData.created_at
                        ).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData?.givenName}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData?.applyForCountry}
                    </td>

                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData?.passportNo}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData?.trackingId}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData?.comment}
                    </td>
                    <td className="px-6 py-4">
                      {reversedgetVesaApplyData?.isApproved === "SUBMITTED" ? (
                        <Chip label="SUBMITTED" color="default" />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "CANCELLED" ? (
                        <Chip label="CANCELLED" color="warning" />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "RECEIVED" ? (
                        <Chip label="RECEIVED" color="primary" />
                      ) : reversedgetVesaApplyData?.isApproved === "APPLIED" ? (
                        <Chip
                          label="APPLIED"
                          sx={{ backgroundColor: "#f6e58d" }}
                        />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "APPROVED" ? (
                        <Chip label="APPROVED" color="success" />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "REJECTED" ? (
                        <Chip label="REJECTED" color="error" />
                      ) : reversedgetVesaApplyData?.isApproved ===
                        "DELIVERED" ? (
                        <Chip
                          label="DELIVERED"
                          sx={{ backgroundColor: "#7ed6df" }}
                        />
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
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  VISA APPLY COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  APPLICATION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
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
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.applyForCountry}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.passportNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.trackingId}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.comment}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.isApproved ===
                        "SUBMITTED" ? (
                          <Chip label="SUBMITTED" color="default" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "CANCELLED" ? (
                          <Chip label="CANCELLED" color="warning" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "RECEIVED" ? (
                          <Chip label="RECEIVED" color="primary" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPLIED" ? (
                          <Chip
                            label="APPLIED"
                            sx={{ backgroundColor: "#f6e58d" }}
                          />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPROVED" ? (
                          <Chip label="APPROVED" color="success" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "REJECTED" ? (
                          <Chip label="REJECTED" color="error" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip
                            label="DELIVERED"
                            sx={{ backgroundColor: "#7ed6df" }}
                          />
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
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  VISA APPLY COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  APPLICATION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
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
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.applyForCountry}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.passportNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.trackingId}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.comment}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.isApproved ===
                        "SUBMITTED" ? (
                          <Chip label="SUBMITTED" color="default" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "CANCELLED" ? (
                          <Chip label="CANCELLED" color="warning" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "RECEIVED" ? (
                          <Chip label="RECEIVED" color="primary" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPLIED" ? (
                          <Chip
                            label="APPLIED"
                            sx={{ backgroundColor: "#f6e58d" }}
                          />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPROVED" ? (
                          <Chip label="APPROVED" color="success" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "REJECTED" ? (
                          <Chip label="REJECTED" color="error" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip
                            label="DELIVERED"
                            sx={{ backgroundColor: "#7ed6df" }}
                          />
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
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  VISA APPLY COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  APPLICATION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
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
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.applyForCountry}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.passportNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.trackingId}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.comment}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.isApproved ===
                        "SUBMITTED" ? (
                          <Chip label="SUBMITTED" color="default" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "CANCELLED" ? (
                          <Chip label="CANCELLED" color="warning" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "RECEIVED" ? (
                          <Chip label="RECEIVED" color="primary" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPLIED" ? (
                          <Chip
                            label="APPLIED"
                            sx={{ backgroundColor: "#f6e58d" }}
                          />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPROVED" ? (
                          <Chip label="APPROVED" color="success" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "REJECTED" ? (
                          <Chip label="REJECTED" color="error" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip
                            label="DELIVERED"
                            sx={{ backgroundColor: "#7ed6df" }}
                          />
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
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  VISA APPLY COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  APPLICATION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
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
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.applyForCountry}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.passportNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.trackingId}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.comment}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.isApproved ===
                        "SUBMITTED" ? (
                          <Chip label="SUBMITTED" color="default" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "CANCELLED" ? (
                          <Chip label="CANCELLED" color="warning" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "RECEIVED" ? (
                          <Chip label="RECEIVED" color="primary" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPLIED" ? (
                          <Chip
                            label="APPLIED"
                            sx={{ backgroundColor: "#f6e58d" }}
                          />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPROVED" ? (
                          <Chip label="APPROVED" color="success" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "REJECTED" ? (
                          <Chip label="REJECTED" color="error" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip
                            label="DELIVERED"
                            sx={{ backgroundColor: "#7ed6df" }}
                          />
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
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  VISA APPLY COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  APPLICATION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
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
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.applyForCountry}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.passportNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.trackingId}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.comment}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.isApproved ===
                        "SUBMITTED" ? (
                          <Chip label="SUBMITTED" color="default" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "CANCELLED" ? (
                          <Chip label="CANCELLED" color="warning" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "RECEIVED" ? (
                          <Chip label="RECEIVED" color="primary" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPLIED" ? (
                          <Chip
                            label="APPLIED"
                            sx={{ backgroundColor: "#f6e58d" }}
                          />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPROVED" ? (
                          <Chip label="APPROVED" color="success" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "REJECTED" ? (
                          <Chip label="REJECTED" color="error" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip
                            label="DELIVERED"
                            sx={{ backgroundColor: "#7ed6df" }}
                          />
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
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  VISA APPLY COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  APPLICATION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
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
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.applyForCountry}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.passportNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.trackingId}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.comment}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.isApproved ===
                        "SUBMITTED" ? (
                          <Chip label="SUBMITTED" color="default" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "CANCELLED" ? (
                          <Chip label="CANCELLED" color="warning" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "RECEIVED" ? (
                          <Chip label="RECEIVED" color="primary" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPLIED" ? (
                          <Chip
                            label="APPLIED"
                            sx={{ backgroundColor: "#f6e58d" }}
                          />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPROVED" ? (
                          <Chip label="APPROVED" color="success" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "REJECTED" ? (
                          <Chip label="REJECTED" color="error" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip
                            label="DELIVERED"
                            sx={{ backgroundColor: "#7ed6df" }}
                          />
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
                  DATE
                </th>
                <th scope="col" className="px-6 py-3">
                  Full Name
                </th>
                <th scope="col" className="px-6 py-3">
                  VISA APPLY COUNTRY
                </th>
                <th scope="col" className="px-6 py-3">
                  Passport NO
                </th>
                <th scope="col" className="px-6 py-3">
                  APPLICATION ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Comment
                </th>
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
                        {reversedgetVesaApplyData &&
                          new Date(
                            reversedgetVesaApplyData.created_at
                          ).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.givenName}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.applyForCountry}
                      </td>

                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.passportNo}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.trackingId}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.comment}
                      </td>
                      <td className="px-6 py-4">
                        {reversedgetVesaApplyData?.isApproved ===
                        "SUBMITTED" ? (
                          <Chip label="SUBMITTED" color="default" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "CANCELLED" ? (
                          <Chip label="CANCELLED" color="warning" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "RECEIVED" ? (
                          <Chip label="RECEIVED" color="primary" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPLIED" ? (
                          <Chip
                            label="APPLIED"
                            sx={{ backgroundColor: "#f6e58d" }}
                          />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "APPROVED" ? (
                          <Chip label="APPROVED" color="success" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "REJECTED" ? (
                          <Chip label="REJECTED" color="error" />
                        ) : reversedgetVesaApplyData?.isApproved ===
                          "DELIVERED" ? (
                          <Chip
                            label="DELIVERED"
                            sx={{ backgroundColor: "#7ed6df" }}
                          />
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
            <div className="flex">
              <div className="w-6/12">
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
                    {selectedDataForView?.dob &&
                      new Date(selectedDataForView.dob).toLocaleDateString(
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
                    {selectedDataForView?.passExpiryDate &&
                      new Date(
                        selectedDataForView.passExpiryDate
                      ).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Religion : </p>
                  <p>{selectedDataForView?.religion}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Price : </p>
                  <p>{selectedDataForView?.sellingPrise}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Comment : </p>
                  <p>{selectedDataForView?.comment}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Applicatin ID : </p>
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

                  {/* <button onClick={() => handleDownload(selectedDataForView)}>
                    Download File
                  </button> */}
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

                  {selectedDataForView?.isApproved === "APPLIED" ? (
                    <>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={
                          <Icon icon="material-symbols:download-sharp" />
                        }
                        // onClick={() => handleDownloadVisa(selectedDataForView)}
                        onClick={() =>
                          handleDownloadpaymentReceive(selectedDataForView)
                        }
                      >
                        Download Your Payment Receive
                      </Button>

                      <Button
                        variant="contained"
                        size="large"
                        startIcon={
                          <Icon icon="material-symbols:download-sharp" />
                        }
                        // onClick={() => handleDownloadVisa(selectedDataForView)}
                        onClick={() =>
                          handleDownloadApplicationCopy(selectedDataForView)
                        }
                      >
                        Download Your Application Copy
                      </Button>
                    </>
                  ) : (
                    <p></p>
                    // <p>p>
                  )}

                  {selectedDataForView?.isApproved === "APPROVED" ? (
                    balance >= selectedDataForView?.sellingPrise ? (
                      <>
                        <Button
                          variant="contained"
                          size="large"
                          startIcon={
                            <Icon icon="material-symbols:download-sharp" />
                          }
                          // onClick={() => handleDownloadVisa(selectedDataForView)}
                          onClick={handleClickOpenVisaDownload}
                        >
                          Download Your Visa
                        </Button>
                        {/* for visa download conformation  */}

                        <React.Fragment>
                          <Dialog
                            open={openVisaDownload}
                            onClose={handleCloseVisaDownload}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                          >
                            <DialogTitle id="alert-dialog-title">
                              {"Are you ready to get your visa"}
                            </DialogTitle>
                            <DialogActions>
                              <Button
                                variant="contained"
                                onClick={() =>
                                  handleDownloadVisa(selectedDataForView)
                                }
                              >
                                Yes
                              </Button>
                              <Button
                                onClick={handleCloseVisaDownload}
                                variant="contained"
                              >
                                Another time
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </React.Fragment>
                      </>
                    ) : (
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={
                          <Icon icon="material-symbols:download-sharp" />
                        }
                        onClick={() => {
                          toast.error(
                            "Please deposit balance to download your visa.",
                            {
                              position: "top-center",
                            }
                          );
                        }}
                      >
                        Download Your Visa
                      </Button>
                      // <p>p>
                    )
                  ) : (
                    <></>
                  )}

                  {selectedDataForView?.isApproved === "DELIVERED" ? (
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={
                        <Icon icon="material-symbols:download-sharp" />
                      }
                      onClick={() => handleDownloadVisa(selectedDataForView)}
                    >
                      Download Your Visa
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
                    <Field name="applyForCountry">
                      {({ field, form }) => (
                        <Autocomplete
                          disablePortal
                          id="combo-box-demo"
                          options={whichCountry.map((option) => option.label)}
                          value={field.value}
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
                                touched.applyForCountry &&
                                !!errors.applyForCountry
                              }
                              helperText={
                                touched.applyForCountry &&
                                errors.applyForCountry
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
                      component="label"
                      role={undefined}
                      variant="contained"
                      startIcon={
                        loadingBtn ? <></> : <Icon icon="ep:upload-filled" />
                      }
                    >
                      {/* Update Passport */}
                      {loadingBtn ? (
                        <Icon
                          icon="line-md:loading-twotone-loop"
                          className="text-2xl"
                        />
                      ) : (
                        <>Update Passport</>
                      )}
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>
                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      startIcon={
                        loadingBtn1 ? <></> : <Icon icon="ep:upload-filled" />
                      }
                    >
                      {loadingBtn1 ? (
                        <Icon
                          icon="line-md:loading-twotone-loop"
                          className="text-2xl"
                        />
                      ) : (
                        <>Update Photo</>
                      )}
                      <VisuallyHiddenInput
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange1}
                      />
                    </Button>

                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      // startIcon={<Icon icon="material-symbols:upload" />}
                      startIcon={
                        loadingBtn3 ? <></> : <Icon icon="ep:upload-filled" />
                      }
                    >
                      {loadingBtn3 ? (
                        <Icon
                          icon="line-md:loading-twotone-loop"
                          className="text-2xl"
                        />
                      ) : (
                        <>Update Previous Visa (If Any)</>
                      )}
                      <VisuallyHiddenInput
                        type="file"
                        onChange={handleFileChange3}
                      />
                    </Button>

                    <Button
                      component="label"
                      role={undefined}
                      variant="contained"
                      startIcon={
                        loadingBtn2 ? <></> : <Icon icon="ep:upload-filled" />
                      }
                    >
                      {loadingBtn2 ? (
                        <Icon
                          icon="line-md:loading-twotone-loop"
                          className="text-2xl"
                        />
                      ) : (
                        <>Update Other Document</>
                      )}
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
