import { Img } from "react-image"
import CustomSkeleton from "../../../utilities/CustomSkeleton"
import { useState } from "react";

const ProductImages = ({images}) => {
    console.log(images);
    const [imgSrc, setImgSrc] = useState(images.length ? images[0] : null)
    const changeImg = (src) => { 
        setImgSrc(src);
    }
    return ( images ? 
        <div className="flex gap-5 max-sm:flex-col-reverse max-sm:items-center max-md:justify-center min-h-[618px] sm:min-h-[456px] lg:min-w-[590px] ">
            <div className="flex  sm:flex-col gap-2">
                {
                    images.slice(0,3).map((img) => <Img onMouseOver={() => changeImg(img)} className={`${img === imgSrc ? "border-black" : "hover:border-black"} min-w-[112px] max-w-[112px] shadow-md trans  border cursor-pointer`} src={img} loader={<CustomSkeleton width={100} height={100} />} />)
                }
            </div>
            {imgSrc && <Img className="max-sm:h-[450px] max-lg:max-w-[300px] max-h-[456px] border" src={imgSrc} loader={<CustomSkeleton width={"100%"} />} />}
        </div>
        : <p className="text-sm font-semibold">We don't have images for this product</p> 
    )
}

export default ProductImages