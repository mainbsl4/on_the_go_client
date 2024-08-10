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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

interface SignupResponse {
  error?: string;
}

export default function page() {
  // for acceptTerms
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [errorTerms, setErrorTerms] = React.useState(false);
  //  for passwoed
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);

    const router = useRouter();

  // for password

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  // const count = useSelector((state: RootState) => state?.counter.value);
  const dispatch: AppDispatch = useDispatch();

  const initialValues: SignupFormValues = {
    userName: "",
    email: "",
    mobile: "",
    companyName: "",
    bisunessAdd: "",
    country: "",
    city: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: SignupFormValues) => {
    try {
      // Dispatch the action to log in the user
      const response = (await dispatch(registerUser(values))) as SignupResponse;

      if (!response?.error) {
        toast.success("Account created successfully", {
          position: "top-center",
        });
        router.push("/signin");

      } else {
        console.error("Login failed:", response.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }

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
    <section className="bg-gray-50 bgImgSignUp">
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
                  <div className="space-y-4 md:space-y-6 grid md:grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Owner/Representative Name
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
                      <label className="block mb-2 text-sm font-medium text-gray-900 ">
                        Cuntry
                      </label>
                      <Field
                        as="select"
                        id="country"
                        name="country"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option value="">Choose Your country</option>
                        <option value="US">Bangladesh</option>
                      </Field>
                      {touched.country && errors.country && (
                        <div>{errors.country}</div>
                      )}
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        City
                      </label>
                      <Field
                        as="select"
                        name="city"
                        id="city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        <option selected>Choose a city</option>
                        <option value="dhaka">Dhaka</option>
                        <option value="chattogram">Chattogram</option>
                        <option value="khulna">Khulna</option>
                        <option value="rajshahi">Rajshahi</option>
                        <option value="sylhet">Sylhet</option>
                        <option value="barisal">Barisal</option>
                        <option value="rangpur">Rangpur</option>
                        <option value="mymensingh">Mymensingh</option>
                        <option value="coxsbazar">Cox's Bazar</option>
                        <option value="cumilla">Cumilla</option>
                        <option value="gazipur">Gazipur</option>
                        <option value="narayanganj">Narayanganj</option>
                        <option value="bogura">Bogura</option>
                        <option value="jessore">Jessore</option>
                        <option value="dinajpur">Dinajpur</option>
                        <option value="moulvibazar">Moulvibazar</option>
                        <option value="noakhali">Noakhali</option>
                        <option value="pabna">Pabna</option>
                        <option value="tangail">Tangail</option>
                      </Field>
                      {touched.city && errors.city && <div>{errors.city}</div>}
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Password
                      </label>
                      <div className="relative">
                        <Field
                          type={passwordVisible ? "text" : "password"}
                          name="password"
                          id="password"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        >
                          {passwordVisible ? (
                            <Icon icon="carbon:view-off" />
                          ) : (
                            <Icon icon="hugeicons:view" />
                          )}
                        </button>
                        {touched.password && errors.password && (
                          <div>{errors.password}</div>
                        )}
                      </div>
                    </div>

                    <div className=" mt-4">
                      <label className="block mb-2 text-sm font-medium text-gray-900">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Field
                          type={confirmPasswordVisible ? "text" : "password"}
                          name="confirmPassword"
                          id="confirmPassword"
                          placeholder="••••••••"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 top-0 pr-3 flex items-center text-sm leading-5"
                          onClick={toggleConfirmPasswordVisibility}
                        >
                          {confirmPasswordVisible ? (
                            <Icon icon="carbon:view-off" />
                          ) : (
                            <Icon icon="hugeicons:view" />
                          )}
                        </button>
                        {touched.confirmPassword && errors.confirmPassword && (
                          <div>{errors.confirmPassword}</div>
                        )}
                      </div>
                    </div>
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
