# Shipping Address Zod Schema & Page

Let's create our next step in the checkout process, the shipping address page and form.

## Shipping Address Schema

Let's start by creating the Zod schema for the shipping address. Open the `lib/validator.ts` file and add the following:

```tsx
export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'Name must be at least 3 characters'),
  streetAddress: z.string().min(3, 'Address must be at least 3 characters'),
  city: z.string().min(3, 'city must be at least 3 characters'),
  postalCode: z.string().min(3, 'Postal code must be at least 3 characters'),
  country: z.string().min(3, 'Country must be at least 3 characters'),
  lat: z.number().optional(),
  lng: z.number().optional(),
});
```

## Shipping Address Type

Let's add the following type to the `types/index.ts` file:

```tsx
import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
  shippingAddressSchema,
} from '@/lib/validator';
```

```tsx
export type ShippingAddress = z.infer<typeof shippingAddressSchema>;
```

## Default Values / Constants

Let's add some constants to the `lib/constants/index.ts` file:

```tsx
export const shippingAddressDefaultValues = {
  fullName: 'John Doe',
  streetAddress: '123 Main St',
  city: 'Anytown',
  postalCode: '12345',
  country: 'USA',
};
```

Of course you can add different values if you would like.

## Shipping Address Page

Let's create the page. Create a new file at `app/(root)/shipping-address/page.tsx` and add the following:

```tsx
import { auth } from '@/auth';
import { getMyCart } from '@/lib/actions/cart.actions';
import { getUserById } from '@/lib/actions/user.actions';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { ShippingAddress } from '@/types';

export const metadata: Metadata = {
  title: 'Shipping Address',
};

const ShippingAddressPage = async () => {
  const cart = await getMyCart();

  if (!cart || cart.items.length === 0) redirect('/cart');

  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User ID not found');
  }

  const user = await getUserById(userId);

  return <>Shipping Page</>;
};

export default ShippingAddressPage;
```

We are bringing in the `auth` function from the `auth` file. This will give us the current user's session. We are using the `getMyCart` function from the `cart.actions` file to get the current user's cart. We are using the `getUserById` function from the `user.actions` file to get the current user's information. We have not created this yet, but we will in a minute.

We are using the `redirect` function from `next/navigation` to redirect the user to the cart page if the cart is empty. We are using the `Metadata` type from `next` to set the page title. We are using the `ShippingAddress` type from the `types` file to type the `user` variable.

## Get User By ID

Open the `lib/actions/user.actions.ts` file and add the following:

```tsx
// Get user by ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error('User not found');
  return user;
}
```

This is a simple function that gets the user by their ID. We are using the `prisma.user.findFirst` method to get the user by their ID. We are using the `where` property to specify the ID of the user we want to get. We are using the `if` statement to check if the user exists. If the user does not exist, we are throwing an error. We are returning the user.

In the next lesson, we will create the shipping address form component.
