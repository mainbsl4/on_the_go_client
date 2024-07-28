import React from "react";

export default function Profit_los_Table() {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-blue-100 dark:text-blue-100">
        <thead className="text-xs text-white uppercase bg-blue-600 border-b border-blue-400 dark:text-white">
          <tr>
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
          <tr className="bg-blue-600 border-b border-blue-400">
            <td
              scope="row"
              className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
            >
              Apple MacBook Pro 17"
            </td>
            <td className="px-6 py-4">Silver</td>
            <td className="px-6 py-4">Laptop</td>
            <td className="px-6 py-4 bg-blue-500">$2999</td>
            <td className="px-6 py-4 bg-blue-500">$2999</td>
            <td className="px-6 py-4">$2999</td>
          </tr>
          <tr className="bg-blue-600 border-b border-blue-400">
            <td
              scope="row"
              className="px-6 py-4 font-medium  text-blue-50 whitespace-nowrap dark:text-blue-100"
            >
              Microsoft Surface Pro
            </td>
            <td className="px-6 py-4">White</td>
            <td className="px-6 py-4">Laptop PC</td>
            <td className="px-6 py-4 bg-blue-500">$1999</td>
            <td className="px-6 py-4 bg-blue-500">$1999</td>
            <td className="px-6 py-4">$1999</td>
          </tr>
          <tr className="bg-blue-600 border-b border-blue-400">
            <td
              scope="row"
              className="px-6 py-4 font-medium  text-blue-50 whitespace-nowrap dark:text-blue-100"
            >
              Magic Mouse 2
            </td>
            <td className="px-6 py-4">Black</td>
            <td className="px-6 py-4">Accessories</td>
            <td className="px-6 py-4 bg-blue-500">$99</td>
            <td className="px-6 py-4 bg-blue-500">$99</td>
            <td className="px-6 py-4">$99</td>
          </tr>
          <tr className="bg-blue-600 border-b border-blue-400">
            <td
              scope="row"
              className="px-6 py-4 font-medium  text-blue-50 whitespace-nowrap dark:text-blue-100"
            >
              Google Pixel Phone
            </td>
            <td className="px-6 py-4">Gray</td>
            <td className="px-6 py-4">Phone</td>
            <td className="px-6 py-4 bg-blue-500">$799</td>
            <td className="px-6 py-4 bg-blue-500">$799</td>
            <td className="px-6 py-4">$799</td>
          </tr>
          <tr className="bg-blue-600 border-blue-40">
            <td
              scope="row"
              className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap dark:text-blue-100"
            >
              Apple Watch 5
            </td>
            <td className="px-6 py-4">Red</td>
            <td className="px-6 py-4">Wearables</td>
            <td className="px-6 py-4 bg-blue-500">$999</td>
            <td className="px-6 py-4 bg-blue-500">$999</td>
            <td className="px-6 py-4">$999</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
