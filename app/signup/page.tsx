import * as React from "react";
import logo from "../assets/images/logo/onthegoLogo.jpg";
import Image from "next/image";
import * as yup from "yup";
import { Formik } from "formik";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string | null;
  mobile: string;
  password: string;
}

let signUpSchema = yup.object().shape({
  firstName: yup.string().required("First Name is Required"),
  lastName: yup.string().required("Last Name is Required"),
  email: yup
    .string()
    .nullable()
    .email("Email should be valid")
    .required("Email is Required"),
  mobile: yup.string().required("Mobile No. is Required"),
  password: yup.string().required("Password is Required"),
});

export default function page() {
  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <Image className="w-20 h-20 mr-2" src={logo} alt="logo" />
        </a>
        <div className=" lg:w-5/12 bg-white rounded-lg shadow md:w-10/12 sm:w-12/12 md:mt-0  xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Create an account
            </h1>
            <form onSubmit={Formik.handleSubmit} action="#">
              <div className="space-y-4 md:space-y-6 grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Enter name here
                  </label>
                  <input
                    // type="text"
                    // name="firstName"
                    // placeholder="Your First Name Here"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    type="text"
                    name="name"
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter name here"
                  />
                </div>
                <div style={{ marginTop: "0px" }}>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Enter email here
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter email here"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Enter phone number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="compantNmae"
                    id="compantNmae"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Company Name"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Business Address
                  </label>
                  <input
                    type="text"
                    name="businessAddress"
                    id="businessAddress"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="Business Address"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Cuntry
                  </label>
                  <select
                    id="Cuntry"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  >
                    <option selected>Choose Your country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
                {/* <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  City
                </label>
                <select
                  id="City"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                >
                  <option selected>Choose a city</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="FR">France</option>
                  <option value="DE">Germany</option>
                </select>
              </div> */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Confirm password
                  </label>
                  <input
                    type="confirm-password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0"
                  />
                </div>
              </div>
              <br />
              <div className="flex flex-col justify-center items-center">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300  "
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label className="font-light text-gray-500 ">
                      I accept the{" "}
                      <a
                        className="font-medium text-primary-600 hover:underline"
                        href="#"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 mb-2 bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500 ">
                  Already have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-primary-600 hover:underline "
                  >
                    Login here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
