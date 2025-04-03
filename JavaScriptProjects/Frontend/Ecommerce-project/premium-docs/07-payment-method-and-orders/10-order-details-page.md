# Order Details Page

Now that we can place an order, we need to work on a page to show the order details.

Let's start with the action to fetch an order by ID. Open the `lib/actions/order.actions.ts` file and import the `convertToPlainObject` function:

```ts
import { convertToPlainObject } from '../utils';
```

Create a new function:

```ts
export async function getOrderById(orderId: string) {
  const data = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderItems: true,
      user: { select: { name: true, email: true } },
    },
  });
  return convertToPlainObject(data);
}
```

This is very simple. We are just getting the order by the ID and returning the order with the user and the order items.

## Order Details Page

Create a page at `app/(root)/order/[id]/page.tsx` and add the following code:

```tsx
import { getOrderById } from '@/lib/actions/order.actions';
import { notFound } from 'next/navigation';
import { ShippingAddress } from '@/types';

export const metadata = {
  title: 'Order Details',
};

const OrderDetailsPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const params = await props.params;

  const { id } = params;

  const order = await getOrderById(id);
  if (!order) notFound();

  return <>Order Details Form</>;
};

export default OrderDetailsPage;
```

Now when you place an order, you should see the text "Order Details Form".

We will work on the form, but first we have some utility functions to create. We will do that next.
