import { useParams } from "react-router-dom";
import useProduct from "./useProduct";
import { useEffect } from "react";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/productInfo/ProductInfo";
import LoadingPage from "./components/loadingPage/LoadingPage";
import RelatedProducts from "./components/RelatedProducts";

const ProductPage = () => {
    // const productId = location?.state?.productId;
    const {subcatId, productId} = useParams();
    console.log(productId);
    
    const {product, loading, error, getProductData} = useProduct();
    useEffect(() => { 
        window.scrollTo(0, 0);
        if (productId)  { 
            getProductData(productId);
        }
    }, [productId]);
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
                            <p className="text-sm text-gray-600 lg:w-2/3">{product.Desc}</p>
                        </div>
                    </div>
                )
            }

            {!loading && error && (
                <p className="w-full h-[500px] flex items-center justify-center text-lg font-semibold">
                {error}
                </p>
            )}

            {subcatId && !error && <RelatedProducts subcatId={subcatId} productId={productId} />}

        </div>
    );
};

export default ProductPage;
