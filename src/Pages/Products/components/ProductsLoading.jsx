import CustomSkeleton from '../../../utilities/CustomSkeleton'

const ProductsLoading = () => {
    return (
        <div className="products   grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 smXl:grid-cols-5  gap-1  max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
            {[...Array(10)].map((_, index) => (
                        <div key={index} className="w-full max-sm:w-[90%]">
                        <CustomSkeleton
                            width={"100%"}
                            className={"h-[450px] sm:h-[450px] md:h-[350px] xl:h-[397px]"}
                        />
                        <CustomSkeleton width={"100%"} height={7} />
                        <CustomSkeleton width={"50%"} height={7} />
                    </div>
            ))  }
        </div>
    )
}

export default ProductsLoading