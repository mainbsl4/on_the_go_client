"use client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../lib/store/store";
import { useDispatch } from "react-redux";
import { getAllVisaApply } from "../../../lib/features/visaApply/visaApplySlice";

export default function Profit_los_Table() {
  // useEffect(()=>{
  //   const AllVisa = useSelector((state: RootState) => state);
  // })

  const getVesaApplyData = useSelector(
    (state: RootState) => state?.visaApply?.visaApply?.data || []
  );

  const revarseVisaData = getVesaApplyData?.slice().reverse();
console.log("profit", revarseVisaData);

  const dispatch: AppDispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllVisaApply());
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
          {revarseVisaData?.map((getVesaApplyData, index) => (
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
                {getVesaApplyData?.created_at}
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
    </div>
  );
}
