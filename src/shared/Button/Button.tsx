import { ButtonProps } from "../../types/Button";


const Button: React.FC<ButtonProps> = ({
  text,
  category,
  onClick,
  className = '', 
}) => {
  const buttonStyles = category === 'primary'
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white';

  const hoverBgColor = category === 'primary'
    ? 'bg-white border border-blue-700'
    : 'bg-blue-600';

  const hoverTextColor = category === 'primary'
    ? 'group-hover:text-black'
    : 'group-hover:text-white';

  return (
    <button
      className={`px-6 py-3 rounded-lg ${buttonStyles} relative overflow-hidden group ${className}`}
      onClick={onClick}
    >
      <span className={`relative z-10 transition-colors duration-300 ease-out ${hoverTextColor}`}>
        {text}
      </span>
      <span className={`absolute inset-0 ${hoverBgColor} z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out`}></span>
    </button>
  );
};

export default Button;