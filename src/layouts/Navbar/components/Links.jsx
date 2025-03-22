// import { CiHeart } from "react-icons/ci";
// import { GoPerson } from "react-icons/go";
// import { MdClose } from "react-icons/md";
// import { PiShoppingCart } from "react-icons/pi";
// import { VscMenu } from "react-icons/vsc";
// import { NavLink, useNavigate } from "react-router-dom";
// import Logo from "../../../assets/icons/logo.png";
// import ForgetPass from "../../../Auth/ForgetPass/ForgetPass";
// import Login from "../../../Auth/login/Login";
// import ResetCode from "../../../Auth/ResetCode/ResetCode";
// import Signin from "../../../Auth/signin/Signin";
// import { handleLogout } from "../../../Redux Toolkit/slices/auth";
// import { memo, useEffect, useRef } from "react";
// import useVisible from "../../../Auth/utils/usevisable";
// import { showToast } from "../../../utilities/showToast";
// import { useDispatch } from "react-redux";

// const Links = memo(({isAuth, showCategory, toggleShowCategory, toggleShowPhoneMenu}) => {
//     const [showModel, setShowModel] = useVisible();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const categoryBtnRef = useRef(null);
//     useEffect(() => {
//         const handleClick = (event) => {
//         if (
//             categoryBtnRef.current &&
//             !categoryBtnRef.current.contains(event.target) &&
//             categoryDivRef.current &&
//             !categoryDivRef.current.contains(event.target)
//         ) {
//             setShowCategory(false);
//         } else if (
//             categoryBtnRef.current &&
//             categoryBtnRef.current.target === event.target
//         ) {
//             setShowCategory((prevState) => !prevState);
//         }
//         };

//         document.body.addEventListener("click", handleClick);
//         return () => {
//         document.body.removeEventListener("click", handleClick);
//         };
//     }, [categoryBtnRef]);
//     const handelNavigateProfile = () => {
//         if (isAuth) {
//             navigate("/profile");
//         } else {
//             showToast("error", "please login first");
//         }
//     };
//     return (
//         <>
//             <NavLink
//             to={"/"}
//             className="text-2xl cursor-pointer font-bold relative"
//         >
//             <img src={Logo} className="w-[60px]" alt="" />
//         </NavLink>

//         <ul className="gap-6 hidden items-center md:flex">
//             <NavLink
//             to={"/"}
//             className={({ isActive }) =>
//                 ` ${
//                 isActive && !showCategory
//                     ? "font-bold"
//                     : "font-normal text-gray-700 hover:text-black"
//                 } trans  `
//             }
//             >
//             Home
//             </NavLink>
            
//             <button
//                 ref={categoryBtnRef}
//                 onClick={toggleShowCategory}
//                 className={` ${
//                     showCategory 
//                     ? "font-bold"
//                     : "font-normal text-gray-700 hover:text-black"
//                 } trans outline-0`}
//             >
//                 Category
//             </button>
            
//             <NavLink
//             to={"/aboutUs"}
//             className={({ isActive }) =>
//                 ` ${
//                 isActive && !showCategory
//                     ? "font-bold"
//                     : "font-normal text-gray-700 hover:text-black"
//                 } trans  `
//             }
//             >
//             About Us
//             </NavLink>
            
//             <NavLink
//             to={"/contactUs"}
//             className={({ isActive }) =>
//                 ` ${
//                 isActive && !showCategory
//                     ? "font-bold"
//                     : "font-normal text-gray-700 hover:text-black"
//                 } trans  `
//             }
//             >
//             Contact Us
//             </NavLink>

//         </ul>

//         <ul className="gap-6 hidden items-center sm:flex">
//             <NavLink to={"/cart"}>
//             {" "}
//             <PiShoppingCart size={22} className="cursor-pointer" />
//             </NavLink>

//             <NavLink
//             to={"/wishlist"}
//             className={({ isActive }) =>
//                 ` ${
//                 isActive && !showCategory
//                     ? "font-bold"
//                     : "font-normal text-gray-700 hover:text-black"
//                 } trans  `
//             }
//             >
//             <CiHeart size={22} className="cursor-pointer" />
//             </NavLink>

//             <div onClick={handelNavigateProfile} title="profile">
//                 <GoPerson size={22} className="cursor-pointer" />
//             </div>

//             {isAuth ? (
//             <button
//                 className="bg-gray-100 rounded-xl shadow-xl cursor-pointer px-3 py-2"
//                 onClick={() => {
//                 dispatch(handleLogout());
//                 }}
//             >
//                 Logout
//             </button>
//             ) : (
//             <button
//                 className=" border border-black trans hover:bg-gray-200 cursor-pointer px-3 py-1"
//                 onClick={() => setShowModel("login")}
//             >
//                 Login
//             </button>
//             )}
//             {showModel === "login" ? (
//             <Login setShowModel={setShowModel} />
//             ) : null}
//             {showModel === "signup" && <Signin setShowModel={setShowModel} />}
//             {showModel === "forgetPass" && (
//             <ForgetPass setShowModel={setShowModel} />
//             )}
//             {showModel === "resetcode" && (
//             <ResetCode setShowModel={setShowModel} />
//             )}
//         </ul>

//             <div className="flex gap-6 items-center md:hidden">
//                 {!shownMenuMark && (
//                     <button onClick={toggleShowPhoneMenu}>
//                         <VscMenu
//                         size={22}
//                         className={`cursor-pointer trans ${
//                             showPhoneMenu ? "rotate-180 duration-700" : "rotate-0"
//                         }`}
//                         />
//                     </button>
//                 )}
//                 {shownMenuMark && (
//                     <button onClick={toggleShowPhoneMenu}>
//                         <MdClose
//                         size={22}
//                         className={`cursor-pointer trans ${
//                             showPhoneMenu ? "rotate-0" : "-rotate-180 duration-700"
//                         }`}
//                         />
//                     </button>
//                 )}
//             </div>
//         </>
//     )
// })

// export default Links