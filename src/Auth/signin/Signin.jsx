import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineXMark } from "react-icons/hi2";
import * as yup from 'yup'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Form, Formik,useFormik } from 'formik';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";


export default function Signin({ setShowModel }) {
    const [errorMsg,seterrorMsg] = useState(null)
   const [passType, setpassType] = useState("password")
   const [confirmPasswordType, setConfirmPasswordType] = useState("password");
   const formRef = useRef(null)
    
     const handelPassword =(e)=>{
      setpassType((prevType) => (prevType === "password" ? "text" : "password"));

     }
     const toggleConfirmPasswordVisibility = () => {
      setConfirmPasswordType((prevType) => (prevType === "password" ? "text" : "password"));
    };
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

    const validationSchema =  yup.object({
      name: yup.string().required("name is required").min(3,'min name mast be 3 letters').max(15,'max name mast be 15 letter'),
        email: yup.string().email("write avalid email").required("email is required"),
        password: yup.string().required("password is required").matches(/^(?=.*[A-Z]).{8,}$/,'Min 8 chars,with capital letter'),
        passwordConfirm: yup.string().required("repassword is required").oneOf([yup.ref("password")],"Passwords must match")
    })

  async function sendDataTORegister(values) {
    let id;


    try {
      const options = {
        url:'https://ecommerce-dot-code.vercel.app/api/auth/signup',
        method:'POST',
        data:values
      }
  
    id = toast.loading("waiting...")
    const {data} = await axios.request(options)
    toast.dismiss(id)
    console.log(data);
    
    toast.success("user created successfully")
    console.log(data);
    
  
    setTimeout(()=>{
      if(data.token){
       setShowModel("login")
       }
  },3000)

     }catch(error){
      toast.dismiss(id)
       seterrorMsg(error.response.data.errors[0].msg);
     }
    }
  


    
  return <>
 <section className='fixed  top-0 left-0 bottom-0 right-0 bg-black/50 z-[66] min-h-screen text-center'>
 <Formik
                    initialValues={{ name: "", email: "", password: "", passwordConfirm: "", role: "user", }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { resetForm }) => {
                      sendDataTORegister(values); 
                      
                  }}
                  >
                    {({ handleChange, handleBlur, values, errors, touched }) => (
                        <Form ref={formRef} className='mt-8 w-[90%] max-[350px]:w-[95%] max-[350px]:top-[48%] md:w-[70%] lg:w-[50%] xl:w-[50%] 2xl:w-[40%] max-[425px]:my-10 bg-white absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
 <h3 className='text-2xl font-bold '>Create an Account</h3>
 <p className='my-2 text-sm'>Create a account to continue</p>
 <div className='my-4'>
 
<InputForm   value={values.name}
              onChange={handleChange}
              onBlur={handleBlur} 
              type="text" placeholder='Enter Your Name'
               name='name' 
               condition={touched.name && !!errors.name}
               errorMessage={errors.name}
               labelName="Name"
               className='w-full border-2 p-2 rounded focus:border-black focus:border-1'/>


</div>
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
 <div className='mb-2 mt-4 '>


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
<div className='my-2'>
</div>

 <div className='mb-2 mt-4 relative'>
 
 <div className='relative'>
 <InputForm  value={values.passwordConfirm }
              onChange={handleChange}
              onBlur={handleBlur} 
               type={confirmPasswordType} 
               placeholder='Rewrite the password'
                name='passwordConfirm'
                condition={touched.passwordConfirm && !!errors.passwordConfirm}
                errorMessage={errors.passwordConfirm}
                labelName="Rewrite the password"
                 className='w-full border-2 p-2 rounded focus:border-black focus:border-1' />
 <button type="button" onClick={toggleConfirmPasswordVisibility} className='absolute top-[70%] right-2  -translate-y-1/2'>
        {confirmPasswordType === "password" ? <FaEye className='text-gray-500'/> : <FaEyeSlash  className='text-gray-500'/>}
      </button>
 </div>
 </div>
 
  
 <div className=''>

 <ButtonForm type='submit'  className='bg-black text-white py-2 px-4 w-full mb-4 mt-2 rounded'>sign up</ButtonForm>
 
 <div>Already have an account? <button type='button' className='underline  text-gray-600 inline-block  hover:text-black transition-all duration-300'  onClick={() => setShowModel('login')} >Login</button></div>
 </div>
 <div className=' absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full w-fit hover:bg-gray-100 hover:text-black hover:shadow-lg transition-all  duration-300' >
 <HiOutlineXMark className='text-2xl font-bold cursor-pointer' onClick={() => setShowModel(null)}/>
 </div>
 </Form>
            )}
                 </Formik>
 
</section>





 
  </>
}






