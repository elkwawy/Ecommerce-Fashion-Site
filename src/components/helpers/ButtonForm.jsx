import Loader from "../../utils/LoaderW";
import { FaArrowRight } from "react-icons/fa";
const ButtonForm = ({ title, loading }) => {
  return loading ? (
    <div className="flex items-center justify-center gap-2 w-full bg-sec-color text-white border-[1px] py-3 rounded-md hover:opacity-85 trans ">
      <Loader className="w-[24px]" />
    </div>
  ) : (
    <button
      type="submit"
      className={` flex items-center justify-center gap-2 w-full bg-sec-color text-white border-[1px] py-3 rounded-md hover:opacity-85 trans `}
    >
      {title} <FaArrowRight size={16} />
    </button>
  );
};

export default ButtonForm;
