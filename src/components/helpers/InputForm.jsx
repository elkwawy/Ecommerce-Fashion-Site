const InputForm = ({
  labelName,
  type,
  name,
  value,
  onChange,
  onBlur,
  condition,
  placeholder,
  errorMessage,
  istextarea,
}) => {
  return (
    <div className="w-full mb-4">
      <div className="flex items-center justify-between gap-1 text-sm font-medium">
        <label className="block font-semibold mb-2" htmlFor={name}>
          {labelName}
        </label>
        {condition && (
          <p className="text-red-500 bg-red-200 px-2 rounded text-sm">
            {errorMessage}
          </p>
        )}
      </div>
      {istextarea ? (
        <textarea
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full border border-gray-300 trans p-2 rounded h-32  ${
            condition
              ? "border-red-600 focus:border-red-600"
              : "focus:border-gray-600"
          }`}
          placeholder={placeholder}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`w-full border border-gray-300 trans p-2 rounded ${
            condition
              ? "border-red-600 focus:border-red-600"
              : "focus:border-gray-600"
          }`}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default InputForm;
