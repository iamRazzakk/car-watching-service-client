import { CInput } from "../../types/FormTypes/CInput.types";


const CInput: React.FC<CInput> = ({
  
  name,
  placeholder = "",
  type = "",
  value,
  onChange,
  error,
}) => {
  return (
    <div className="mb-4">
      
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          error ? "border-red-500" : ""
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default CInput;
