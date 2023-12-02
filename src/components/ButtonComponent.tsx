import { MouseEventHandler } from 'react';

type ButtonProps = {
  text: string;
  className?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | any;
};

const Button = (props: ButtonProps) => {
  const { text, className, onClick, isDisabled, isLoading } = props;
  return (
    <button
      disabled={isDisabled}
      onClick={onClick}
      className={`${className} w-full bg-primary text-white px-[27px] py-[12px] rounded-[8px]`}
    >
      {isLoading ? 'Loading...' : text}
    </button>
  );
};

Button.defaultProps = {
  isLoading: false,
  isDisabled: false
};

export default Button;
