# Vercel Hobby Tier Fix

If you are using the free "hobby" tier for Vercel, you may at some point get the following error:

```
Error: The Edge Function "middleware" size is 1.01 MB and your plan size limit is 1 MB. Learn More: https://vercel.link/edge-function-size
```

I had made a post to try and fix this by swapping out bcrypt for a custom password encrypt script, but it turns out that wasn't the best fix and didn't work in some cases. If you already did that, that's absolutely fine, but it's not needed.

We can address the issue by splitting the `auth.ts` file into two files as mentioned in the [this section of the Next.js Docs](https://authjs.dev/guides/edge-compatibility#split-config)

## Why This Works

By moving the authorized callback and configuration logic into a separate file (auth.config.ts), you reduce the size of the Edge Function code that Vercel processes. This modular approach not only solves the size limit issue but also makes your codebase cleaner and easier to maintain.

## Create The Config File

Let's create a new file in the root called `auth.config.ts`

```bash
touch auth.config.ts
```

Add the following imports:

```ts
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
```

Now create a new config object called `authConfig` and add the `authorized` function like so:

```ts
export const authConfig = {
  providers: [], // Required by NextAuthConfig type
  callbacks: {
    authorized({ request, auth }: any) {
      // Array of regex patterns of paths we want to protect
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

      // Check if user is not authenticated and accessing a protected path
      if (!auth && protectedPaths.some((p) => p.test(pathname))) return false;

      // Check for session cart cookie
      if (!request.cookies.get('sessionCartId')) {
        // Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        // Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: new Headers(request.headers),
          },
        });

        // Set newly generated sessionCartId in the response cookies
        response.cookies.set('sessionCartId', sessionCartId);

        return response;
      }

      return true;
    },
  },
} satisfies NextAuthConfig;
```

## Edit `auth.ts`

Now, in the `auth.ts` file, remove the 2 imports:

```ts
import type { NextAuthConfig } from 'next-auth';
import { NextResponse } from 'next/server';
```

and add the following import:

```ts
import { authConfig } from './auth.config';
```

Remove the `authorized` callback and instead, add this to the `callbacks` object:

```ts
...authConfig.callbacks,
```

You can also remove the following because we use it in the config file:

```ts
satisfies NextAuthConfig;
```

We also want to specify the "jwt" value for the session.strategy as a literal rather than a regular string. So add `as const` to it like this:

```ts
 session: {
    strategy: 'jwt' as const,
  },
```

This is because this value has to be one of 3 values ("jwt" | "database" | undefined) and we want to make sure it's always "jwt" and not a string that could be anything. Here, strategy is no longer inferred as string; it is inferred as the literal type "jwt". If you don't add this, you will get an error for for the `config` we pass into `NextAuth` at the end of the file.

## Update the `middleware` Function

The last thing we need to do is update the `middleware.ts` file to the following:

```ts
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const { auth: middleware } = NextAuth(authConfig);
```

This will now use the `auth.config.ts` file for the configuration and the `auth.ts` file for the `middleware` function.

## Deploy To Vercel

Now try and push to Vercel and you should no longer get the error about the Edge Function size being too large.
