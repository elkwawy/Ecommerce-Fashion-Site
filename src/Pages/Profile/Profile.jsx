import React from "react";
import Cookies from "js-cookie";
import { FaPenToSquare } from "react-icons/fa6";
import InputForm from "../../components/helpers/InputForm";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import ButtonForm from "../../components/helpers/ButtonForm";
import { showToast } from "../../utilities/showToast";
import OrderSummary from "./OrderSummary";
import { updateProfile } from "../../Redux Toolkit/slices/profileSlice";

const userCookie = Cookies.get("user");
const user = userCookie ? JSON.parse(userCookie) : null;

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().min(3, "Too short").required("Name is required"),
});

export default function Profile() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile) || {};
 
 

  return (
    <div className="container py-6 mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Profile</h1>
      <div className="">
        <Helmet>
          <title>My Profile</title>
          <meta name="description" content="This is the profile page" />
        </Helmet>
        <ProfileForm user={user} loading={loading} dispatch={dispatch} />
        <OrderSummary />
        
      </div>
    </div>
  );
}


function ProfileForm({ user, loading, dispatch }) {
  return (
    <div className="">
      <Formik
        initialValues={{
          email: user?.email || "",
          name: user?.name || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await dispatch(updateProfile(values)).unwrap();
            Cookies.set("user", JSON.stringify({ ...user, ...values }));
            showToast("success", "Profile updated successfully");
          } catch (error) {
            setErrors({ submit: error.message || "Failed to update profile" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form className="border border-gray-300 p-4 rounded-lg space-y-4 bg-white shadow-lg">
            <ProfileAvatar />
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
            <ButtonForm type="submit" loading={loading}>
              <FaPenToSquare className="mr-2" />
              Update Profile
            </ButtonForm>
          </Form>
        )}
      </Formik>
    </div>
  );
}

function ProfileAvatar() {
  return (
    <div className="flex flex-col md:flex-row gap-2 items-center justify-between mb-4">
      <div className="relative w-14 h-14 m-auto">
        <img src="/profile-user.png" alt="User Avatar" className="w-full rounded-full" />
        <FaPenToSquare
          className="absolute cursor-pointer top-[60%] left-8 text-xl text-blue-600 hover:text-blue-500 transition-all duration-200"
          aria-label="Edit Avatar"
        />
      </div>
    </div>
  );
}


