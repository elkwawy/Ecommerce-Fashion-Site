import { useState, useCallback } from "react";
import axios from "axios";
import { API } from "../../Api/Api";
import { showToast } from "../../utilities/showToast";

export default function useContactUs() {
  const [loading, setLoading] = useState(false);

  const sendMessage = useCallback(async (formData) => {
    setLoading(true);
    try {
      const { data } = await axios.post(API.contactUs, formData);
      showToast("success", "Your message sent successfully");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      showToast("error", errorMessage);
      console.error("Error sending message:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, sendMessage };
}
