import { RiDeleteBin5Line } from "react-icons/ri";
import { clearCart } from "../../Redux Toolkit/slices/cartSlice";
import useCart from "./useCart";
import CheckoutCard from "./components/CheckoutCard";
import SkeletonCart from "./components/SkeletonCart";
import ProductCart from "./components/ProductCart";
import { useDispatch, useSelector } from "react-redux";
import { EmptyCartSection, EmptyCart } from "./components/EmptyCart";
import { showToast } from "../../utilities/showToast";
function Cart() {
  const dispatch = useDispatch();
  const { products, setProducts, loading, totalCartPrice, cartId, status } =
    useCart();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handelClearCart = () => {
    if (products.length === 0) return;
    const saveProducts = [...products];
    setProducts([]);
    dispatch(clearCart())
      .unwrap()
      .catch((error) => {
        setProducts(saveProducts);
        showToast("error", "Failed to clear cart");
      });
  };

  return isAuthenticated ? (
    <section
      className={`bg-white py-3 ${
        products.length <= 2 && "min-h-[90vh]"
      } antialiased  md:py-15 mx-auto  max-w-screen-xl px-4 2xl:px-0`}
    >
      <div className="mt-6 sm:mt-8 md:gap-8 lg:flex lg:items-start xl:gap-10">
        <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
          <div className="flex items-center justify-between mb-6 ">
            <h2 className="text-xl font-semibold text-gray-900  sm:text-2xl">
              Cart
            </h2>
            {products.length !== 0 && (
              <button
                onClick={handelClearCart}
                className="flex items-center gap-1 text-sm font-semibold text-gray-900 trans hover:text-red-500"
              >
                <RiDeleteBin5Line size={16} /> Clear Cart
              </button>
            )}
          </div>
          {products.length === 0 &&
            !loading &&
            status !== "loading" &&
            !totalCartPrice && <EmptyCart />}
          <div className="space-y-6">
            {products.length !== 0 && (
              <div className="text-gray-400 space-y-4 hidden md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                <p className="text-sm">Product</p>
                <div className="md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 ">
                  <p className="text-sm pr-20">Quantity</p>
                  <p className="text-sm pr-5">Price</p>
                </div>
              </div>
            )}
            {loading || status === "loading"
              ? Array(3)
                  .fill()
                  .map((_, index) => <SkeletonCart key={index} />)
              : products.map((product, index) => (
                  <ProductCart
                    key={index}
                    product={product}
                    setProducts={setProducts}
                  />
                ))}
          </div>
        </div>

        <CheckoutCard
          products={products}
          loading={loading}
          status={status}
          cartId={cartId}
          totalCartPrice={totalCartPrice}
        />
      </div>
    </section>
  ) : (
    <EmptyCartSection />
  );
}

export default Cart;
