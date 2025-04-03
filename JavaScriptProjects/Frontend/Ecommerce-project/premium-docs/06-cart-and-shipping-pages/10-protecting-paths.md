# Protecting Paths

Right now, we can go to any path whether we are logged in or not. For instance, if we go to `/shipping-address` and we are not logged in, it let's us. We see an error but it still let's us go to the page, which we don't want. We want it to redirect to the sign in page.

Since we have the following line in our `middleware.ts` file, we can add this functionality to the `authorized` callback in the `auth.ts` file.

Open the `auth.ts` file and add the following at the top of the `authorized` callback:

```ts
authorized({ request, auth }: any) {
  // Array of regex patterns of protected paths
  const protectedPaths = [
    /\/shipping-address/,
    /\/payment-method/,
    /\/place-order/,
    /\/profile/,
    /\/user\/(.*)/,
    /\/order\/(.*)/,
    /\/admin/,
  ];

  // Get pathname from the req URL object
  const { pathname } = request.nextUrl;

  // Check if user is not authenticated and on a protected path
  if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

  // ... Rest of the file
},
```

We just set an array of regex patterns with the paths we want to protect, got the pathname and added a conditional to check if the user is logged in and trying to access a protected path. If so, we return false and that will redirect the user to the sign in page.