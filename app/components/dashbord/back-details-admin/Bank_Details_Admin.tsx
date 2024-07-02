"use client";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Form, Formik, Field } from "formik";
import { CreateBankDetailsSchema } from "../../../utils/validationSchema";
import { CreateBankDetailsFormValues, UpdateBankDetailsFormValues } from "../../../types/formTypes";
import { useDispatch } from "react-redux";
import {
  createBankDetails,
  deleteBankDetail,
  getBankDetails,
} from "../../../lib/features/bankDetails/bankDetailsSlice";
import { RootState } from "../../../lib/store/store";
import { useSelector } from "react-redux";

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
};

export default function Bank_Details_Admin() {
  const [delId, setDelId] = useState("");
  const [editBankDetails, setEditBankDetails] = useState<UpdateBankDetailsFormValues | null>(null);
  
  // for modal
  const [openModalForAdd, setOpenModalForAdd] = useState(false);
  const handleOpenModalForAdd = () => setOpenModalForAdd(true);
  const handleCloseModalForAdd = () => setOpenModalForAdd(false);

  const [openModalForEdit, setOpenModalForEdit] = useState(false);
  const handleOpenModalForEdit = (bankDetails: UpdateBankDetailsFormValues) => {
    setEditBankDetails(bankDetails);
    setOpenModalForEdit(true);
  };
  const handleCloseModalForEdit = () => {
    setEditBankDetails(null);
    setOpenModalForEdit(false);
  };

  const [openModalForDelete, setOpenModalForDelete] = useState(false);

  const bankDetailsList = useSelector(
    (state: RootState) => state?.bankDetails?.bankDetails?.data
  );

  const reversedBankDetailsList = bankDetailsList?.slice().reverse();

  const dispatch = useDispatch();

  const initialValues: CreateBankDetailsFormValues = {
    bankName: "",
    accName: "",
    accNo: "",
    branch: "",
  };

  const actionDataGet = (sec) => {
    setTimeout(() => {
      dispatch(getBankDetails());
    }, sec);
  };

  const handleSubmit = (values: CreateBankDetailsFormValues) => {
    dispatch(createBankDetails(values));
    actionDataGet(700);
    setOpenModalForAdd(false);
  };

  const handleClickOpenModalForDelete = (id) => {
    setOpenModalForDelete(true);
    setDelId(id);
  };

  const handleCloseModalForDelete = () => {
    setOpenModalForDelete(false);
  };

  React.useEffect(() => {
    dispatch(getBankDetails());
  }, [dispatch]);

  const deleteList = (id) => {
    dispatch(deleteBankDetail(id));
    actionDataGet(700);
    setOpenModalForDelete(false);
  };

  return (
    <div>
      <div className="text-right mb-3">
        <Button variant="contained" onClick={handleOpenModalForAdd}>
          Add
        </Button>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200">
            <tr>
              <th scope="col" className="px-6 py-3">
                Bank name
              </th>
              <th scope="col" className="px-6 py-3">
                A/C Name
              </th>
              <th scope="col" className="px-6 py-3">
                A/C No
              </th>
              <th scope="col" className="px-6 py-3">
                Branch
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {reversedBankDetailsList?.map((listItem) => (
              <tr className="bg-white border-b" key={listItem.id}>
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {listItem.bankName}
                </td>
                <td className="px-6 py-4">{listItem.accName}</td>
                <td className="px-6 py-4">{listItem.accNo}</td>
                <td className="px-6 py-4">{listItem.branch}</td>
                <td className="px-6 py-4">
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      aria-label="edit"
                      color="info"
                      onClick={() => handleOpenModalForEdit(listItem)}
                    >
                      <Icon icon="bxs:edit" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      color="error"
                      onClick={() => handleClickOpenModalForDelete(listItem.id)}
                    >
                      <Icon icon="mdi:delete-outline" />
                    </IconButton>
                  </Stack>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      <Modal
        open={openModalForAdd}
        onClose={handleCloseModalForAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-2xl mb-2">Add Bank Informations</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={CreateBankDetailsSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form>
                <div className="grid grid-cols-2 gap-2">
                  <Field name="bankName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="Bank Name"
                        variant="outlined"
                        type="text"
                        error={touched.bankName && !!errors.bankName}
                        helperText={touched.bankName && errors.bankName}
                      />
                    )}
                  </Field>
                  <Field name="accName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="A/C Name"
                        variant="outlined"
                        type="text"
                        error={touched.accName && !!errors.accName}
                        helperText={touched.accName && errors.accName}
                      />
                    )}
                  </Field>
                  <Field name="accNo">
                    {({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="A/C NO"
                        variant="outlined"
                        type="text"
                        error={touched.accNo && !!errors.accNo}
                        helperText={touched.accNo && errors.accNo}
                      />
                    )}
                  </Field>
                  <Field name="branch">
                    {({ field }) => (
                      <TextField
                        {...field}
                        id="outlined-basic"
                        label="Branch"
                        variant="outlined"
                        type="text"
                        error={touched.branch && !!errors.branch}
                        helperText={touched.branch && errors.branch}
                      />
                    )}
                  </Field>
                </div>
                <div className="flex justify-center items-center mt-3">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>

      {/* Edit Modal */}
      <Modal
        open={openModalForEdit}
        onClose={handleCloseModalForEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-2xl mb-2">Edit Bank Informations</h2>
          {editBankDetails && (
            <Formik
              initialValues={editBankDetails}
              validationSchema={CreateBankDetailsSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form>
                  <div className="grid grid-cols-2 gap-2">
                    <Field name="bankName">
                      {({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="Bank Name"
                          variant="outlined"
                          type="text"
                          error={touched.bankName && !!errors.bankName}
                          helperText={touched.bankName && errors.bankName}
                        />
                      )}
                    </Field>
                    <Field name="accName">
                      {({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="A/C Name"
                          variant="outlined"
                          type="text"
                          error={touched.accName && !!errors.accName}
                          helperText={touched.accName && errors.accName}
                        />
                      )}
                    </Field>
                    <Field name="accNo">
                      {({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="A/C NO"
                          variant="outlined"
                          type="text"
                          error={touched.accNo && !!errors.accNo}
                          helperText={touched.accNo && errors.accNo}
                        />
                      )}
                    </Field>
                    <Field name="branch">
                      {({ field }) => (
                        <TextField
                          {...field}
                          id="outlined-basic"
                          label="Branch"
                          variant="outlined"
                          type="text"
                          error={touched.branch && !!errors.branch}
                          helperText={touched.branch && errors.branch}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="flex justify-center items-center mt-3">
                    <Button
                      variant="contained"
                      color="primary"
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

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openModalForDelete}
        onClose={handleCloseModalForDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete it"}
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => deleteList(delId)}
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
    </div>
  );
}