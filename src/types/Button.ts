export type ButtonProps = {
    text: string;
    category: 'primary' | 'secondary';
    onClick?: () => void;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?:boolean |"disabled"
  }