import axios from 'axios';
import {  Form, Formik,useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import * as yup from 'yup'
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";

export default function ForgetPass({setShowModel}) {
    const [errorMsg,seterrorMsg]= useState(null)
  

     const validationSchema = yup.object({
        email: yup.string().email("write your valid email").required("email is required"),
     })
    
    async function getforgetPsaa(values){
        let id;
         try{
      let options = {
        url:'https://ecommerce-dot-code.vercel.app/api/auth/forgotPassword',
        method:'Post',
        data:{
            email:values.email
        }
      }
      id= toast.loading("waiting...")
      const {data} = await axios.request(options)
      console.log(data);
      toast.dismiss(id)
      toast.success('Reset code sent to email')
     setTimeout(() => {
       
      setShowModel("resetcode")

       
     },3000);


         }catch(error){
            toast.dismiss(id)
            console.log(error);
            seterrorMsg(error.response.data.message)
         }
    }

const formik = useFormik({
    initialValues:{
      email:"",
    },
    validationSchema,
    onSubmit:getforgetPsaa,
  })
  
    return<>
   <section className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-[500] min-h-screen text-center'>
    <Formik
                       initialValues={{ email: "" }}
                       validationSchema={validationSchema}
                       onSubmit={(values, { resetForm }) => {
                        getforgetPsaa(values) 
                         
                     }}
                     >
                       {({ handleChange, handleBlur, values, errors, touched }) => (
                           <Form  className='mt-8 w-[90%] max-[350px]:w-[95%] max-[350px]:top-[48%] md:w-[70%] lg:w-[50%] xl:w-[50%] 2xl:w-[40%] max-[425px]:my-10 bg-white absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
   <h3 className='text-2xl font-bold '>Forget Password</h3>
   
   <div className='my-4'>
   <InputForm 
                labelName="email"
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
 
   <ButtonForm type='submit'  className='bg-black text-white py-2 px-4 w-full mb-4 rounded'>Send</ButtonForm>
   <div className=' absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full w-fit hover:bg-gray-100 hover:text-black hover:shadow-lg transition-all  duration-300' onClick={() => setShowModel(null)}>
   <HiOutlineXMark className='text-2xl font-bold cursor-pointer'/>
   </div>
    </Form>
              )}
                   </Formik>
   
  </section>
  
    </>
}
