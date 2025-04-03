# Hook Up Sign In Form

So we have our action and we have the form, now we need to connect them and make it work. Open the `app/(auth)/sign-in/credentials-signin-form.tsx` file and add a few more imports:

```typescript
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { signInWithCredentials } from '@/lib/actions/user.actions';
```

We brought in the `signInWithCredentials` action, the `useActionState` from React and `useFormStatus` from `react-dom` to get the state and status of our form. We will use these to show the user feedback when they submit the form. One important thing I want to mention is that if you are using React 18 and Next.js 14, then you would use `useFormState` instead of `useActionState`:

```typescript
// ONLY for React 18 and below
import { useFormState, useFormStatus } from 'react-dom';
```

## Action State

Add the following state to the component:

```typescript
const [data, action] = useActionState(signInWithCredentials, {
  message: '',
  success: false,
});
```

This will give us the state/data of the action response, which remember, is an object with `success` and `message`. The `useActionState` hook takes in the action we want to call and the default state. The default state is an empty string for the message and a boolean for the success.

Now add the action to the form:

```jsx
 <form action={action}>
```

## `useFormStatus`

This hook allows us to get the status of the form. We will use this to show the user feedback when they submit the form. While the form is submitting, I want the submit button to say "Signing in...".

Add the following code just above the return:

```typescript
const SignInButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className='w-full' variant='default'>
      {pending ? 'Signing In...' : 'Sign In with credentials'}
    </Button>
  );
};
```

Now, replace the button in the form:

```jsx
<SignInButton />
```

## Respond To The Action

Now we need to show an error with a message if we get back an error from the action. Add the following code right under the closing `</div>` under the `<SignInButton />`:

```jsx
{
  data && !data.success && (
    <div className='text-center text-destructive'>{data.message}</div>
  );
}
```

This will show the error message if there is an error. 

## Redirect To Homepage

In the `app/(auth)/sign-in/page.tsx`, bring in `redirect` and the `auth` function, which is used to check for the session and if we are logged in.

```tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
```

In the `SignInPage` function, right above the return, add the following:

```tsx
const session = await auth();

if (session) {
  return redirect('/');
}
```

We are getting the session and redirecting if there is one.

## Test Sign In

Now it's time for the moment of truth. Test the form out with an email and password that is wrong. You should see an error.

Now try with one of the users we seeded the database with such as `admin@example.com` and `123456`.

If the login is successful, you should be redirected to the home page.

Open the devtools->application tab and you should have the session cookie.

In the next video, we will add the callback URL redirect.

