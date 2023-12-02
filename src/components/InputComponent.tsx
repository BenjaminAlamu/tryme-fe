/* eslint-disable react/jsx-props-no-spreading */
import { styled } from 'styled-components';
import { PencilSimple } from '@phosphor-icons/react';

type handleChange = (e: React.ChangeEvent<HTMLInputElement>) => void | null;

interface textAreaType {
  name: string;
  placeholder: string;
  handleChange: handleChange;
  value: string;
  id: string;
  register: any;
  error?: boolean | undefined;
  errorMessage?: string;
  type?: string;
  labelText?: string;
  validation: object;
}

const InputComponent = ({
  name,
  placeholder,
  handleChange,
  value,
  id,
  register,
  error,
  errorMessage,
  type,
  labelText,
  validation
}: textAreaType) => (
  <div className="text-left">
    <label>{labelText}</label>
    <input
      className={`h-4 px-2 py-5 w-full rounded border ${error ? 'border-red-400' : ''}`}
      placeholder={placeholder}
      {...register(id, { ...validation })}
      name={name}
      onChange={handleChange}
      id={id}
      value={value}
      autoComplete="off"
      error={error}
      type={type}
    />
    {error && <p className="text-red-400 text-left">{errorMessage}</p>}
  </div>
);

InputComponent.defaultProps = {
  error: null,
  errorMessage: '',
  type: 'text',
  labelText: 'Enter Value',
  validation: {}
};

export default InputComponent;
