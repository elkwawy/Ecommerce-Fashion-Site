import { GoPerson } from "react-icons/go";
import { IoMdHeartEmpty } from "react-icons/io";
import { PiShoppingCart } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ForgetPass from "../../../../../Auth/ForgetPass/ForgetPass";
import Login from "../../../../../Auth/login/Login";
import ResetCode from "../../../../../Auth/ResetCode/ResetCode";
import Signin from "../../../../../Auth/signin/Signin";
import useVisible from "../../../../../Auth/utils/usevisable";
import DropdowenMenu from "../../DropdowenMenu";
import { handleLogout } from "../../../../../Redux Toolkit/slices/auth";

const PhoneFeatures = ({ closeMenu }) => {
  const [showModel, setShowModel] = useVisible();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const goToPage = (link) => {
    closeMenu();
    navigate(link);
  };

  const toggleDropdown = () => {
    if (showModel === null) {
      setShowModel("dropdowenmenu");
    } else {
      setShowModel(null);
    }
  }
    return (
        <ul className="flex gap-8 items-center sm:hidden">
            <button onClick={() => goToPage("/wishList")} >
                <IoMdHeartEmpty size={30} className="cursor-pointer" />
            </button>
    
            {isAuthenticated ? (
                <button
                className="bg-gray-100 rounded-xl shadow-xl cursor-pointer px-3 py-2"
                onClick={() => {
                    dispatch(handleLogout());
                }}
                >
                    Logout
                </button>
            ) : (
                <button
                    className=" border border-black trans hover:bg-gray-200 cursor-pointer px-3 py-1"
                    onClick={() => setShowModel("login")}
                >
                    Login
                </button>
            )}
            {showModel === "login" ? <Login setShowModel={setShowModel} /> : null}
            {showModel === "signup" && <Signin setShowModel={setShowModel} />}
            {showModel === "forgetPass" && (<ForgetPass setShowModel={setShowModel} /> )}
            {showModel === "resetcode" && <ResetCode setShowModel={setShowModel} />}
    
            <button onClick={() => goToPage("/cart")}>
                <PiShoppingCart size={30} className="cursor-pointer" />
            </button>
        </ul>
    )


  //     {isAuthenticated ? (
  //       <div className="cursor-pointer relative" onClick={toggleDropdown}>
  //         <img src="/user.png" alt="user" className="w-8 h-8" />
  //         <div className="relative">
  //           {showModel === "dropdowenmenu" && (
  //             <DropdowenMenu setShowModel={setShowModel} />
  //           )}
  //         </div>
  //       </div>
  //     ) : (
  //       <div title="Login" onClick={() => setShowModel("login")}>
  //         <GoPerson size={22} className="cursor-pointer" />
  //       </div>
  //     )}
  //     {showModel === "login" ? <Login setShowModel={setShowModel} /> : null}
  //     {showModel === "signup" && <Signin setShowModel={setShowModel} />}
  //     {showModel === "forgetPass" && <ForgetPass setShowModel={setShowModel} />}
  //     {showModel === "resetcode" && <ResetCode setShowModel={setShowModel} />}

  //     <button onClick={() => goToPage("/cart")}>
  //       <PiShoppingCart size={30} className="cursor-pointer" />
  //     </button>
  //   </ul>
  // );
};

export default PhoneFeatures;
