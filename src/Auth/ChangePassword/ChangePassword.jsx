import axios from 'axios';
import { Form, Formik , useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { HiOutlineXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";

export default function ResetPassword() {
    const [errorMsg,seterrorMsg]= useState(null)
    const navigate = useNavigate()

    const validationSchema = yup.object({
        email: yup.string().email("write avalid email").required("email is required"),
        newPassword: yup.string().required("newPassword is required").matches(/^[A-Z][A-Za-z\d]{7,}$/,'Min 8 chars, starting with a capital letter'),
    })
    async function newPassword(values){
      let id;
      try {
        let options = {
          url:'https://ecommerce-dot-code.vercel.app/api/auth/resetPassword',
          method:'PUT',
          
          data: {
              email: values.email, 
              newPassword: values.newPassword 
            },
        }
      
       id= toast.loading("waiting...")
      
      const {data} = await axios.request(options)
      console.log(data);
      toast.dismiss(id)
      toast.success('password change successful')
   
      
    setTimeout(() => {
        navigate("/")
    }, 3000);

      
      } catch (error) {
        toast.dismiss(id)
             console.log(error);
             seterrorMsg(error.response.data.message)
      }
    }
    
   
  return <>
   <section className='min-h-screen text-center '>
    <Formik
                        initialValues={{ email:"",  newPassword:""}}
                        validationSchema={validationSchema }
                        onSubmit={(values, { resetForm }) => {
                          newPassword(values)
                          
                      }}
                      >
                        {({ handleChange, handleBlur, values, errors, touched }) => (
                    <Form className='w-[90%] md:w-[70%] lg:w-[40%] xl:w-1/3 bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg'>
                        <h3 className='text-2xl font-bold '>change password</h3>
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
                        <div className='mb-4'>
                            <InputForm
                            labelName="new Password"
                            value={values.newPassword}
                            onChange={handleChange}
                            onBlur={handleBlur} type="password"
                             name='newPassword' placeholder='newPassword' 
                             condition={touched.newPassword && !!errors.newPassword}
                             errorMessage={errors.newPassword}
                             className='w-full border-2 p-2 rounded' />
                           
                        </div>

                     

                      
                        <div>
                            <ButtonForm type='submit' className='bg-black text-white py-2 px-4 w-full mb-4 rounded'>change password</ButtonForm>
                        </div>
                        
                   </Form>
                               )}
                                    </Formik>
                </section>
  </>
}
