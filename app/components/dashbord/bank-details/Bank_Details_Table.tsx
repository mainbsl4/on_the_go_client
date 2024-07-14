// "use client"
import { Icon } from "@iconify/react";
import { IconButton, Stack } from "@mui/material";
import React from "react";

export default function Bank_Details_Table() {
  return (
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
              District
            </th>
            <th scope="col" className="px-6 py-3">
              Branch
            </th>
            <th scope="col" className="px-6 py-3">
            Routing Number
            </th>
            {/* <th scope="col" className="px-6 py-3">
              Action
            </th> */}
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
              <td className="px-6 py-4">48953764385</td>
              <td className="px-6 py-4">Mirpur Road Branch</td>
              <td className="px-6 py-4">Mirpur Road Branch</td>
              {/* <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="edit" color="info">
                  <Icon icon="bxs:edit" />
                  </IconButton>
                  <IconButton aria-label="delete" color="error">
                    <Icon icon="mdi:delete-outline" />
                  </IconButton>
                </Stack>
              </td> */}
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
              {/* <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="edit" color="info">
                  <Icon icon="bxs:edit" />
                  </IconButton>
                  <IconButton aria-label="delete" color="error">
                    <Icon icon="mdi:delete-outline" />
                  </IconButton>
                </Stack>
              </td> */}
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
              {/* <td className="px-6 py-4">
                <Stack direction="row" spacing={1}>
                  <IconButton aria-label="edit" color="info">
                  <Icon icon="bxs:edit" />
                  </IconButton>
                  <IconButton aria-label="delete" color="error">
                    <Icon icon="mdi:delete-outline" />
                  </IconButton>
                </Stack>
              </td> */}
            </tr>
          
        </tbody>
      </table>
    </div>
  );
}
