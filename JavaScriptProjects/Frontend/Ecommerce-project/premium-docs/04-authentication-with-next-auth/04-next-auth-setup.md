# Next Auth Setup

We will be using Next Auth for authentication in our application. Next Auth is a complete open-source authentication solution for Next.js applications. It is pretty easy to set up and provides a lot of features out of the box. You can use email/password, but you can also use a huge amount of providers such as Google, Facebook, Twitter, GitHub, etc.

Our app will use sessions and JWT tokens to authenticate users. We will be using the JWT strategy for our authentication. This means that when a user logs in, they will get a JWT token that will be stored in a cookie. This token will be used to authenticate the user on the server side. The token will be signed and encrypted with a secret key.

We will also be setting up the Prisma adapter to use with Next Auth. The Prisma adapter will allow us to use Prisma to store the user information in our database.

## Next Auth Installation

I want to use version 5, which is the latest version at the time of writing this. In order to prevent some warnings that we may get with Next 15, I am going to run the following command:

```bash
npm install next-auth@5.0.0-beta.25 --legacy-peer-deps
```

You may be fine just running `npm install next-auth` depending on when you are watching this. At this moment in time (October 2024) I get a warning about asynchronous headers. This update fixes it. Also, there were some issues with the react paypal package, so I had to add the `--legacy-peer-deps` flag. If you want to just try it out, you can just run `npm install next-auth` and if you run into any issues like I just explained, you can just run the command above.

I will change this documentation when the latest version of Next Auth is released.

## Prisma Adapter

There is an adapter that we can use to smoothly integrate Next Auth with Prisma.

Open a terminal and run the following command:

```bash
npm install @auth/prisma-adapter
```

## Generate a Secret Key

Next Auth requires a secret key to be set. This key is used to sign and optionally encrypt the JWT session token.

You can generate a secret key by running the following command:

```bash
openssl rand -base64 32
```

Once you get the secret key, create a `.env` file in the root of the project and add the key. It will look something like this:

```env
NEXTAUTH_SECRET=xmVpackzg9sdkEBzJsGse3rosvkUY+4ni2quxvoK6Go=
```

You also want to add the following environment variables to the `.env` file:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_URL_INTERNAL=http://localhost:3000
```

More on this [here](https://next-auth.js.org/configuration/options)

## Create Our Auth File

We need to create our main authentication file. This is where we will setup our providers, callbacks, and other authentication related things. This is the meat and potatos of the authentication functionality. The documentation for this can be found [here](https://next-auth.js.org/configuration/options).

Create a file in the root called `auth.ts` and add the following imports:

```ts
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
```

- `compareSync` is a Bcrypt function that we will use to compare the password from the database with the password from the form.
- `NextAuthConfig` is the type for the Next Auth configuration.
- `NextAuth` is the Next Auth function that we will use to setup our authentication.
- `CredentialsProvider` is the provider that we will use to authenticate users. This just uses a username and password. There are many other providers that you can use, such as Google, Facebook, Twitter, etc.
- `prisma` is the Prisma client that we will use to query the database.
- `PrismaAdapter` is the Prisma adapter that we will use to integrate Next Auth with Prisma.

## Create the Next Auth Configuration

Create a configuration object. We will add the different parts one-by-one so that you understand what each part does.

#### Pages

Add the following code to the `auth.ts` file:

```ts
export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
};
```

This is the configuration for the pages that Next Auth will use. We are setting the sign-in page to `/sign-in` and the error page to `/sign-in`. This is because we want to redirect the user to the sign-in page if they are not authenticated. If you wanted to redirect the user to a different page, you could change the `signIn` and `error` properties to whatever page you want.

#### Session

The session object is used to describe how we want to save the user session. Add the following code to the `auth.ts` file just under the `pages` object, still within the `config` object:

```ts
session: {
  strategy: 'jwt',
  maxAge: 30 * 24 * 60 * 60, // 30 days
},
```

We are setting the strategy to `jwt` and the max age to 30 days. The max age is the amount of time that the session will be valid for. After this time, the user will have to log in again.

#### Adapter

We are using the Prisma adapter to integrate Next Auth with Prisma. Add the following code to the `auth.ts` file right under the `session` object:

```ts
 adapter: PrismaAdapter(prisma),
