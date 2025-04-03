# Order Details Page Delivered

We now need to show the delivered status on the order details page.

Open the `app/(root)/order/[id]/page.tsx` file and add the auth import:

```tsx
import { auth } from '@/auth';
```

Above the return statement, get the session using the `auth` function:

```tsx
const session = await auth();
```

Now pass in a prop of `isAdmin`:

```tsx
<OrderDetailsTable
  order={{
    ...order,
    shippingAddress: order.shippingAddress as ShippingAddress,
  }}
  paypalClientId={process.env.PAYPAL_CLIENT_ID || 'sb'}
  isAdmin={session?.user.role === 'admin' || false} // Add this line
/>
```

Now, open the `app/(root)/order/[id]/order-details-table.tsx` file and import the two actions that we created in the last lesson, which are `updateOrderToPaidByCOD` and `deliverOrder`:

```tsx
import {
  approvePayPalOrder,
  createPayPalOrder,
  deliverOrder,
  updateOrderToPaidByCOD,
} from '@/lib/actions/order.actions';
```

Also import the `useTransition` hook and `Button` component:

```tsx
import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
```

We need to take in the `isAdmin` prop from the parent component:

```tsx
const OrderDetailsTable = ({
  order,
  paypalClientId,
  isAdmin,
}: {
  order: Order;
  paypalClientId: string;
  isAdmin: boolean;
}) => {};
```

## Admin buttons

Now we want to have 2 buttons that only admins have access to to update the paid and delivered status of the order. Add the following code to the return statement right below the PayPal button code and right above the ending `</CardContent>` tag:

```tsx
{
  /* Cash On Delivery */
}
{
  isAdmin && !isPaid && paymentMethod === 'CashOnDelivery' && (
    <MarkAsPaidButton />
  );
}
{
  isAdmin && isPaid && !isDelivered && <MarkAsDeliveredButton />;
}
```

Now let's create the `MarkAsPaidButton` and `MarkAsDeliveredButton` components.

Go right above the return statement in this file and add the following code:

```tsx
// Button To mark the order as paid
const MarkAsPaidButton = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  return (
    <Button
      type='button'
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await updateOrderToPaidByCOD(order.id);
          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message,
          });
        })
      }
    >
      {isPending ? 'processing...' : 'Mark As Paid'}
    </Button>
  );
};

// Button To mark the order as delivered
const MarkAsDeliveredButton = () => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  return (
    <Button
      type='button'
      disabled={isPending}
      onClick={() =>
        startTransition(async () => {
          const res = await deliverOrder(order.id);
          toast({
            variant: res.success ? 'default' : 'destructive',
            description: res.message,
          });
        })
      }
    >
      {isPending ? 'processing...' : 'Mark As Delivered'}
    </Button>
  );
};
```

These buttons are just calling the actions that we created in the last lesson.

You can test this out by creating an order and then marking it as paid and delivered.

If the purchase uses PayPal, it will be marked as paid and delivered automatically. If it uses Cash on Delivery, you will need to mark it as paid and delivered manually.
