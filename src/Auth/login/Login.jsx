import axios from 'axios';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import React, {useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";



export default function Login({ setShowModel , setToken}) {
 
  const [passType, setpassType] = useState("password")
  const [errorMsg,seterrorMsg]= useState(null)
  const formRef = useRef(null)
  const navigate = useNavigate();
 
  const handelPassword =(e)=>{
    setpassType((prevType) => (prevType === "password" ? "text" : "password"));

  }
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
  }, [setShowModel])

  const validationSchema = yup.object({
        email: yup.string().email("write avalid email").required("email is required"),
        password: yup.string().required("password is required").matches(/^(?=.*[A-Z]).{8,}$/,'Min 8 chars, with capital letter'),
    })
    async function sendDataregastir(values){
      let id;
      try {
        let options = {
          url:'https://ecommerce-dot-code.vercel.app/api/auth/login',
          method:'POST',
          
          data: {
              email: values.email, 
              password: values.password 
            },
        }
      
       id = toast.loading("waiting...")
      const {data} = await axios.request(options)
    
      toast.dismiss(id)
      toast.success('User logged in successfully')
      console.log(data);
      
      const token = data.token;
      Cookies.set("token", token, { expires: 7 });
      setToken(token);
      
    setTimeout(() => {
      navigate("/")
      setShowModel(null)
    }, 2000);

    
    } catch (error) {
      toast.dismiss(id);
            toast.error(error.response.data.message)
            seterrorMsg(error.response || "An unexpected error occurred")

    }
  }
  return (<>
    
        <section className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-[66] min-h-screen text-center '>
             <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                      sendDataregastir(values); 
                      
                  }}
                  >
                    {({ handleChange, handleBlur, values, errors, touched }) => (
                        <Form ref={formRef} className='mt-8 w-[90%] max-[350px]:w-[95%] max-[350px]:top-[48%] md:w-[70%] lg:w-[50%] xl:w-[50%] 2xl:w-[40%] max-[425px]:my-10 bg-white absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
                <h3 className='text-2xl font-bold '>Login to Account</h3>
                <p className='my-4'>Please enter your email and password</p>
                <div className='my-4'>
               
                    <InputForm 
                    labelName="Email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
               type="email" 
               name='email' 
               placeholder='Enter Your Email' 
               condition={touched.email && !!errors.email}
               errorMessage={errors.email}
               className='w-full border-2 p-2 rounded focus:border-black focus:border-1' />
                  
                </div>
                <div className='mb-2 relative'>
                 
                  <div className='relative'>
                  <InputForm
                  labelName="password"
               value={values.password}
              onChange={handleChange}
              onBlur={handleBlur} 
              type={passType} 
              name='password'
              condition={touched.password && !!errors.password}
               placeholder='Password..' 
               errorMessage={errors.password}
               className='w-full border-2 p-2 rounded focus:border-black focus:border-1' />
                    
                    <button type="button" onClick={handelPassword} className='absolute top-[70%] right-2 -translate-y-1/2'>
                      {passType === "password" ? <FaEye className='text-gray-500' /> : <FaEyeSlash  className='text-gray-500'/>}
                    </button>
                  </div>
                </div>
                <div className='md:flex justify-between mb-4 ml-auto w-fit' onClick={() =>setShowModel("forgetPass")}>
                    <div className='text-sm cursor-pointer mt-2' >Forget password?</div>
                </div>
                <div>
                    <ButtonForm type='submit' className='bg-black text-white py-2 px-4 w-full mb-4 rounded'>Log in</ButtonForm>
                    <div>Don’t have an account? <button type='button' className='underline  hover:text-black  transition-all duration-300 text-gray-600 inline-block ' onClick={() => setShowModel("signup")} 
                    >Create account</button></div>
                </div>
               

               <div className='absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full w-fit hover:bg-gray-100 hover:text-black hover:shadow-lg transition-all  duration-300' >
                <HiOutlineXMark className='text-2xl font-bold cursor-pointer  ' onClick={() => setShowModel(null)}/>
                </div>
                        </Form>
            )}
                 </Formik>
        </section>
    


</>
  )
}
