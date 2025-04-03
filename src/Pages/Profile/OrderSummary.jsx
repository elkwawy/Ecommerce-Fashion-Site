import React, { useEffect, useMemo, useState } from 'react'
import { showToast } from '../../utilities/showToast';
import axios from 'axios';
import { API } from '../../Api/Api';
import Cookies from "js-cookie";
import { getLogedUser } from '../../Redux Toolkit/slices/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '../../utilities/LoadingSpinner';

export default function OrderSummary() {
  const [orders, setOrders] = useState([]);
  const [loadingOrder,setLoadingOrder] = useState(true);
  const memoizedOrders = useMemo(() => orders, [orders]);
  const dispatch = useDispatch()
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
        dispatch(getLogedUser())
      }, [dispatch]);
    
      useEffect(() => {
        if (userData?.data?._id) {
          getUserOrders(userData.data._id);
        }
      }, [userData])
      return (
        <div className="">
          <div className="w-full border border-gray-300 p-4 rounded-lg mt-6 space-y-3">
            <h2 className="text-xl font-semibold text-gray-900">Your Orders</h2>
            {loadingOrder ? (
              <div className="flex items-center justify-center min-h-[300px]">
               <LoadingSpinner/>
              </div>
            ) : memoizedOrders.length > 0 ? (
              memoizedOrders.map((order) => (
                <div className="border border-gray rounded-xl p-2 space-y-2" key={order._id}>
                  <div className="flex flex-col md:flex-row items-center justify-between">
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
                      <div key={product.product._id} className="p-2 flex flex-col gap-4 border border-gray rounded-xl">
                        <img src={product.product.image} alt={product.product.name} />
                        <div>
                          <p className="text-gray-600">{product.product.name}</p>
                          <p>{product.product.price} $</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center">
                <p className="text-gray-600">No orders found</p>
              </div>
            )}
          </div>
        </div>
      );
      
}
