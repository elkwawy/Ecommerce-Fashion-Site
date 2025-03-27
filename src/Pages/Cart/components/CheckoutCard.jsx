import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../../../utilities/showToast";
const CheckoutCard = ({
  products,
  loading,
  totalCartPrice,
  cartId,
  status,
}) => {
  const navigate = useNavigate();
  const discount = products.reduce(
    (acc, product) =>
      acc + (product.price - product.priceAfterDiscount) * product.quantity,
    0
  );

  const handleCheckout = () => {
    if (products.length === 0) {
      showToast("error", "Cart is empty");
    } else {
      navigate(`/cart/checkout`, {
        state: { products, cartId, totalCartPrice },
      });
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Subtotal</dt>
              <dd className="text-base font-medium text-gray-900">
                {loading || status === "loading" ? (
                  <Skeleton width={80} height={20} />
                ) : (
                  `$${(totalCartPrice + discount)?.toFixed(0)}`
                )}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Discount</dt>
              <dd className="text-base font-medium text-green-600">
                {loading || status === "loading" ? (
                  <Skeleton width={80} height={20} />
                ) : (
                  `$${discount?.toFixed(0)}`
                )}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
            <dt className="text-base font-bold text-gray-900">Total Price</dt>
            <dd className="text-base font-bold text-gray-900 ">
              {loading || status === "loading" ? (
                <Skeleton width={80} height={20} />
              ) : (
                `$${totalCartPrice?.toFixed(0)}`
              )}
            </dd>
          </dl>
        </div>

        <button
          onClick={handleCheckout}
          disabled={loading || status === "loading"}
          className="flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Checkout now
        </button>
      </div>
    </div>
  );
};

export default CheckoutCard;
