import { memo, useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { PiShoppingCart } from "react-icons/pi";
import { VscMenu } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Login from "../../Auth/login/Login";
import { fetchCategories } from "../../Redux Toolkit/slices/categoriesSlice";
import { fetchAllSubcategories } from "../../Redux Toolkit/slices/subcategoriesForEachCategory";
import Category from "./components/CategoryNav";
import PhoneMenu from "./components/phoneMenu/PhoneMenu";
import Logo from "../../assets/icons/logo.png";
import useVisible from "../../Auth/utils/usevisable";
import Signin from "../../Auth/signin/Signin";
import ForgetPass from "../../Auth/ForgetPass/ForgetPass";
import ResetCode from "../../Auth/ResetCode/ResetCode";
import DropdowenMenu from "./components/DropdowenMenu";

const Navbar = memo(() => {
  const [showModel, setShowModel] = useVisible();
  const [showCategory, setShowCategory] = useState(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const [shownMenuMark, setShownMenuMark] = useState(false); // the mark that will be shown ( X || menu bar )
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dropdownRef = useRef(null);

  const { count } = useSelector((state) => state.wishListSlice);
  const { count: countCart } = useSelector((state) => state.cart);

  const categoryBtnRef = useRef(null);
  const categoryDivRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        categoryBtnRef.current &&
        categoryDivRef.current &&
        !categoryBtnRef.current.contains(event.target) &&
        !categoryDivRef.current.contains(event.target)
      ) {
        setShowCategory(false);
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    setShowCategory(false);
  }, [location.pathname]);

  useEffect(() => {
    const checkScreenSize = () => setIsScreenSmall(window.innerWidth >= 768);
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);
    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCategories())
      .unwrap()
      .then(() => dispatch(fetchAllSubcategories()));
  }, [dispatch]);

  const { isLoading, isError } = useSelector((state) => state.wishListSlice);

  const toggleShowPhoneMenu = () => {
    setShowPhoneMenu(!showPhoneMenu);
    const timer = setTimeout(() => {
      setShownMenuMark(!shownMenuMark);
    }, 320);
    return () => clearTimeout(timer);
  };

  const toggleShowCategory = () => {
    setShowCategory(!showCategory);
  };

  useEffect(() => {
    if (showModel !== "dropdowenmenu") return;

    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setShowModel(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModel]);

  const toggleDropdown = () => {
    if (showModel === null) {
      setShowModel("dropdowenmenu");
    } else {
      setShowModel(null);
    }
  };
  return (
    <>
      <div className="flex bg-[#F8F8F8] h-[74px] justify-between shadow-sm w-full items-center md:h-[74px] md:px-10 md:py-[20px] px-6 py-2 sticky top-0 z-[100]">
        <>
          <NavLink
            to={"/"}
            className="text-2xl cursor-pointer font-bold relative"
          >
            <img src={Logo} className="w-[60px]" alt="" />
          </NavLink>
          <ul className="gap-6 hidden items-center md:flex">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                ` ${
                  isActive && !showCategory
                    ? "font-bold"
                    : "font-normal text-gray-700 hover:text-black"
                } trans  `
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                ` ${
                  isActive && !showCategory
                    ? "font-bold"
                    : "font-normal text-gray-700 hover:text-black"
                } trans  `
              }
            >
              All Products
            </NavLink>
            <button
              ref={categoryBtnRef}
              onClick={toggleShowCategory}
              className={` ${
                showCategory
                  ? "font-bold"
                  : "font-normal text-gray-700 hover:text-black"
              } trans outline-0`}
            >
              Category
            </button>
            <NavLink
              to={"/aboutUs"}
              className={({ isActive }) =>
                ` ${
                  isActive && !showCategory
                    ? "font-bold"
                    : "font-normal text-gray-700 hover:text-black"
                } trans  `
              }
            >
              About Us
            </NavLink>
            <NavLink
              to={"/contactUs"}
              className={({ isActive }) =>
                ` ${
                  isActive && !showCategory
                    ? "font-bold"
                    : "font-normal text-gray-700 hover:text-black"
                } trans  `
              }
            >
              Contact Us
            </NavLink>
          </ul>

          <ul className="gap-6 hidden items-center sm:flex">
            <NavLink
              to={"/cart"}
              className={({ isActive }) =>
                `relative ${
                  isActive && !showCategory
                    ? "font-bold"
                    : "font-normal text-gray-700 hover:text-black"
                } trans  `
              }
            >
              <PiShoppingCart size={22} className="cursor-pointer" />
              <div className="flex items-center justify-center w-4 h-4 absolute -top-1 left-3 rounded-full bg-gray-100">
                {localStorage.getItem("cart")}
              </div>
            </NavLink>

            <NavLink
              to={"/wishlist"}
              className={({ isActive }) =>
                `relative ${
                  isActive && !showCategory
                    ? "font-bold"
                    : "font-normal text-gray-700 hover:text-black"
                } trans  `
              }
            >
              <CiHeart size={22} className="cursor-pointer" />
              <div className="flex items-center justify-center w-4 h-4 absolute -top-1 left-3 rounded-full bg-gray-100">
                {localStorage.getItem("wishlist")}
              </div>
            </NavLink>

            {isAuthenticated ? (
              <div className="cursor-pointer relative" onClick={toggleDropdown}>
                <img src="/user.png" alt="user" className="w-8 h-8" />
                <div className="relative">
                  {showModel === "dropdowenmenu" && (
                    <DropdowenMenu
                      setShowModel={setShowModel}
                      dropdownRef={dropdownRef}
                    />
                  )}
                </div>
              </div>
            ) : (
              <div title="Login" onClick={() => setShowModel("login")}>
                <GoPerson size={22} className="cursor-pointer" />
              </div>
            )}

            {showModel === "login" ? (
              <Login setShowModel={setShowModel} />
            ) : null}
            {showModel === "signup" && <Signin setShowModel={setShowModel} />}
            {showModel === "forgetPass" && (
              <ForgetPass setShowModel={setShowModel} />
            )}
            {showModel === "resetcode" && (
              <ResetCode setShowModel={setShowModel} />
            )}
          </ul>
          <div className="flex gap-6 items-center md:hidden">
            {!shownMenuMark && (
              <button onClick={toggleShowPhoneMenu}>
                <VscMenu
                  size={22}
                  className={`cursor-pointer trans ${
                    showPhoneMenu ? "rotate-180 duration-700" : "rotate-0"
                  }`}
                />
              </button>
            )}
            {shownMenuMark && (
              <button onClick={toggleShowPhoneMenu}>
                <MdClose
                  size={22}
                  className={`cursor-pointer trans ${
                    showPhoneMenu ? "rotate-0" : "-rotate-180 duration-700"
                  }`}
                />
              </button>
            )}
          </div>
        </>
      </div>

      <div ref={categoryDivRef} className="hidden sm:block">
        {isScreenSmall && (
          <Category
            showCategory={showCategory}
            toggleShowCategory={toggleShowCategory}
          />
        )}
      </div>

      {!isScreenSmall && (
        <PhoneMenu
          showPhoneMenu={showPhoneMenu}
          toggleShowPhoneMenu={toggleShowPhoneMenu}
        />
      )}
    </>
  );
});
export default Navbar;
