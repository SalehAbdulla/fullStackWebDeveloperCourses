# Preview Email In Browser

We are going to add some preview props to our email template so that we can preview it in the browser.

Open the `email/purchase-receipt.tsx` file and import the `db/sample-data.ts` file if you have not done so already.

```tsx
import sampleData from '@/db/sample-data';
```

Add the following code right above the `dateFormatter` variable:

```tsx
PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: '123',
    user: {
      name: 'John Doe',
      email: 'bS8Rn@example.com',
    },
    paymentMethod: 'Stripe',
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '123 Main St',
      city: 'New York',
      postalCode: '10001',
      country: 'US',
    },
    createdAt: new Date(),
    totalPrice: '100',
    taxPrice: '10',
    shippingPrice: '10',
    itemsPrice: '80',
    orderItems: sampleData.products.map((x) => ({
      name: x.name,
      orderId: '123',
      productId: '123',
      slug: x.slug,
      qty: x.stock,
      image: x.images[0],
      price: x.price,
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
    paymentResult: {
      id: '123',
      status: 'succeeded',
      pricePaid: '12',
      email_address: 'bS8Rn@example.com',
    },
  },
} satisfies OrderInformationProps;
```

We are using the sample data from the `sample-data.ts` file to create a fake order.

You will probably see a red line for the `paymentResult` property. To fix this, open the `types/index.ts` file and add the `paymentResult` property to the `Order` type:

```ts
export type Order = z.infer<typeof insertOrderSchema> & {
  id: string;
  createdAt: Date;
  isPaid: Boolean;
  paidAt: Date | null;
  isDelivered: Boolean;
  deliveredAt: Date | null;
  orderItems: OrderItem[];
  user: { name: string; email: string };
  paymentResult: PaymentResult; // 👈 Add this line
};
```

You may have a red line in the `app/(root)/order/[id]/page.tsx` file. Where we embed the `<OrderDetailsTable  />` component. That is because added PaymentResult to the `Order` type that this component is using. So we can just open the component file, which is `app/(root)/order/[id]/order-details-table.tsx` and change this line:

```tsx
order: Order;
```

To this line:

```tsx
order: Omit<Order, 'paymentResult'>;
```

We are just omitting the `paymentResult` property from the `Order` type. Yes TypeScript can be a pain in the ass 😉

## Add NPM Script

We are going to add a script to our `package.json` file to send the email.

Open the `package.json` file and add the following script:

```json
 "email": "cp .env ./node_modules/react-email && email dev --dir email --port 3001"
```

Let's break down what this script does:

- `cp .env ./node_modules/react-email`: This copies the `.env` file to the `node_modules/react-email` directory. This is because the `react-email` package uses the `.env` file to get the `RESEND_API_KEY` and `SENDER_EMAIL` variables.

- `email dev --dir email --port 3001`: This starts the `email` package in development mode and opens the email in the browser.

Let's run the script:

```bash
npm run email
```

Now if you go to `http://localhost:3001` you should see the email in the browser. This is what your email will look like.

In the next lesson, we will send the email.
