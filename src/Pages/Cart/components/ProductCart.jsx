import { Link } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  deleteFromCart,
  updateCartQuantity,
} from "../../../Redux Toolkit/slices/cartSlice";
import { useMemo, useState } from "react";
import { showToast } from "../../../utilities/showToast";

const ProductCart = ({ product, setProducts }) => {
  const dispatch = useDispatch();
  console.log(product);
  const {SubCategory} = product;

  const [quantity, setQuantity] = useState(product.quantity);

  const totalPrice = useMemo(
    () => product.price * product.quantity,
    [product.price, product.quantity, quantity]
  );
  console.log(product);
  

  const handleIncrement = () => {
    if (quantity === product.stock) {
      showToast("error", "Product is out of stock");
      return;
    } else {
      setQuantity((prevQuantity) => prevQuantity + 1);
      dispatch(updateCartQuantity({ id: product._id, quantity: quantity + 1 }))
        .unwrap()
        .catch((error) => {
          setQuantity((prevQuantity) => prevQuantity - 1);
          showToast("error", "Failed to update quantity");
        });
    }
  };

  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prevQuantity) => prevQuantity - 1);
    dispatch(updateCartQuantity({ id: product._id, quantity: quantity - 1 }))
      .unwrap()
      .catch((error) => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        showToast("error", "Failed to update quantity");
      });
  };

  const handleDelete = () => {
    const saveProduct = product;
    setProducts((prevProducts) =>
      prevProducts.filter((item) => item._id !== product._id)
    );
    dispatch(deleteFromCart(product._id))
      .unwrap()
      .catch((error) => {
        setProducts((prevProducts) => [saveProduct, ...prevProducts]);
        showToast("error", "Failed to delete from cart");
      });
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4 md:p-5 md:pb-0">
      <div className="md:flex md:items-center md:justify-between md:gap-6">
        {/* صورة المنتج */}
        <Link to={`/product/${SubCategory}/${product._id}`} className="shrink-0 md:order-1">
          <img className="h-30 w-20" src={product.image} alt={product.name} />
        </Link>

        {/* تفاصيل المنتج */}
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          {/* التحكم في الكمية */}
          <div className="flex items-center border border-gray-300 p-1">
            <button
              type="button"
              onClick={() => handleDecrement()}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-100"
            >
              <FiMinus />
            </button>
            <input
              type="text"
              className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
              value={quantity}
              readOnly
            />
            <button
              type="button"
              onClick={() => handleIncrement()}
              className="inline-flex h-5 w-5 shrink-0 items-center justify-center focus:outline-none focus:ring-2 focus:ring-gray-100"
            >
              <FiPlus />
            </button>
          </div>

          {/* السعر والإجمالي */}
          <div className="text-end space-y-3 md:order-4 md:w-32">
            <p className="text-base font-bold text-gray-500">
              Price:
              <br />
              <span className="text-sm text-gray-900">${product.price}</span>
            </p>
            <p className="text-base font-bold text-gray-500">
              Total:
              <br />
              <span className="text-sm text-gray-900">${totalPrice}</span>
            </p>
          </div>
        </div>

        {/* اسم المنتج وزر الحذف */}
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link
            to={`/product/${product._id}`}
            className="text-base font-medium text-gray-900 hover:underline"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-5">
            <button
              onClick={handleDelete}
              className="flex items-center gap-1 text-sm font-semibold text-gray-900 transition hover:text-red-500"
            >
              <RiDeleteBin5Line size={16} /> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCart;
