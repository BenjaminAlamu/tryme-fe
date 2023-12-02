import { ChangeEventHandler } from 'react';

type SelectProps = {
  placeholder: string;
  options: { name: string; id: string }[];
  name?: string;
  className?: string;
  value?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const Select = (props: SelectProps) => {
  const { placeholder, name, options, className, value, onChange } = props;
  return (
    <select
      onChange={onChange}
      value={value}
      name={name}
      className={`${className} border border-gray-300 text-gray-600 rounded-lg shadow-sm`}
    >
      <option>{placeholder}</option>
      {options.map((option: any) => (
        <option key={option.id} value={option.id}>
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
