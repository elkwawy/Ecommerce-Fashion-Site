import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonCart = () => {
  return (
    <div className="border-t border-gray-200 bg-white p-4 md:p-5 md:pb-0">
      <div className="md:flex md:items-center md:justify-between md:gap-6">
        <Skeleton width={80} height={120} />
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="flex items-center border gap-1 border-gray-300 p-1 pb-1.5">
            <Skeleton  width={20} height={20} />
            <Skeleton width={40} height={20} />
            <Skeleton width={20} height={20} />
          </div>
          <div className="text-end md:order-4 md:w-32">
            <Skeleton width={65} height={20} />
            <Skeleton width={50} height={20} />
            <Skeleton width={65} height={20} />
            <Skeleton width={50} height={20} />
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Skeleton width={150} height={20} />
          <div className="flex items-center gap-4">
            <Skeleton width={100} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCart;
