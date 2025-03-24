import React, { useState } from "react";
import Cookies from "js-cookie";
import { FaPenToSquare } from "react-icons/fa6";
import InputForm from "../../components/helpers/InputForm";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../Redux Toolkit/slices/profileSlice";
import ButtonForm from "../../components/helpers/ButtonForm";
import { showToast } from "../../utilities/showToast";



export default function Profile() {
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;
 const dispatch = useDispatch()
 const { loading } = useSelector((state) => state.profile) || {}


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

      <div className="flex-2 hidden md:flex ">
      
      </div>
      <div className="flex-1 md:w-[60%] w-[80%]">
        <Formik
          initialValues={{
            email: user?.email || "",
            name: user?.name || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await dispatch(updateProfile({ 
                name: values.name, 
                email: values.email 
              })).unwrap();
              const updatedUser = { ...user, ...values };
              Cookies.set("user", JSON.stringify(updatedUser));
              showToast("success", "Profile updated successfully"); 

            } catch (error) {
              setErrors({ submit: error.message || "Failed to update profile" });

            } finally {
              setSubmitting(false);
            }
          }}
          
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form className="space-y-4 bg-white shadow-lg p-6 rounded-lg">
              <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-4">
                <div className="relative w-14 h-14 m-auto">
                  <img
                    src="/profile-user.png"
                    alt="User Avatar"
                    className="w-full rounded-full "
                  />
                  <FaPenToSquare
                    className="absolute cursor-pointer top-[60%] left-8 text-xl text-blue-600 hover:text-blue-500 transtion-all duration-200"
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
               <ButtonForm
                type="submit"
                loading={loading}
              >
                <FaPenToSquare className="mr-2" />
                Update Profile
              </ButtonForm>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}