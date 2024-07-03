import React from "react";
import Lone_request_from from "../../components/dashbord/lond-request/Lone_request_from";
import Lone_request_table from "../../components/dashbord/lond-request/Lone_request_table";

export default function page() {
  return (
    <div>
      <div className="flex justify-center items-center mb-4">
      <Lone_request_from />
      </div>
      <Lone_request_table/>
    </div>
  );
}
