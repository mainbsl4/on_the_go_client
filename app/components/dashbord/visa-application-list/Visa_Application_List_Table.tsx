"use client";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  Autocomplete,
  Button,
  Chip,
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

const gender = [
  { label: "Male", year: 1994 },
  { label: "Female", year: 1972 },
];

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

export default function Visa_Application_List_Table() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // for modal
  // for view modal
  const [openModalForView, setOpenModalForView] = React.useState(false);
  const handleOpenModalForView = () => setOpenModalForView(true);
  const handleCloseModalForView = () => setOpenModalForView(false);
  // for edit modal
  const [openModalForEdit, setOpenModalForEdit] = React.useState(false);
  const handleOpenModalForEdit = () => setOpenModalForEdit(true);
  const handleCloseModalForEdit = () => setOpenModalForEdit(false);

  // for cancle modal

  const [openModalForDelete, setOpenModalForDelete] = React.useState(false);

  const handleClickOpenModalForDelete = () => {
    setOpenModalForDelete(true);
  };

  const handleCloseModalForDelete = () => {
    setOpenModalForDelete(false);
  };

  const initialValues: UpdateVisaApplyFormValues = {
    userId: "",
    givenName: "",
    surName: "",
    gender: "",
    nationality: "",
    passportNo: "",
    passExpiryDate: "",
    dob: "",
    religion: "",
  };

  const handleSubmit = (values: UpdateVisaApplyFormValues) => {
    console.log("update values", values);
  };

  return (
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
            <Tab label="RECIEVED" {...a11yProps(3)} />
            <Tab label="APPLIED" {...a11yProps(5)} />
            <Tab label="APPROVED" {...a11yProps(4)} />
            <Tab label="REJECTED" {...a11yProps(6)} />
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
                  Given Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sur Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
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
                  Religion
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
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="SUBMITTED" color="default" />
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
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="CANCELLED" color="warning" />
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
                  </Stack>
                </td>
              </tr>
              {/* <tr className="bg-white border-b ">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                Key
              </td>
              <td className="px-6 py-4">date</td>
              <td className="px-6 py-4">1000</td>
              <td className="px-6 py-4">
                <Chip label="Pending" color="secondary" />
              </td>
              <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="edit" color="success">
                    <Icon icon="hugeicons:view" />
                  </IconButton>
                  <IconButton aria-label="delete" color="error">
                    <Icon icon="lets-icons:cancel" />
                  </IconButton>
                </Stack>
              </td>
            </tr> */}
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="RECIEVED" color="success" />
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
                    {/* <IconButton aria-label="delete" color="error">
                    <Icon icon="lets-icons:cancel" />
                  </IconButton> */}
                  </Stack>
                </td>
              </tr>
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="APPLIED" color="primary" />
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
                  </Stack>
                </td>
              </tr>
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="REJECTED" color="error" />
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
                  </Stack>
                </td>
              </tr>
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="APPROVED" color="info" />
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
                  </Stack>
                </td>
              </tr>
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
                  Given Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sur Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
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
                  Religion
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
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="SUBMITTED" color="default" />
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
                  Given Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sur Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
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
                  Religion
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
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="CANCELLED" color="warning" />
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
                  </Stack>
                </td>
              </tr>
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
                  Given Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sur Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
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
                  Religion
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
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="RECIEVED" color="success" />
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
                  </Stack>
                </td>
              </tr>
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
                  Given Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sur Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
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
                  Religion
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
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="APPLIED" color="primary" />
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
                  </Stack>
                </td>
              </tr>
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
                  Given Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sur Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
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
                  Religion
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
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="APPROVED" color="info" />
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
                  </Stack>
                </td>
              </tr>
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
                  Given Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Sur Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Genger
                </th>
                <th scope="col" className="px-6 py-3">
                  Nationlity
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
                  Religion
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
              <tr className="bg-white border-b ">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                >
                  Key
                </td>
                <td className="px-6 py-4">date</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">1000</td>
                <td className="px-6 py-4">
                  <Chip label="REJECTED" color="error" />
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
                  </Stack>
                </td>
              </tr>
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
          <div>
            <div>
              <div className=" border flex py-2 pl-2">
                <p>Given Name : </p>
                <p>Md</p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Sur Name : </p>
                <p>Main</p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Gender : </p>
                <p>Male</p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Nationality : </p>
                <p>Bangladesh</p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>DOB : </p>
                <p>11/12/2004</p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Passport Number : </p>
                <p>A123456</p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Passport EXP : </p>
                <p>11-12-2004</p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Religion : </p>
                <p>Islam</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
                <Image
                  className=" w-full rounded-lg h-96"
                  src={img}
                  alt="nature image"
                />
                <div className="block mt-2 font-sans text-sm antialiased font-normal leading-normal text-center text-inherit">
                  Passport
                </div>
              </div>
              <div className="flex flex-col items-start justify-center gap-2">
                <Button
                  variant="contained"
                  startIcon={<Icon icon="material-symbols:download-sharp" />}
                >
                  Download Passport
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
          <Formik
            initialValues={initialValues}
            validationSchema={UpdateVisaApplySchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors, setFieldValue }) => (
              <Form>
                <div className="grid grid-cols-2 gap-2">
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
                        options={gender.map((option) => option.label)}
                        onChange={(event, value) =>
                          form.setFieldValue(field.name, value)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...field}
                            {...params}
                            label="Select Nationality"
                            error={touched.nationality && !!errors.nationality}
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
                  </LocalizationProvider>

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
                            textFieldProps={{
                              error:
                                touched.passExpiryDate &&
                                !!errors.passExpiryDate,
                              helperText:
                                touched.passExpiryDate && errors.passExpiryDate,
                            }}
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
                            textFieldProps={{
                              error: touched.dob && !!errors.dob,
                              helperText: touched.dob && errors.dob,
                            }}
                          />
                        )}
                      </Field>
                    </DemoContainer>
                  </LocalizationProvider> */}

                  <Field name="religion">
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
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Icon icon="material-symbols:upload" />}
                  >
                    Update Photo
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<Icon icon="material-symbols:upload" />}
                  >
                    Update Other Document
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
              onClick={handleCloseModalForDelete}
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
