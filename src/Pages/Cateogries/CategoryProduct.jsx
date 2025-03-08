import { CiHeart } from "react-icons/ci";
import { FaCartPlus, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import LazyImage from "../../utilities/LazyImage";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import { memo } from "react";
import CustomSkeleton from "../../utilities/CustomSkeleton";
import { Img } from "react-image";


const CategoryProduct = memo(({priceAfterDiscount, image, name, price, colors}) => {
    return (
        <div  className="product pb-2 trans xl:w-[275px] border-white border hover:border-black hover:z-40  cursor-pointer">
            
            <div className="image-container relative">
                {/* h-[397px] */}
                <Img src={image} alt="name" className="w-full " loader={<CustomSkeleton width="100%" height="397px" />} />
                {/* Absolute buttons */}
                <div className="icon-container flex gap-2">
                    <Link to="/cart">
                        <FaCartPlus />
                    </Link>
                    <Link to="/wishlist">
                        <CiHeart />
                    </Link>
                    <Link to="/view">
                        <FaEye />
                    </Link>
                </div>
                {price && priceAfterDiscount && <p className="bg-white text-sm absolute top-2 left-2  px-1 text-center">-{(Math.round((price - priceAfterDiscount) / price * 100))}%</p>}

            </div>

            <div className="flex flex-col gap-1 ml-2 mt-2">
                {name && <p className="title text-gray-500 text-sm">
                    {name}
                </p>}
                <div className="flex items-center gap-2">
                    {priceAfterDiscount && <p className="price text-gray-700 text-sm font-semibold">
                        {priceAfterDiscount}$
                    </p>}
                    {price && <p className="price text-gray-400 line-through decoration-black  text-sm ">
                        {price}$
                    </p>}
                </div>
                <div className="colors text-start flex gap-4">
                    {colors.map((color , index) => (
                    <span key={index} style={{backgroundColor: color}} className={`rounded-full opacity-80 shadow-md w-4 h-4`} />
                    ))}
                </div>
            </div>
        </div>
    )
})

export default CategoryProduct