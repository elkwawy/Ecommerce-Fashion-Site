import { default as React, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar/Navbar";
import LoadingSpinner from "./utilities/LoadingSpinner";
import Popup from "./utilities/PopUp";
import { Toaster } from "react-hot-toast";
import ChangePassword from "./Auth/ChangePassword/ChangePassword";
import "react-loading-skeleton/dist/skeleton.css";
import Category from "./Pages/Cateogries/Category";
import ProductPage from "./Pages/ProductPage/ProductPage";
import Profile from "./Pages/Profile/Profile";
import { HelmetProvider } from "react-helmet-async";

const Home = React.lazy(() => import("./Pages/home/Home"));
const ContactUs = React.lazy(() => import("./Pages/contactUs/ContactUs"));
const Cart = React.lazy(() => import("./Pages/Cart/Cart"));
const Checkout = React.lazy(() => import("./Pages/Checkout/Checkout"));
const Payment = React.lazy(() => import("./Pages/Payment/Payment"));
const Wishlist = React.lazy(() => import("./Pages/wishlist/Wishlist"));
const NotFound = React.lazy(() => import("./Pages/NotFound"));
// const Category = React.lazy(() => import("./Pages/Cateogries/Category"));
const AboutUS = React.lazy(() => import("./Pages/About US/AboutUS"));

function App() {
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      // setShowPopup(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const RoutesMemoized = React.useMemo(
    () => (
      <Routes>
        <Route path="/aboutUs" element={<AboutUS />} />
        <Route path="/" element={<Home />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/cart/checkout" element={<Checkout />} />
        <Route path="/cart/checkout/payment" element={<Payment />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        {/* subcategory route */}
        <Route path="/:categoryName/:subcategoryID" element={<Category />} />
        <Route path="/:productName" element={<ProductPage />} />
      </Routes>
    ),
    []
  );

  return (
    <div className="App">
      <HelmetProvider>
      <Toaster />
      <Suspense
        fallback={
          <div className="flex h-screen justify-center w-full items-center">
            <LoadingSpinner />
          </div>
        }
      >
        <Navbar />
        {RoutesMemoized}
        {showPopup && <Popup closePopup={closePopup} />}
        <Footer />
      </Suspense>
      </HelmetProvider>
     
    </div>
  );
}

export default App;
