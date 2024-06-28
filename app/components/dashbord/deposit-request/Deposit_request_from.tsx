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

export default function Deposit_request_from() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 2, width: "96%" },
        width:"50%"
      }}
      noValidate
      autoComplete="off"
      className="border flex justify-center items-center flex-col"
    >
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Mode of Deposit" />}
      />
    <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DemoContainer components={["DatePicker"]} >
          <DatePicker label="Date" sx={{width:"100%"}}/>
        </DemoContainer>
      </LocalizationProvider>
      <TextField
        id="outlined-basic"
        label="Amount"
        variant="outlined"
        type="number"
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={top100Films}
        // sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Choose Bank" />}
      />
      <Button
        component="label"
        role={undefined}
        variant="contained"
        color="info"
        tabIndex={-1}
        startIcon={<Icon icon="ep:upload-filled" />}
      >
        Upload file
        <VisuallyHiddenInput type="file" />
      </Button>
      <Button variant="contained">Submit</Button>
    </Box>
  );
}
