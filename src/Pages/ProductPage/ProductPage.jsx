import { useLocation } from "react-router-dom";
import useProduct from "./useProduct";
import { useEffect } from "react";
import ProductImages from "./components/ProductImages";
import ProductInfo from "./components/ProductInfo";

const ProductPage = () => {
  const location = useLocation();
  const productId = location?.state?.productId;
  const { product, loading, error, getProductData } = useProduct();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId) {
      getProductData(productId);
    }
  }, []);
  console.log(product);

  return (
    <div className="min-h-[500px]">
      {loading && <p>Loading...</p>}

      {!loading && !error && (
        <div className="flex w-full gap-10 px-20 py-10 ">
          {/* Product Images */}
          <ProductImages
            images={
              product?.images && product?.image
                ? [product.image, ...product?.images]
                : null
            }
          />
          {/* Product Info */}
          <ProductInfo product={product} />
        </div>
      )}

      {!loading && error && (
        <p className="w-full h-[500px] flex items-center justify-center text-lg font-semibold">
          {error}
        </p>
      )}
    </div>
  );
};

export default ProductPage;
