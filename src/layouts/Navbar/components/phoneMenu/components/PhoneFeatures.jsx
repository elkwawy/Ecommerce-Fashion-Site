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
    <ul className="flex gap-8 items-center sm:hidden">
      <button onClick={() => goToPage("/wishList")}>
        <IoMdHeartEmpty size={30} className="cursor-pointer" />
      </button>

      {isAuthenticated ? (
        <div className="cursor-pointer relative" onClick={toggleDropdown}>
          <img src="/user.png" alt="user" className="w-8 h-8" />
          <div className="relative">
            {showModel === "dropdowenmenu" && (
              <DropdowenMenu setShowModel={setShowModel} dropdownRef={dropdownRef}  />
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

      <button onClick={() => goToPage("/cart")}>
        <PiShoppingCart size={30} className="cursor-pointer" />
      </button>
    </ul>
  );
};

export default PhoneFeatures;
