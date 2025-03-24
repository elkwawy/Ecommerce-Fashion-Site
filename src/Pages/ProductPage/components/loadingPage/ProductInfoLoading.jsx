import CustomSkeleton from "../../../../utilities/CustomSkeleton";


const ProductInfoLoading = () => {
    return (
        <div className="w-full flex flex-col  gap-8">
                    {/* title */}
                    <CustomSkeleton width={"250px"} height={20} />
                    
                    {/* Reviews */}
                    <CustomSkeleton width={"120px"} height={10} />

                    {/* Price Section */}
                    <div className="w-full border-b pb-2">
                        <CustomSkeleton width={"100px"} height={10} />
                    </div>
        
                    {/* Colors Section */}
                    <div className="space-y-2">
                        <CustomSkeleton width={"80px"} height={15} />
                        <CustomSkeleton width={"200px"} height={10} />
                    </div>
        
                    {/* Sizes Section */}
                    <div className="space-y-2">
                        <CustomSkeleton width={"80px"} height={15} />
                        <CustomSkeleton width={"280px"} height={10} />
                    </div>
                    {/* Add to cart */}
                    <div className="w-fit flex flex-col items-start">
                        <CustomSkeleton width={"100px"} height={10} />
                        <CustomSkeleton width={"200px"} height={20} />
                    </div> 
                </div>
    )
}

export default ProductInfoLoading