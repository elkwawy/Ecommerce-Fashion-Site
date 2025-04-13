import { default as React, Suspense, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
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

import AllProducts from "./Pages/Products/AllProducts";

import { HelmetProvider } from "react-helmet-async";

import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/wishlist/Wishlist";
import ScrollToTop from "./components/helpers/ScrollToTop";

const Home = React.lazy(() => import("./Pages/home/Home"));
const ContactUs = React.lazy(() => import("./Pages/contactUs/ContactUs"));
const Checkout = React.lazy(() => import("./Pages/Checkout/Checkout"));
const Payment = React.lazy(() => import("./Pages/Payment/Payment"));
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


  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
        <Route path="/product/:subcatId/:productId" element={<ProductPage />} />
        <Route path="/products" element={<AllProducts />} />
      </Routes>
    ),
    []
  );

  return (
    <div className="App">
      <HelmetProvider>
      <Toaster />
        <Navbar />
      <Suspense
        fallback={
          <div className="flex h-screen justify-center w-full items-center">
            <LoadingSpinner />
          </div>
        }
      >
        {RoutesMemoized}
      </Suspense>
      {showPopup && <Popup closePopup={closePopup} />}
      <Footer />
      </HelmetProvider>
      <ScrollToTop />
    </div>
  );
}

export default App;
