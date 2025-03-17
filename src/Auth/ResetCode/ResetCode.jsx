import { Form, Formik } from 'formik';
import React from 'react'
import { HiOutlineXMark } from 'react-icons/hi2';
import * as yup from 'yup'
import InputForm from "../../components/helpers/InputForm";
import ButtonForm from "../../components/helpers/ButtonForm";
import useAuthHook from '../hooks/useAuthHook';

export default function ResetCode({setShowModel}) {
  const {resetCode,loading} = useAuthHook({setShowModel })
 const validationSchema = yup.object({
  resetCode: yup.string().required("code is required").min(6).max(6),
 })

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
                        <Form  className='auth-form'>
   <h3 className='text-2xl font-bold'>Enter Your Code</h3>
  <InputForm
    value={values.resetCode}
    onChange={handleChange}
    onBlur={handleBlur}
     type="text" 
     condition={touched.resetCode && !!errors.resetCode}
     errorMessage={errors.resetCode}
     placeholder='Enter Your code'
      name='resetCode'/>
   <ButtonForm type='submit' loading={loading}  className='bg-black text-white py-2 px-4 w-full mb-4 rounded mt-4'>Send</ButtonForm>
   <div className='close-btn' onClick={()=>{setShowModel(null)}}>
   <HiOutlineXMark className='text-2xl font-bold cursor-pointer'/>
   </div>
   </Form>
            )}
                 </Formik>
   
  </section>
   
    </>
}
