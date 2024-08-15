"use client";
import { Icon } from "@iconify/react";
import { CircularProgress, IconButton, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { useDispatch } from "react-redux";
import { getBankDetails } from "../../../lib/features/bankDetails/bankDetailsSlice";
import { useSelector } from "react-redux";

export default function Bank_Details_Table() {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getBankDetails());
  }, []);

  const bankDetails = useSelector(
    (state: RootState) => state?.bankDetails?.bankDetails?.data
  );

  // for loading
  const bankDetailsLoading = useSelector(
    (state: RootState) => state?.bankDetails?.loading
  );

  console.log("loading", bankDetails);

  return (
    <div>
      {bankDetailsLoading ? (
        <div className="flex justify-center items-center h-[90vh]">
          <CircularProgress />
        </div>
      ) : (
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
              {bankDetails?.map((listItem) => (
                <tr className="bg-white border-b ">
                  <td className="px-6 py-4">{listItem.bankName}</td>
                  <td className="px-6 py-4">{listItem.accName}</td>
                  <td className="px-6 py-4">{listItem.accNo}</td>
                  <td className="px-6 py-4">{listItem.district}</td>
                  <td className="px-6 py-4">{listItem.branch}</td>
                  <td className="px-6 py-4">{listItem.routingNo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
