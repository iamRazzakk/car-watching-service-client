
 interface TitleProps {
  text: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
}
const Title: React.FC<TitleProps> = ({ text, level = 2, className = "" }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={`text-gray-900 font-bold ${className}`}>
      {text}
    </HeadingTag>
  );
};
export default Title;
