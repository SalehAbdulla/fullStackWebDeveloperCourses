# Order Zod Schemas & Type

## Insert Order Zod Schema

Now let's add the Zod schema for insert order. Open the `lib/validators.ts` file and add the following code:

```typescript
// Insert Order Schema
export const insertOrderSchema = z.object({
  userId: z.string().min(1, 'User is required'),
  itemsPrice: currency,
  shippingPrice: currency,
  taxPrice: currency,
  totalPrice: currency,
  paymentMethod: z.string().refine((data) => PAYMENT_METHODS.includes(data), {
    message: 'Invalid payment method',
  }),
  shippingAddress: shippingAddressSchema,
});
```

This is for the order that is being created.

We also need a schema for the order items. Open the `lib/validators.ts` file and add the following code:

```typescript
export const insertOrderItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  image: z.string(),
  name: z.string(),
  price: currency,
  qty: z.number(),
});
```

## Order & OrderItem Types

Now let's add the types for the order and order item. Open the `types/index.ts` file and import the `insertOrderSchema` and `insertOrderItemSchema` from the `lib/validators.ts` file:

```typescript
import {
  cartItemSchema,
  insertCartSchema,
  insertProductSchema,
  shippingAddressSchema,
  insertOrderItemSchema,
  insertOrderSchema,
} from '@/lib/validator';
```

Now add the following code:

```typescript
export type OrderItem = z.infer<typeof insertOrderItemSchema>;
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: Boolean;
  paidAt: Date | null;
  isDelivered: Boolean;
  deliveredAt: Date | null;
  orderItems: OrderItem[];
  user: { name: string; email: string };
};
```

We are using the `z.infer` type to get the type of the schema. We are also adding some additional fields to the order type.

Next we will start to create an action to create an order.
