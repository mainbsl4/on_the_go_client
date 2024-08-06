"use client";
import { Icon } from "@iconify/react";
import {
  Autocomplete,
  Box,
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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { useDispatch } from "react-redux";
import {
  deleteDeposit,
  getAllDepositReq,
  updateDeposit,
  updateDepositStatus,
} from "../../../lib/features/deposit/depositSlice";
import { UpdateDepositRequestFormValues } from "../../../types/formTypes";
import { Field, Form, Formik } from "formik";
import { UpdateDepositRequestSchema } from "../../../utils/validationSchema";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

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

// dropdown datas
const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

const statusCatagory = [
  { label: "APPROVED", value: "approved" },
  { label: "REJECTED", value: "rejected" },
];

export default function Deposit_request_admin_Table() {
  // for get data from status and comment
  const [status, setStatus] = React.useState(null);
  const [comment, setComment] = React.useState("");

  // for search
  const [amountSearchQuery, setAmountSearchQuery] = useState("");
  const [bankNameSearchQuery, setBankNameSearchQuery] = useState("");
  const [trnIdSearchQuery, setTrnIdSearchQuery] = useState("");

  // for modal
  // for view modal
  const [idForDelete, setIdForDelete] = useState(null);
  const [selectedDataForView, setSelectedDataForView] = useState(null);
  const [openModalForView, setOpenModalForView] = React.useState(false);
  // const handleOpenModalForView = () => setOpenModalForView(true);
  const handleOpenModalForView = (data) => {
    setSelectedDataForView(data);
    setOpenModalForView(true);
  };
  // const handleCloseModalForView = () => setOpenModalForView(false);
  const handleCloseModalForView = () => {
    setSelectedDataForView(null);
    setOpenModalForView(false);
  };

  const actionDataGet = (sec) => {
    setTimeout(() => {
      dispatch(getAllDepositReq());
    }, sec);
  };

  // for edit modal
  // const [selectedDataForEdit, setSelectedDataForEdit] = React.useState(null);

  // const [openModalForEdit, setOpenModalForEdit] = React.useState(false);
  // const handleOpenModalForEdit = (data: any) => {
  //   setOpenModalForEdit(true);
  //   setSelectedDataForEdit(data);
  // };
  // const handleCloseModalForEdit = () => {
  //   setOpenModalForEdit(false);
  //   setSelectedDataForEdit(null);
  // };

  // for cancle modal

  const [openModalForDelete, setOpenModalForDelete] = React.useState(false);

  const handleClickOpenModalForDelete = (id) => {
    setIdForDelete(id);
    setOpenModalForDelete(true);
  };

  const dispatch: AppDispatch = useDispatch();

  const imgState = useSelector((state: RootState) => state?.upload?.uploadSlip);
  let img = "";
  if (imgState && imgState?.length > 0) {
    img = imgState[0]?.url;
  }

  const handleForDelete = () => {
    dispatch(deleteDeposit(idForDelete));
    setOpenModalForDelete(false);
    actionDataGet(700);
  };
  const handleCloseModalForDelete = () => {
    setOpenModalForDelete(false);
  };

  // get data
  const depositRequestData = useSelector(
    (state: RootState) => state?.deposit?.deposit?.data
  );

  // loading
  const loading = useSelector((state: RootState) => state?.deposit?.loading);

  useEffect(() => {
    dispatch(getAllDepositReq());
  }, []);

  const getDepositRequestData = Array.isArray(depositRequestData)
    ? depositRequestData?.slice().reverse()
    : [];

  // for  search
  const handleAmountSearchQueryChange = (event) => {
    setAmountSearchQuery(event.target.value);
  };

  const handleBankNameSearchQueryChange = (event) => {
    setBankNameSearchQuery(event.target.value);
  };

  const handleTrnIdSearchQueryChange = (event) => {
    setTrnIdSearchQuery(event.target.value);
  };

  const filteredData = getDepositRequestData.filter(
    (item) =>
      item.amount.toString().includes(amountSearchQuery) &&
      item.bankName.toLowerCase().includes(bankNameSearchQuery.toLowerCase()) &&
      item.trnId.toString().includes(trnIdSearchQuery.toLowerCase())
  );

  // edit from validation for edit
  // const initialValues: UpdateDepositRequestFormValues = {
  //   userId: selectedDataForEdit?.userId,
  //   dpType: selectedDataForEdit?.dpType || "",
  //   date: dayjs(selectedDataForEdit?.date).format("YYYY-MM-DD"),
  //   amount: selectedDataForEdit?.amount || 0,
  //   bankName: selectedDataForEdit?.bankName || "",
  // };

  const handleSubmit = async (
    values: UpdateDepositRequestFormValues,
    { setSubmitting }
  ) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    // for update
    // if (img) {
    //   formData.append("slipImage", img);
    // } else {
    //   formData.append("slipImage", selectedDataForEdit?.slipImage);
    // }

    // try {
    //   const response = await dispatch(
    //     updateDeposit({ id: selectedDataForEdit?.id, data: formData })
    //   ).unwrap();
    //   // Handle successful response
    // } catch (error) {
    //   console.error("API Error:", error);
    //   // Handle error response
    // } finally {
    //   setSubmitting(false);
    // }
  };

  // for get data from status and comment
  // const handleUpdate = () => {
  //   console.log("Selected Status:", status);
  //   console.log("Comment:", comment);
  // };

  const handleUpdate = async () => {
    console.log("Selected Status:", status);
    const response = await dispatch(
      updateDepositStatus({
        id: selectedDataForView?.id,
        data: status,
        comment: comment,
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



  const handleDownloadDoc = (data: any) => {
    const imageUrl = data?.slipImage;
    const fileName = `payment-document.pdf`;

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


  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <div className="mb-4 flex gap-4">
        <TextField
          label="Search by Amount"
          variant="outlined"
          value={amountSearchQuery}
          onChange={handleAmountSearchQueryChange}
        />
        <TextField
          label="Search by Bank Name"
          variant="outlined"
          value={bankNameSearchQuery}
          onChange={handleBankNameSearchQueryChange}
        />
        <TextField
          label="Search by Transaction ID"
          variant="outlined"
          value={trnIdSearchQuery}
          onChange={handleTrnIdSearchQueryChange}
        />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              MOD
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Bank
            </th>

            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Comment
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((getDepositRequestData) => (
            <tr className="bg-white border-b " key={getDepositRequestData.id}>
              {/* <td
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
            >
              Key
            </td> */}
              <td className="px-6 py-4">{getDepositRequestData?.dpType}</td>
              <td className="px-6 py-4">{getDepositRequestData?.date}</td>
              <td className="px-6 py-4">{getDepositRequestData?.trnId}</td>
              <td className="px-6 py-4">{getDepositRequestData?.amount}</td>
              <td className="px-6 py-4">{getDepositRequestData?.amount}</td>
              <td className="px-6 py-4">{getDepositRequestData?.bankName}</td>
              <td className="px-6 py-4">
                {getDepositRequestData?.isApproved === "SUBMITTED" ? (
                  <Chip label="SUBMITTED" color="default" />
                ) : getDepositRequestData?.isApproved === "CANCELLED" ? (
                  <Chip label="CANCELLED" color="warning" />
                ) : getDepositRequestData?.isApproved === "RECEIVED" ? (
                  <Chip label="RECEIVED" color="success" />
                ) : getDepositRequestData?.isApproved === "APPLIED" ? (
                  <Chip label="APPLIED" color="primary" />
                ) : getDepositRequestData?.isApproved === "APPROVED" ? (
                  <Chip label="APPROVED" color="info" />
                ) : getDepositRequestData?.isApproved === "REJECTED" ? (
                  <Chip label="REJECTED" color="error" />
                ) : (
                  <Chip label="REJECTED" color="error" />
                )}
              </td>
              <td className="px-6 py-4">{getDepositRequestData?.comment}</td>
              <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="view"
                    color="success"
                    onClick={() =>
                      handleOpenModalForView(getDepositRequestData)
                    }
                  >
                    <Icon icon="hugeicons:view" />
                  </IconButton>
                  {/* <IconButton
                    aria-label="edit"
                    color="info"
                    onClick={() =>
                      handleOpenModalForEdit(getDepositRequestData)
                    }
                  >
                    <Icon icon="mingcute:edit-line" />
                  </IconButton> */}
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() =>
                      handleClickOpenModalForDelete(getDepositRequestData?.id)
                    }
                  >
                    <Icon icon="lets-icons:cancel" />
                  </IconButton>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
                  <p>Mode Of Deposite : </p>
                  <p>{selectedDataForView?.dpType}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Date : </p>
                  <p>{selectedDataForView?.date}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Amount : </p>
                  <p>{selectedDataForView?.amount}</p>
                </div>
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Bank : </p>
                  <p>{selectedDataForView?.bankName}</p>
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
                <div className=" border flex py-2 pl-2 mt-1">
                  <p>Comment : </p>
                  <p>{selectedDataForView?.comment}</p>
                </div>

                {/* now i will add dropwown for status  */}
                <div className="border mt-1 py-2 pl-2">
                  <p>Update Status : </p>
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={statusCatagory}
                    sx={{ width: 300, marginBottom: "10px" }}
                    onChange={(event, newValue) => setStatus(newValue?.label)}
                    renderInput={(params) => (
                      <TextField {...params} label="Status" />
                    )}
                  />
                  <TextField
                    id="outlined-basic"
                    label="Comment"
                    variant="outlined"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    sx={{ marginBottom: "5px" }}
                  />
                  <br />
                  <Button variant="contained" onClick={handleUpdate}>
                    Update
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col items-start justify-center gap-2">


                {selectedDataForView?.slipImage ? (
                    <Button
                      variant="contained"
                      startIcon={<Icon icon="material-symbols:download-sharp" />}
                      onClick={() => handleDownloadDoc(selectedDataForView)}
                    >
                      Document
                    </Button>
                  ) : (
                    <></>
                  )}


                  {/* <Button
                    variant="contained"
                    startIcon={<Icon icon="material-symbols:download-sharp" />}
                  >
                    Document
                  </Button> */}
                </div>
              </div>
            </div>
          )}
        </Box>
      </Modal>
      {/* for edit modal  */}
      {/* <Modal
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
              validationSchema={UpdateDepositRequestSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form>
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
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          )}
        </Box>
      </Modal> */}
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
            <Button onClick={handleForDelete} variant="contained" color="error">
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
