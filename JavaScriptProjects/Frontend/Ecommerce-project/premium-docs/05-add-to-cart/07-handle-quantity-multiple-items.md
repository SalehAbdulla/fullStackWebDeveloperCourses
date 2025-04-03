# Handle Quantity & Multiple Items

We need to check if the cart exists because if we have a product in the cart and we go to add another one of the same product, we just want to increase the quantity of the existing item. We also want to add another item if it does not exist.

Add an `else` to the `if(!cart)` statement. Add the following code:

```ts
// Check for cart
if (!cart) {
  // ...
} else {
  // Check for existing item in cart
  const existItem = (cart.items as CartItem[]).find(
    (x) => x.productId === item.productId
  );
  // If not enough stock, throw error
  if (existItem) {
    if (product.stock < existItem.qty + 1) {
      throw new Error('Not enough stock');
    }

    // Increase quantity of existing item
    (cart.items as CartItem[]).find(
      (x) => x.productId === item.productId
    )!.qty = existItem.qty + 1;
  } else {
    // If stock, add item to cart
    if (product.stock < 1) throw new Error('Not enough stock');
    cart.items.push(item);
  }

  // Save to database
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: cart.items as Prisma.CartUpdateitemsInput[],
      ...calcPrice(cart.items as CartItem[]),
    },
  });

  revalidatePath(`/product/${product.slug}`);

  return {
    success: true,
    message: `${product.name} ${
      existItem ? 'updated in' : 'added to'
    } cart successfully`,
  };
}
```

We are checking to see if the item is already in the cart. We then check to see if the stock is enough to add the item to the cart. If it is, we increase the quantity of the existing item.

If the item does not exist in the cart, we check the stock and then we add it.

Finally, we save the item to the database. We are using the `update` method to update the cart. We are using the `calcPrice` function to calculate the price of the item. We are using the `revalidatePath` function to revalidate the product page. We then return a success message.

Now you should be able to add as many items as you want to the cart. If you look in the database in the Cart table and the `items` field, you will see the items in the cart. If there is more than one of the same item, the qty will be greater than 1.
