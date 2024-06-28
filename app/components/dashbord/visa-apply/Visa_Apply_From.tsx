"use client";
import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { Icon } from "@iconify/react";
import { Box } from "@mui/material";
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
];

// for upload
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  //   width: 1,
});

export default function Visa_Apply_From() {
  return (
    <div className="border p-3">
      <div className="grid grid-cols-2 gap-2 ">
        <TextField
          id="outlined-basic"
          label="Given Name"
          variant="outlined"
          type="text"
        />
        <TextField
          id="outlined-basic"
          label="Sur Name"
          variant="outlined"
          type="text"
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          // sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Gender" />
          )}
        />
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          // sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Nationlity" />
          )}
        />

        <TextField
          id="outlined-basic"
          label="Passport Number"
          variant="outlined"
          type="text"
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ padding: "0px" }}>
            <DatePicker label="Passport Expiry Date" sx={{ width: "100%" }} />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ padding: "0px" }}>
            <DatePicker label="DOB" sx={{ width: "100%" }} />
          </DemoContainer>
        </LocalizationProvider>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          // sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Select Religion" />
          )}
        />
        {/* <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Choose Bank" />}
      /> */}
        {/* <br /> */}
        <Button
          component="label"
          role={undefined}
          variant="contained"
          color="info"
          tabIndex={-1}
          startIcon={<Icon icon="ep:upload-filled" />}
        >
          Upload Passport
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          color="info"
          tabIndex={-1}
          startIcon={<Icon icon="ep:upload-filled" />}
        >
          Upload Photo
          <VisuallyHiddenInput type="file" />
        </Button>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          color="info"
          tabIndex={-1}
          startIcon={<Icon icon="ep:upload-filled" />}
        >
          Others Documents
          <VisuallyHiddenInput type="file" />
        </Button>
      </div>
      <div className="text-center mt-3">
        <Button variant="contained" sx={{ width: "120px" }}>
          Submit
        </Button>
      </div>
    </div>
  );
}
