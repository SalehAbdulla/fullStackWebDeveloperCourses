# Generate PayPal Access Token

Now that we have our PayPal keys, we can start to implement PayPal payments. There are a few steps we need to take with the PayPal API. We need to:

- Generate an access token: This is a token that serves as a secure identifier, allowing your app to interact with PayPal's services on behalf of a user or merchant. It grants your application the necessary permissions to perform specific actions, such as creating orders, processing payments, or issuing refunds.
- Create an order: Create an order and set the intent to "capture"
- Capture payment: To successfully capture payment for an order, the buyer must first approve the order or a valid payment_source must be provided in the request. So typically, once we pay, the status gets set to approve.

That's what we're going to do in a nutshell. We will also write some unit tests with Jest to test these functions out.

We are going to start by generating an access token.

## Create The PayPal File

Let's create a new file at `lib/paypal.ts`. This will contain the PayPal API calls.

Let's start by creating a variable to hold the paypal api url.:

```ts
const base = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';
```

We will use this in all of our requests to the PayPal API.

## `paypal` Object

We are going to have an object with a method to create and order and to capture the payment. For now, just create an empty object like this:

```ts
export const paypal = {};
```

## Generate Access Token

Before we add the functions in the object, we need an access token. You can find the documentation about this here - https://developer.paypal.com/reference/get-an-access-token/.

Let's create a function to get the access token. Add the following function under the paypal object:

```ts
// Generate an access token for the PayPal API
async function generateAccessToken() {
  const { PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET } = process.env;
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_APP_SECRET}`).toString(
    'base64'
  );

  const response = await fetch(`${base}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  if (response.ok) {
    const jsonData = await response.json();
    return jsonData.access_token;
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
```

We start by getting the client id and secret from the environment variables. We then create a base64 encoded string of the client id and secret. We then use that to make a request to the PayPal API to get an access token. If the response is ok, we return the access token. If not, we throw an error.

## Quick Refactor For Handle Response

Let's actually split this up a bit and create a separate function to handle the response. Because we will re-use this in another function.

Replace this code:

```ts
if (response.ok) {
  const jsonData = await response.json();
  return jsonData.access_token;
} else {
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
```

With this:

```ts
const jsonData = await handleResponse(response);
return jsonData.access_token;
```

Now create a function undernerath the `generateAccessToken` function:

```ts
async function handleResponse(response: any) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}
```

In the next lesson, we will write some simple unit tests to test this out.
