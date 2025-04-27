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
import { useEffect, useRef } from "react";

const PhoneFeatures = ({ closeMenu}) => {
  const [showModel, setShowModel] = useVisible();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const goToPage = (link) => {
    closeMenu();
    navigate(link);
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
  
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showModel]);
  

  const toggleDropdown = (e) => {
    e.stopPropagation();
    if (showModel === "dropdowenmenu") {
      setShowModel(null);
    } else {
      setShowModel("dropdowenmenu");
    }
  };
  return (
    <ul className="flex gap-8 items-center sm:hidden">
      <button onClick={() => goToPage("/wishList")} className="relative">
        <IoMdHeartEmpty size={30} className="cursor-pointer" />
        <div className="flex items-center justify-center w-4 h-4 absolute -top-1 left-3 rounded-full bg-gray-100">
              {localStorage.getItem("wishlist") || 0}
              </div>
      </button>

      {isAuthenticated ? (
        <div className="cursor-pointer relative" onClick={toggleDropdown}>
          <img src="/user.png" alt="user" className="w-8 h-8" />
          <div className="relative">
            {showModel === "dropdowenmenu" && (
              <DropdowenMenu 
              setShowModel={setShowModel} 
              toggleDropdown={toggleDropdown} 
              dropdownRef={dropdownRef}  
              closeMenu={closeMenu}
              />
            )}
          </div>
        </div>
      ) : (
        <div title="Login" onClick={() => setShowModel("login")}>
          <GoPerson size={22} className="cursor-pointer" />
        </div>
      )}
      {showModel === "login" ? <Login setShowModel={setShowModel} /> : null}
      {showModel === "signup" && <Signin setShowModel={setShowModel} />}
      {showModel === "forgetPass" && <ForgetPass setShowModel={setShowModel} />}
      {showModel === "resetcode" && <ResetCode setShowModel={setShowModel} />}

      <button onClick={() => goToPage("/cart")} className="relative">
        <PiShoppingCart size={30} className="cursor-pointer" />
        <div className="flex items-center justify-center w-4 h-4 absolute -top-1 left-3 rounded-full bg-gray-100">
                {localStorage.getItem("cart") || 0}
              </div>
      </button>
    </ul>
  );
};

export default PhoneFeatures;
