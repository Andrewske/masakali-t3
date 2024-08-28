'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import GuestsForm from '../GuestsForm';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { sendRetreatInquiry } from '~/actions/sendgrid/retreat';
import { useToast } from '~/components/ui/use-toast';
import { sendRetreatDataToGoogleSheets } from '~/actions/googleApi';
import { format } from 'date-fns';

const formDefaultValues = {
  fullName: '',
  email: '',
  phone: '',
  adults: 2,
  notes: '',
};

const formSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number is required'),
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
  const [isProcessing, setIsProcessing] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    setIsProcessing(true);
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
    setIsProcessing(false);
  };

  return (
    <div>
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
            <span className="flex justify-between font-montserrat">
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
                        placeholder="phone"
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
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-montserrat uppercase">
                    Which villa do you prefer?
                  </FormLabel>
                  <p className="text-sm">
                    We will do our best to accommodate your preference based on
                    availability, who wants to share a bed or room, etc
                  </p>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="button"
            onClick={form.handleSubmit(onSubmit)}
            className="bg-purple my-4 w-full"
            disabled={isProcessing}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
