# Get Item For Cart

We want to be able to add an item to the cart in the database, but first, we have to get the user and find the product in the database. That's what we'll do in this lesson.

Open the `lib/actions/cart.actions.ts` and add the following imports:

```ts
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { auth } from '@/auth';
import { formatError } from '../utils';
import { cartItemSchema, insertCartSchema } from '../validators';
import { prisma } from '@/db/prisma';
import { CartItem } from '@/types';
import { Prisma } from '@prisma/client';
import { convertToPlainObject } from '../utils';
```

We are bringing in the validators, utility functions, auth file, cookies, revalidatePath, and the prisma client.

## Add Item To Cart Action

Let's continue with the `addItemToCart` action. It won't actually add it just yet, but like I said, we need to get the user and get the item.

In the try block, let's start by getting the session cart ID from the cookie and then get the user ID from the session. We will add some logs for testing as well.

Add the following for the `addItemToCart` action:

```ts
// Add item to cart in database
export async function addItemToCart(data: CartItem) => {
  try {
    // Check for session cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart Session not found');

    // Get session and user ID
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Testing
    console.log({
      'Session Cart ID': sessionCartId,
      'User ID': userId,
    });

    return {
      success: true,
      message: 'Testing Cart',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
```

Now click the add to cart button and you should see the session cart ID and user ID in the console. So far, so good.

## Get User Cart Action

We need to get the user's cart from the database. We will do this in the `getMyCart` action.

Under the `addItemToCart` action, add the following action:

```ts
//  Get user cart from database
export async function getMyCart() {
  // Check for session cart cookie
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) return undefined;

  // Get session and user ID
  const session = await auth();
  const userId = session?.user.id;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert Decimal values to strings
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
```

Again we are checking for the session cart ID in the cookie. If it doesn't exist, we return undefined. We are also getting the user ID from the session. We are then using the `prisma` object to find the cart in the database. If the cart doesn't exist, we return undefined. We are then using the `convertToPlainObject` function to convert the data to a plain object.

We are converting the `itemsPrice`, `totalPrice`, `shippingPrice`, and `taxPrice` to strings because we are using the `Decimal` type in the database. We need to fdo this to prevent future TypeScript errors.

Now back in the `addItemToCart` action, let's get the user cart.

```ts
// Get cart from database
const cart = await getMyCart();
// Parse and validate submitted item data
const item = cartItemSchema.parse(data);
// Find product in database
const product = await prisma.product.findFirst({
  where: { id: item.productId },
});
if (!product) throw new Error('Product not found');

// Testing
console.log({
  'Session Cart ID': sessionCartId,
  'User ID': userId,
  'Item Requested': item,
  'Product Found': product,
  cart: cart,
});

return {
  success: true,
  message: 'Testing Cart',
};
```

You should see the item requested from the button, the product found in the database and the cart, which right now is undefined.

In the next lesson, we will make it so the item is added to the cart.

Here is the full code for the `addItemToCart` action up to this point:

```ts
'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { auth } from '@/auth';
import { formatError } from '../utils';
import { cartItemSchema, insertCartSchema } from '../validator';
import { prisma } from '@/db/prisma';
import { CartItem } from '@/types';
import { Prisma } from '@prisma/client';
import { convertToPlainObject, round2 } from '../utils';

// Add item to cart in database
export const addItemToCart = async (data: z.infer<typeof cartItemSchema>) => {
  try {
    // Check for session cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart Session not found');
    // Get session and user ID
    const session = await auth();
    const userId = session?.user.id as string | undefined;
    // Get cart from database
    const cart = await getMyCart();
    // Parse and validate submitted item data
    const item = cartItemSchema.parse(data);
    // Find product in database
    const product = await prisma.product.findFirst({
      where: { id: item.productId },
    });
    if (!product) throw new Error('Product not found');

    // Testing
    console.log({
      'Session Cart ID': sessionCartId,
      'User ID': userId,
      'Item Requested': item,
      'Product Found': product,
      cart: cart,
    });

    return {
      success: true,
      message: 'Testing Cart',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};

//  Get user cart from database
export async function getMyCart() {
  // Check for session cart cookie
  const sessionCartId = (await cookies()).get('sessionCartId')?.value;
  if (!sessionCartId) return undefined;

  // Get session and user ID
  const session = await auth();
  const userId = session?.user.id;

  // Get user cart from database
  const cart = await prisma.cart.findFirst({
    where: userId ? { userId: userId } : { sessionCartId: sessionCartId },
  });

  if (!cart) return undefined;

  // Convert Decimal values to strings for compatibility with AddToCart component
  return convertToPlainObject({
    ...cart,
    items: cart.items as CartItem[],
    itemsPrice: cart.itemsPrice.toString(),
    totalPrice: cart.totalPrice.toString(),
    shippingPrice: cart.shippingPrice.toString(),
    taxPrice: cart.taxPrice.toString(),
  });
}
```
