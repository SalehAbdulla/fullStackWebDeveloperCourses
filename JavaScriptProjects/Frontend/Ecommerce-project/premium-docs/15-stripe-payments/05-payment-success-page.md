# Payment Success Page

Now that we have the Stripe payment form working, we need to create a page that will be displayed when the payment is successful.

Create a new file at `app/(root)/order/[id]/stripe-payment-success/page.tsx` and add the following:

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import Stripe from 'stripe';
import { getOrderById } from '@/lib/actions/order.actions';
import { Button } from '@/components/ui/button';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
export const metadata: Metadata = {
  title: 'Stripe Payment Success',
};
const SuccessPage = async (props: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ payment_intent: string }>;
}) => {
  //  Get the order id and payment intent id from the URL
  const { id } = await props.params;
  const { payment_intent: paymentIntentId } = await props.searchParams;

  // Fetch order
  const order = await getOrderById(id);
  if (!order) notFound();

  // Retrieve the payment intent
  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

  // Check if the payment intent is valid
  if (
    paymentIntent.metadata.orderId == null ||
    paymentIntent.metadata.orderId !== order.id.toString()
  ) {
    return notFound();
  }

  // Check if the payment intent is successful
  const isSuccess = paymentIntent.status === 'succeeded';

  if (!isSuccess) return redirect(`/order/${id}`);

  return (
    <div className='max-w-4xl w-full mx-auto space-y-8'>
      <div className='flex flex-col gap-6 items-center '>
        <h1 className='h1-bold'>Thanks for your purchase</h1>
        <div>We are now processing your order.</div>
        <Button asChild>
          <Link href={`/order/${id}`}>View order</Link>
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
```

We are retrieving the order id and payment intent id from the URL. We are then fetching the order from the database. We are then retrieving the payment intent from Stripe. We are then checking if the payment intent is valid. We are then checking if the payment intent is successful. If it is, we are redirecting to the order page. If it is not, we are redirecting to the order page.

Refresh the page or make another order and you should see the payment success page.

Now the issue we have left is that it has not been marked paid in the database. We need to setup a webhook to update the order when the payment is successful. We'll do that next.
