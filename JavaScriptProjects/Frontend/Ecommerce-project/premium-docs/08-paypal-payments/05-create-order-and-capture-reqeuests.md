# Create Order & Capture Payment Requests

Now we need to add two functions to the `paypal` object. 

## `createOrder` Function

Open the `paypal.ts` file and add the following to the object:

```ts
export const paypal = {
  createOrder: async function createOrder(price: number) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: price,
            },
          },
        ],
      }),
    });

    return handleResponse(response);
  }
};

```

We are simply making a request to the paypal endpoint and sending the token in the header and the intent and purchase units in the body. Then we return the response.

## `capturePayment` Function

Now add this function below the `createOrder`:

```ts
capturePayment: async function capturePayment(orderId: string) {
    const accessToken = await generateAccessToken();
    const url = `${base}/v2/checkout/orders/${orderId}/capture`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return handleResponse(response);
  },
```

We are just sending a request witht the order ID and access token and returning the response.