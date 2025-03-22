import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../../components/ProductCard";
import { fetchProducts } from "../../../Redux Toolkit/slices/allProductsSlice";
import ProductsError from "./ProductsError";
import ProductsLoading from "./ProductsLoading";

const ProductsSection = () => {
    const {products, loading, error, hasMore, searchTerm} = useSelector((state) => state.allProducts);
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchProducts());
    }, []);
    const handleShowMore = () => { 
        dispatch(fetchProducts());
    }
    return (
        <div className="pt-10">
            <div className="products  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 smXl:grid-cols-5 gap-2 max-sm:gap-4 max-sm:flex max-sm:flex-col max-sm:items-center">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>
            {
                hasMore && !loading && <div className='w-full text-center mt-8'>
                    <button className='mx-auto bg-black hover:opacity-80 trans px-3 py-2 text-white ' onClick={handleShowMore}>Show more</button>
                </div>
            }  
            { loading && <ProductsLoading /> }
            {error && !loading && <ProductsError error={error} searchTerm={searchTerm} />}
        </div>
    );
};

export default ProductsSection;
