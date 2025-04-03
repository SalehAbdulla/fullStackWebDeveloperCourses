# NextAuth Catch-All API Routes

When we use NextAuth, it sets up a bunch of "hidden" API routes for us to handle things like signing in, signing out, and managing sessions. These routes are automatically created when you configure NextAuth and are used behind the scenes to handle authentication. We just need to create a single endpoint to hook those routes up. When we do this, we're saying, any route that starts with `/api/auth/*` will be controlled by NextAuth. Again, it's very opinionated. We added a bunch config and NextAuth looks at that and sets up everything for us. Creating the sessions, tokens, etc. 

We also have access to all kinds of hooks and functions to do things like access the session object, sign in, sign out, etc. And what's great is we can add as many providers as we want and it works in the same way behind the scenes.

So let's create our main route file and export the handlers. Create a new file in the `app/api/auth` folder called `[...nextauth].ts`. You can read more about how this works [here](https://next-auth.js.org/getting-started/example#add-api-route).

In the file, add the following code:

```typescript
import { handlers } from '@/auth';
export const { GET, POST } = handlers;
```

In many projects, you will see all the stuff we added to the `auth.js` file directly in the `[...nextauth].ts` file. You could do that, but we are just exporting the handlers from the `auth.js` file. Either way, whenever a request is made to `/api/auth/*` it will be handled by Next Auth.

There isn't a great way to test this yet because we have not created the sign in page yet. You could do the following for now:

- Go to the `/api/auth/signin` route in your browser. You should get a redirect to the callback URL
- Go to the `/api/auth/signout` route in your browser. You should see a messsage asking if you really want to sign out.
- Go to the `/api/auth/session` route in your browser. You should see "null" because we have not created the sign in page yet to set the session but once you do, you should see the session data.


Now that we have our config and api routes, we can start to think about creating sign-in functionality.
