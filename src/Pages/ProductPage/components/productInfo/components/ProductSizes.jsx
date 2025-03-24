import { useState } from "react";

const ProductSizes = ({sizes, choseSize}) => {
    const [chosenSize, setchosenSize] = useState("");
    const defaultSizes = ["XS", "S", "M", "L", "XL", "2XL"];
    const handleChooseSize = (s) => { 
        console.log("Working");
        setchosenSize(s);
        choseSize(s);
    }
    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Sizes</h2>
            <div className="flex gap-2 mt-2 flex-wrap text-wrap">
                {defaultSizes.map((s) => {
                    const isAvailable = sizes.includes(s);
                    return (
                        <button
                            key={s}
                            onClick={isAvailable   ? () => handleChooseSize(s) : null}
                            disabled={!isAvailable}
                            className={`px-4 py-1 border ${
                                isAvailable 
                                    ? chosenSize === s 
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
    )
}

export default ProductSizes