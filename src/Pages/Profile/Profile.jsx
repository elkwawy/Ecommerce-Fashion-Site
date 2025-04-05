import React, { useState } from "react";
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
import { getLogedUser, updateProfile } from "../../Redux Toolkit/slices/profileSlice";
import { IoClose } from "react-icons/io5";
import { Img } from "react-image";
import CustomSkeleton from "../../utilities/CustomSkeleton";


const user = Cookies.get("user") ? JSON.parse(Cookies.get("user")) : {};
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().min(3, "Too short").required("Name is required"),
});

export default function Profile() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile) || {};
  const [showForm, setShowForm] = useState(false)
   const userData = useSelector((state) => state.profile.userData);
   console.log(userData);
   
  return (
    <div className="container py-6 mx-auto">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Profile</h1>
      <div className="space-y-4">
        <Helmet>
          <title>My Profile</title>
          <meta name="description" content="This is the profile page" />
        </Helmet>
       <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 w-full ">
       <UserDetails userData={userData} setShowForm={setShowForm} loading={loading} showForm={showForm}/>
       <ProfileForm userData={userData} loading={loading} dispatch={dispatch} showForm={showForm} setShowForm={setShowForm} />
       </div>
        <OrderSummary />
      </div>
    </div>
  );
}


function ProfileForm({ userData, loading, dispatch, showForm ,setShowForm}) {
  return (
    <div
      className={`transition-all duration-500 ease-in-out  ${
        showForm ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10 pointer-events-none"
      }`}
     
    >
      <div className="absolute top-2 text-2xl right-2 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-all  duration-300" onClick={() => setShowForm(false)}><IoClose /></div>
      <Formik
      enableReinitialize
        initialValues={{
          email: userData?.data?.email || "",
          name: userData?.data?.name || "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            await dispatch(updateProfile(values)).unwrap();
            Cookies.set("user", JSON.stringify({ ...user, ...values }));
            await dispatch(getLogedUser())
            showToast("success", "Profile updated successfully");
            setShowForm(false);
          } catch (error) {
            setErrors({ submit: error.message || "Failed to update profile" });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form className="border border-gray-300 py-6 px-4 rounded-lg space-y-4 bg-white shadow-lg">
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


function UserDetails({ userData, setShowForm ,loading ,showForm}) {
  return (
    <div className={`transition-all duration-700 ease-in-out flex flex-col gap-2 items-center justify-between absolute top-1/2 transform -translate-y-1/2 
      ${showForm ? "left-[70%]  -translate-x-0 max-[576px]:left-[45%]" : "left-1/2 -translate-x-1/2"}
    `}
    >
      <div className="space-y-1 flex flex-col gap-2 items-center">
        <div>
          <Img 
           src="/user.png" alt="" className="w-20 h-20" />
        </div>
       {loading ?
       <div>
       <p className="text-gray-600">Email: <CustomSkeleton width={"150px"} height={"10px"} /></p>
       <p className="text-gray-600">Name: <CustomSkeleton width={"100px"} height={"10px"} /></p>
      </div>
       :(
         <div>
          <p className="text-gray-600">Email: {userData?.data?.email || <CustomSkeleton width={"150px"} height={"10px"} />}</p>
          <p className="text-gray-600">Name: {userData?.data?.name || <CustomSkeleton width={"100px"} height={"10px"} />}</p>
         </div>
       )

       }
      </div>
      <ButtonForm className="" type="button" onClick={() => setShowForm(true)}>
        <FaPenToSquare className="mr-2" />
        Update information
      </ButtonForm>
    </div>
  );
}