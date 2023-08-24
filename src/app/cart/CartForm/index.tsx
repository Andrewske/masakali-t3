'use client';
import 'react-phone-number-input/style.css';
import styles from './styles.module.scss';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import AddressForm from './AddressForm';

export type FormData = {
  fullName: string;
  email: string;
  phone: string;
  adults: number;
  children: number;
  address: {
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
  };
};

export default function CartForm() {
  const {
    control,
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>();
  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
      className={styles.wrapper}
    >
      <span className={styles.container}>
        <label
          className={styles.label ?? ''}
          htmlFor="fullName"
        >
          Full Name
        </label>
        <input
          {...register('fullName', { required: true })}
          name="fullName"
          aria-invalid={errors.fullName ? 'true' : 'false'}
          className={`${errors.fullName ? styles.error ?? '' : ''} ${
            styles.input ?? ''
          }`}
        />
        <label
          className={styles.label ?? ''}
          htmlFor="email"
        >
          Email
        </label>
        <input
          {...register('email', {
            required: true,
            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          })}
          name="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          className={`${errors.email ? styles.error ?? '' : ''} ${
            styles.input ?? ''
          }`}
        />
        <label
          className={styles.label ?? ''}
          htmlFor="phone"
        >
          Phone
        </label>

        <Controller
          defaultValue=""
          name="phone"
          rules={{ required: true }}
          control={control}
          render={({ field }) => (
            <PhoneInput
              value={field.value}
              onChange={(value) => field.onChange(value)}
              aria-invalid={errors.phone ? 'true' : 'false'}
              // className={`${errors.phone ? styles.error ?? '' : ''} ${
              //   styles.input ?? ''
              // }`}
              className={`${styles.phoneInputContainer ?? ''} ${
                errors.phone ? styles.error ?? '' : ''
              }`}
            />
          )}
        />
      </span>
      <span className={styles.container}>
        <AddressForm
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />
      </span>
      <span className={styles.button}>
        <input
          type="submit"
          className="button purple"
        />
      </span>
    </form>
  );
}
