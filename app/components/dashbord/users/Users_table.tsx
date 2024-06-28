"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { Icon } from "@iconify/react";

// for modals
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Modal, TextField } from "@mui/material";
// for delete
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

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

interface Column {
  id: "name" | "phone" | "email" | "company" | "cuntry" | "address" | "action";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "phone", label: "Phone", minWidth: 100 },
  {
    id: "email",
    label: "Email",
    minWidth: 170,
    // align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "company",
    label: "Company",
    minWidth: 170,
    // align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "cuntry",
    label: "Country",
    minWidth: 170,
    // align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    // align: "right",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    // align: "",
  },
];

interface Data {
  name: string;
  phone: string;
  email: string;
  company: string;
  cuntry: string;
  address: string;
  action: string;
}

function createData(
  name: string,
  phone: string,
  email: string,
  company: string,
  cuntry: string,
  address: string,
  action: string
): Data {
  return { name, phone, email, company, cuntry, address, action };
}

const rows = [
  createData(
    "John Doe",
    "123456789",
    "john@example.com",
    "Company A",
    "USA",
    "123 Main St",
    ""
  ),
  createData(
    "Jane Smith",
    "987654321",
    "jane@example.com",
    "Company B",
    "Canada",
    "456 Elm St",
    ""
  ),
  // Add more rows as needed
];

export default function Users_table() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // for modal
  // fot view modal
  const [openModalForView, setOpenModalForView] = React.useState(false);
  const handleOpenModalForView = () => setOpenModalForView(true);
  const handleCloseModalForView = () => setOpenModalForView(false);
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
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#1e90ff",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.phone}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.id === "action" ? (
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
                                  <Icon icon="material-symbols:delete-outline" />
                                </IconButton>
                              </Stack>
                            ) : column.format && typeof value === "number" ? (
                              column.format(value)
                            ) : (
                              value
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

{/* for view  */}
      <Modal
        open={openModalForView}
        onClose={handleCloseModalForView}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a VIEW modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>

      
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
              label="Name"
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
            />
            <TextField
              id="outlined-basic"
              label="Phone"
              variant="outlined"
              type="tel"
            />
            <TextField
              id="outlined-basic"
              label="Company"
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="Cuntry"
              variant="outlined"
              type="text"
            />
            <TextField
              id="outlined-basic"
              label="Address"
              variant="outlined"
              type="text"
            />
          </div>
          <div className="flex justify-center items-center mt-3">
          <Button variant="contained" color="primary" type="submit">Update</Button>
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
