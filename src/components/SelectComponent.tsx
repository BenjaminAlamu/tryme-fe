import { ChangeEventHandler } from 'react';

type SelectProps = {
  placeholder: string;
  options: { name: string; id: string }[];
  name?: string;
  className?: string;
  value?: string;
  id: string;
  register: (id: string, validation: object) => void;
  type?: string;
  labelText?: string;
  validation: object;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
};

const Select = (props: SelectProps) => {
  const {
    placeholder,
    name,
    options,
    className,
    value,
    onChange,
    labelText,
    id,
    register,
    validation
  } = props;
  return (
    <div>
      <label className="block">{labelText}</label>
      <select
        onChange={onChange}
        name={name}
        id={id}
        value={value}
        className={`${className} border border-gray-300 text-gray-600 rounded-lg shadow-sm p-2`}
      >
        <option>{placeholder}</option>
        {options.map((option: any) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

Select.defaultProps = {
  error: null,
  errorMessage: '',
  validation: {},
  register: () => {}
};

export default Select;
