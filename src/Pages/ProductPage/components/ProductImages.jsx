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
        <div className="flex gap-5 min-w-[590px] min-h-[456px]">
            <div className="flex flex-col gap-2">
                {
                    images.map((img) => <Img onMouseOver={() => changeImg(img)} className={`${img === imgSrc ? "border-black" : "hover:border-black"} min-w-[100px] max-w-[100px] shadow-md trans  border cursor-pointer`} src={img} loader={<CustomSkeleton width={100} height={100} />} />)
                }
            </div>
            {imgSrc && <Img className=" max-h-[456px] border" src={imgSrc} loader={<CustomSkeleton width={"100%"} />} />}
        </div>
        : <p className="text-sm font-semibold">We don't have images for this product</p> 
    )
}

export default ProductImages