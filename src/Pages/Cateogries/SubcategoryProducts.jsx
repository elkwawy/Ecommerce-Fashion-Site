import { useSelector } from "react-redux";
import CustomSkeleton from "../../utilities/CustomSkeleton";
import CategoryProduct from "./CategoryProduct";

const SubcategoryProducts = () => {

    const {products , status, error, showMoreLoading} = useSelector((state) => state.subcategory);
    
    return (
        <>
        
            {status == 'succeeded' && products &&<div className="products pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 smXl:grid-cols-5  gap-2  max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
                { products.map((product) => (
                    <CategoryProduct key={product._id} product={product}  />
                ))}
                {
                    showMoreLoading && (
                        [...Array(12)].map((_, index) => (
                            <div key={index} className="w-full max-sm:w-[90%]" >
                                <CustomSkeleton width={'100%'} className={'h-[450px] sm:h-[450px] md:h-[350px] xl:h-[397px]'}  />
                                <CustomSkeleton width={'100%'} height={7} />
                                <CustomSkeleton width={'50%'} height={7} />
                            </div>
                        ))
                    )
                }
            </div>}
            {
                status === 'loading' && (
                    <div className="products pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 smXl:grid-cols-5  gap-1  max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
                        {
                            [...Array(12)].map((_, index) => (
                                <div key={index} className="w-full max-sm:w-[90%]" >
                                    <CustomSkeleton width={'100%'} className={'h-[450px] sm:h-[450px] md:h-[350px] xl:h-[397px]'}  />
                                    <CustomSkeleton width={'100%'} height={7} />
                                    <CustomSkeleton width={'50%'} height={7} />
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                status === 'failed' && (
                    <div className="w-full h-[500px] flex items-center justify-center">
                        {error}
                    </div>
                )
            }
            {
                products.length == 0 && status == 'succeeded' && (
                    <div className="w-full h-[500px] flex items-center justify-center">
                        More products are coming soon.
                    </div>
                )
            }
        </>
    )
}

export default SubcategoryProducts