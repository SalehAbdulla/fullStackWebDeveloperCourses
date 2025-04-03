# Update Order Form

Before we create the actual Stripe form, we need to update the order form and include something called payment intent and the client secret, which I'll go over in a minute.

Open the `app/(root)/order/[id]/page.tsx` file and add the following import:

```tsx
import Stripe from 'stripe';
```

In the `OrderDetailsPage` component, right under the `session` variable, add the following:

```tsx
let client_secret = null;

// Check if using Stripe and not paid
if (order.paymentMethod === 'Stripe' && !order.isPaid) {
  // Initialize Stripe instance
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  // Create a new payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(Number(order.totalPrice) * 100),
    currency: 'USD',
    metadata: { orderId: order.id },
  });
  client_secret = paymentIntent.client_secret;
}
```

We are just setting the `client_secret` variable null for now.

Then we are checking to see if the payment method is Stripe and if the order is not paid. If it is, we are creating a new Stripe payment intent.

### What Is a Payment Intent?

A Payment Intent is a core concept in Stripe's API that represents a specific transaction for collecting payment from a customer. It’s a record of an attempt to collect money, containing all the information to complete a payment, track its status, and handle any required authentication.

Here are the steps involved in creating a Payment Intent:

1. **Create a payment intent**: This is the initial step where you define the details of the payment, such as the amount, currency, and any additional metadata.
2. **Confirm the payment on the Client**: Using Stripe’s JavaScript SDK (like @stripe/react-stripe-js), the front-end uses the client_secret to confirm the payment.
3. ** Check payment status**: Stripe processes the payment and updates the payment intent status. The Payment Intent’s status updates throughout the process, providing real-time insights. The status could be:

- **Requires Payment Method**: If no payment method has been attached.
- **Requires Confirmation**: If the payment needs confirmation (e.g., from the client).
- **Requires Action**: If additional steps like 3D Secure are needed.
- **Processing**: If the payment is in progress.
- **Succeeded**: If the payment is complete.
- **Canceled or Failed**: If the payment did not succeed or was canceled.

4. **Handle Payment Success or Failure**: Upon confirmation, if the payment is successful, the Payment Intent’s status will update to succeeded. Your backend can use webhooks (like listening for the payment_intent.succeeded event) to trigger further actions, such as sending order confirmation emails, updating the order status, or providing access to digital goods. We're going to do this as well.

Back to our code, the `stripe.paymentIntents.create` method takes in an object with the following properties:

- `amount`: The amount to be charged in the smallest currency unit. For example, $10.00 would be 1000 (1000 cents).
- `currency`: The currency in which the payment will be made.
- `metadata`: Additional information about the payment, such as the order ID.

Then we are setting the `client_secret` variable to the `paymentIntent.client_secret` property.

Now we want to pass the `client_secret` variable to the `OrderDetailsPage` component just like we did the PayPal client ID.

```tsx
<OrderDetailsTable
  order={{
    ...order,
    shippingAddress: order.shippingAddress as ShippingAddress,
  }}
  stripeClientSecret={client_secret}
  paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
  isAdmin={session?.user.role === 'admin' || false}
/>
```

Now we need to update the `OrderDetailsTable` component to include the Stripe payment form. Open the `app/(root)/order/[id]/order-details-table.tsx` file and take in the new prop:

```tsx
const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
  stripeClientSecret,
}: {
  order: Order;
  paypalClientId: string;
  isAdmin: boolean;
  stripeClientSecret: string | null;
}) => {};
```

## Create a Stripe Payment Component

We need to create a new component to handle the Stripe payment form. For now, we will just create it as a placeholder.

Create a new file called `stripe-payment.tsx` in the `app/(root)/order/[id]` directory and add the following code:

```tsx
const StripePayment = ({
  priceInCents,
  orderId,
  clientSecret,
}: {
  priceInCents: number;
  orderId: string;
  clientSecret: string;
}) => {
  return <>STRIPE FORM</>;
};

export default StripePayment;
```

It takes in the `priceInCents`, `orderId`, and `clientSecret` as props. Stripe uses the lowest denomination of a currency for simplicity. For example, $10.00 would be 1000 (1000 cents).

Now, back in the `OrderDetailsTable` component, we can import the `StripePayment` component and use it in the `Stripe` payment method.

```tsx
import StripePayment from './stripe-payment';
```

In the return, add the following right under where we check for paypal and use the `<PayPalScriptProvider>` component:`

```tsx
{
  /* Stripe Payment */
}
{
  !isPaid && paymentMethod === 'Stripe' && stripeClientSecret && (
    <StripePayment
      priceInCents={Number(order.totalPrice) * 100}
      orderId={order.id}
      clientSecret={stripeClientSecret}
    />
  );
}
```

We are passing in the priceInCents by multiplying the total price by 100. We are also passing in the `orderId` and `clientSecret` as props.

Now add something to the cart, go through the process and select Stripe as the payment method. Place the order and you should see the text `STRIPE FORM` in the browser.

In the next lesson, we wil create the actual Stripe form.
