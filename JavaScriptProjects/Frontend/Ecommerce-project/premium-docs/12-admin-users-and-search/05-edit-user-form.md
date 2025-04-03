# Edit User Form

Now let's add the edit user form. Create a new file at `app/admin/users/[id]/update-user-form.tsx` and add the following code for now:

```tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { USER_ROLES } from '@/lib/constants';
import { updateUserSchema } from '@/lib/validator';
import { ControllerRenderProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const updateUserForm = ({
  user,
}: {
  user: z.infer<typeof updateUserSchema>;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: user,
  });

  return (
    <Form {...form}>
      <form className='space-y-4'>form</form>
    </Form>
  );
};

export default updateUserForm;
```

We are bringing in a bunch of UI components, hooks and some other stuff. The component function will take in a user prop with the type of `z.infer<typeof updateUserSchema>`. We are initializing the form with the `useForm` hook from React Hook Form with the default values from the user prop. We are also using the `zodResolver` from `@hookform/resolvers/zod` to validate the form data against the schema.

Then we're returning an empty form for now. Let's add it to the page. Open the `app/admin/users/[id]/page.tsx` file and import the `updateUserForm` component and add it to the page.

```tsx
import UpdateUserForm from './update-user-form';
```

```tsx
return (
  <div className='space-y-8 max-w-lg mx-auto'>
    <h1 className='h2-bold'>Update User</h1>
    <UpdateUserForm user={user} /> 👈 Add this line
  </div>
);
```

We already have the user to pass in. For now, you will just see the text 'form' on the page. Let's start to add some fields to the form.

Here is the first `div` with the email field:

```tsx
{
  /* Email */
}
<div>
  <FormField
    control={form.control}
    name='email'
    render={({
      field,
    }: {
      field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'email'>;
    }) => (
      <FormItem className='w-full'>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input disabled={true} placeholder='Enter user email' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>;
```

This is disabled because we don't want to be able to change this here. Save it and you should see the input with the text.

Next, we have the name field:

```tsx
{
  /* Name */
}
<div>
  <FormField
    control={form.control}
    name='name'
    render={({
      field,
    }: {
      field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'name'>;
    }) => (
      <FormItem className='w-full'>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder='Enter user name' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>;
```

Next is the role field. Here we will use the select component from the ShadCN UI.

```tsx
{
  /* Role */
}
<div>
  <FormField
    control={form.control}
    name='role'
    render={({
      field,
    }: {
      field: ControllerRenderProps<z.infer<typeof updateUserSchema>, 'role'>;
    }) => (
      <FormItem className=' items-center'>
        <FormLabel>Role</FormLabel>
        <Select onValueChange={field.onChange} value={field.value.toString()}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder='Select a role' />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {USER_ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
</div>;
```

The `USER_ROLES` is an array of strings that we defined in the `lib/constants.ts` file. We are mapping over it and creating a select item for each role. We are also using the `onValueChange` prop to update the value of the field when the user selects a new value.

Finally, we have the button to submit the form.

```tsx
<div className='flex-between'>
  <Button
    type='submit'
    className='w-full'
    disabled={form.formState.isSubmitting}
  >
    {form.formState.isSubmitting ? 'Submitting...' : `Update User `}
  </Button>
</div>
```

Now that we have the form, in the next lesson, we will add a submit handler and the update action that it will call.
