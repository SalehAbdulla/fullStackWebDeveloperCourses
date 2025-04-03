# Create PayPal Order Action & Payment Result Schema/Type

Now that we know our `paypal.ts` file is working, let's continue on to integrate PayPal with our project. 

When we call our function to create an order from paypal, it sends back an object called `paymentResult`. That object includes an `id` and a  `status` field. So we will be using that in our code to update the order to paid. 

We need to create the Zod schema for that `paymentResult`

## Payment Result Schema & Type

We need a new Zod schema for the payment result. Open the `lib/validator.ts` file and add the following:

```ts
export const paymentResultSchema = z.object({
  id: z.string(),
  status: z.string(),
  email_address: z.string(),
  pricePaid: z.string(),
});
```

So when we create a new PayPal order, we will get back an object with an `id`, `status`, `email_address`, and `pricePaid`.

Now opent the types file at `types/index.ts` and add the following:

```ts
import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
  shippingAddressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
  paymentResultSchema, // 👈 Add this line
} from '@/lib/validator';

export type PaymentResult = z.infer<typeof paymentResultSchema>;
```

## PayPal Order Action

We need to create an action to create a new PayPal order. This is different than creating an order in the database. We are basically doing the same thing that we did within our test in the last lesson.

This action itself does not mark the order as paid. We will do that in the next lesson. This just creates the order and gets an ID. We want to return that ID.

Open the `lib/actions/order.actions.ts` file and import the paypal object, revalidatePath as well as the PaymentResult type:

```ts
import { revalidatePath } from 'next/cache';
import { paypal } from '../paypal';
import { CartItem, PaymentResult } from '@/types';
```

Now add the following function:

```js
// Create a Paypal Order
export async function createPayPalOrder(orderId: string) {
  try {
    // Get order from database
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });
    if (order) {
      // Create a paypal order
      const paypalOrder = await paypal.createOrder(Number(order.totalPrice));

      // Update the order with the paypal order id
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          paymentResult: {
            id: paypalOrder.id,
            email_address: '',
            status: '',
            pricePaid: '0',
          },
        },
      });

      // Return the paypal order id
      return {
        success: true,
        message: 'PayPal order created successfully',
        data: paypalOrder.id,
      };
    } else {
      throw new Error('Order not found');
    }
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}
```

This is pretty self-explanatory. We are getting the order from the database, creating a PayPal order, and updating the order with the PayPal order id.

We have a couple more actions that we need to create in order to be able to complete the order. We will do that next.
