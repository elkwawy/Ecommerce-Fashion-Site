import { useSelector } from "react-redux";
import LoadingSpinner from "../../utilities/LoadingSpinner";
import CategoryProduct from "./CategoryProduct";
import CustomSkeleton from "../../utilities/CustomSkeleton";
import Skeleton from "react-loading-skeleton";

const SubcategoryProducts = () => {

    const {products , status, error} = useSelector((state) => state.subcategory);
    
    return (
        <>
        
            {status == 'succeeded' && products &&<div className="products pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 smXl:grid-cols-5  gap-1  max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
                { products.map((product) => (
                    <CategoryProduct key={product._id} priceAfterDiscount={product?.priceAfterDiscount || null}  image={product.image} name={product.name} price={product.price} colors={[...product.colors]} />
                ))}
            </div>}
            {
                status === 'loading' && (
                    // <div className="w-full h-[500px] flex items-center justify-center">
                    //     <LoadingSpinner />
                    // </div>
                    <div className="products pt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 smXl:grid-cols-5  gap-1  max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
                        {
                            [...Array(12)].map((_, index) => (
                                <div key={index}>
                                    <CustomSkeleton width={'100%'} height={397} />
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