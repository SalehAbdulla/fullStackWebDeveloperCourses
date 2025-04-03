# Webhook for Payment

Now that we can go through and make a payment with Stripe, we need to create a webhook that will listen for the payment event and then update our database.

# What Is a Webhook?

A webhook is a way for a service to notify another service when something happens. In our case, we want to notify our app when a payment is made and then we can mark it as paid.

This is done on the production website. You can do it locally, however, you need to install the Stripe CLI and it can get a bit tricky. So we are going to just set the webhook on the production website.

If you have been following along, then you already have your project deployed to Vercel. So as long as you push to your GitHub repo, it will automatically deploy. If you don't have it deployed, then you can deploy it to Vercel. Go back to the video where we deployed the project and follow the steps there.

## Create a Webhook Endpoint

We need to create a webhook endpoint and register it with Stripe. Create a new file at `app/api/webhooks/stripe/route.ts`.

You can read about the code that we are working with here: https://docs.stripe.com/webhooks/quickstart?lang=node

Basically, we need to create a route that will listen for the payment event and then update our database. We do this using the `stripe.webhooks.constructEvent` function. We do need a webhook secret, which we can get from the Stripe dashboard. We'll do that after.

Add the following code to the route file:

```ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { updateOrderToPaid } from '@/lib/actions/order.actions';

// Initialize Stripe with the secret API key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

// Define the POST handler function for the Stripe webhook
export async function POST(req: NextRequest) {
  // Construct the event using the raw request body, the Stripe signature header, and the webhook secret.
  // This ensures that the request is indeed from Stripe and has not been tampered with.
  const event = await stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get('stripe-signature') as string,
    process.env.STRIPE_WEBHOOK_SECRET as string
  );
  // charge.succeeded indicates a successful payment
  if (event.type === 'charge.succeeded') {
    // Retrieve the order ID from the payment metadata
    const { object } = event.data;

    // Update the order status to paid
    await updateOrderToPaid({
      orderId: object.metadata.orderId,
      paymentResult: {
        id: object.id,
        status: 'COMPLETED',
        email_address: object.billing_details.email!,
        pricePaid: (object.amount / 100).toFixed(),
      },
    });

    return NextResponse.json({
      message: 'updateOrderToPaid was successful',
    });
  }
  return NextResponse.json({
    message: 'event is not charge.succeeded',
  });
}
```

The comments are pretty self-explanatory. We are using the `stripe.webhooks.constructEvent` function to construct the event. We are then checking if the event type is `charge.succeeded` and if it is, we are updating the order status to paid.

We need to get the webhook secret from the Stripe dashboard.

## Register the Webhook Endpoint

Go to https://dashboard.stripe.com/test/webhooks

Click on "Create an event destination"

Make sure that "Add Endpoint" is selected.

For the endpoint URL, we need to use the URL of our webhook endpoint on our production website. So you want to use your Vercel domain.

It should look something like this but with your Vercel domain.

```
https://prostore-dev-sage.vercel.app/api/webhooks/stripe
```

Click on "Select Events"

Search for "charge" and select "charge.succeeded" and then "Add event".

Then click on "Add endpoint"

Now where it says "Signing secret", click to reveal and add that to your PRODUCTION website on Vercel. So in your Vercel environment variables add the following:

```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxx
```

Make sure your code is deployed to Vercel and go to the live version and go through the process to make an order and use Stripe to make payment.

You should be able to place an order and then see the order status change to paid.

You can then go to https://dashboard.stripe.com/test/webhooks to see the webhook event that was triggered.

We now have Stripe fully integrated with our app.
