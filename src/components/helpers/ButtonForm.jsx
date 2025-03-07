const ButtonForm = ({
  children,
  loading,
  onClick,
  className = "",
  type = "submit",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`relative flex justify-center items-center bg-black h-[40px] px-5 rounded text-white hover:opacity-85 transition disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      <span className={`flex items-center ${loading ? "invisible" : "visible"}`}>
        {children}
      </span>

      {loading && (
        <span className="absolute">
          <img src="/loadingSpinnerW.svg" alt="Loading..." className="w-[26px]" />
        </span>
      )}
    </button>
  );
};

export default ButtonForm;
