# User Profile Form

Now we will create the profile page and form.

If you did not create a page for the profile yet, create a new file at `app/user/profile/page.tsx` and add the following:

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customer Profile',
};

export default async function ProfilePage() {
  return (
    <>
      <div className='max-w-md  mx-auto space-y-4'>
        <h2 className='h2-bold'>Profile</h2>
      </div>
    </>
  );
}
```

Now if you click on the profile option in the user menu, you should see the heading.

## Session Provider

In order to get the user info from the session within the embedded client component that we're going to create, we need to use the `SessionProvider` from Next Auth.

Add the following imports:

```tsx
import { redirect } from 'next/navigation';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
```

We are bringing in the `redirect` function from `next/navigation` to redirect the user to the login page if they are not authenticated. We are also bringing in the `SessionProvider` from `next-auth/react` to provide the session to the page. We are also bringing in the `auth` function from `@/auth` to get the session.

Now wrap the return in the `SessionProvider`:

```tsx
return (
  <SessionProvider session={session}>
    <div className='max-w-md  mx-auto space-y-4'>
      <h2 className='h2-bold'>Profile</h2>
      Test User: {session.user.name}
    </div>
  </SessionProvider>
);
```

You can get to this page through the user menu in the user button component. You should see the user name in the page. You can delete the test user line.


## User Profile Form

Now we want to create the form to update the user profile. Create a new file at `app/user/profile/profile-form.tsx` and add the following code:

```tsx
'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateProfileSchema } from '@/lib/validator';
import { updateProfile } from '@/lib/actions/user.actions';

const ProfileForm = () => {
  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof updateProfileSchema>>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: session?.user?.name ?? '',
      email: session?.user?.email ?? '',
    },
  });

  const { toast } = useToast();

  return (
    <Form {...form}>
       <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5">
        <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    disabled
                    placeholder='Email'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormControl>
                  <Input
                    placeholder='Name'
                    {...field}
                    className='input-field'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type='submit'
          size='lg'
          disabled={form.formState.isSubmitting}
          className='button col-span-2 w-full'
        >
          {form.formState.isSubmitting ? 'Submitting...' : 'Update Profile'}
        </Button>
      </form>
    </Form>
  );
};
export default ProfileForm;
```

We are using the `useSession` hook to get the user session. We are using React Hook Form and the `useForm` hook to create the form. We are using the `zodResolver` to validate the form. We are passing in the default values from the session and we are using the nullish coalescing operator to set the default values to an empty string if the session is null.

Then we construct the form using various components from ShadCN. I made the email field disabled because we don't want the user to be able to change their email at this point.

The form will not submit just yet. I just want to get it displayed on the page.

