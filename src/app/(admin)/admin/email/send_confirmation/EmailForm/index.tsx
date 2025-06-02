'use client';
import { useForm } from '@tanstack/react-form';
import type { AnyFieldApi } from '@tanstack/react-form';
import { z } from 'zod';
import Button from '~/components/Button';
import { Input } from '~/components/ui/input';
import { formatCurrency } from '~/utils/helpers';
import { sendDirectBookingConfirmation } from '~/actions/sendgrid';
import { tryCatch } from '~/utils/tryCatch';
import { logAndToast } from '~/utils/logError';

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

export default function EmailForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      name: '',
      villa: '',
      checkIn: '',
      checkOut: '',
      total: '',
    },
    validators: {
      onChange: z.object({
        email: z.string().email(),
        name: z.string().min(1, 'Name is required'),
        villa: z.string().min(1, 'Villa is required'),
        checkIn: z.string().date('Invalid date format use 2025-01-01'),
        checkOut: z.string().date('Invalid date format use 2025-01-01'),
        total: z.string().min(1, 'Total is required'),
      }),
    },
    onSubmit: async ({ value }) => {
      console.log('Submitting...');

      const startDate = new Date(value.checkIn).getUTCDate();
      const formattedStartDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(startDate);

      const endDate = new Date(value.checkOut).getUTCDate();
      const formattedEndDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      }).format(endDate);

      const { error } = await tryCatch(
        sendDirectBookingConfirmation({
          ...value,
          checkIn: formattedStartDate,
          checkOut: formattedEndDate,
          total: formatCurrency(parseFloat(value.total), 'IDR'),
        })
      );

      if (error) {
        logAndToast({
          message: 'Error sending direct booking confirmation',
          error,
          level: 'error',
          data: { location: 'EmailForm' },
        });
      }
      form.reset();
    },
  });

  return (
    <form className="max-w-[600px] md:w-[90%] w-[95%] mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl! font-extrabold my-4! text-center text-purple">
        Direct Booking Confirmation Email
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
          name="name"
          children={(field) => (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Guest Name
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
          name="checkIn"
          children={(field) => (
            <div>
              <label
                htmlFor="checkIn"
                className="block text-sm font-medium text-gray-700"
              >
                Check In Date
              </label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="YYYY-MM-DD"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="checkOut"
          children={(field) => (
            <div>
              <label
                htmlFor="checkOut"
                className="block text-sm font-medium text-gray-700"
              >
                Check Out Date
              </label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="YYYY-MM-DD"
              />
              <FieldInfo field={field} />
            </div>
          )}
        />
        <form.Field
          name="total"
          children={(field) => (
            <div>
              <label
                htmlFor="total"
                className="block text-sm font-medium text-gray-700"
              >
                Total IDR
              </label>
              <Input
                type="number"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  const value = e.target.value;
                  field.handleChange(value);
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <FieldInfo field={field} />
              <div className="text-sm text-gray-500 mt-1">
                {formatCurrency(parseFloat(field.state.value), 'IDR')}
              </div>
            </div>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={() => (
            <div className="flex justify-between items-center">
              <Button
                callToAction={'Submit'}
                handleClick={() => form.handleSubmit()}
                isLoadingText="Submitting..."
              />
              <Button
                callToAction="Reset"
                handleClick={() => form.reset()}
              />
            </div>
          )}
        />
      </div>
    </form>
  );
}
