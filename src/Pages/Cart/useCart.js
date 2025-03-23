import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import { getUserCart } from "../../Redux Toolkit/slices/cartSlice";
import { API } from "../../Api/Api";
import axios from "axios";

export default function useCart() {
  const dispatch = useDispatch();
  const { cartItems, error, totalCartPrice, status, cartId } = useSelector(
    (state) => state.cart
  );
  console.log(status);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(cartItems);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await dispatch(getUserCart()).unwrap();
      } catch (err) {
        console.log("Error fetching cart:", err);
      }
    };

    fetchCart();
  }, [dispatch]);

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      setProducts([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      // setLoading(true);
      try {
        const productData = await Promise.all(
          cartItems.map(async (item) => {
            const res = await axios.get(API.getProductData(item.product));
            return { ...res.data.data, quantity: item.quantity };
          })
        );
        setProducts(productData);
      } catch (error) {
        console.log("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const memoizedProducts = useMemo(() => products, [products]);

  return {
    products: memoizedProducts,
    status,
    totalCartPrice,
    cartId,
    loading,
    error,
  };
}
