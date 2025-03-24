import { PiGreaterThanBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <ol className="flex w-full max-w-2xl items-center text-center text-sm font-medium text-gray-400 sm:text-base">
      <li className="flex shrink-0 items-center gap-4">
        <Link to="/cart">
          <span className="flex items-center text-gray-400 hover:text-gray-900">
            Cart
          </span>
        </Link>
        <PiGreaterThanBold size={15} />
        <span className="flex items-center text-gray-900">Checkout</span>
        <PiGreaterThanBold size={15} />
        <Link to="/cart/checkout/payment">
          <span className="flex items-center text-gray-400 hover:text-gray-900">
            Payment
          </span>
        </Link>
      </li>
    </ol>
  );
};

export default NavigationBar;
