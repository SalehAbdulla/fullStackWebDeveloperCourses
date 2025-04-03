# Remove Item from Cart Action

We can now add an item to the cart. Now let's add the ability to remove an item from the cart. We need to create a new action for this.

Open the `lib/actions/cart.actions.ts` file and add the following function:

```ts
// Remove item from cart in database
export async function removeItemFromCart (productId: string) {
  try {
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
```

We are passing in a product id to remove.

We will build this function up in chunks. First, we need to get the session cart id. Add the following code to the try block:

```ts
// Get session cart id
const sessionCartId = (await cookies()).get('sessionCartId')?.value;
if (!sessionCartId) throw new Error('Cart Session not found');
```

Next, we need to get the product from the database:

```ts
// Get product
const product = await prisma.product.findFirst({
  where: { id: productId },
});
if (!product) throw new Error('Product not found');
```

Next, get the user cart:

```ts
// Get user cart
const cart = await getMyCart();
if (!cart) throw new Error('Cart not found');
```

See if the cart has the item:

```ts
// Check if cart has item
const exist = (cart.items as CartItem[]).find((x) => x.productId === productId);
if (!exist) throw new Error('Item not found');
```

We need to check if the quantity is 1 and if so, remove the item. If the quantity is more than 1, then we need to decrease the quantity. Add the following code:

```ts
// Check if cart has only one item
if (exist.qty === 1) {
  // Remove item from cart
  cart.items = (cart.items as CartItem[]).filter(
    (x) => x.productId !== exist.productId
  );
} else {
  // Decrease quantity of existing item
  (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
    exist.qty - 1;
}
```

Update the database:

```ts
// Update cart in database
await prisma.cart.update({
  where: { id: cart.id },
  data: {
    items: cart.items as Prisma.CartUpdateitemsInput[],
    ...calcPrice(cart.items as CartItem[]),
  },
});
```

We are using the `calcPrice` function to calculate the price of the item.

Revalidate the product page:

```ts
// Revalidate product page
revalidatePath(`/product/${product.slug}`);
```

Return success and message:

```ts
return {
  success: true,
  message: `${product.name}  ${
    (cart.items as CartItem[]).find((x) => x.productId === productId)
      ? 'updated in'
      : 'removed from'
  } cart successfully`,
};
```

We are returning a message with the product name and whether it was updated or removed from the cart.

Here is the full code:

```ts
// Remove item from cart in database
export async function removeItemFromCart (productId: string) {
  try {
    // Get session cart id
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('Cart Session not found');

    // Get product
    const product = await prisma.product.findFirst({
      where: { id: productId },
    });
    if (!product) throw new Error('Product not found');

    // Get user cart
    const cart = await getMyCart();
    if (!cart) throw new Error('Cart not found');

    // Check if cart has item
    const exist = (cart.items as CartItem[]).find(
      (x) => x.productId === productId
    );
    if (!exist) throw new Error('Item not found');

    // Check if cart has only one item
    if (exist.qty === 1) {
      // Remove item from cart
      cart.items = (cart.items as CartItem[]).filter(
        (x) => x.productId !== exist.productId
      );
    } else {
      // Decrease quantity of existing item
      (cart.items as CartItem[]).find((x) => x.productId === productId)!.qty =
        exist.qty - 1;
    }

    // Update cart in database
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: cart.items as Prisma.CartUpdateitemsInput[],
        ...calcPrice(cart.items as CartItem[]),
      },
    });

    // Revalidate product page
    revalidatePath(`/product/${product.slug}`);

    return {
      success: true,
      message: `${product.name}  ${
        (cart.items as CartItem[]).find((x) => x.productId === productId)
          ? 'updated in'
          : 'removed from'
      } cart successfully`,
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
};
```
