"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/store/store";
import dayjs from "dayjs";
import { Autocomplete, TextField } from "@mui/material";

const typs = [
  { id: "1", label: "Visa" },
  { id: "2", label: "Loan" },
  { id: "3", label: "Deposit" },
];
export default function LedgerTable() {
  // for search
  const [fromDate, setFromDate] = React.useState("");
  const [toDate, setToDate] = React.useState("");
  const [typesSearchQuery, setTypesSearchQuery] = React.useState("");

  // for marge api for report
  const combinedData = [];

  const depositRequestDataWhenLogin = useSelector(
    (state: RootState) => state?.user?.user?.user?.deposit_request
  );
  const depositRequestDataAfterLogin = useSelector(
    (state: RootState) => state?.user?.user?.data?.deposit_request
  );
  const userDepositData = depositRequestDataWhenLogin
    ? depositRequestDataWhenLogin
    : depositRequestDataAfterLogin;
  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  const loanListAllWhenLogin = useSelector(
    (state: RootState) => state?.user?.user?.user?.loan_request
  );

  const loanListAfterLogin = useSelector(
    (state: RootState) => state?.user?.user?.data?.loan_request
  );
  const userLoneData = loanListAllWhenLogin
    ? loanListAllWhenLogin
    : loanListAfterLogin;

  // ++++++++++++++++++++++++++++++++/
  const getVesaApplyData = useSelector(
    (state: RootState) => state?.user?.user?.user?.visa_apply
  );
  const getVisaApply = useSelector(
    (state: RootState) => state?.user?.user?.data?.visa_apply
  );
  const userVisaApplyData = getVisaApply ? getVisaApply : getVesaApplyData;

  userDepositData?.forEach((depositRequest: any) => {
    if (depositRequest?.isApproved === "APPROVED") {
      combinedData.push({
        ...depositRequest,
        type: `Deposit`,
      });
    }
  });

  userLoneData?.forEach((loanRequest: any) => {
    if (loanRequest?.isApproved === "APPROVED") {
      combinedData.push({
        ...loanRequest,
        type: "Loan",
      });
    }
  });

  userVisaApplyData?.forEach((visaApply: any) => {
    if (visaApply?.isApproved === "DELIVERED") {
      combinedData.push({
        ...visaApply,
        type: `Visa ${visaApply?.passportNo}`,
      });
    }
  });

  // const getAllUsers = useSelector(
  //     (state: RootState) => state?.user?.users?.data
  //   );

  // sum total dabit
  const totalDabit = combinedData?.reduce((acc, curr) => {
    if (curr.type === "Deposit" || curr.type === "Loan") {
      return acc + curr.amount;
    } else {
      return acc;
    }
  }, 0);

  // sum total cradit
  const totalCredit = combinedData?.reduce((acc, curr) => {
    if (curr.type === "Visa") {
      return acc + curr.sellingPrise;
    } else {
      return acc;
    }
  }, 0);

  // for search
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };
  const handleTypesSearchQueryChange = (event, value) => {
    // setTypesSearchQuery(value.label);
    if (value) {
      setTypesSearchQuery(value.label);
    } else {
      setTypesSearchQuery("");
    }
  };

  const filteredData = combinedData.filter((data) => {
    const itemDate = dayjs(data.created_at);
    const from = fromDate ? dayjs(fromDate) : null;
    const to = toDate ? dayjs(toDate) : null;

    return (
      data?.type.toLowerCase().includes(typesSearchQuery.toLowerCase()) &&
      (!from ||
        itemDate.isAfter(from, "day") ||
        itemDate.isSame(from, "day")) &&
      (!to || itemDate.isBefore(to, "day") || itemDate.isSame(to, "day"))
    );
  });

  return (
    <div>
      <div className="mb-4 flex gap-4">
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

        <Autocomplete
          disablePortal
          options={typs}
          sx={{ width: 300 }}
          onChange={handleTypesSearchQueryChange}
          renderInput={(params) => <TextField {...params} label="Movie" />}
        />
      </div>

      <div>
        <p>Total Dabit: {totalDabit}</p>
        <p>Total Credit: {totalCredit}</p>
      </div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              SL
            </th>
            <th scope="col" className="px-6 py-3">
              Date
            </th>

            <th scope="col" className="px-6 py-3">
              Type
            </th>

            <th scope="col" className="px-6 py-3">
              Debit
            </th>
            <th scope="col" className="px-6 py-3">
              Credit
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredData
            ?.slice()
            .sort((a, b) => {
              const dateA = new Date(a.created_at).getTime();
              const dateB = new Date(b.created_at).getTime();
              return dateB - dateA;
            })
            ?.map((item: any, index: number) => (
              <tr key={index} className="border">
                <td
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {index + 1}
                </td>
                <td className="px-6 py-4">
                  {new Date(item?.created_at).toLocaleDateString("en-GB")}
                </td>
                <td className="px-6 py-4">{item?.type}</td>
                <td className="px-6 py-4 bg-red-400">{item?.sellingPrise}</td>
                <td className="px-6 py-4 bg-blue-300">{item?.amount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
