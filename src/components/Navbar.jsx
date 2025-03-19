import { memo, useEffect, useRef, useState } from "react";
import { CiHeart } from "react-icons/ci";
import { GoPerson } from "react-icons/go";
import { IoIosSearch } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { PiShoppingCart } from "react-icons/pi";
import { VscMenu } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Login from "../Auth/login/Login";
import { fetchCategories } from "../Redux Toolkit/slices/categoriesSlice";
import { fetchAllSubcategories } from "../Redux Toolkit/slices/subcategoriesForEachCategory";
import Category from "./CategoryNav";
import PhoneMenu from "./PhoneMenu";
import Search from "./Search";
import Logo from "../assets/icons/logo.png";
import useVisible from "../Auth/utils/usevisable";
import Signin from "../Auth/signin/Signin";
import ForgetPass from "../Auth/ForgetPass/ForgetPass";
import ResetCode from "../Auth/ResetCode/ResetCode";
import { handleLogout } from "../Redux Toolkit/slices/auth";
import { showToast } from "../utilities/showToast";

const Navbar = memo(() => {
  const [showModel, setShowModel] = useVisible();

  const [showSearch, setShowSearch] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const [shownMenuMark, setShownMenuMark] = useState(false); // the mark that will be shown ( X || menu bar )
  const [isScreenSmall, setIsScreenSmall] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
 const navigate = useNavigate()
  const toggleShowSearch = () => {
    setShowSearch(!showSearch);
    setShowPhoneMenu(false);
    setShownMenuMark(false);
  };

  const categoryBtnRef = useRef(null);
  const categoryDivRef = useRef(null);

  useEffect(() => {
    const handleClick = (event) => {
      if (
        categoryBtnRef.current &&
        !categoryBtnRef.current.contains(event.target) &&
        categoryDivRef.current &&
        !categoryDivRef.current.contains(event.target)
      ) {
        setShowCategory(false);
      } else if (
        categoryBtnRef.current &&
        categoryBtnRef.current.target === event.target
      ) {
        setShowCategory((prevState) => !prevState);
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, [setShowCategory, categoryBtnRef, categoryDivRef]);

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

  const handelNvigateProfile =()=>{
    if(isAuthenticated){
      navigate("/profile")
    }else{
      showToast("error","please login first")
    }
  }

  return (
    <>
      <div className="flex sticky top-0 shadow-sm  z-[100] bg-[#F8F8F8] items-center w-full px-6 py-2 md:px-10 md:py-[20px] h-[74px] md:h-[74px] justify-between">
        {showSearch ? (
          <Search toggleShowSearch={toggleShowSearch} />
        ) : (
          <>
            <NavLink
              to={"/"}
              className="font-bold relative text-2xl cursor-pointer"
            >
              <img src={Logo} className="w-[60px]" alt="" />
            </NavLink>
            <ul className="hidden md:flex gap-6 items-center">
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
              <button
                ref={categoryBtnRef}
                onClick={toggleShowCategory}
                className={` ${
                  showCategory ||
                  (location.pathname !== "/" &&
                    location.pathname !== "/aboutUs" &&
                    location.pathname !== "/contactUs")
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

            <ul className="gap-6 items-center hidden sm:flex">
              <IoIosSearch
                onClick={toggleShowSearch}
                size={22}
                className={`cursor-pointer`}
              />

              <NavLink to={"/cart"}>
                {" "}
                <PiShoppingCart size={22} className="cursor-pointer" />
              </NavLink>

              <NavLink
                to={"/wishlist"}
                className={({ isActive }) =>
                  ` ${
                    isActive && !showCategory
                      ? "font-bold"
                      : "font-normal text-gray-700 hover:text-black"
                  } trans  `
                }
              >
                <CiHeart size={22} className="cursor-pointer" />
              </NavLink>

              <div onClick={handelNvigateProfile} title="profile">
                <GoPerson size={22} className="cursor-pointer" />
              </div>

              {isAuthenticated ? (
                <button
                  className="cursor-pointer bg-gray-100 shadow-xl py-2 px-3  rounded-xl "
                  onClick={() => {
                    dispatch(handleLogout());
                  }}
                >
                  Logout
                </button>
              ) : (
                <button
                  className="cursor-pointer bg-gray-100 shadow-xl py-2 px-3 rounded-xl "
                  onClick={() => setShowModel("login")}
                >
                  Login
                </button>
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
            <div className="flex gap-6 items-center  md:hidden">
              <IoIosSearch
                onClick={toggleShowSearch}
                size={22}
                className={`cursor-pointer sm:hidden`}
              />
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
        )}
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
