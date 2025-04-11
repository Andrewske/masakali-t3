import { type UseFormReturn } from 'react-hook-form';
import Button from '~/components/Button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import type { VillaNamesType } from '~/lib/villas';
import { villaGuestLimits } from '~/lib/villas';
import { capitalize } from 'lodash';

import type { FormData } from '../../getFormSchema';

interface GuestsFormProps {
  form: UseFormReturn<FormData>;
  villaName: VillaNamesType; // Here's the type for your form prop
}

interface CounterProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const Counter: React.FC<CounterProps> = ({
  label,
  value,
  onIncrement,
  onDecrement,
}) => (
  <FormField
    name={label.toLowerCase()}
    render={() => (
      <FormItem className="flex flex-col ">
        <FormLabel className="font-montserrat uppercase">{label}</FormLabel>
        <div className="flex items-center gap-2">
          <Button
            callToAction="-"
            className="w-6 h-6 !text-sm !p-0 !m-0 bg-purple"
            handleClick={onDecrement}
          />
          <FormControl>
            <Input
              placeholder={label}
              value={value}
              readOnly
              className="w-10 text-center"
            />
          </FormControl>
          <Button
            callToAction="+"
            className="w-6 h-6 !text-sm !p-0 !m-0 bg-purple"
            handleClick={onIncrement}
          />
          <FormMessage />
        </div>
      </FormItem>
    )}
  />
);

const GuestsForm = ({ form, villaName }: GuestsFormProps) => {
  const { setValue, getValues, watch, setError, clearErrors } = form;

  const adults = watch('adults');
  const children = watch('children');
  const guests = getValues('adults') + getValues('children');

  const limits = villaGuestLimits[villaName];

  const incrementGuests = () => {
    if (guests < limits.maxGuests && adults < limits.maxAdults) {
      setValue('adults', getValues('adults') + 1);
    } else {
      setError('adults', {
        type: 'manual',
        message: `Maximum for ${capitalize(villaName)} is ${limits.maxAdults}`,
      });
    }
  };

  const decrementGuests = () => {
    if (guests > 1) {
      setValue('adults', getValues('adults') - 1);
    }
    clearErrors('adults');
  };

  const incrementChildren = () => {
    if (children < limits.maxGuests && children < limits.maxChildren) {
      setValue('children', getValues('children') + 1);
    } else {
      setError('children', {
        type: 'manual',
        message: `Maximum for ${capitalize(villaName)} is ${
          limits.maxChildren
        }`,
      });
    }
  };

  const decrementChildren = () => {
    if (children > 0) {
      setValue('children', getValues('children') - 1);
    }
    clearErrors('children');
  };

  return (
    <div className="grid grid-cols-2 gap-1 py-2">
      <Counter
        label="Adults"
        value={adults}
        onIncrement={incrementGuests}
        onDecrement={decrementGuests}
      />
      <Counter
        label="Children"
        value={children}
        onIncrement={incrementChildren}
        onDecrement={decrementChildren}
      />
    </div>
  );
};

export default GuestsForm;