```

#### Providers

The providers are the different ways that users can authenticate. We are using the `CredentialsProvider` which is a simple username and password. Add the following code to the `auth.ts` file right under the `adapter` object:

```ts
providers: [
  CredentialsProvider({
    credentials: {
      email: {
        type: 'email',
      },
      password: { type: 'password' },
    },
    async authorize(credentials) {
      if (credentials == null) return null

      // Find user in database
      const user = await prisma.user.findFirst({
        where: {
          email: credentials.email as string,
        },
      })
      // Check if user exists and password is correct
      if (user && user.password) {
        const isMatch = compareSync(
          credentials.password as string,
          user.password
        )
        // If password is correct, return user object
        if (isMatch) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }
      }
      // If user doesn't exist or password is incorrect, return null
      return null
    },
  }),
],
```

We are saying we want to use the `CredentialsProvider` and we are setting the credentials to be an `email` and `password`.

The `authorize` function is called when the user tries to authenticate. This is where you handle email/password authentication and return the user object for the session if valid, otherwise return `null`.

#### Callbacks

Lastly, we need to add the callbacks. Callbacks are functions that are called at different points in the authentication process. The `session` callback is called whenever a session is accessed or created. This is where you decide what user data is available to the client.

```ts
 callbacks: {
    async session({ session, user, trigger, token }: any) {
      session.user.id = token.sub
      if (trigger === 'update') {
        session.user.name = user.name
      }
      return session
    },
  },
```

The `session` callback takes in a few parameters, including the `session` object, the `user` object, the `trigger` (which is the event that triggered the callback), and the `token` object.

The first line of the callback sets the `id` property of the `session.user` object to the `sub` property or the subject of the `token` object. This is because the `sub`, property of the `token` object is the user's ID and is used to identify the user.

The `trigger` argument allows you to detect why the session callback is being triggered. Here, it's checking if the callback is being triggered by an update. If trigger is 'update', it means the session has been updated, and you might want to modify the session accordingly. In this case, it's setting the `name` property of the `session.user` object to the `name` property of the `user` object.

After updating the session object, the callback returns the updated session object, which may look something like this:

```json
{
  "user": {
    "id": "1234", // User ID added from token.sub
    "name": "John Doe",
    "email": "john@example.com"
  },
  "expires": "2024-10-12T10:00:00Z"
}
```

## `jwt` callback

It's important to know that a JSON Web Token is being sent to the client in the `Authorization` header. This token contains the user's ID by default. If you want to add more information to the token, you can do so in the `jwt` callback. We're going to do that later because right now we don't need anything else. Later though, we will want to return other user info like the role as well as the user's cart data.

We are also going to add the following right after the `config` object:

```ts
export const config = {
  //...
} satisfies NextAuthConfig;
```

If you aren't familiar with this Typescript syntax, `satisfies` ensures that the object structure (config) is compatible with the type (NextAuthConfig). If the object does not meet the requirements of the NextAuthConfig type, TypeScript will produce a type error. It will also ensure type safety without forcing unnecessary type assertions.

Now we just need to export:

```ts
export const { handlers, auth, signIn, signOut } = NextAuth(config);
```

This will initialize NextAuth with the config object that we are providing it. It gives us access to the following, which we are exporting to use in our application:

- `handlers` is an object that contains the HTTP handlers for the different endpoints that NextAuth uses. We will use these handlers to create the NextAuth API routes.
- `auth` is a function that returns the current session. When we need to check if a user is authenticated and get the session, we will use this function.
- `signIn` is a function that signs in a user.
- `signOut` is a function that signs out a user.

Here is the entire file:

```ts
import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const config = {
  pages: {
    signIn: '/sign-in',
    error: '/sign-in',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          type: 'email',
        },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (credentials == null) return null;

        // Find user in database
        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email as string,
          },
        });
        // Check if user exists and password is correct
        if (user && user.password) {
          const isMatch = compareSync(
            credentials.password as string,
            user.password
          );
          // If password is correct, return user object
          if (isMatch) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            };
          }
        }
        // If user doesn't exist or password is incorrect, return null
        return null;
      },
    }),
  ],
  callbacks: {
    async session ({ session, user, trigger, token }: any) {
      // Set the user id on the session
      session.user.id = token.sub;
      // If there is an update, set the name on the session
      if (trigger === 'update') {
        session.user.name = user.name;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
```

Now we have to create the API route.
