import { Formik, Form } from "formik";
import * as Yup from "yup";
import contactUsHook from "../contactUsHook";
import InputForm from "../../../components/helpers/InputForm";
import ButtonForm from "../../../components/helpers/ButtonForm";
import { FiSend } from "react-icons/fi";
import PasswordForm from "../../../components/helpers/PasswordForm";
const SendQuestion = () => {
  const { loading, sendMessage } = contactUsHook();


  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Send Your Question</h2>
      <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          sendMessage(values).then(() => {
            resetForm(); // تفريغ الحقول بعد الإرسال الناجح
          });
        }}
      >
        {({ handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <InputForm
              labelName="Your Name"
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Name"
              condition={touched.name && !!errors.name}
              errorMessage={errors.name}
            />

            <InputForm
              labelName="Email"
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Email"
              condition={touched.email && !!errors.email}
              errorMessage={errors.email}
            />

            <InputForm
              labelName="Message"
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Your Message"
              condition={touched.message && !!errors.message}
              errorMessage={errors.message}
              istextarea={true}
            />
            <PasswordForm
              labelName="Password"
              name="password"
              value={values.password}
              onChange={handleChange} 
              onBlur={handleBlur}
              condition={touched.password && !!errors.password}
              errorMessage={errors.password}
              PasswordLight={values.password.length}
            />

            <ButtonForm loading={!loading}>
              send <FiSend size={15} className="ml-1 mt-0.5" />
            </ButtonForm>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SendQuestion;
