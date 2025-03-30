import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

export function EmptyCartSection() {
  return (
    <section className="">
      <div className="w-[90%] m-auto">
        <h3 className="text-2xl font-bold border-b-2 pb-4 pt-6">My Cart</h3>
        <div className="flex flex-col justify-center items-center gap-1 text-center min-h-[85vh]">
          <MdOutlineShoppingCart className="text-5xl mb-2" />
          <p className="font-bold">It is empty here</p>
          <p className="text-sm mb-4 font-bold">
            Your cart is empty! Start adding items now and enjoy shopping.
          </p>
          <Link
            to="/"
            className="w-[15rem] bg-black trans hover:opacity-80 text-white py-2 px-6 rounded"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </section>
  );
}

export function EmptyCart() {
  return (
    <div className="flex flex-col justify-center items-center gap-1 mt-20 text-center min-h-[55vh]">
      <MdOutlineShoppingCart className="text-4xl" />
      <p className="font-bold text-lg">It is empty here</p>
      <p className=" text-gray-600 text-sm font-bold mb-2">
        Your cart is empty! Start adding items now and enjoy shopping.
      </p>
      <Link
        to="/"
        className="w-[13rem] bg-black text-sm trans hover:opacity-80 text-white py-2 px-6 rounded"
      >
        CONTINUE SHOPPING
      </Link>
    </div>
  );
}
