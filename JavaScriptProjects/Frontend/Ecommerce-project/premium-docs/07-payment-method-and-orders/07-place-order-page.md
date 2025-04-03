# Place Order Page

We now need to create the place order page, which is the last page in our checkout process. This page will display the order summary and allow the user to place the order.

Create a file at `app/(root)/place-order/page.tsx` and add the following code:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { auth } from '@/auth';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { formatCurrency } from '@/lib/utils';
import { ShippingAddress } from '@/types';

export const metadata = {
  title: 'Place Order',
};

const placeOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User ID not found');
  }

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect('/cart');
  if (!user.address) redirect('/shipping-address');
  if (!user.paymentMethod) redirect('/payment-method');

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className='py-4 text-2xl'>Place Order</h1>

      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='overflow-x-auto md:col-span-2 space-y-4'>
          Cards Here
        </div>
      </div>
    </>
  );
};

export default placeOrderPage;
```

We are adding all the imports and then we are getting the cart and the user from the database. We are also checking if the cart is empty or if the user has not added a shipping address or a payment method. If any of these conditions are true, we are redirecting the user to the respective page.

In the return, for now, we are just returning the checkout steps and a heading. We also have a couple divs that will wrap some cards.

## Address Card

Let's add a card with the user address and an edit button to go back to the address page. Add this within the `div` tags:

```tsx
<Card>
  <CardContent className='p-4 gap-4'>
    <h2 className='text-xl pb-4'>Shipping Address</h2>
    <p>{userAddress.fullName}</p>
    <p>
      {userAddress.streetAddress}, {userAddress.city}, {userAddress.postalCode},{' '}
      {userAddress.country}{' '}
    </p>
    <div className='mt-3'>
      <Link href='/shipping-address'>
        <Button variant='outline'>Edit</Button>
      </Link>
    </div>
  </CardContent>
</Card>
```

## Payment Method Card

Add another card with the payment method and an edit button to go back to the payment method page:

```tsx
<Card>
  <CardContent className='p-4 gap-4'>
    <h2 className='text-xl pb-4'>Payment Method</h2>
    <p>{user.paymentMethod}</p>
    <div className='mt-3'>
      <Link href='/payment-method'>
        <Button variant='outline'>Edit</Button>
      </Link>
    </div>
  </CardContent>
</Card>
```

## Items

Now we want to show the items. Add the following under the payment method card:

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
        {cart.items.map((item) => (
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
    <Link href='/cart'>
      <Button variant='outline'>Edit</Button>
    </Link>
  </CardContent>
</Card>
```

## Prices

Now we want to add the prices. There are two closing divs. Add this in between both of them:

```tsx
<div>
  <Card>
    <CardContent className='p-4 gap-4 space-y-4'>
      <div className='flex justify-between'>
        <div>Items</div>
        <div>{formatCurrency(cart.itemsPrice)}</div>
      </div>
      <div className='flex justify-between'>
        <div>Tax</div>
        <div>{formatCurrency(cart.taxPrice)}</div>
      </div>
      <div className='flex justify-between'>
        <div>Shipping</div>
        <div>{formatCurrency(cart.shippingPrice)}</div>
      </div>
      <div className='flex justify-between'>
        <div>Total</div>
        <div>{formatCurrency(cart.totalPrice)}</div>
      </div>
      {/* Form Here */}
    </CardContent>
  </Card>
</div>
```

Here is the final code:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { auth } from '@/auth';
import CheckoutSteps from '@/components/shared/checkout-steps';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { formatCurrency } from '@/lib/utils';
import { ShippingAddress } from '@/types';

export const metadata = {
  title: 'Place Order',
};

const placeOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User ID not found');
  }

  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect('/cart');
  if (!user.address) redirect('/shipping-address');
  if (!user.paymentMethod) redirect('/payment-method');

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className='py-4 text-2xl'>Place Order</h1>

      <div className='grid md:grid-cols-3 md:gap-5'>
        <div className='overflow-x-auto md:col-span-2 space-y-4'>
          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Shipping Address</h2>
              <p>{userAddress.fullName}</p>
              <p>
                {userAddress.streetAddress}, {userAddress.city},{' '}
                {userAddress.postalCode}, {userAddress.country}{' '}
              </p>
              <div className='mt-3'>
                <Link href='/shipping-address'>
                  <Button variant='outline'>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className='p-4 gap-4'>
              <h2 className='text-xl pb-4'>Payment Method</h2>
              <p>{user.paymentMethod}</p>
              <div className='mt-3'>
                <Link href='/payment-method'>
                  <Button variant='outline'>Edit</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

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
                  {cart.items.map((item) => (
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
                      <TableCell className='text-right'>
                        ${item.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Link href='/cart'>
                <Button variant='outline'>Edit</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardContent className='p-4 gap-4 space-y-4'>
              <div className='flex justify-between'>
                <div>Items</div>
                <div>{formatCurrency(cart.itemsPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Tax</div>
                <div>{formatCurrency(cart.taxPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Shipping</div>
                <div>{formatCurrency(cart.shippingPrice)}</div>
              </div>
              <div className='flex justify-between'>
                <div>Total</div>
                <div>{formatCurrency(cart.totalPrice)}</div>
              </div>
              {/* Form Here */}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default placeOrderPage;
```
