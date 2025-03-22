import { useLocation } from "react-router-dom";
import useProduct from "./useProduct";
import { useEffect } from "react";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/productInfo/ProductInfo";
import LoadingPage from "./components/loadingPage/LoadingPage";


const ProductPage = () => {
    const location = useLocation();
    const productId = location?.state?.productId;
    const {product, loading, error, getProductData} = useProduct();
    useEffect(() => { 
        window.scrollTo(0, 0);
        if (productId)  { 
            getProductData(productId);
        }
    }, []);
    console.log(product);
    
    return (
        <div className="min-h-[500px]">
            {
                loading && <LoadingPage />
            }

            {
                !loading && !error && 
                (
                    <div className="px-5 md:px-10 lg:px-20 py-10 space-y-10">
                        <div className="flex flex-col md:flex-row w-full gap-10 ">
                            {/* Product Images */}
                            <ProductImages images={product?.images && product?.image ? [product.image, ...product?.images ] : null} />
                            {/* Product Info */}
                            <ProductInfo product={product} />
                        </div>
                        <div className="space-y-1">
                            <h2 className="text-xl font-semibold">Product Description</h2>
                            <p className="text-sm text-gray-600 lg:w-1/2">{product.Desc}</p>
                        </div>
                    </div>
                )
            }

            {!loading && error && (
                <p className="w-full h-[500px] flex items-center justify-center text-lg font-semibold">
                {error}
                </p>
            )}
        </div>
  );
};

export default ProductPage;
