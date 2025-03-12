import {  useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa"; 
const ProductInfo = ({ product }) => {
    const { name, price, priceAfterDiscount, size, colors, desc, stock } = product;
    const [addToCart, setAddToCart] = useState("Add to cart")
    const defaultSizes = ["XS", "S", "M", "L", "XL", "2XL"];
    const [isFav, setIsFav] = useState(false)
    const [opts, setOpts] = useState({
        color: colors[0], // Default to the first available color
        size: null, // No size selected initially
    });

    const addToWishList = () => { 
        setIsFav(fav => !fav);
    }

    const updateOpts = (key, value) => { 
        setOpts((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleMouseEnter = () => { 
        if (!opts.size)
            setAddToCart("Select size")
    }
    const handleMouseLeave = () => { 
        setAddToCart("Add to cart")
    }

    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className="text-2xl font-bold">{name}</h1>

            <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-black" />
                ))}
                <FaRegStar className="text-black" />
                <p className="ml-1 text-sm">( 100 Reviews )</p>
            </div>

            {/* Price Section */}
            <div className="w-full font-semibold text-lg border-b pb-2 flex gap-2">
                {priceAfterDiscount ? (
                    <>
                        <p>${priceAfterDiscount}</p>
                        <p className="text-gray-500 line-through decoration-black">${price}</p>
                    </>
                ) : (
                    <p>${price}</p>
                )}
            </div>

            {/* Colors Section */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Colors</h2>
                <div className="flex gap-2 mt-2 items-center">
                    {colors.map((c, index) => (
                        <div key={index} className={`${opts.color === c ? "p-1 border border-black rounded-full" : ""}`}>
                            <div
                                role="button"
                                onClick={() => updateOpts("color", c)}
                                style={{ backgroundColor: c, width: "25px", height: "25px", borderRadius: "100%" }}
                                className="trans hover:scale-105 cursor-pointer"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Sizes Section */}
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">Sizes</h2>
                <div className="flex gap-2 mt-2 flex-wrap text-wrap">
                    {defaultSizes.map((s) => {
                        const isAvailable = size.includes(s);
                        return (
                            <button
                                key={s}
                                onClick={() => isAvailable && updateOpts("size", s)}
                                disabled={!isAvailable}
                                className={`px-4 py-1 border ${
                                    isAvailable 
                                        ? opts.size === s 
                                            ? "bg-gray-900 text-white"
                                            : "cursor-pointer trans hover:bg-gray-200" 
                                        : "opacity-50 cursor-not-allowed"
                                }`}
                            >
                                {s}
                            </button>
                        );
                    })}
                </div>
            </div>
            
            <div className="mt-2 gap-x-2 flex items-center">
                <button onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} className="bg-black min-w-[170px] text-white  trans hover:opacity-80 py-2">
                    {addToCart}
                </button>
                <button onClick={addToWishList} className={` border border-black trans hover:bg-gray-100 h-full px-3`}>
                    {!isFav && <IoIosHeartEmpty className="text-lg" />}
                    {isFav && <IoIosHeart className="text-lg" />}
                </button>
            </div>
        </div>
    );
};

export default ProductInfo;
