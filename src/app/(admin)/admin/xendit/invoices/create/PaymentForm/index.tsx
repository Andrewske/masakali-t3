'use client';
import { useForm } from '@tanstack/react-form';
import type { AnyFieldApi } from '@tanstack/react-form';
import { resolve } from 'path';
import { useState } from 'react';
import { z } from 'zod';

import { createPaymentLink } from '~/actions/xendit/createPaymentInvoice';
import Button from '~/components/Button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { toast } from '~/components/ui/use-toast';
import { formatCurrency } from '~/utils/helpers';
import { logError } from '~/utils/logError';

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.errors.length ? (
        <em className="text-red-500 text-sm mt-1">
          {field.state.meta.errors
            .map((error: { message: string }) => error.message || '')
            .join(',')}
        </em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

interface TotalCalculationParams {
  pricePerNight: number;
  nights: number;
  discount: boolean;
  tax: boolean;
  discountAmount: number;
  taxAmount: number;
}

const calculateTotal = ({
  pricePerNight,
  nights,
  discount,
  tax,
  discountAmount,
  taxAmount,
}: TotalCalculationParams): number => {
  if (isNaN(pricePerNight * nights)) {
    return 0;
  }

  let total = pricePerNight * nights;

  if (discount) {
    const discountMultiplier = 1 - discountAmount / 100;
    total *= discountMultiplier;
  }

  if (tax) {
    const taxMultiplier = 1 + taxAmount / 100;
    total *= taxMultiplier;
  }

  return total;
};

// Reusable Input Component
const FormInput = ({
  field,
  label,
  type = 'text',
  fieldInfo = true,
}: {
  field: AnyFieldApi;
  label: string;
  type?: string;
  fieldInfo?: boolean;
}) => {
  const props = {
    id: field.name,
    name: field.name,
    type,
    value: field.state.value as string,
    onBlur: field.handleBlur,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) =>
      field.handleChange(
        type === 'number' ? parseInt(e.target.value ?? '') : e.target.value
      ),
    className:
      'mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
  };
  return (
    <div>
      <label
        htmlFor={field.name}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      {type === 'textarea' ? <Textarea {...props} /> : <Input {...props} />}
      {fieldInfo && <FieldInfo field={field} />}
    </div>
  );
};

// Reusable Checkbox Component
const FormCheckbox = ({
  field,
  label,
}: {
  field: AnyFieldApi;
  label: string;
}) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      id={field.name}
      name={field.name}
      checked={field.state.value as boolean}
      onChange={(e) => field.handleChange(e.target.checked)}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label
      htmlFor={field.name}
      className="ml-2 block text-sm text-gray-900"
    >
      {label}
    </label>
  </div>
);

