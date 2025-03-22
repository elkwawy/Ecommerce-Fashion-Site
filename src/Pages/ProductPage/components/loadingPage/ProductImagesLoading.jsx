import CustomSkeleton from "../../../../utilities/CustomSkeleton"


const ProductImagesLoading = () => {
    return (
        <div className="flex gap-5 max-sm:flex-col-reverse max-sm:items-center max-md:justify-center min-h-[618px] sm:min-h-[456px] lg:min-w-[590px] ">
            <div className="flex  sm:flex-col gap-2">
                {
                    [0,1].map((img) => <CustomSkeleton width={"100px"} height={"150px"}  />)
                }
            </div>
            <CustomSkeleton className="h-[450px] w-[300px] lg:w-[305px] sm:h-[456px] " width={"305px"} height={"456px"}  />
        </div>
    )
}

export default ProductImagesLoading