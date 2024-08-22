import { type UseFormReturn } from 'react-hook-form';
import { Button } from '~/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import type { FormData } from '../ContactForm';

interface GuestsFormProps {
  form: UseFormReturn<FormData>; // Here's the type for your form prop
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
        <div className="flex items-center gap-1">
          <Button
            type="button"
            className="w-6 h-6 p-0 bg-purple"
            onClick={onDecrement}
          >
            -
          </Button>
          <FormControl>
            <Input
              placeholder={label}
              value={value}
              readOnly
              className="w-10 text-center"
            />
          </FormControl>
          <Button
            type="button"
            className="w-6 h-6 p-0 bg-purple"
            onClick={onIncrement}
          >
            +
          </Button>
          <FormMessage />
        </div>
      </FormItem>
    )}
  />
);

const GuestsForm = ({ form }: GuestsFormProps) => {
  const { setValue, getValues, watch } = form;

  const adults = watch('adults');

  const incrementGuests = () => {
    setValue('adults', getValues('adults') + 1);
  };

  const decrementGuests = () => {
    if (adults > 1) {
      setValue('adults', getValues('adults') - 1);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-1 py-2">
      <Counter
        label="Adults"
        value={adults}
        onIncrement={incrementGuests}
        onDecrement={decrementGuests}
      />
    </div>
  );
};

export default GuestsForm;
