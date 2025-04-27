import {  useEffect, useState } from "react";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { FaStar, FaRegStar } from "react-icons/fa"; 
import { useDispatch, useSelector } from "react-redux";
import { addToWhishList, getUserWhishList } from "../../../../Redux Toolkit/slices/WishlistSlice";
import { showToast } from "../../../../utilities/showToast";
import ProductSizes from "./components/ProductSizes";
const ProductInfo = ({ product, handleAddProductToCart }) => {
    const { _id, name, price, priceAfterDiscount, size, colors, desc, stock } = product;
    const [addToCart, setAddToCart] = useState("Add to cart")
    console.log(product);
    
    const [isFav, setIsFav] = useState(false)
    const [opts, setOpts] = useState({
        color: colors[0], // Default to the first available color
        size: null, // No size selected initially
    });

    const cartItems  = useSelector((state) => state.cart.cartItems);
    const [isProductInCart, setIsProductInCart] = useState(false);
    
    useEffect(() => { 
        if (cartItems.length > 0) {
            const isProductInCart = cartItems.some((item) => item.product === _id);
            setIsProductInCart(isProductInCart);
        }
    }, [cartItems])

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

    const dispatch = useDispatch();

    const handleAddToWishlist = async () => {
        if (!isAuthenticated) {
            showToast("error", "Please login first");
            return;
        }

        setIsFav(true);

        try {
            await dispatch(addToWhishList({ id: _id })).unwrap(); // allow me to catch the errors
            dispatch(getUserWhishList());
        } catch (error) {
            setIsFav(false); // on error make it not favorite in the UI
            showToast("error", "Failed to add to wishlist");
        }
    };
    
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

    const handleAddToCart = () => { 
        if (!opts.size) return ;
        handleAddProductToCart(_id);
        // showToast("success", "Added to cart")
    }

    return (
        <div className="w-full flex flex-col  gap-5">
            <div className="w-full flex justify-between items-center">
                <h1 className="text-2xl font-bold">{name}</h1>
            </div>
            <div className="flex items-center gap-1">
                {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-black" />
                ))}
                <FaRegStar className="text-black" />
                <p className="ml-1 text-sm">( 100 Reviews )</p>
            </div>

            {/* Price Section */}
            <div className="w-full max-sm:justify-end font-semibold text-lg border-b pb-2 flex gap-2">
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
                                className="trans hover:scale-105 cursor-pointer border"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Sizes Section */}
            {<ProductSizes sizes={size} choseSize={(s) => updateOpts("size", s)} />}
            
            <div className="w-fit flex flex-col items-start">
                {
                    stock > 0 
                    ?  
                    <p className="text-sm text-gray-700">{stock} items in stock</p>
                    : 
                    <p className="text-sm  text-red-500 font-semibold">Out of stock</p>
                }
                <div className="gap-x-2 w-fit flex items-center ">
                    <button onClick={handleAddToCart} onMouseOver={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`bg-black min-w-[170px] text-white  trans hover:opacity-80 py-2 ${stock == 0 || isProductInCart ? "opacity-70 pointer-events-none" : ""}`}>
                        {isProductInCart ? "Already in cart" : addToCart}
                    </button>
                    <button onClick={handleAddToWishlist} className={` border border-black trans hover:bg-gray-100 h-10 px-3`}>
                        {!isFav && <IoIosHeartEmpty className="text-lg" />}
                        {isFav && <IoIosHeart className="text-lg" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductInfo;