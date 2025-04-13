import React, { useEffect, useMemo, useState } from 'react'
import { showToast } from '../../utilities/showToast';
import axios from 'axios';
import { API } from '../../Api/Api';
import Cookies from "js-cookie";
import { getLogedUser } from '../../Redux Toolkit/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Img } from 'react-image';
import CustomSkeleton from '../../utilities/CustomSkeleton';
import EmptySec from './EmptySec';

export default function OrderSummary() {
  const [orders, setOrders] = useState([]);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const memoizedOrders = useMemo(() => orders, [orders]);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.profile.userData);

  const getUserOrders = async (userId) => {
    const token = Cookies.get("token");
    const options = {
      method: "GET",
      url: API.getUserOrders(userId),
      headers: token ? { authorization: token } : {},
    };

    try {
      const { data } = await axios.request(options);
      setOrders(data.orders);
      setLoadingOrder(false);
    } catch (error) {
      showToast("error", error.message || "Failed to fetch orders");
    }
  };

  useEffect(() => {
    dispatch(getLogedUser());
  }, [dispatch]);

  useEffect(() => {
    if (userData?.data?._id) {
      getUserOrders(userData.data._id);
    }
  }, [userData]);

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-900">Your Orders</h2>

      {loadingOrder ?  (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {[...Array(4)].map((_, index) => (
      <div key={index} className="p-4 border border-gray-200 rounded-xl shadow-sm bg-white space-y-3">
        <CustomSkeleton width="100%" height="397px" />
        <div className="space-y-2">
          <CustomSkeleton height="20px" width="80%" />
          <CustomSkeleton height="20px" width="60%" />
        </div>
        <div className="flex justify-between gap-2">
          <CustomSkeleton height="30px" width="45%" />
          <CustomSkeleton height="30px" width="45%" />
        </div>
      </div>
    ))}
  </div>
): memoizedOrders.length > 0 ? (
        memoizedOrders.map((order) => (
          <div className="border border-gray rounded-xl p-2 space-y-4 my-4" key={order._id}>
            <div className="flex flex-col md:flex-row items-center justify-between ">
              <h3 className="font-semibold text-gray-900">
                Total price <span className="text-gray-500">{order.totalOrderPrice} $</span>
              </h3>
              <div className="flex items-center max-[400px]:flex-col gap-2 text-center">
                <p
                  className={`text-sm font-medium ${
                    order.isDelivered
                      ? "bg-green-500 py-2 px-4 rounded-2xl text-white w-fit min-w-[140px]"
                      : "bg-blue-500 py-2 px-4 rounded-2xl text-white w-fit min-w-[140px]"
                  }`}
                >
                  {order.isDelivered ? "Delivered" : "In Progress"}
                </p>
                <p
                  className={`text-sm font-medium ${
                    order.isPaid
                      ? "bg-green-500 py-2 px-4 rounded-2xl text-white w-fit min-w-[140px]"
                      : "bg-red-500 py-2 px-4 rounded-2xl text-white w-fit min-w-[140px]"
                  }`}
                >
                  {order.isPaid ? "Paid" : "Not Paid"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {order.orderItems.map((product) => (
                <Link
                  to={`/${product.product.slug}`}
                  state={{ productId: product.product._id }}
                  key={product._id}
                  className="p-2 flex flex-col gap-4 border border-gray rounded-xl"
                >
                  <Img src={product.product.image} alt={product.product.name} />
                  <div>
                    <p className="text-gray-600">{product.product.name}</p>
                    <p>{product.product.price} $</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center">
         <EmptySec/>
        </div>
      )}
    </div>
  );
}
