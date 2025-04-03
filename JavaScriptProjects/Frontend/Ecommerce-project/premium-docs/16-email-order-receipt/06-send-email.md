# Send Email on Order Confirmation

Now we want this email to be sent when the user completes the checkout process.

Open the `lib/actions/order.actions.ts` file and import the `sendPurchaseReceipt` function from the `email` folder. We also need the `ShippingAddress` type from the `types` folder.

```ts
import { CartItem, PaymentResult, ShippingAddress } from '@/types';
import { sendPurchaseReceipt } from '@/email';
```

At the very end of the `updateOrderToPaid` function, after the transaction, we are going to get the updated order and send the email.

Add the following code at the very end of the function:

```ts
// Get the updated order after the transaction
const updatedOrder = await prisma.order.findFirst({
  where: {
    id: orderId,
  },
  include: {
    orderItems: true,
    user: { select: { name: true, email: true } },
  },
});

if (!updatedOrder) {
  throw new Error('Order not found');
}

// Send the purchase receipt email with the updated order
sendPurchaseReceipt({
  order: {
    ...updatedOrder,
    shippingAddress: updatedOrder.shippingAddress as ShippingAddress,
    paymentResult: updatedOrder.paymentResult as PaymentResult,
  },
});
```

We are getting the updated order after the transaction and then sending the email. We are also passing in the updated order as a prop to the `sendPurchaseReceipt` function along with the `ShippingAddress` type and `PaymentResult` because we need those for the email template.

## Test The Email

Now let's test the email. Add items to the cart and go through the process. Select PayPal as it will be marked as paid after purchasing with a sandbox account.

Once the order is paid, you should receive an email with the purchase receipt. You can also go to https://resend.com/emails and see the email that was sent.
