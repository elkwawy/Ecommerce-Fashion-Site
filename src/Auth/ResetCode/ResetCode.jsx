import axios from 'axios';
import { Form, Formik ,useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";

export default function ResetCode({setShowModel}) {
    const [errorMsg,seterrorMsg]= useState(null)
    const navigate = useNavigate()

 const validationSchema = yup.object({
  resetCode: yup.string().required("code is required").min(6).max(6),
 })

async function resetCode(values){
    let id;
     try{
  let options = {
    url:'https://ecommerce-dot-code.vercel.app/api/auth/verifyResetCode',
    method:'Post',
    data:{
      resetCode:values.resetCode
    }
  }

  id= toast.loading("waiting...") 

  const {data} = await axios.request(options)
  console.log(data);
  toast.dismiss(id)
  toast.success('password reset successful')
  navigate("/resetpassword")
  

     }catch(error){
        toast.dismiss(id)
        console.log(error);
        seterrorMsg(error.response.data.message)
     }
}
  
    return<>
 
   <section className='fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-10 min-h-screen text-center'>
   <Formik
                    initialValues={{ resetCode:"" }}
                    validationSchema={validationSchema }
                    onSubmit={(values, { resetForm }) => {
                      resetCode(values) 
                      
                  }}
                  >
                    {({ handleChange, handleBlur, values, errors, touched }) => (
                        <Form  className='mt-8 w-[90%] max-[350px]:w-[95%] max-[350px]:top-[48%] md:w-[70%] lg:w-[50%] xl:w-[50%] 2xl:w-[40%] max-[425px]:my-10 bg-white absolute  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
   <h3 className='text-2xl font-bold '>Enter Your Code</h3>
   
   <div className='mt-4'>
  <InputForm
   
    value={values.resetCode}
    onChange={handleChange}
    onBlur={handleBlur}
     type="text" 
     condition={touched.resetCode && !!errors.resetCode}
     errorMessage={errors.resetCode}
     placeholder='Enter Your code'
      name='resetCode'
       className='w-full border-2 p-2 rounded'/>
 

  </div>
   {errorMsg && <div className='text-red-600 my-1 font-semibold text-sm  bg-red-200 w-fit px-3 ml-auto rounded mb-2'> {errorMsg}</div>}

   <ButtonForm type='submit'  className='bg-black text-white py-2 px-4 w-full mb-4 rounded mt-4'>Send</ButtonForm>
   <div className=' absolute top-[10%] left-[90%] -translate-x-1/2 -translate-y-1/2 p-2 rounded-full w-fit hover:bg-gray-100 hover:text-black hover:shadow-lg transition-all  duration-300' onClick={()=>{setShowModel(null)}}>
   <HiOutlineXMark className='text-2xl font-bold cursor-pointer'/>
   </div>
   </Form>
            )}
                 </Formik>
   
  </section>
   
    </>
}
