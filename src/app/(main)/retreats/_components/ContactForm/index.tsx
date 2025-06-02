'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';

import { format } from 'date-fns';
import { sendRetreatDataToGoogleSheets } from '~/actions/googleApi';
import { sendRetreatInquiry } from '~/actions/sendgrid/retreat';
import Button from '~/components/Button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useToast } from '~/components/ui/use-toast';
import GuestsForm from '../GuestsForm';

const formDefaultValues = {
  fullName: '',
  email: '',
  phone: '',
  villa: '',
  adults: 2,
  notes: '',
};

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
  villa: z.string(),
  adults: z.number().min(1, 'At least one adult is required'),
  notes: z.string(),
});

export type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const formOptions = {
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
    mode: 'onSubmit' as const,
  };
  const form = useForm<FormData>(formOptions);
  const { toast } = useToast();
  // const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    // setIsProcessing(true);
    try {
      await sendRetreatInquiry({
        data: {
          retreatName: 'Tribute Yoga Retreat',
          ...formData,
        },
      });
      await sendRetreatDataToGoogleSheets({
        date: format(new Date(), 'MM/dd/yy'),
        ...formData,
      });

      form.reset();
    } catch (error) {
      console.error('Failed to send inquiry:', error);
      toast({
        title: 'Form Submission Failed',
        description: 'Please contact us directly at info@masakaliretreat.com',
      });
    }
    // setIsProcessing(false);
  };

  return (
    <div id="contact-form">
      <Form {...form}>
        <form className="w-full bg-gray flex-col justify-center items-center gap-2">
          <div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
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
                  <FormLabel className="font-montserrat uppercase">
                    Email
                  </FormLabel>
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
            <span className="flex justify-between">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-montserrat uppercase">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Phone"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <GuestsForm form={form} />
            </span>
            <FormField
              control={form.control}
              name="villa"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-montserrat uppercase">
                    Villa Preference
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="villa" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="surya">Surya</SelectItem>
                      <SelectItem value="chandra">Chandra</SelectItem>
                      <SelectItem value="jala">Jala</SelectItem>
                      <SelectItem value="isvara">Isvara</SelectItem>
                      <SelectItem value="priya">Priya</SelectItem>
                      <SelectItem value="lumbung">Lumbung</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-montserrat uppercase">
                    Notes
                  </FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            callToAction="Submit"
            handleClick={form.handleSubmit(onSubmit)}
            className="my-4 w-full"
          />
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
