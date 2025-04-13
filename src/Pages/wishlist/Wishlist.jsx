import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import EmptySec from "./EmptySec";
import WishItems from "./WishItems";
import { getUserWhishList } from "../../Redux Toolkit/slices/WishlistSlice";
import WishlistSkilton from "./WishlistSkilton";

export default function Wishlist() {
  const { isLoading, wishListItems } = useSelector(
          (state) => state.wishListSlice
        );
        const dispatch =useDispatch()

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
   useEffect(() =>{
          dispatch(getUserWhishList());
        }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
        <meta name="description" content="wishlist page" />
      </Helmet>
      {isAuthenticated && wishListItems?.length > 0 ? (
  <WishItems />
) : !isLoading && wishListItems?.length === 0 ? (
  <EmptySec />  
) : (
  <WishlistSkilton/>
)}

    </>
  );
}
