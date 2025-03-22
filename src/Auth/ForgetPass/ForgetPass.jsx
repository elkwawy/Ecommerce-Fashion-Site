import { Form, Formik } from "formik";
import React from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import * as yup from "yup";
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";
import useAuthHook from "../hooks/useAuthHook";

export default function ForgetPass({ setShowModel, setToken }) {
  const { handelforgetPass, loading } = useAuthHook({ setShowModel, setToken });
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Write your valid email")
      .required("Email is required"),
  });

  return (
    <section
      className="fixed p-10 top-0 left-0 bottom-0 right-0 bg-black/50 z-[500] min-h-screen text-center"
      onClick={() => setShowModel(null)}
    >
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          handelforgetPass(values);
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form className="auth-form" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-2xl font-bold ">Forget Password</h3>
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
            <ButtonForm
              type="submit"
              loading={loading}
              className="bg-black text-white py-2 px-4 w-full mb-4 rounded"
            >
              Send
            </ButtonForm>
            <div
              className="close-btn top-10 cursor-pointer"
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
