import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router-dom";
const CheckoutCard = ({ products, loading, totalCartPrice, cartId }) => {
  const discount = products.reduce(
    (acc, product) => acc + (product.price - product.priceAfterDiscount),
    0
  );

  return (
    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm  sm:p-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Subtotal</dt>
              <dd className="text-base font-medium text-gray-900">
                {loading ? (
                  <Skeleton width={80} height={20} />
                ) : (
                  `$${(totalCartPrice + discount).toFixed(0)}`
                )}
              </dd>
            </dl>

            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-500">Discount</dt>
              <dd className="text-base font-medium text-green-600">
                {loading ? (
                  <Skeleton width={80} height={20} />
                ) : (
                  `$${discount.toFixed(0)}`
                )}
              </dd>
            </dl>
          </div>

          <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 ">
            <dt className="text-base font-bold text-gray-900">Total Price</dt>
            <dd className="text-base font-bold text-gray-900 ">
              {loading ? (
                <Skeleton width={80} height={20} />
              ) : (
                `$${totalCartPrice.toFixed(0)}`
              )}
            </dd>
          </dl>
        </div>

        <Link
          to="/cart/checkout"
          state={{ products, cartId , totalCartPrice}}
          className="flex w-full items-center justify-center rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-primary-300   "
        >
          Checkout now
        </Link>
      </div>
    </div>
  );
};

export default CheckoutCard;
