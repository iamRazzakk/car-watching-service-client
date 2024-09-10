
const ILabel = ({ label,htmlFor }:{label:string,htmlFor:string}) => {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
      {label}
    </label>
  );
};

export default ILabel;
