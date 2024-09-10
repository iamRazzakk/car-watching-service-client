// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = ({ text, type, onClick }:{text:string, type:string , onClick:any}) => {
  const buttonStyles = type === 'primary'
    ? 'bg-blue-600 hover:bg-blue-700 text-white  '
    : 'relative overflow-hidden  text-white border hover:border-white';

  const hoverBgColor = type === 'primary'
    ? 'bg-white border border-blue-700'
    : 'bg-blue-600';

  const hoverTextColor = type === 'primary'
    ? 'group-hover:text-black'
    : 'group-hover:text-white ';

  return (
    <button
      className={`px-6 py-3 rounded-lg ${buttonStyles} relative overflow-hidden group`}
      onClick={onClick}
    >
      {/* This span holds the text */}
      <span className={`relative z-10 transition-colors duration-300 ease-out ${hoverTextColor}`}>
        {text}
      </span>
      {/* This span is for the sliding background effect */}
      <span className={`absolute inset-0 ${hoverBgColor} z-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out`}></span>
    </button>
  );
};

export default Button;
