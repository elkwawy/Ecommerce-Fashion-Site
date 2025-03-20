import React from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import * as yup from "yup";
import { Form, Formik } from "formik";
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";
import PasswordForm from "../../components/helpers/PasswordForm";
import useAuthHook from "../hooks/useAuthHook";

export default function Signin({ setShowModel }) {
  const { handelSignuP, loading } = useAuthHook({ setShowModel });
  const validationSchema = yup.object({
    name: yup
      .string()
      .required("Name is required")
      .min(3, "Min name mast be 3 letters")
      .max(15, "Max name mast be 15 letter"),
    email: yup
      .string()
      .email("Write avalid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Min password mast be 8 letters"),
    // .matches(/^(?=.*[A-Z]).{8,}$/, "Min 8 chars,with capital letter"),
    passwordConfirm: yup
      .string()
      .required("Repassword is required")
      .oneOf([yup.ref("password")], "Passwords must match"),
  });

  return (
    <section
      className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-[66] min-h-screen text-center"
      onClick={() => setShowModel(null)}
    >
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirm: "",
          role: "user",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          handelSignuP(values);
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form className="auth-form" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold ">Create an Account</h3>
            <p className="my-2 text-sm">Create a account to continue</p>

            <InputForm
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              type="text"
              placeholder="Enter Your Name"
              name="name"
              condition={touched.name && !!errors.name}
              errorMessage={errors.name}
              labelName="Name"
            />
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
              labelName="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              PasswordLight
              name="password"
              condition={touched.password && !!errors.password}
              errorMessage={errors.password}
            />
            <PasswordForm
              labelName="confirm Password"
              value={values.passwordConfirm}
              onChange={handleChange}
              onBlur={handleBlur}
              PasswordLight
              name="passwordConfirm"
              condition={touched.passwordConfirm && !!errors.passwordConfirm}
              errorMessage={errors.passwordConfirm}
            />
            <div className="">
              <ButtonForm
                type="submit"
                loading={loading}
                className="bg-black text-white py-2 px-4 w-full mb-4 mt-2 rounded"
              >
                sign up
              </ButtonForm>

              <div>
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline trans text-gray-500 hover:text-black"
                  onClick={() => setShowModel("login")}
                >
                  Login
                </button>
              </div>
            </div>
            <div
              className="close-btn cursor-pointer"
              onClick={() => setShowModel(null)}
            >
              <HiOutlineXMark className="text-2xl font-bold" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}
