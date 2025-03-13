import { memo } from "react";
import loader from "../assets/loaderW.svg";
const LoaderW = memo(({ className }) => {
  return (
    <img
      draggable={false}
      src={loader}
      alt="Loading..."
      className={className}
    />
  );
});

export default LoaderW;
