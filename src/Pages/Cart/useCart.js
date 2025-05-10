import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo, useRef } from "react";
import { getUserCart } from "../../Redux Toolkit/slices/cartSlice";
import { API } from "../../Api/Api";
import axios from "axios";

export default function useCart() {
  const dispatch = useDispatch();
  const { cartItems, error, totalCartPrice, status, cartId } = useSelector(
    (state) => state.cart
  );

  console.log(cartItems);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  


  // useEffect(() => {
  //   const fetchCart = async () => {
  //     try {
  //       await dispatch(getUserCart()).unwrap();
  //     } catch (err) {
  //       console.log("Error fetching cart:", err);
  //     }
  //   };

  //   if (status === "idle") fetchCart();
  // }, [dispatch]);

  const fetchedOnceRef = useRef(false);
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


    if (!fetchedOnceRef.current) {
      console.log("Fetching products...");
      fetchProducts();
      fetchedOnceRef.current = true;
    }
  }, [cartItems]);

  const memoizedProducts = useMemo(() => products, [products]);

  return {
    products: memoizedProducts,
    setProducts,
    status,
    totalCartPrice,
    cartId,
    loading,
    error,
  };
}
