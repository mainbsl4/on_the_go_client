"use client";
import * as React from "react";

import { AppDispatch, RootState } from "../../../lib/store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { approveUser, getUsers } from "../../../lib/features/users/userSlice";
import DataGridTable from "../../table/DataGridTable";
import {
  Autocomplete,
  Box,
  Chip,
  IconButton,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import { Icon } from "@iconify/react";
import CircularProgress from '@mui/material/CircularProgress';

// for modal style
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

const ApproveStatus = [
  {
    label: "Approve",
    value: true,
  },
  // {
  //   label: "Reject",
  //   value: false,
  // },
];
export default function Users_table() {
  // for user status
  const [id, setId] = React.useState(null)
  
  // get api
  const loading = useSelector(
    (state: RootState) => state?.user?.loading
  );
  
  const getAllUsers = useSelector(
    (state: RootState) => state?.user?.users?.data
  );
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log("fffff", getAllUsers);

  // get data from dropdown
  
  const handleChange = (event, newValue) => {
    if (newValue?.value === true) {
      dispatch(approveUser(id));
      // console.log("id", id);
      // console.log(newValue?.value);
    }
  };

  // for modal
  // for view modal
  const [selectedDataForView, setSelectedDataForView] =
    React.useState<any>(null);
  const [openModalForView, setOpenModalForView] = React.useState(false);

  const handleOpenModalForView = (data: any) => {
    setSelectedDataForView(data);
    setOpenModalForView(true);
    setId(data?.id);
  };

  const handleCloseModalForView = () => {
    setSelectedDataForView(null);
    setOpenModalForView(false);
  };

  const columns = [
    { field: "userName", headerName: "Name", width: 150 },
    { field: "mobile", headerName: "Phone", width: 150 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "companyName", headerName: "Company", width: 150 },
    { field: "country", headerName: "Country", width: 150 },
    { field: "bisunessAdd", headerName: "Address", width: 150 },
    {
      field: "isApproved",
      headerName: "Address",
      width: 150,
      renderCell: (params: any) =>
        params?.row?.isApproved === true ? (
          <Chip label="APPROVED" color="info" />
        ) : params.row.isApproved === false ? (
          <Chip label="PENDING" color="error" />
        ) : (
          <Chip label="REJECTED" color="error" />
        ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params: any) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            aria-label="view"
            color="success"
            onClick={() => handleOpenModalForView(params.row)}
          >
            <Icon icon="hugeicons:view" />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows = getAllUsers;

  return (
    <div>
       {loading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <CircularProgress />
        </div>
      ) : (
        <DataGridTable rows={rows} columns={columns} />
      )}

      {/* for view modal */}
      <Modal
        open={openModalForView}
        onClose={handleCloseModalForView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedDataForView && (
            <div>
              <div className="border flex py-2 pl-2">
                <p>Name: </p>
                <p>{selectedDataForView?.userName}</p>
              </div>

              <div className="border flex py-2 pl-2 mt-1">
                <p>Phone: </p>
                <p>{selectedDataForView?.mobile}</p>
              </div>
              <div className="border flex py-2 pl-2 mt-1">
                <p>Email: </p>
                <p>{selectedDataForView?.email}</p>
              </div>
              <div className="border flex py-2 pl-2 mt-1">
                <p>Company: </p>
                <p>{selectedDataForView?.companyName}</p>
              </div>
              <div className="border flex py-2 pl-2 mt-1">
                <p>Country: </p>
                <p>{selectedDataForView?.country}</p>
              </div>
              <div className="border flex py-2 pl-2 mt-1">
                <p>Address: </p>
                <p>{selectedDataForView?.bisunessAdd}</p>
              </div>
              <div className="border flex py-2 pl-2 mt-1">
                <p>Address: </p>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={ApproveStatus}
                  sx={{ width: 300 }}
                  getOptionLabel={(option) => option.label}
                  renderInput={(params) => (
                    <TextField {...params} label="Update user Status" />
                  )}
                  onChange={handleChange}
                />
              </div>
              <div className="border flex py-2 pl-2 mt-1">
                <p>Status: </p>
                <p>
                  {selectedDataForView?.isApproved === true ? (
                    <Chip label="APPROVED" color="info" />
                  ) : selectedDataForView?.isApproved === false ? (
                    <Chip label="PENDING" color="error" />
                  ) : (
                    <Chip label="REJECTED" color="error" />
                  )}
                </p>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
