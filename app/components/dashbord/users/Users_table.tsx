"use client";
import * as React from "react";

import { AppDispatch, RootState } from "../../../lib/store/store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../lib/features/users/userSlice";
import DataGridTable from "../../table/DataGridTable";
import { Box, Chip, IconButton, Modal, Stack } from "@mui/material";
import { Icon } from "@iconify/react";

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

export default function Users_table() {
  // get api
  const getAllUsers = useSelector(
    (state: RootState) => state?.user?.users?.data
  );
  const dispatch: AppDispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  console.log("fffff", getAllUsers);
  
  // for modal
  // for view modal
  const [selectedDataForView, setSelectedDataForView] = React.useState<any>(null);
  const [openModalForView, setOpenModalForView] = React.useState(false);
  
  const handleOpenModalForView = (data: any) => {
    setSelectedDataForView(data);
    setOpenModalForView(true);
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
    { field: "isApproved", headerName: "Address", width: 150,
      renderCell: (params: any) => (
        // <Chip size="small" label={params.row.isApproved? "Approved" : "Pending"} />
        params?.row?.isApproved === true ? (
          <Chip label="APPROVED" color="info" />
        ) : params.row.isApproved === false ? (
          <Chip label="REJECTED" color="error" />
        ) : (
          <Chip label="REJECTED" color="error" />
        )
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
      <DataGridTable rows={rows} columns={columns} />

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
                <p>Status: </p>
                <p>
                  {
                  
                  selectedDataForView?.isApproved === true ? (
                    <Chip label="APPROVED" color="info" />
                  ) : selectedDataForView?.isApproved === false ? (
                    <Chip label="REJECTED" color="error" />
                  ) : (
                    <Chip label="REJECTED" color="error" />
                  )
                  
                  // selectedDataForView?.isApproved === "SUBMITTED" ? (
                  //   <Chip label="SUBMITTED" color="default" />
                  // ) : selectedDataForView?.isApproved === "CANCELLED" ? (
                  //   <Chip label="CANCELLED" color="warning" />
                  // ) : selectedDataForView?.isApproved === "RECEIVED" ? (
                  //   <Chip label="RECEIVED" color="success" />
                  // ) : selectedDataForView?.isApproved === "APPLIED" ? (
                  //   <Chip label="APPLIED" color="primary" />
                  // ) : selectedDataForView?.isApproved === "APPROVED" ? (
                  //   <Chip label="APPROVED" color="info" />
                  // ) : selectedDataForView?.isApproved === "REJECTED" ? (
                  //   <Chip label="REJECTED" color="error" />
                  // ) : (
                  //   <Chip label="REJECTED" color="error" />
                  // )
                  
                  
                  }
                </p>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
