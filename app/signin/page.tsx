"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../assets/images/logo/onthegoLogo.jpg";
import { Field, Form, Formik } from "formik";
import { SigninFormValues } from "../types/formTypes";
import { SigninFormSchema } from "../utils/validationSchema";
import { signinUser } from "../lib/features/users/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../lib/store/store";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import '../assets/css/style.css'

interface SigninResponse {
  error?: string;
}

export default function page() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state?.user);
  console.log("hooo", user);

  const initialValues: SigninFormValues = { credential: "", password: "" };

  const handleSubmit = async (values: SigninFormValues) => {
    try {
      // Dispatch the action to log in the user
      const response = (await dispatch(signinUser(values))) as SigninResponse;

      if (!response?.error) {
        toast.success("User logged in successfully", {
          position: "top-center",
        });
        console.log("ress", response);
        router.push("/dashbord");
      } else {
        console.error("Login failed:", response.error);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }

    console.log(values);
  };

  return (
    <section className="bg-gray-50 bgImgSignin">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <Image className="w-20 h-20 mr-2" src={logo} alt="logo" />
        </a>
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0  border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
            </h1>
            <Formik
              initialValues={initialValues}
              validationSchema={SigninFormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 ">
                      Your Email or Phone
                    </label>
                    <Field
                      type="text"
                      name="credential"
                      id="credential"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                      placeholder="name@company.com"
                    />
                    {touched.credential && errors.credential && (
                      <div>{errors.credential}</div>
                    )}
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
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    />
                    {touched.password && errors.password && (
                      <div>{errors.password}</div>
                    )}
                  </div>
                  {/* <div className="flex items-center justify-between">
                    <div className="flex items-start"></div>
                    <a
                      href="#"
                      className="text-sm font-medium text-primary-600 hover:underline "
                    >
                      Forgot password?
                    </a>
                  </div> */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Sign in
                  </button>
                  <p className="text-sm font-light text-gray-500 ">
                    Don’t have an account yet?{" "}
                    <Link
                      href="/signup"
                      className="font-medium text-primary-600 hover:underline "
                    >
                      Sign up
                    </Link>
                  </p>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
