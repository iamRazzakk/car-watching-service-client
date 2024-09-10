export type ButtonProps = {
    text: string;
    category: 'primary' | 'secondary';
    onClick?: () => void;
    className?: string;
  }