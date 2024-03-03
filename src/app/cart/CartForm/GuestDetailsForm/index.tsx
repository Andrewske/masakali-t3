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
import GuestsForm from './GuestsForm';
import { VillaNamesType } from '~/lib/villas';

interface GuestsDetailsFormProps {
  form: UseFormReturn<any>;
  villaName: VillaNamesType;
}

const GuestDetailsForm = ({ form, villaName }: GuestsDetailsFormProps) => {
  return (
    <div>
      <FormField
        control={form.control}
        name="fullName"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel className="font-montserrat uppercase">
              <p>Full Name</p>
              <FormMessage />
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Full Name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-montserrat uppercase">Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Email"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-montserrat uppercase">Phone</FormLabel>
            <FormControl>
              <Input
                placeholder="phone"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <GuestsForm
        form={form}
        villaName={villaName}
      />
    </div>
  );
};

export default GuestDetailsForm;
