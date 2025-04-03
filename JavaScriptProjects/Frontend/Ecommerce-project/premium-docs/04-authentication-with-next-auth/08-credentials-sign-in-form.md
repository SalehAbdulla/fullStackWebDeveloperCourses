# Credentials Sign In Form

We now have our sign-in page. Now we need the form. We will have this in a separate page component called `CredentialsSignInForm`. The reason for this is that you may have other sign-in forms in the future, such as a sign-in form for a third-party service like Google or Facebook. By having a separate component, we can easily swap out the form without affecting the rest of the sign-in page.

Create a new component at `app/(auth)/sign-in/credentials-signin-form.tsx` and just add the following for now:

```tsx
const CredentialsSignInForm = () => {
  return <div>Credentials Sign In Form</div>;
};

export default CredentialsSignInForm;
```

Now bring it into the `app/(auth)/sign-in/page.tsx` file and add it to the page where it says "FORM HERE":

```tsx
import CredentialsSignInForm from './credentials-signin-form';
```

```tsx
<CardContent className='space-y-4'>
  <CredentialsSignInForm />
</CardContent>
```

## Install Shadcn input & label components

Open a terminal and run the following command:

```bash
npx shadcn@latest add input label
```

Now add the following to the `CredentialsSignInForm` component:

```tsx
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signInDefaultValues } from '@/lib/constants';
import Link from 'next/link';

const CredentialsSignInForm = () => {
  return (
    <form>
      <div className='space-y-6'>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            required
            type='email'
            defaultValue={signInDefaultValues.email}
            autoComplete='email'
          />
        </div>
        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            name='password'
            required
            type='password'
            defaultValue={signInDefaultValues.password}
            autoComplete='current-password'
          />
        </div>
        <div>
          <Button className='w-full' variant='default'>
            Sign In with credentials
          </Button>
        </div>

        <div className='text-sm text-center text-muted-foreground'>
          Don&apos;t have an account?{' '}
          <Link target='_self' className='link' href='/sign-up'>
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
```

This is very simple so far. We are just displaying a form. We are bringing in the default values from the `signInDefaultValues` constant in the `lib/constants.ts` file.

In the next lesson, we will hook up the form.
