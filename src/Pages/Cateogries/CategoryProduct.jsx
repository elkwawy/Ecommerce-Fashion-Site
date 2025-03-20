import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { memo } from "react";
import CustomSkeleton from "../../utilities/CustomSkeleton";
import { Img } from "react-image";
import { BsBagPlus } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWhishList,
  getUserWhishList,
} from "../../Redux Toolkit/slices/WishlistSlice";
import { showToast } from "../../utilities/showToast";
import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";

const CategoryProduct = memo(({ product, showDiscount = true }) => {
  const navigate = useNavigate();
  const { price, slug, priceAfterDiscount, image, name, colors } = product;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleAddToWishlist = async (id) => {
    if (isAuthenticated) {
      await dispatch(addToWhishList({ id }));
      dispatch(getUserWhishList());
    } else {
      showToast("error", "Please login first");
    }
  };

  const handleNavigate = () => {
    navigate(`/${slug}`, { state: { productId: product._id } });
  };

  return (
    <div
      onClick={handleNavigate}
      className="product pb-2 trans xl:w-[275px] border-white border hover:border-black hover:z-40 cursor-pointer"
    >
      <div className="image-container relative">
        <div className="relative">
          <Img
            src={image}
            alt={name}
            className="w-full"
            loader={<CustomSkeleton width="100%" height="397px" />}
          />
          {showDiscount && price && priceAfterDiscount && priceAfterDiscount < price && (
            <p className="bg-white text-xs absolute top-[94%] left-2 px-1 text-center">
              -{Math.round(((price - priceAfterDiscount) / price) * 100)}%
            </p>
          )}

          <Link
            title="Add to cart"
            to="/cart"
            className="top-2 left-2 absolute"
            onClick={(e) => e.stopPropagation()}
          >
            <MdAddShoppingCart  className="text-[22px] trans hover:text-[26px] font-semibold" />
          </Link>

          <div
            title="Add to wishlist"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToWishlist(product._id);
            }}
            className="top-2 right-2 absolute"
          >
            <FaRegHeart className="text-[20px] trans hover:text-[24px] font-semibold" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-0.5 px-2 mt-2">
        {name && (
          <p title={name} className="title text-gray-500 text-sm">
            {name}
          </p>
        )}
        <div className="w-full flex justify-between items-center">
          {showDiscount &&
          priceAfterDiscount &&
          price &&
          priceAfterDiscount < price ? (
            <div className="flex items-center gap-2">
              <p className="price text-gray-700 text-sm font-semibold">
                {priceAfterDiscount}$
              </p>
              <p className="price text-gray-400 line-through decoration-black text-sm">
                {price}$
              </p>
            </div>
          ) : (
            <p className="price text-gray-700 text-sm font-semibold">
              {price}$
            </p>
          )}

          {colors && colors.length && (
            <div className="colors text-sm text-gray-500 font-semibold">
              {colors.length} {colors.length > 1 ? "colors" : "color"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default CategoryProduct;
