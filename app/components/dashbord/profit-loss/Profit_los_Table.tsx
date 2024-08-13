"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { useDispatch } from "react-redux";
import { getAllVisaApply } from "../../../lib/features/visaApply/visaApplySlice";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

export default function Profit_los_Table() {
  // useEffect(()=>{
  //   const AllVisa = useSelector((state: RootState) => state);
  // })

  // for search
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [passportNoSearchQuery, setPassportNoSearchQuery] = React.useState("");

  const getVesaApplyData = useSelector(
    (state: RootState) => state?.visaApply?.visaApply?.data || []
  );

  const revarseVisaData = getVesaApplyData?.slice().reverse();
  // console.log("profit", revarseVisaData);

  const dispatch: AppDispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllVisaApply());
  }, []);

  // for search
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const handlePassportNoSearchQuery = (event) => {
    setPassportNoSearchQuery(event.target.value);
  };

  const filteredData = revarseVisaData?.filter((data) => {
    const itemDate = dayjs(data.created_at);
    const from = fromDate ? dayjs(fromDate) : null;
    const to = toDate ? dayjs(toDate) : null;
    return (
      data?.passportNo
       .toLowerCase()
        .includes(passportNoSearchQuery.toLowerCase()) &&
      (!from ||
        itemDate.isAfter(from, "day") ||
        itemDate.isSame(from, "day")) &&
      (!to || itemDate.isBefore(to, "day") || itemDate.isSame(to, "day"))
    );
  });

  console.log("sisir", revarseVisaData);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <div className="mt-4 mb-4 flex gap-4">
        <TextField
          label="From Date"
          type="date"
          variant="outlined"
          value={fromDate}
          onChange={handleFromDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="To Date"
          type="date"
          variant="outlined"
          value={toDate}
          onChange={handleToDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Passport No"
          type="text"
          variant="outlined"
          value={passportNoSearchQuery}
          onChange={handlePassportNoSearchQuery}
          />
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
        <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
          <tr>
            <th scope="col" className="px-6 py-3">
              SL
            </th>
            <th scope="col" className="px-6 py-3">
              Reg NO
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Pass No
            </th>
            <th scope="col" className="px-6 py-3 bg-blue-500">
              Buying Price
            </th>
            <th scope="col" className="px-6 py-3 bg-blue-500">
              Sales Price
            </th>
            <th scope="col" className="px-6 py-3 ">
              Profit/Loss
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData?.map((getVesaApplyData, index) => (
            <tr
              className="bg-blue-600 border-b border-blue-400"
              key={getVesaApplyData.id}
            >
              <td
                scope="row"
                className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                {index + 1}
              </td>
              <td
                scope="row"
                className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                {getVesaApplyData?.user?.regNo}
              </td>

              <td
                scope="row"
                className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
              >
                {getVesaApplyData &&
                  new Date(getVesaApplyData.created_at).toLocaleDateString(
                    "en-GB"
                  )}
              </td>
              <td className="px-6 py-4">{getVesaApplyData?.givenName}</td>
              <td className="px-6 py-4">{getVesaApplyData?.passportNo}</td>
              <td className="px-6 py-4 bg-blue-500">
                {getVesaApplyData?.buyingPrise}
              </td>
              <td className="px-6 py-4 bg-blue-500">
                {getVesaApplyData?.sellingPrise}
              </td>
              <td className="px-6 py-4">
                {getVesaApplyData?.sellingPrise - getVesaApplyData?.buyingPrise}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
      {/* sum Buying Price */}
        <p>Total Buying Price : {filteredData?.reduce((total, num) => total + Math.round(num.buyingPrise), 0)}</p>
        {/* sum Selling Price */}
        <p>Total Selling Price : {filteredData?.reduce((total, num) => total + num.sellingPrise, 0)}</p>
        {/* sum Profit/Loss */}
        <p>Total Profit/Loss : {filteredData?.reduce((total, num) => total + (num.sellingPrise - num.buyingPrise), 0)}</p>
      </div>
    </div>
  );
}
