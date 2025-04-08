import { Form, Formik } from "formik";
import React, { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import * as yup from "yup";
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";
import PasswordForm from "../../components/helpers/PasswordForm";
import { useDispatch, useSelector } from "react-redux";
import { handleLogin } from "../../Redux Toolkit/slices/auth";
import { useNavigate } from "react-router-dom";
import { getUserWhishList } from "../../Redux Toolkit/slices/WishlistSlice";
import { getUserCart } from "../../Redux Toolkit/slices/cartSlice";

export default function Login({ setShowModel }) {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("")

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Write avalid email")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Min password mast be 8 letters"),
    // .matches(/^(?=.*[A-Z]).{8,}$/, "Min 8 chars, with capital letter"),
  });

  return (
    <section
      className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-[66] min-h-screen text-center "
      onClick={() => setShowModel(null)}
    >
      <div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            setError(""); 
            await dispatch(handleLogin(values)).unwrap();
            dispatch(getUserWhishList());
            dispatch(getUserCart());
            navigate("/");
            setShowModel(null);
          } catch (err) {
            setError(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form className="auth-form" onClick={(e) => e.stopPropagation()}>
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
              labelName="Password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              PasswordLight
              name="password"
              condition={touched.password && !!errors.password}
              errorMessage={errors.password}
            />
            <div className="flex justify-between items-center">
            {error && (
              <div className= "bg-red-200 w-fit  rounded px-2 text-red-500 text-sm mb-2">{error}</div>
            )}
            <div
              className="md:flex justify-between mb-4 ml-auto w-fit"
              onClick={() => setShowModel("forgetPass")}
            >
              <div className="text-sm cursor-pointer mt-2 trans text-gray-500  hover:text-black">
                Forget password?
              </div>
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
                  className="underline trans text-gray-500 hover:text-black  transition-all duration-300  inline-block "
                  onClick={() => setShowModel("signup")}
                >
                  Create account
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
      </div>
    </section>
  );
}
