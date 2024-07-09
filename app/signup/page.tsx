"use client";
import * as React from "react";
import logo from "../assets/images/logo/onthegoLogo.jpg";
import Image from "next/image";
import { SignupFormValues } from "../types/formTypes";
import { Field, Form, Formik } from "formik";
import { SignUpFormSchema } from "../utils/validationSchema";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { registerUser } from "../lib/features/users/userSlice";
import Link from "next/link";
import { AppDispatch } from "../lib/store/store";

export default function page() {
  // for acceptTerms
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [errorTerms, setErrorTerms] = React.useState(false);

  // const count = useSelector((state: RootState) => state?.counter.value);
  const dispatch: AppDispatch = useDispatch();

  const initialValues: SignupFormValues = {
    userName: "",
    email: "",
    password: "",
    mobile: "",
    companyName: "",
    bisunessAdd: "",
    country: "",
    city: "",
  };

  const handleSubmit = (values: SignupFormValues) => {
    dispatch(registerUser(values));

    console.log(values);
  };

  // for acceptTerms
  const handleAcceptTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAcceptTerms(checked);
    setErrorTerms(false);
    console.log(checked);
  };

  const AcceptTermsError = () => {
    setErrorTerms(true);
  };

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
            <Formik
              initialValues={initialValues}
              validationSchema={SignUpFormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form action="#">
                  <div className="space-y-4 md:space-y-6 grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Enter name here
                      </label>
                      <Field
                        type="text"
                        name="userName"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Enter name here"
                      />
                      {touched.userName && errors.userName && (
                        <div>{errors.userName}</div>
                      )}
                    </div>
                    <div style={{ marginTop: "0px" }}>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Enter email here
                      </label>
                      <Field
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Enter email here"
                      />
                      {touched.email && errors.email && (
                        <div>{errors.email}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Enter phone number
                      </label>
                      <Field
                        type="tel"
                        name="mobile"
                        id="mobile"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Enter phone number"
                      />
                      {touched.mobile && errors.mobile && (
                        <div>{errors.mobile}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Company Name
                      </label>
                      <Field
                        type="text"
                        name="companyName"
                        id="companyName"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Company Name"
                      />
                      {touched.companyName && errors.companyName && (
                        <div>{errors.companyName}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Business Address
                      </label>
                      <Field
                        type="text"
                        name="bisunessAdd"
                        id="bisunessAdd"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                        placeholder="Business Address"
                      />
                      {touched.bisunessAdd && errors.bisunessAdd && (
                        <div>{errors.bisunessAdd}</div>
                      )}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Cuntry
                      </label>
                      <Field
                        as="select"
                        id="country"
                        name="country"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option value="">Choose Your country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </Field>
                      {touched.country && errors.country && (
                        <div>{errors.country}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        City
                      </label>
                      <Field
                        as="select"
                        name="city"
                        id="city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option selected>Choose a city</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="FR">France</option>
                        <option value="DE">Germany</option>
                      </Field>
                      {touched.city && errors.city && <div>{errors.city}</div>}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      />
                      {touched.password && errors.password && (
                        <div>{errors.password}</div>
                      )}
                    </div>
                    {/* <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Confirm password
                      </label>
                      <Field
                        type="confirm-password"
                        name="confirm-password"
                        id="confirm-password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0"
                      />
                    </div> */}
                  </div>
                  <br />
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex items-start ">
                      <div className="flex items-center h-5">
                        <input
                          onChange={handleAcceptTerms}
                          id="terms"
                          aria-describedby="terms"
                          type="checkbox"
                          checked={acceptTerms}
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                        />
                      </div>

                      {errorTerms === true ? (
                        <div className="ml-3 text-sm">
                          <label className="font-light text-red-500 ">
                            I accept the{" "}
                            <a
                              className="font-medium text-primary-600 hover:underline"
                              href="#"
                            >
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                      ) : (
                        <div className="ml-3 text-sm">
                          <label className="font-light  ">
                            I accept the{" "}
                            <a
                              className="font-medium text-primary-600 hover:underline"
                              href="#"
                            >
                              Terms and Conditions
                            </a>
                          </label>
                        </div>
                      )}
                    </div>

                    {/* <button
                      // type="submit"
                      // disabled={isSubmitting}
                      className="w-full mt-2 mb-2 bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Create an account
                    </button> */}
                    {/* <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 mb-2 bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Create an account
                    </button> */}
                    {acceptTerms === false ? (
                      <button
                        onClick={AcceptTermsError}
                        // type="submit"
                        // disabled={isSubmitting}
                        // disabled
                        className="w-full mt-2 mb-2 bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Create an account
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 mb-2 bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      >
                        Create an account
                      </button>
                    )}
                    <p className="text-sm font-light text-gray-500 ">
                      Already have an account?{" "}
                      <Link
                        href="/signin"
                        className="font-medium text-primary-600 hover:underline "
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
