import { useState } from "react";
import { showToast } from "../../utilities/showToast";
import { API } from "../../Api/Api";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useAuthHook = ({ setShowModel }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handelSignuP(values) {
    try {
      setLoading(true);
      const options = {
        url: API.register,
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      showToast("success", "user signed in successfully");
      setLoading(false);

      if (data.token) {
        setShowModel("login");
      }
    } catch (error) {
      showToast("error", error.response.data?.message || "error in signup");
    } finally {
      setLoading(false);
    }
  }

  async function resetCode(values) {
    try {
      setLoading(true);
      let options = {
        url: API.ResetCode,
        method: "Post",
        data: {
          resetCode: values.resetCode,
        },
      };
      const { data } = await axios.request(options);
      showToast("success", "code verification successful");
      navigate("/changepassword");
    } catch (error) {
      showToast(
        "error",
        error.response.data?.message || "error in code verification"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handelforgetPass(values) {
    try {
      setLoading(true);
      let options = {
        url: API.forgotPassword,
        method: "Post",
        data: {
          email: values.email,
        },
      };
      const { data } = await axios.request(options);
      showToast("success", "check your email");
      setShowModel("resetcode");
    } catch (error) {
      showToast("error", error.response.data?.message);
    } finally {
      setLoading(false);
    }
  }

  return { handelSignuP, resetCode, handelforgetPass, loading };
};

export default useAuthHook;
