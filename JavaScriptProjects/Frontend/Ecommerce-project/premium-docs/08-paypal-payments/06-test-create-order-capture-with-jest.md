# Create Order & Capture Payment Tests with Jest

Now we will write two more tests to test the functions that we created in the last lesson.


## Creating The Order

You can test the create order function by adding the following test to thee `paypal.test.ts` file:

```ts
// Create a PayPal order
test('creates a PayPal order', async () => {
  const token = await generateAccessToken();
  const price = 10.0; // Example price for testing

  const orderResponse = await paypal.createOrder(price);
  console.log(orderResponse);

  // Ensure the order response contains expected fields
  expect(orderResponse).toHaveProperty('id');
  expect(orderResponse).toHaveProperty('status');
  expect(orderResponse.status).toBe('CREATED'); // PayPal returns 'CREATED' for new orders
});
```

You need to import the paypal object as well:

```ts
import { generateAccessToken, paypal } from '../lib/paypal';
```

Now run `npm run test` and you should see an array of objects in the console. The test should pass.

You can copy the `approve` url and go to it in the browser and complete the order if you wanted to.

## Capture The Payment

This gets a bit more complicated because you need to approve the order first and an actual payment needs to be made. What we can do though is mock the response from PayPal so we can test the capture payment function.

Add the following test to the `paypal.test.ts` file:

```ts
// Capture payment with a mock order
test('simulates capturing a PayPal order', async () => {
  const orderId = '100'; // Mock order ID

  // Mock the capturePayment function to return a successful response
  const mockCapturePayment = jest
    .spyOn(paypal, 'capturePayment')
    .mockResolvedValue({
      status: 'COMPLETED',
    });

  // Call the capturePayment function with the mock order ID
  const captureResponse = await paypal.capturePayment(orderId);
  // Ensure the capture response contains expected fields
  expect(captureResponse).toHaveProperty('status', 'COMPLETED');

  // Clean up mock
  mockCapturePayment.mockRestore();
});
```

`jest.spyOn(paypal, 'capturePayment')` creates a "spy" on the capturePayment method within the paypal object. A spy is a function that monitors and records calls made to another function. With a spy, you can control the return values. In this case, we're using it to simulate a successful API response by returning an object { status: 'COMPLETED' } when capturePayment is called.

Then we proceed to call the capturePayment method with the mock order ID. The test should pass.

We now know that our PayPal functions are working as expected. We can now move on to integrating them into our application.
