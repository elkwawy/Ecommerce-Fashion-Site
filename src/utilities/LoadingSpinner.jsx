const LoadingSpinner = ({style}) => {
    return (
        <img src="/loading-spinner2.svg" className={`${style ? style : "w-10 h-10"}`} alt="" />
    )
}

export default LoadingSpinner

