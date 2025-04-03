# Approve & Update Order Actions

In order to be able to use PayPal, there are a couple other actions that we need to create. We need a `approvePayPalOrder` action and an `updateOrderToPaid` function.

## Approve Paypal Order Action

This action is used to approve the order once payment has been made. IN the UI, when a user clicks to pay with PayPal, a 3rd party paypal window opens for the user to enter their PayPal credentials. All the secure payment stuff is done on the PayPal servers, not our application. Once the user has entered their credentials and payment is made, we get back the order id from PayPal and we need to approve the order. That's what this action is for.

Open the `lib/actions/order.actions.js` file and add the following function:

```javascript
// Approve Paypal Order
export async function approvePayPalOrder(
  orderId: string,
  data: { orderID: string }
) {
  try {
    // Find the order in the database
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    })
    if (!order) throw new Error('Order not found')

    // Check if the order is already paid
    const captureData = await paypal.capturePayment(data.orderID)
    if (
      !captureData ||
      captureData.id !== (order.paymentResult as PaymentResult)?.id ||
      captureData.status !== 'COMPLETED'
    )
      throw new Error('Error in paypal payment')

    //  @todo - Update order to paid

    revalidatePath(`/order/${orderId}`)

    return {
      success: true,
      message: 'Your order has been successfully paid by PayPal',
    }
  } catch (err) {
    return { success: false, message: formatError(err) }
  }
}
```

We are getting the order from the database, checking if the order is already paid by calling the `capturePayment` function from the `lib/paypal.ts` file. Now we need to update the order to paid. Let's create another action below it for that.

Add the following function to the same file:

```javascript
// Update Order to Paid in Database
async function updateOrderToPaid({
  orderId,
  paymentResult,
}: {
  orderId: string;
  paymentResult?: PaymentResult;
}) {
  // Find the order in the database and include the order items
  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
    },
  });

  if (!order) throw new Error('Order not found');

  if (order.isPaid) throw new Error('Order is already paid');

  // Transaction to update the order and update the product quantities
  await prisma.$transaction(async (tx) => {
    // Update all item quantities in the database
    for (const item of order.orderitems) {
      await tx.product.update({
        where: { id: item.productId },
        data: { stock: { increment: -item.qty } },
      });
    }

    // Set the order to paid
    await tx.order.update({
      where: { id: orderId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        paymentResult,
      },
    });
  });

  // Get the updated order after the transaction
  const updatedOrder = await prisma.order.findFirst({
    where: {
      id: orderId,
    },
    include: {
      orderitems: true,
      user: { select: { name: true, email: true } },
    },
  });

  if (!updatedOrder) {
    throw new Error('Order not found');
  }
};

```

This function takes in the order ID as well as data from the payment result that PayPal sends us. We are getting the order from the database, checking if the order is already paid, and updating the order to paid. We are also updating the product quantities in the database. We do this in a transaction so that if one of the updates fails, the entire transaction fails. So you don't end up with an order that is paid but the product quantities are not updated.

Now we have to call the `updateOrderToPaid` action from the `approvePayPalOrder` action. Replace the `@todo` comment with the following code:

```javascript
  // Update order to paid
  await updateOrderToPaid({
    orderId,
    paymentResult: {
      id: captureData.id,
      status: captureData.status,
      email_address: captureData.payer.email_address,
      pricePaid:
        captureData.purchase_units[0]?.payments?.captures[0]?.amount?.value,
    },
  });
```

We are passing the order ID and a payment result with data from the PayPal capture payment.

Our server actions are now complete, let's move on to the client and create the UI for the user to pay with PayPal.
