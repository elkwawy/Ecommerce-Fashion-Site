import CustomSkeleton from "../../../../utilities/CustomSkeleton"
import ProductImagesLoading from "./ProductImagesLoading"
import ProductInfoLoading from "./ProductInfoLoading"


const LoadingPage = () => {
    return (
        <div className="px-5 md:px-10 lg:px-20 py-10 space-y-10">
            <div className="flex flex-col md:flex-row w-full gap-10 ">
                <ProductImagesLoading />
                <ProductInfoLoading />
            </div>

            <div className="space-y-1">
                <CustomSkeleton width={"120px"} height={20} />
                <CustomSkeleton width={"500px"} height={10} />
                <CustomSkeleton width={"200px"} height={10} />
            </div>
        </div>
    )
}

export default LoadingPage