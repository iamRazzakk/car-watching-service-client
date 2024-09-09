
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Button = ({ text, type, onClick }:{text:string, type:string , onClick:any}) => {
  const buttonStyles = type === 'primary'
    ? 'bg-blue-600 hover:bg-blue-700 text-white'
    : 'bg-transparent border border-white text-white hover:bg-white hover:text-black';

  return (
    <button
      className={`px-6 py-3 rounded-lg ${buttonStyles}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
