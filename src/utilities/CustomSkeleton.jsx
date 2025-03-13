import Skeleton from "react-loading-skeleton";



const CustomSkeleton = (props) => {
    return (
        <Skeleton
            baseColor="#E0E0E0"  // Light gray (background color)
            highlightColor="#F5F5F5"  // Almost white (shimmer effect)
            borderRadius={0}
            {...props}
        />
    );
};

export default CustomSkeleton;