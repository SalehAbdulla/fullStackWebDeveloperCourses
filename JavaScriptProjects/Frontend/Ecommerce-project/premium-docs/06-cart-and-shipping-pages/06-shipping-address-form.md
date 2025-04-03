# Shipping Address Form

We have our shipping page, now we need to create the form.

There are two packages that we need to install:

- `react-hook-form`: This is a library that helps us manage forms in React. It integrates well with ShadCN form components. It takes care of things like managing form state, handling form submissions, validating form inputs and displaying error messages. So we don't have to write all that ourselves.
- `@hookform/resolvers`: The @hookform/resolvers package provides integrations between react-hook-form and validation libraries like zod. It enables react-hook-form to leverage the validation schemas from these libraries directly, making it simpler to apply custom validation rules. This way we don't have to write custom validation functions.

Run the following in your terminal:

```bash
npm install react-hook-form @hookform/resolvers
```

We also need to install the ShadCN form component:

```bash
npx shadcn@latest add form
```

Create a new file at `app/(root)/shipping-address/shipping-address-form.tsx` and add the following for now:

```tsx
'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ShippingAddress } from '@/types';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { shippingAddressSchema } from '@/lib/validator';
import { ControllerRenderProps } from 'react-hook-form';
import { shippingAddressDefaultValues } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { updateUserAddress } from '@/lib/actions/user.actions';
import CheckoutSteps from '@/components/shared/checkout-steps';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, Loader } from 'lucide-react';

const ShippingAddressForm = ({
  address,
}: {
  address: ShippingAddress | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  return <>Shipping Form</>;
};

export default ShippingAddressForm;
```

We are starting out simple and just adding the imports, passing in the address prop, initializing the router and toast, and returning the text, Shipping Form.

Now bring it into the shipping page:

```tsx
import ShippingAddressForm from './shipping-address-form';
```

Embed it in the page and pass in the user address:

```tsx
return (
    <>
      <ShippingAddressForm address={user.address as ShippingAddress} />
    </>
```

Now let's continue in the `app/(root)/shipping-address/shipping-address-form.tsx` file.

With Reach Hook Form, we have access to a `useForm` hook. This hook returns an object with a bunch of properties. We then pass this object to the `Form` component.

Add this above the return in the component:

```tsx
const form = useForm<z.infer<typeof shippingAddressSchema>>({
  resolver: zodResolver(shippingAddressSchema),
  defaultValues: address || shippingAddressDefaultValues,
});
```

We are using the `zodResolver` to validate the form data. We are also setting the default values to the address if it exists, or the default values from the `lib/constants/index.ts` file.

When you call `useForm()` in a component with react-hook-form, it provides an object (`form` in this case) that contains various methods and properties essential for handling form functionality, like `handleSubmit`, `control`, `reset`, etc. By spreading `...form` onto` <Form>`, we will effectively be passing each of these properties as individual props to the `<Form>` component.

Since we are using `useTransition`, add the following next:

```tsx
const [isPending, startTransition] = useTransition();
```

Now let's add the form.

Replace the `return` statement with the following:

```tsx
return (
  <>
    <div className='max-w-md mx-auto space-y-4'>
      <h1 className='h2-bold mt-4'>Shipping Address</h1>
      <p className='text-sm text-muted-foreground'>
        Please enter the address that you want to ship to
      </p>
      <Form {...form}>
        <form
          method='post'
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='fullName'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'fullName'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter full name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name='streetAddress'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'streetAddress'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='city'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'city'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter city' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='country'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'country'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Country</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter country' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='postalCode'
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAddressSchema>,
                  'postalCode'
                >;
              }) => (
                <FormItem className='w-full'>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter postal code' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader className='animate-spin w-4 h-4' />
              ) : (
                <ArrowRight className='w-4 h-4' />
              )}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </>
);
```

We are building our form with the `Form` component from the `@/components/ui/form`. We are also using the `FormField` component to render the fields. The `control='form-control'` is used to bind the form control and state to the form. The `name` prop is used to bind the field to the form. The `render` prop is used to render the field. We are using `ControllerRenderProps` to get the field value and the `field` prop is used to bind the field to the form.

We are using the `Input` component from the `@/components/ui/input` to render the inputs. We are also using the `FormMessage` component to render any error messages that have to do with the field.

The `render` prop defines the field rendering, allowing react-hook-form to bind the input value to field with `{...field}` in each `<Input />` component.

So a lot is being done behind the scenes here. It may seem a bit weird if you are used to handling forms manually. React Hook Form is a popular library and you will run into it a lot.

In the next lesson we will create the submit handler and the action to update a user's address.
