"use client"
import React from "react";
import { ConfirmPasswordFormValues } from "../../types/formTypes";
import { Field, Form, Formik } from "formik";
import { ConfirmPasswordFormSchema } from "../../utils/validationSchema";
import axios from "axios";
import { base_url } from "../../utils/config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function page({ params }: { params: { slug: string } }) {

  
  const initialValues: ConfirmPasswordFormValues = {
    email : decodeURIComponent(params.slug),
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: ConfirmPasswordFormValues) => {
    try {
      const response = await axios.put(`${base_url}user/forgetPassword/`, values);
      console.log('Response:', response.data);
      // redrict ro signin page 
      toast.success(`Password reset successfully`, {
        position: "top-center",
      });

      // setTimeout(() => {
      //   window.location.href = "/signin";
      // }, 3000);
      window.location.href = "/signin";
    } catch (error) {
      // console.error('Error:', error);
      toast.error(`Please try again`, {
        position: "top-center",
      });
    }
  };
  return (
    <section className="bg-gray-50 bgImgSignin">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Sign in to your account
              <div>My Post: {decodeURIComponent(params.slug)}</div>
            </h1>
            <Formik
              className="space-y-4 md:space-y-6"
              initialValues={initialValues}
              validationSchema={ConfirmPasswordFormSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <Field
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      type="password"
                      id="password"
                      name="password"
                      required
                    />
                    {touched.password && errors.password && (
                      <div>{errors.password}</div>
                    )}
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Confirm Password
                    </label>
                    <Field
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      required
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <div>{errors.confirmPassword}</div>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-lg"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
}
