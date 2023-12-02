import { MouseEventHandler } from 'react';

type ButtonProps = {
  text: string;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | any;
};

const Button = (props: ButtonProps) => {
  const { text, className, onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`${className} w-full bg-primary text-white px-[27px] py-[12px] rounded-[8px]`}
    >
      {text}
    </button>
  );
};

export default Button;
