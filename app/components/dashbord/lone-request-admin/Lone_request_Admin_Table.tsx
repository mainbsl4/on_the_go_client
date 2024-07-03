"use client";
import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";

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

export default function Lone_request_Admin_Table() {
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

  return (
    <div>
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
                {/* <Image
                  className=" w-full rounded-lg h-96"
                  src={img}
                  alt="nature image"
                /> */}
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

          <div className="grid grid-cols-2 gap-2">
            <TextField
              id="outlined-basic"
              label="Given Name"
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="Sir Name"
              variant="outlined"
              type="email"
            />
            <TextField
              id="outlined-basic"
              label="Genter"
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="Nationality"
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="DOB"
              variant="outlined"
              type="date"
            />
            <TextField
              id="outlined-basic"
              label="Passport Number"
              variant="outlined"
              type="text"
              defaultValue="Hello World"
            />
            <TextField
              id="outlined-basic"
              label="Relegion"
              variant="outlined"
              type="text"
            />
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
            <Button variant="contained">Update</Button>
          </div>
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
