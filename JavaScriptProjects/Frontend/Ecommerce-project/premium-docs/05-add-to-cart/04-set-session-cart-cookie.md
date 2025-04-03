# Set Session Cart ID In Cookie

So we have our `AddToCart` component and the begining of the `addItemToCart` action. What I want to do now is make it so that when we come to the app, our session cart ID is created and added as a cookie. This will be the user's cart identifier. Because in our action, we need to check for that session cart id in the cookie in order to get the cart items from the database.

We're going to add this logic in a callback in the `auth.ts` file called `authorize`, which invokes when a user needs authorization using middleware. You can read more about this callback here - https://authjs.dev/reference/nextjs#authorized. 

Since this callback uses middleware, It will only be called if we add a middleware file and reference the auth file.

Create a new file in the root called `middleware.ts` and add the following:

```ts
export { auth as middleware } from '@/auth';
```

We are exporting our auth function from the `auth.ts` file as middleware. Now we can add and use the `authorize` callback and it will run on every page request unless we specify that we don't want the middleware used on a certain page.

Create a new callback in the `auth.ts` file:

```ts
authorized({ request, auth }: any) {
  // Check for cart cookie
  if (!request.cookies.get('sessionCartId')) {
  	// Generate cart cookie
    const sessionCartId = crypto.randomUUID(); 

    // Clone the request headers
    const newRequestHeaders = new Headers(request.headers); 

    // Create a new response and add the new headers
    const response = NextResponse.next({
      request: {
        headers: newRequestHeaders,
      },
    });

    // Set the newly generated sessionCartId in the response cookies
    response.cookies.set('sessionCartId', sessionCartId);

    // Return the response with the sessionCartId set
    return response;
  } else {
    return true;
  }
},
```

Be sure to add the following imports as well:

```ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
```

We are checking if there is a `sessionCartId` cookie. If not, we generate a new one using a random UUID and set it in the response cookies.This ID will be used to identify the cart for this specific session.

Next, The headers from the current request are cloned into a new Headers object. This is necessary because NextResponse.next() requires a complete request object, including headers.

A new NextResponse object is created to handle the request. NextResponse.next() allows the request to continue to its intended destination but with modifications (like setting cookies).

Then the newly generated sessionCartId is added as a cookie in the response. This ensures the cookie is available for subsequent requests.

We then return the response. If the sessionCartId cookie already exists, the function simply returns true.

Now, go to the app and in the devtools->application tab you should see the `sessionCartId` cookie.
