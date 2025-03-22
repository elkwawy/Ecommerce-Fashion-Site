import React from "react";
import Cookies from "js-cookie";
import { FaPenToSquare } from "react-icons/fa6";
import InputForm from "../../components/helpers/InputForm";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";

export default function Profile() {
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    name: Yup.string().min(3, "Too short").required("Name is required"),
  });

  return (
    <div className="flex items-center justify-center container py-6 mx-auto">
      <Helmet>
        <title>Profile</title>
        <meta name="description" content="This is the profile page" />
      </Helmet>

      <div className="flex-1 hidden md:flex ">
        <img src="/update1.svg" alt="Update Profile" className="w-full" />
      </div>
      <div className="flex-2 md:w-[60%] w-[80%]">
        <Formik
          initialValues={{
            email: user?.email || "",
            name: user?.name || "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log("Updated Values:", values);
          }}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form className="space-y-4 bg-white shadow-lg p-6 rounded-lg">
              <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-4">
                <div className="relative w-14 h-14 m-auto">
                  <img
                    src="/useravatar.jpg"
                    alt="User Avatar"
                    className="w-full rounded-full "
                  />
                  <FaPenToSquare
                    className="absolute cursor-pointer top-[60%] left-8 text-xl text-gray-600 hover:text-blue-500 transtion-all duration-200"
                    aria-label="Edit Avatar"
                  />
                </div>
              </div>
              <InputForm
                labelName="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                type="email"
                name="email"
                placeholder="Enter Your Email"
                condition={touched.email && !!errors.email}
                errorMessage={errors.email}
              />

              <InputForm
                labelName="Name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                name="name"
                placeholder="Enter Your Name"
                condition={touched.name && !!errors.name}
                errorMessage={errors.name}
              />

              <button
                type="submit"
                className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg transition hover:bg-blue-600"
              >
                <FaPenToSquare className="mr-2" />
                Update Profile
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
