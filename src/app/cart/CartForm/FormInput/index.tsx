import styles from './styles.module.scss';
import type { UseFormRegister, FieldErrors } from 'react-hook-form';
import { type FormData } from '../index';

type FormInputProps = {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
  type: keyof FormData;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormInput = ({
  register,
  errors,
  type,
  label,
  onChange,
}: FormInputProps) => {
  const name = type.replace('address.', '');
  return (
    <span className={styles.wrapper}>
      <label
        className={styles.label}
        htmlFor={type}
      >
        {label}
      </label>
      <input
        {...register(type, {
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        })}
        name={name}
        aria-invalid={errors[type] ? 'true' : 'false'}
        className={`${errors[type] ? styles.error ?? '' : ''} ${
          styles.input ?? ''
        }`}
        onChange={(value) => onChange(value)}
      />
    </span>
  );
};
export default FormInput;
