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
  Typography,
} from "@mui/material";
import React from "react";
import { Icon } from "@iconify/react";

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

export default function Bank_Details_Table_for_admin() {
  // for modal
    // fot add modal
    const [openModalForAdd, setOpenModalForAdd] = React.useState(false);
    const handleOpenModalForAdd = () => setOpenModalForAdd(true);
    const handleCloseModalForAdd = () => setOpenModalForAdd(false);
  // fot edit modal
  const [openModalForEdit, setOpenModalForEdit] = React.useState(false);
  const handleOpenModalForEdit = () => setOpenModalForEdit(true);
  const handleCloseModalForEdit = () => setOpenModalForEdit(false);

  // for delete

  const [openModalForDelete, setOpenModalForDelete] = React.useState(false);

  const handleClickOpenModalForDelete = () => {
    setOpenModalForDelete(true);
  };

  const handleCloseModalForDelete = () => {
    setOpenModalForDelete(false);
  };
  return (
    <div>
      <div className="text-right mb-3">
        <Button variant="contained" onClick={handleOpenModalForAdd}>Add</Button>
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
            <tr className="bg-white border-b ">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                NCC Bank
              </td>
              <td className="px-6 py-4">Airspan Limited</td>
              <td className="px-6 py-4">0325000050</td>
              <td className="px-6 py-4">Mirpur Road Branch</td>
              <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    color="info"
                    onClick={handleOpenModalForEdit}
                  >
                    <Icon icon="bxs:edit" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={handleClickOpenModalForDelete}
                  >
                    <Icon icon="mdi:delete-outline" />
                  </IconButton>
                </Stack>
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                NCC Bank
              </td>
              <td className="px-6 py-4">Airspan Limited</td>
              <td className="px-6 py-4">0325000050</td>
              <td className="px-6 py-4">Mirpur Road Branch</td>
              <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="edit" color="info">
                    <Icon icon="bxs:edit" />
                  </IconButton>
                  <IconButton aria-label="delete" color="error">
                    <Icon icon="mdi:delete-outline" />
                  </IconButton>
                </Stack>
              </td>
            </tr>
            <tr className="bg-white border-b ">
              <td
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                NCC Bank
              </td>
              <td className="px-6 py-4">Airspan Limited</td>
              <td className="px-6 py-4">0325000050</td>
              <td className="px-6 py-4">Mirpur Road Branch</td>
              <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton
                    aria-label="edit"
                    color="info"
                    onClick={handleOpenModalForEdit}
                  >
                    <Icon icon="bxs:edit" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={handleClickOpenModalForDelete}
                  >
                    <Icon icon="mdi:delete-outline" />
                  </IconButton>
                </Stack>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


{/* for view  */}
<Modal
        open={openModalForAdd}
        onClose={handleCloseModalForAdd}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
          <h2 className="text-2xl">Add Bank Informations</h2>

          <div className="grid grid-cols-2 gap-2">
            <TextField
              id="outlined-basic"
              label="Bank Name"
              variant="outlined"
              type="text"
            />

            <TextField
              id="outlined-basic"
              label="A/C Name"
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="A/C NO"
              variant="outlined"
              type="number"
            />
            <TextField
              id="outlined-basic"
              label="Branch"
              variant="outlined"
              type="text"
            />
          </div>
          <div className="flex justify-center items-center mt-3">
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Box>
      </Modal>


      {/* for edit  */}
      <Modal
        open={openModalForEdit}
        onClose={handleCloseModalForEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-2xl">Edit Informations</h2>

          <div className="grid grid-cols-2 gap-2">
            <TextField
              id="outlined-basic"
              label="Bank Name"
              variant="outlined"
              type="text"
            />

            <TextField
              id="outlined-basic"
              label="A/C Name"
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="A/C NO"
              variant="outlined"
              type="number"
            />
            <TextField
              id="outlined-basic"
              label="Branch"
              variant="outlined"
              type="text"
            />
          </div>
          <div className="flex justify-center items-center mt-3">
            <Button variant="contained" color="primary" type="submit">
              Update
            </Button>
          </div>
        </Box>
      </Modal>

      {/* for delete  */}

      <React.Fragment>
        <Dialog
          open={openModalForDelete}
          onClose={handleCloseModalForDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure to delete it"}
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
