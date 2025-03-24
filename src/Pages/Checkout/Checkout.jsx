import Order from "./components/Order";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PaymentMethod from "./components/PaymentMethod";
import ShippingAddress from "./components/ShippingAddress";
import NavigationBar from "./components/NavigationBar";
import { useDispatch, useSelector } from "react-redux";
import {
  createCashOrder,
  createInstantPayment,
} from "../../Redux Toolkit/slices/orderSlice";
import LoaderW from "../../utilities/LoaderW";
import { showToast } from "../../utilities/showToast";
import { useEffect, useState } from "react";
function Checkout() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, totalCartPrice, cartId } = location?.state ?? {};

  const { order, statusOrder, error } = useSelector((state) => state.order);

  // console.log(order);

  // const [urlSitePayment, setUrlSitePayment] = useState("");

  // useEffect(() => {
  //   if (order && order.url) {
  //     setUrlSitePayment(order.url);
  //   }
  // }, [order]);

  // console.log(urlSitePayment);

  const validationSchema = Yup.object({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    phone: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .min(10, "Phone number must be at least 10 digits")
      .required("Phone number is required"),
    paymentMethod: Yup.string().required("Please select a payment method"),
  });

  const initialValues = {
    address: "",
    city: "",
    phone: "",
    paymentMethod: "",
  };

  const handleSubmit = (values) => {
    const orderData = {
      shippingAddress: {
        address: values.address,
        city: values.city,
        phone: values.phone,
      },
    };

    if (values.paymentMethod === "cashOrder") {
      dispatch(createCashOrder({ cartId, orderData }))
        .unwrap()
        .then(() => {
          navigate("/profile");
        });
    } else if (values.paymentMethod === "instantPayment") {
      dispatch(createInstantPayment({ cartId, orderData }))
        .unwrap()
        .then(() => {
        

          
          // const order = JSON.parse(localStorage.getItem("order"));
          console.log(order);
          // setTimeout(() => {
          //   window.location.href = order.url;
          // }, 3000);

          // window.location.href = order.url;
        });
    }

    console.log("Submitted Data:", values);
  };

  return (
    <section className="bg-white py-8 antialiased md:py-16">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm }) => (
          <Form className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            {/* Navigation Bar*/}
            <NavigationBar />

            <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
              <div className="min-w-0 flex-1 space-y-8">
                {/* Shipping Address*/}
                <ShippingAddress Field={Field} ErrorMessage={ErrorMessage} />
                {/* Payment Method */}
                <PaymentMethod Field={Field} ErrorMessage={ErrorMessage} />
              </div>

              <div class="border border-gray-300 p-4 rounded-lg mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-md xl:max-w-md">
                <h2 class="text-xl font-semibold text-gray-900">Your Order</h2>
                {products.map((product) => (
                  <Order product={product} />
                ))}

                <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-6 mt-6 ">
                  <dt class="text-base font-bold text-gray-900 ">
                    Total Price
                  </dt>
                  <dd class="text-base font-bold text-gray-900 ">
                    ${totalCartPrice}
                  </dd>
                </dl>

                <button
                  type="submit"
                  onClick={submitForm}
                  disabled={statusOrder === "loading"}
                  className="flex w-4/5 mx-auto items-center justify-center rounded-lg bg-gray-900 px-5 py-4 text-sm font-medium trans text-white hover:bg-gray-800"
                >
                  {statusOrder === "loading" ? (
                    <LoaderW className="w-5 h-5" />
                  ) : (
                    "Continue to payment"
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Checkout;
