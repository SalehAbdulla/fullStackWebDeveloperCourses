# Order Details Table

So, now we are going to create the table to embed in the order details page.

Create a file at `app/(root)/order/[id]/order-details-table.tsx` and add the following code:

```tsx
'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Order } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const OrderDetailsTable = ({ order }: { order: Order }) => {
  const { toast } = useToast();

  return (
    <>
      <h1 className='py-4 text-2xl'> Order {formatId(order.id)}</h1>
      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='overflow-x-auto md:col-span-2 space-y-4'>Content</div>
      </div>
    </>
  );
};

export default OrderDetailsTable;
```

We are just bringing in some components from ShadCN, Image, Link components, our utility functions.

The component takes in an order object as a prop. We initialize the toast. We are then displaying the short version of the order id.

Bring the form into the order details page.

Open the `app/(root)/order/[id]/page.tsx` file and add the following import:

```tsx
import OrderDetailsTable from './order-details-table';
```

Then, add the following code to the `OrderPage` component:

```tsx
return (
  <OrderDetailsTable
    order={{
      ...order,
      shippingAddress: order.shippingAddress as ShippingAddress,
    }}
  />
);
```

We are just passing in the order object to the form. We are also casting the shippingAddress to the ShippingAddress type.

After placing an order, you should see the order ID. Let's continue on with the order form component.

Open the `app/(root)/order/[id]/order-details-table.tsx` file.

Let's destructure the order data. Right above the toast variable, add the following code:

```tsx
const {
  shippingAddress,
  orderItems,
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  paymentMethod,
  isPaid,
  paidAt,
  isDelivered,
  deliveredAt,
} = order;
```

We are just destructuring the order data.

## Payment Method Card

In the return, within the `div` tags, add the following card:

```tsx
<Card>
  <CardContent className='p-4 gap-4'>
    <h2 className='text-xl pb-4'>Payment Method</h2>
    <p>{paymentMethod}</p>
    {isPaid ? (
      <Badge variant='secondary'>
        Paid at {formatDateTime(paidAt!).dateTime}
      </Badge>
    ) : (
      <Badge variant='destructive'>Not paid</Badge>
    )}
  </CardContent>
</Card>
```

We are checking if the order is paid. If it is, we are displaying the paid at date. If it is not, we are displaying a badge that says "Not paid".

## Shipping Address Card

Now add the following card under the last one:

```tsx
<Card>
  <CardContent className='p-4 gap-4'>
    <h2 className='text-xl pb-4'>Shipping Address</h2>
    <p>{shippingAddress.fullName}</p>
    <p>
      {shippingAddress.streetAddress}, {shippingAddress.city},{' '}
      {shippingAddress.postalCode}, {shippingAddress.country}{' '}
    </p>
    {isDelivered ? (
      <Badge variant='secondary'>
        Delivered at {formatDateTime(deliveredAt!).dateTime}
      </Badge>
    ) : (
      <Badge variant='destructive'>Not delivered</Badge>
    )}
  </CardContent>
</Card>
```

This checks for delivery and will display a badge that says "Not delivered" if it is not delivered and the delivery date if it is delivered.

## Order Items Table

Add the following card under the last one:

```tsx
<Card>
  <CardContent className='p-4 gap-4'>
    <h2 className='text-xl pb-4'>Order Items</h2>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orderItems.map((item) => (
          <TableRow key={item.slug}>
            <TableCell>
              <Link
                href={`/product/${item.slug}`}
                className='flex items-center'
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={50}
                  height={50}
                ></Image>
                <span className='px-2'>{item.name}</span>
              </Link>
            </TableCell>
            <TableCell>
              <span className='px-2'>{item.qty}</span>
            </TableCell>
            <TableCell className='text-right'>${item.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </CardContent>
</Card>
```

This will show the order items.

Finally we want the price summary. Add this `div` in the middle of the 2 closing `div` tags:

```tsx
<div>
  <Card>
    <CardContent className='p-4 space-y-4 gap-4'>
      <h2 className='text-xl pb-4'>Order Summary</h2>
      <div className='flex justify-between'>
        <div>Items</div>
        <div>{formatCurrency(itemsPrice)}</div>
      </div>
      <div className='flex justify-between'>
        <div>Tax</div>
        <div>{formatCurrency(taxPrice)}</div>
      </div>
      <div className='flex justify-between'>
        <div>Shipping</div>
        <div>{formatCurrency(shippingPrice)}</div>
      </div>
      <div className='flex justify-between'>
        <div>Total</div>
        <div>{formatCurrency(totalPrice)}</div>
      </div>
    </CardContent>
  </Card>
</div>
```

So now our process is almost complete. We just have to implement the actual purchase functionality. We will do that next.
