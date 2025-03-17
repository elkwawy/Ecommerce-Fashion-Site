import { Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import * as yup from "yup";
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";
import PasswordForm from "../../components/helpers/PasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../Redux Toolkit/slices/auth";
import { useNavigate } from "react-router-dom";

export default function Login({ setShowModel }) {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowModel(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModel]);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("write avalid email")
      .required("email is required"),
    password: yup
      .string()
      .required("password is required")
      .matches(/^(?=.*[A-Z]).{8,}$/, "Min 8 chars, with capital letter"),
  });

  return (
    <>
      <section className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-[66] min-h-screen text-center ">
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(handleLogin(values))
              .unwrap()
              .then(() => {
                navigate("/");
                setShowModel(null);
              })
          }}
        >
          {({ handleChange, handleBlur, values, errors, touched }) => (
            <Form ref={formRef} className="auth-form">
              <h3 className="text-2xl font-bold ">Login to Account</h3>
              <p className="my-4">Please enter your email and password</p>
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
              <div
                className="md:flex justify-between mb-4 ml-auto w-fit"
                onClick={() => setShowModel("forgetPass")}
              >
                <div className="text-sm cursor-pointer mt-2">
                  Forget password?
                </div>
              </div>
              <div>
                <ButtonForm
                  type="submit"
                  loading={loading}
                  className="  my-2 w-full "
                >
                  Log in
                </ButtonForm>

                <div>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="underline  hover:text-black  transition-all duration-300 text-gray-600 inline-block "
                    onClick={() => setShowModel("signup")}
                  >
                    Create account
                  </button>
                </div>
              </div>
              <div className="close-btn">
                <HiOutlineXMark
                  className="text-2xl font-bold cursor-pointer  "
                  onClick={() => setShowModel(null)}
                />
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </>
  );
}
