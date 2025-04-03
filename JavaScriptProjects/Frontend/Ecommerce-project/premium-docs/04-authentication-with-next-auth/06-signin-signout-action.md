# Sign In & Sign Out Action

Now that we have Next Auth configured, we can create a sign in and sign out action.

## Create the Sign-In Form Schema

Remember, we are using Zod for form and type validation. Open the `lib/validator.ts` file and add the following code:

```typescript
// Schema for signing in a user
export const signInFormSchema = z.object({
  email: z.string().email('Invalid email address').min(3, 'Email must be at least 3 characters'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});
```

Pretty simple. We are just setting email and password to a string that must be at least 3 characters long.

## Create The Actions

Create a new file at `lib/actions/user.actions.ts` and add the following imports and mark as `use server`:

```typescript
'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { signIn, signOut } from '@/auth';
import { signInFormSchema } from '../validator';
```

The `isRedirectError` function is used to check if the error is a redirect error. We are also importing the `signIn` and `signOut` functions from the `@/auth` module. Finally, we are importing the `signInFormSchema` from the `../validator` module that we created in the last lesson.

### Sign In

Create a new function called `signInWithCredentials` that takes in the `prevState` and `formData` as parameters. This is the signature we need to use with the way we'll be submitting the form. Inside the function, we'll try to sign in the user with the credentials provided in the form data. If the sign-in is successful, we'll return a success message. If there is an error, we'll check if it is a "redirect error," which is thrown internally by NextAuth's redirect() function. If it's a redirect error, the function rethrows it so Next.js can handle the redirection.

```typescript
// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: 'Invalid email or password' };
  }
}
```

### Sign Out

The sign out is super simple. We already imported the `signOut` function from the `@/auth` module. So we can just call it.

Add the following under the `signInWithCredentials` function:

```typescript
// Sign the user out
export async function signOutUser() {
  await signOut();
}
```

Here is the full code:

```typescript
'use server';

import { isRedirectError } from 'next/dist/client/components/redirect';
import { signIn, signOut } from '@/auth';
import { signInFormSchema } from '../validator';

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    // Set user from form and validate it with Zod schema
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    await signIn('credentials', user);

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: 'Invalid email or password' };
  }
}

// Sign the user out
export async function signOut() {
  await signOut();
}
```

Now we need to work on the page and form to sign in.
