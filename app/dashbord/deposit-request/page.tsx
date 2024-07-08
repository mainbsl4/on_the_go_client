import React from "react";
import Deposit_request_from from "../../components/dashbord/deposit-request/Deposit_request_from";
// import Deposit_request_table from "../../components/dashbord/deposit-request/Deposit_request_table";

export default function page() {
  return (
    <div>
      <div className="flex justify-center items-center mb-4">
        <Deposit_request_from />
      </div>
      {/* <Deposit_request_table /> */}
    </div>
  );
}
