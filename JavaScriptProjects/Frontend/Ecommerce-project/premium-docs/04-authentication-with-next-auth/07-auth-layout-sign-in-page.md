# Auth Layout & Sign In Page

In this lesson, we are going to create the layout and sign-in page. Auth pages will not have the header and menu. So we need a separate layout.

Create a new group folder in the `app` folder called `(auth)`. We will have a separate layout for this group, so create `/app/(auth)/layout.tsx` and add the following code:

```tsx
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex-center min-h-screen w-full '>{children}</div>;
};
export default Layout;
```

Next, create a folder called `sign-in` and add a file called `page.tsx` and create a simple component for now:

```tsx
const SignIn = () => {
  return <div>Sign In</div>;
};

export default SignIn;
```

Now you should be able to click on the sign in button in the header and go to /sign-in and see the text "Sign In".

Let's add the imports that we will need:

```tsx
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
```

Let's set a title. Below the imports and above the function, add the following:

```tsx
export const metadata: Metadata = {
  title: 'Sign In',
};
```

Now in the component, add the following:

```tsx
const SignIn = () => {
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
          <CardTitle className='text-center'>Sign In</CardTitle>
          <CardDescription className='text-center'>
            Select a method to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>{/* FORM HERE */}</CardContent>
      </Card>
    </div>
  );
};
```

You should now see the card, logo, etc. Now we need to create the form, which will be in a new component.
