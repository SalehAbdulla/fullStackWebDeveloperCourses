# Sign Up Form

We will now create the sign up page and form.

Create a new file at `app/(auth)/sign-up/page.tsx`. You can copy the code from the sign in form and edit it or just use this code:

```tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const SignUp = async (props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { callbackUrl } = searchParams;

  const session = await auth();

  if (session) {
    return redirect(callbackUrl || '/');
  }

  return (
    <div className='w-full max-w-md mx-auto'>
      <Card>
        <CardHeader className='space-y-4'>
          <Link href='/' className='flex-center'>
            <Image
              priority={true}
              src='/images/logo.svg'
              width={100}
              height={100}
              alt={`${APP_NAME} logo`}
            />
          </Link>
          <CardTitle className='text-center'>Create Account</CardTitle>
          <CardDescription className='text-center'>
            Enter your information below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>{/* FORM HERE */}</CardContent>
      </Card>
    </div>
  );
};

export default SignUp;
```

We are pretty much doing the same thing as the sign in page. We are getting the callback url from the search params and checking if the user is already signed in. If they are, we redirect them to the callback url or the home page.

Now let's create the form. Create a new file at `app/(auth)/sign-up/signup-form.tsx`. Again, you can copy from the `credentials-signin-form.tsx` and edit it or just use this code:

```tsx
'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { signUpDefaultValues } from '@/lib/constants';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signUp } from '@/lib/actions/user.actions';

const SignUpForm = () => {
  const [data, action] = useActionState(signUp, {
    message: '',
    success: false,
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full' variant='default'>
        {pending ? 'Submitting...' : 'Sign Up'}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      <div className='space-y-6'>
        <div>
          <Label htmlFor='name'>Name</Label>
          <Input
            id='name'
            name='name'
            required
            type='text'
            defaultValue={signUpDefaultValues.name}
            autoComplete='name'
          />
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            name='email'
            required
            type='email'
            defaultValue={signUpDefaultValues.email}
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
            defaultValue={signUpDefaultValues.password}
            autoComplete='current-password'
          />
        </div>
        <div>
          <Label htmlFor='confirmPassword'>Confirm Password</Label>
          <Input
            id='confirmPassword'
            name='confirmPassword'
            required
            type='password'
            defaultValue={signUpDefaultValues.confirmPassword}
            autoComplete='current-password'
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {!data.success && (
          <div className='text-center text-destructive'>{data.message}</div>
        )}

        <div className='text-sm text-center text-muted-foreground'>
          Already have an account?{' '}
          <Link
            target='_self'
            className='link'
            href={`/sign-in?callbackUrl=${callbackUrl}`}
          >
            Sign In
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
```

This form is similar to the sign in form. We are using the `useActionState` hook to handle the form state and the `useFormStatus` hook to handle the form status. We are also using the `useSearchParams` hook to get the callback url from the search params.
We need to add the `signUpDefaultValues` constant to the `lib/constants.ts` file. Add this code to the file:

```ts
export const signUpDefaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
```

Fill it with what you want. I will add the following:

```ts
export const signUpDefaultValues = {
  name: 'Steve Smith',
  email: 'steve@example.com',
  password: 'password',
  confirmPassword: 'password',
};
```

Now let's add the sign up form to the sign up page. Open the `app/(auth)/sign-up/page.tsx` file and add the following code:

```tsx
import SignUpForm from './signup-form';
```

```tsx
<CardContent className='space-y-4'>
  <SignUpForm />
</CardContent>
```

Test it with an email that is already taken such as 'admin@example.com'. You should see the the error 'Something Went Wrong'. Like I said, we will address this message soon.

Now try with a new email. You should get registered and logged in.
