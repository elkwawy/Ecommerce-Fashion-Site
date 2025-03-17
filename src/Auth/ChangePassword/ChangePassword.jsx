import axios from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";
import { API } from "../../Api/Api";
import PasswordForm from "../../components/helpers/PasswordForm";
import { showToast } from "../../utilities/showToast";

export default function ResetPassword() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("write avalid email")
      .required("email is required"),
    newPassword: yup
      .string()
      .required("password is required")
      .matches(/^(?=.*[A-Z]).{8,}$/, "Min 8 chars, with capital letter"),
  });
  async function changePassword(values) {
    try {
      let options = {
        url: API.resetPassword,
        method: "PUT",
        data: {
          email: values.email,
          newPassword: values.newPassword,
        },
      };
      const { data } = await axios.request(options);
      showToast("success", "password changed successfully");
      navigate("/");
    } catch (error) {
      showToast(
        "error",
        error.response.data?.message || "problem with change password"
      );
    }
  }

  return (
    <>
      <section className="min-h-screen text-center ">
        <Formik
          initialValues={{ email: "", newPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            changePassword(values);
          }}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form className="w-[90%] md:w-[70%] lg:w-[40%] xl:w-1/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg">
              <h3 className="text-2xl font-bold ">change password</h3>

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

              <PasswordForm
                labelName="newPassword"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                PasswordLight
                name="newPassword"
                condition={touched.newPassword && !!errors.newPassword}
                errorMessage={errors.newPassword}
              />
              <ButtonForm type="submit" className="w-full">
                change password
              </ButtonForm>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
}
