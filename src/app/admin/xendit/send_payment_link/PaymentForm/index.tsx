'use client';
import { useForm } from '@tanstack/react-form';
import type { AnyFieldApi } from '@tanstack/react-form';
import { useState } from 'react';
import { z } from 'zod';
import type { DirectBookingTemplateData } from '~/actions/sendgrid';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';

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

const formatIDR = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

interface TotalCalculationParams {
  pricePerNight: number;
  nights: number;
  discount: boolean;
  tax: boolean;
}

const DISCOUNT_RATE = 0.9;
const TAX_RATE = 1.1;

const calculateTotal = ({
  pricePerNight,
  nights,
  discount,
  tax,
}: TotalCalculationParams): number => {
  const baseTotal = pricePerNight * nights;
  const withDiscount = discount ? baseTotal * DISCOUNT_RATE : baseTotal;
  const withTax = tax ? withDiscount * TAX_RATE : withDiscount;

  return withTax;
};

export default function PaymentForm() {
  const [total, setTotal] = useState(0);
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      description: '',
      villa: '',
      nights: '',
      pricePerNight: '',
      discount: false,
      tax: false,
    },
    validators: {
      onChange: z.object({
        email: z.string().email(),
        firstName: z.string().min(1, 'First Name is required'),
        lastName: z.string().min(1, 'Last Name is required'),
        description: z.string().min(1, 'Description is required'),
        villa: z.string().min(1, 'Villa is required'),
        nights: z.string().min(1, 'Nights is required'),
        pricePerNight: z.string().min(1, 'Price per night is required'),
        discount: z.boolean(),
        tax: z.boolean(),
      }),
    },
    onSubmit: async ({ value }) => {
      try {
        console.log(value);
      } catch (error) {
        console.error(error);
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
    };

    const total = calculateTotal({
      ...formValues,
    });

    console.log(total);
    // setTotal(total);
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await form.handleSubmit();
      }}
      className="max-w-[600px] md:w-[90%] w-[95%] mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200"
    >
      <h1 className="text-2xl! font-extrabold my-4! text-center text-purple">
        Send Payment Link
      </h1>
      <div className="space-y-6">
        <form.Field
          name="email"
          children={(field) => (
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Guest Email
              </label>
              <Input
                type="email"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="firstName"
          children={(field) => (
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="lastName"
          children={(field) => (
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="description"
          children={(field) => (
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="villa"
          children={(field) => (
            <div>
              <label
                htmlFor="villa"
                className="block text-sm font-medium text-gray-700"
              >
                Villa Name
              </label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="nights"
          validators={{
            onChangeListenTo: ['pricePerNight', 'discount', 'tax'],
            onChange: ({ fieldApi }) => totalOnChange({ fieldApi }),
          }}
          children={(field) => (
            <div>
              <label
                htmlFor="nights"
                className="block text-sm font-medium text-gray-700"
              >
                Nights
              </label>
              <Input
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value ?? '')}
                // onChange={(e) => {
                //   const value = e.target.value;
                //   field.handleChange(
                //     value === '' ? '' : parseInt(value, 10) || 0
                //   );
                // }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="pricePerNight"
          validators={{
            onChangeListenTo: ['nights', 'discount', 'tax'],
            onChange: ({ fieldApi }) => totalOnChange({ fieldApi }),
          }}
          children={(field) => (
            <div>
              <label
                htmlFor="pricePerNight"
                className="block text-sm font-medium text-gray-700"
              >
                Price Per Night
              </label>
              <Input
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value ?? '')}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="discount"
          validators={{
            onChangeListenTo: ['nights', 'pricePerNight', 'tax'],
            onChange: ({ fieldApi }) => totalOnChange({ fieldApi }),
          }}
          children={(field) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="discount"
                className="ml-2 block text-sm text-gray-900"
              >
                Discount
              </label>
            </div>
          )}
        />

        <form.Field
          name="tax"
          validators={{
            onChangeListenTo: ['nights', 'pricePerNight', 'discount'],
            onChange: ({ fieldApi }) => totalOnChange({ fieldApi }),
          }}
          children={(field) => (
            <div className="flex items-center">
              <input
                type="checkbox"
                id={field.name}
                name={field.name}
                checked={field.state.value}
                onChange={(e) => field.handleChange(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="tax"
                className="ml-2 block text-sm text-gray-900"
              >
                Tax
              </label>
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex justify-between items-center">
              <button
                type="submit"
                disabled={!canSubmit}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSubmitting ? '...' : 'Submit'}
              </button>
              <button
                type="reset"
                onClick={() => form.reset()}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Reset
              </button>
            </div>
          )}
        />
      </div>
    </form>
  );
}