export default function PaymentForm() {
  const [total, setTotal] = useState(0);
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      description: '',
      villa: '',
      nights: 1,
      pricePerNight: 0,
      discount: false,
      tax: false,
      discountAmount: 10,
      taxAmount: 10,
    },
    validators: {
      onChange: z.object({
        email: z.string().email(),
        firstName: z.string().min(1, 'First Name is required'),
        lastName: z.string(),
        description: z.string(),
        villa: z.string().min(1, 'Villa is required'),
        nights: z.number().min(1, 'Nights is required'),
        pricePerNight: z.number().min(1, 'Price per night is required'),
        discount: z.boolean(),
        tax: z.boolean(),
        discountAmount: z.number().min(0, 'Discount amount is required'),
        taxAmount: z.number().min(0, 'Tax amount is required'),
      }),
    },
    onSubmit: async ({ value }) => {
      try {
        if (total < 5000) {
          throw new Error('Total amount must be at least Rp. 5.000');
        }
        // const paymentLinkData = {
        //   ...value,
        //   amount: total,
        // };
        throw new Error('Test error');
        // await createPaymentLink(value);
        toast({
          title: 'Payment link sent',
        });
        // form.reset();
      } catch (error) {
        logError({
          message: 'Error sending payment link',
          error,
          level: 'error',
          data: {
            location: 'PaymentForm',
          },
        });
      }
    },
  });

  const totalOnChange = ({ fieldApi }: { fieldApi: AnyFieldApi }) => {
    const formValues = {
      pricePerNight: parseFloat(
        fieldApi.form.getFieldValue('pricePerNight') as string
      ),
      nights: parseFloat(fieldApi.form.getFieldValue('nights') as string),
      discount: fieldApi.form.getFieldValue('discount') as boolean,
      tax: fieldApi.form.getFieldValue('tax') as boolean,
      discountAmount: parseInt(
        fieldApi.form.getFieldValue('discountAmount') as string
      ),
      taxAmount: fieldApi.form.getFieldValue('taxAmount') as number,
    };

    const total = calculateTotal({
      ...formValues,
      discountAmount: isNaN(formValues.discountAmount)
        ? 0
        : formValues.discountAmount,
      taxAmount: formValues.taxAmount,
    });

    setTotal(total);
  };

  return (
    <form
      // onSubmit={async (e) => {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   await form.handleSubmit();
      // }}
      className="max-w-[600px] md:w-[90%] w-[95%] mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h1 className="text-2xl! font-extrabold my-4! text-center text-purple">
        Send Payment Link
      </h1>
      <div className="space-y-6">
        <form.Field
          name="email"
          children={(field) => (
            <FormInput
              field={field}
              label="Guest Email"
              type="email"
            />
          )}
        />
        <form.Field
          name="firstName"
          children={(field) => (
            <FormInput
              field={field}
              label="First Name"
            />
          )}
        />
        <form.Field
          name="lastName"
          children={(field) => (
            <FormInput
              field={field}
              label="Last Name"
            />
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <FormInput
              field={field}
              label="Description"
              type="textarea"
            />
          )}
        />
        <form.Field
          name="villa"
          children={(field) => (
            <FormInput
              field={field}
              label="Villa Name"
            />
          )}
        />
        <form.Field
          name="nights"
          children={(field) => (
            <FormInput
              field={field}
              label="Nights"
              type="number"
              fieldInfo={false}
            />
          )}
        />
        <form.Field
          name="pricePerNight"
          children={(field) => (
            <FormInput
              field={field}
              label="Price Per Night"
              type="number"
              fieldInfo={false}
            />
          )}
        />
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col gap-2 col-span-2">
            <div className="flex justify-between items-center gap-2">
              <form.Field
                name="discount"
                children={(field) => (
                  <FormCheckbox
                    field={field}
                    label="Discount"
                  />
                )}
              />

              <form.Field
                name="discountAmount"
                validators={{
                  onChangeListenTo: [
                    'nights',
                    'pricePerNight',
                    'tax',
                    'discount',
                  ],
                  onChange: ({ fieldApi }) => totalOnChange({ fieldApi }),
                }}
                children={(field) => (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="w-18 text-sm"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(parseInt(e.target.value))
                      }
                    />
                    <span className="text-sm">%</span>
                  </div>
                )}
              />
            </div>
            <div className="flex justify-between items-center gap-2 w-full">
              <form.Field
                name="tax"
                children={(field) => (
                  <FormCheckbox
                    field={field}
                    label="Tax"
                  />
                )}
              />

              <form.Field
                name="taxAmount"
                validators={{
                  onChangeListenTo: [
                    'nights',
                    'pricePerNight',
                    'tax',
                    'discount',
                  ],
                  onChange: ({ fieldApi }) => totalOnChange({ fieldApi }),
                }}
                children={(field) => (
                  <div className="flex items-center gap-1">
                    <Input
                      type="number"
                      min={0}
                      max={100}
                      className="w-18 text-sm"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(parseInt(e.target.value))
                      }
                    />
                    <span className="text-sm">%</span>
                  </div>
                )}
              />
            </div>
          </div>
          <div className="my-auto col-span-1"></div>
          <span className="my-auto col-span-2">
            <p className="text-lg font-bold">
              Total: {formatCurrency(total ?? 0, 'IDR')}
            </p>
          </span>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit]) => (
            <div className="flex justify-between items-center">
              <Button
                callToAction="Submit"
                handleClick={() => form.handleSubmit()}
                isLoadingText="Processing..."
                disabled={!canSubmit}
              />
            </div>
          )}
        />
      </div>
    </form>
  );
}
