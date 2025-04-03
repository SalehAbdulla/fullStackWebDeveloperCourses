# Update Order Action (COD)

We can purchase products via PayPal and update the orders to paid However, we will have other payment methods such as Cash on Delivery (COD) and Stripe. We also need to mark as delivered. Let's create a new action in the `lib/actions/orders.actions.ts` file:

```ts
export async function updateOrderToPaidByCOD(orderId: string) {
  try {
    await updateOrderToPaid({ orderId });
    revalidatePath(`/order/${orderId}`);
    return { success: true, message: 'Order paid successfully' };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}
```

We are just calling the `updateOrderToPaid` function from the `lib/actions/orders.actions.ts` file and passing in the orderId. We are also using the `revalidatePath` method to revalidate the path `/order/${orderId}`. This will update the order page after the order has been updated.

Now add the following function to the `lib/actions/orders.actions.ts` file:

```ts
// Update Order To Delivered
export async function deliverOrder(orderId: string) {
  try {
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
      },
    });

    if (!order) throw new Error('Order not found');
    if (!order.isPaid) throw new Error('Order is not paid');

    await prisma.order.update({
      where: { id: orderId },
      data: {
        isDelivered: true,
        deliveredAt: new Date(),
      },
    });

    revalidatePath(`/order/${orderId}`);

    return { success: true, message: 'Order delivered successfully' };
  } catch (err) {
    return { success: false, message: formatError(err) };
  }
}
```

We are getting the order from the database and checking if it is paid. If it is not paid, we are throwing an error. If it is paid, we are updating the order to delivered and setting the deliveredAt field to the current date. We are also using the `revalidatePath` method to revalidate the path `/order/${orderId}`. This will update the order page after the order has been updated.

In the next lesson, we will work on the order page.
