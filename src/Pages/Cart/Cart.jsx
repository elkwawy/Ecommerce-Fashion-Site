import { RiDeleteBin5Line } from "react-icons/ri";
import { clearCart } from "../../Redux Toolkit/slices/cartSlice";
import useCart from "./useCart";
import CheckoutCard from "./components/CheckoutCard";
import SkeletonCart from "./components/SkeletonCart";
import ProductCart from "./components/ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
function Cart() {
  const dispatch = useDispatch();
  const { products, loading, totalCartPrice, cartId, error } = useCart();
  // console.log(products);

  // console.log(cartId);

  const isEmpty = !Array.isArray(products) || products.length === 0;
  console.log(isEmpty);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated  ? (
    <section className="bg-white py-3 antialiased  md:py-15 mx-auto  max-w-screen-xl px-4 2xl:px-0">
      <div className="mt-6 sm:mt-8 md:gap-8 lg:flex lg:items-start xl:gap-10">
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div className="flex items-center justify-between mb-6 ">
            <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
              Cart
            </h2>
            <button
              onClick={() => dispatch(clearCart())}
              className="flex items-center gap-1 text-sm font-semibold text-gray-900 trans hover:text-red-500"
            >
              <RiDeleteBin5Line size={16} /> Clear Cart
            </button>
          </div>
          <div className="space-y-6">
            <div className="text-gray-400 space-y-4 hidden md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
              <p className="text-sm">PRODUCT</p>
              <div className="md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 ">
                <p className="text-sm pr-20">QUALITY</p>
                <p className="text-sm pr-5">PRICE</p>
              </div>
            </div>
            {loading
              ? Array(3)
                  .fill()
                  .map((_, index) => <SkeletonCart key={index} />)
              : products.map((product, index) => (
                  <ProductCart key={index} product={product} />
                ))}
          </div>
        </div>

        <CheckoutCard
          products={products}
          loading={loading}
          cartId={cartId}
          totalCartPrice={totalCartPrice}
        />
      </div>
    </section>
  ) : (
    <section>
      <div className="w-[90%] m-auto">
        <h3 className="text-2xl font-bold border-b-2 pb-4 pt-6">My Cart</h3>
        <div className="flex flex-col justify-center items-center gap-1 text-center h-[80vh]">
          <MdOutlineShoppingCart className="text-4xl" />
          <p className="font-bold text-xl">It is empty here</p>
          <p className=" text-gray-600 font-bold mb-2">
          Your cart is empty! Start adding items now and enjoy shopping.
          </p>
          <Link
            to="/"
            className="w-[15rem] bg-black trans hover:ml-2 text-white py-2 px-6 rounded"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
