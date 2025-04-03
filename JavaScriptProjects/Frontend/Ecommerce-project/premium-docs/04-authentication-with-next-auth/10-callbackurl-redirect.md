# Callback URL Redirect

We also want to make it so that if we are at a certain page such as the cart, and then we sign it, we go back to that page. We can do this by adding a callback URL.

Open the `app/auth/sign-in/page.tsx` and pass in the searchParams prop to get the callback URL:

```tsx
const SignIn = async (
  props: {
    searchParams: Promise<{
      callbackUrl: string;
    }>;
  }
) => {
  const { callbackUrl } = await props.searchParams;
```

Now, change the redirect to the following:

```tsx
if (session) {
  return redirect(callbackUrl || '/');
}
```

If there is a callback, it will redirect there first.

We also want to persist the callback when we submit the form. So we will just pass it as a hidden input in the form. In the `app/(auth)/sign-in/sign-in-credentials.tsx` add the following import:

```tsx
import { useSearchParams } from 'next/navigation';
```

This is how we get searchParams from a client component. We don't pass in props like the server component.

Now add the following below the action state:

```tsx
const searchParams = useSearchParams();
const callbackUrl = searchParams.get('callbackUrl') || '/';
```

Now just pass it as a hidden input:

```tsx
 <form action={action}>
      <input type='hidden' name='callbackUrl' value={callbackUrl} />
      // ...
</form>
```

Now when we are on a page and sign in, we will be brought back to that page.

You can test this by going to a URL like http://localhost:3000/sign-in?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fshipping-address and signing in and then you should be taken to the shipping-adress page. Which does not exist yet.
