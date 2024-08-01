"use client";
import { Icon } from "@iconify/react";
import {
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
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { useDispatch } from "react-redux";
import {
  deleteLoan,
  getAllLoanReq,
  updateLoan,
} from "../../../lib/features/loan/loanSlice";
import { UpdateLoneRequestValues } from "../../../types/formTypes";
import { UpdateLoneRequestSchema } from "../../../utils/validationSchema";
import { Field, Form, Formik } from "formik";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { getUser } from "../../../lib/features/users/userSlice";

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

export default function Lone_request_table() {
  // get data
  const [data, setData] = React.useState([]);

  const dispatch: AppDispatch = useDispatch();
  // loading
  const loading = useSelector((state: RootState) => state?.loan?.loading);
  // get data
  const loanListAll = useSelector(
    (state: RootState) => state?.loan?.loan?.data
  );
  // const loanList = loanListAll?.slice().reverse();

  const loanListAllWhenLogin = useSelector(
    (state: RootState) => state?.user?.user?.user?.loan_request
  );

  const loanListAfterLogin = useSelector(
    (state: RootState) => state?.user?.user?.data?.loan_request
  );

  // console.log("dddddd",loanListAfterLogin.slice().reverse());

  React.useEffect(() => {
    // dispatch(getAllLoanReq());
    // if (loanListAllWhenLogin) {
    //   setData(loanListAllWhenLogin);
    // } else if (loanListAfterLogin) {
    //   setData(loanListAfterLogin);
    // }
    // const loanList = loanListAll?.slice().reverse();

    const mainData = loanListAllWhenLogin? loanListAllWhenLogin : loanListAfterLogin
    const getDepositRequestData = Array.isArray(mainData)
    ? mainData?.slice().reverse() : [];

    setData(getDepositRequestData)


  }, [loanListAllWhenLogin, loanListAfterLogin]);

  React.useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    dispatch(getUser( JSON.parse(storedUserId)));
  }, []);


  const actionDataGet = (sec) => {
    setTimeout(() => {
      dispatch(getAllLoanReq());
    }, sec);
  };

  // for modal
  // for view modal
  const [idForDelete, setIdForDelete] = useState(null);
  const [updateId, setUpdateId] = useState(null);

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
  // for edit modal

  const [selectedDataForEdit, setSelectedDataForEdit] = React.useState(null);

  const [openModalForEdit, setOpenModalForEdit] = React.useState(false);
  // const handleOpenModalForEdit = () => setOpenModalForEdit(true);
  const handleOpenModalForEdit = (data: any) => {
    setOpenModalForEdit(true);
    setUpdateId(data?.id);
    setSelectedDataForEdit(data);
  };
  // const handleCloseModalForEdit = () => setOpenModalForEdit(false);
  const handleCloseModalForEdit = () => {
    setOpenModalForEdit(false);
    setSelectedDataForEdit(null);
  };

  // for cancle modal

  const [openModalForDelete, setOpenModalForDelete] = React.useState(false);

  const handleClickOpenModalForDelete = (id: any) => {
    setIdForDelete(id);
    setOpenModalForDelete(true);
  };

  const handleForDelete = () => {
    dispatch(deleteLoan(idForDelete));
    setOpenModalForDelete(false);
    actionDataGet(700);
  };
  const handleCloseModalForDelete = () => {
    setOpenModalForDelete(false);
  };

  // for validation
  const initialValues: UpdateLoneRequestValues = {
    userId: "",
    reqDate: selectedDataForEdit?.reqDate || "",
    settlmentDate: selectedDataForEdit?.settlmentDate || "",
    amount: selectedDataForEdit?.amount || 0,
    remarks: selectedDataForEdit?.remarks || "",
    // refNo: selectedDataForEdit?.refNo || "",
  };

  const handleSubmit = (values: UpdateLoneRequestValues) => {
    dispatch(updateLoan({ id: updateId, data: values }));
    actionDataGet(700);
    setOpenModalForEdit(false);
  };

  return loading ? (
    <div className="flex justify-center items-center h-[90vh]">
      <CircularProgress />
    </div>
  ) : (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              REQ Date
            </th>
            <th scope="col" className="px-6 py-3">
              Settlement Date
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Remarks
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
          {data?.map((loanList) => (
            <tr className="bg-white border-b " key={loanList.id}>
              <td className="px-6 py-4">{loanList.reqDate}</td>
              <td className="px-6 py-4">{loanList.settlmentDate}</td>
              <td className="px-6 py-4">{loanList.amount}</td>
              <td className="px-6 py-4">{loanList.remarks}</td>

              <td className="px-6 py-4">
                {loanList?.isApproved === "SUBMITTED" ? (
                  <Chip label="SUBMITTED" color="default" />
                ) : loanList?.isApproved === "CANCELLED" ? (
                  <Chip label="CANCELLED" color="warning" />
                ) : loanList?.isApproved === "RECEIVED" ? (
                  <Chip label="RECEIVED" color="success" />
                ) : loanList?.isApproved === "APPLIED" ? (
                  <Chip label="APPLIED" color="primary" />
                ) : loanList?.isApproved === "APPROVED" ? (
                  <Chip label="APPROVED" color="info" />
                ) : loanList?.isApproved === "REJECTED" ? (
                  <Chip label="REJECTED" color="error" />
                ) : (
                  <Chip label="REJECTED" color="error" />
                )}
              </td>
              <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="view"
                    color="success"
                    onClick={() => handleOpenModalForView(loanList)}
                  >
                    <Icon icon="hugeicons:view" />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    color="info"
                    onClick={() => handleOpenModalForEdit(loanList)}
                  >
                    <Icon icon="mingcute:edit-line" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={() => handleClickOpenModalForDelete(loanList?.id)}
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
              <div className=" border flex py-2 pl-2">
                <p>Request Date : </p>
                <p>
                  {dayjs(selectedDataForView?.reqDate).format("DD/MM/YYYY")}
                </p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Settlement Date : </p>
                <p>
                  {dayjs(selectedDataForView?.settlmentDate).format(
                    "DD/MM/YYYY"
                  )}
                </p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Amount : </p>
                <p>{selectedDataForView?.amount}</p>
              </div>
              <div className=" border flex py-2 pl-2 mt-1">
                <p>Remark : </p>
                <p>{selectedDataForView?.remarks}</p>
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
              validationSchema={UpdateLoneRequestSchema}
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
                              error={
                                touched.settlmentDate && !!errors.settlmentDate
                              }
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
                    {/* <Field name="refNo">
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
                    </Field> */}
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
