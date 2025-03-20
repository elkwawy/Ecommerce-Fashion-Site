import { useDispatch, useSelector } from "react-redux";
import CustomSkeleton from "../../../../utilities/CustomSkeleton";
import ProductCard from "../../../../components/ProductCard";
import { useEffect } from "react";
import { allProduct } from "../../../../Redux Toolkit/slices/productSlice";
export default function NewArrivals() {
  const dispatch = useDispatch();
  const { products, status, error, limit } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(allProduct({ page: 1, limit: limit }));
  }, []);
  return (
    <div className="container mx-auto">
      {status == "succeeded" && products && (
        <div className="grid grid-cols-1 gap-2 lg:grid-cols-4 max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:items-center md:grid-cols-3 products pt-10 sm:grid-cols-2 smXl:grid-cols-5">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              showDiscount={false}
            />
          ))}
        </div>
      )}
      {status === "loading" && (
        <div className="grid grid-cols-1 gap-1 lg:grid-cols-4 max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:items-center md:grid-cols-3 products pt-10 sm:grid-cols-2 smXl:grid-cols-5">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="w-full max-sm:w-[90%]">
              <CustomSkeleton
                width={"100%"}
                className={"h-[450px] sm:h-[450px] md:h-[350px] xl:h-[397px]"}
              />
              <CustomSkeleton width={"100%"} height={7} />
              <CustomSkeleton width={"50%"} height={7} />
            </div>
          ))}
        </div>
      )}

      {status === "failed" && (
        <div className="flex h-[500px] justify-center w-full items-center">
          {error}
        </div>
      )}
      {products.length == 0 && status == "succeeded" && (
        <div className="flex h-[500px] justify-center w-full items-center">
          More products are coming soon.
        </div>
      )}
    </div>
  );
}
