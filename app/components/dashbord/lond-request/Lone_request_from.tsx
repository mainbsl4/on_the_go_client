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

export default function Lone_request_from() {
  return (
    <div className="border p-3 w-6/12">
      <div className="grid grid-cols-1 gap-2">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ padding: "0px" }}>
            <DatePicker label="Request Date" sx={{ width: "100%" }} />
          </DemoContainer>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]} sx={{ padding: "0px" }}>
            <DatePicker label="Settlement Date" sx={{ width: "100%" }} />
          </DemoContainer>
        </LocalizationProvider>
        <TextField
          id="outlined-basic"
          label="Amount"
          variant="outlined"
          type="number"
        />

        <TextField
          id="outlined-basic"
          label="Remarks (Optional)"
          variant="outlined"
          type="text"
        />
        <TextField
          id="outlined-basic"
          label="Reference Number"
          variant="outlined"
          type="tel"
        />
      </div>
      <div className="text-center mt-3">
        <Button variant="contained" sx={{ width: "100px" }}>
          Submit
        </Button>
      </div>
    </div>
  );
}
