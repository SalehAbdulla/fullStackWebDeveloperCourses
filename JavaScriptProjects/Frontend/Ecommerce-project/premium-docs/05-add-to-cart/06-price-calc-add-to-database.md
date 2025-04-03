# Price Calculation & Add Item To Database

We need to do some calculations on the prices before adding to the database. Let's do that now.

## `round2`

We need a function to round numbers to 2 decimal places.

Open the `lib/utils.ts` file and add the following function:

```ts
// Round to 2 decimal places
export const round2 = (value: number | string) => {
  if (typeof value === 'number') {
    return Math.round((value + Number.EPSILON) * 100) / 100; // avoid rounding errors
  } else if (typeof value === 'string') {
    return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error('value is not a number nor a string');
  }
};
```

The round2 function takes a number or a string that looks like a number and rounds it to 2 decimal places. It takes in a number or string and rounds both to 2 decimal places. It uses Number.EPSILON, which is a very tiny number that helps avoid rounding errors caused by how computers handle floating-point math. Adding this ensures the number is correctly rounded. 

value * 100: This moves the decimal point two places to the right. For example 123.456 → 12345.6

Dividing by 100: This moves the decimal point back to where it was. For example 12346 → 123.46

## `calcPrice` Function

We need to calculate the price of the item. We will do this in the `calcPrice` function. Add this to the `lib/actions/cart.actions.ts` file right above the `addItemToCart` function:

```ts
// Calculate cart price based on items
const calcPrice = (items: z.infer<typeof cartItemSchema>[]) => {
  const itemsPrice = round2(
      items.reduce((acc, item) => acc + Number(item.price) * item.qty, 0)
    ),
    shippingPrice = round2(itemsPrice > 100 ? 0 : 10),
    taxPrice = round2(0.15 * itemsPrice),
    totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
};
```

This function takes an array of items and returns an object with the total price of the items, the shipping price, the tax price, and the total price. We use the `round2` function to round the prices to 2 decimal places. We will create this in a minute. 

The shipping price is $10 if the items price is less than or equal to $100. 

The tax price is 15% of the items price. 

The total price is the sum of the items price, the shipping price, and the tax price. 

We return an object with the prices rounded to 2 decimal places.

## Add Item To Database


In the `addItemToCart` function, get rid of the testing logs and the return.

Under the line `if (!product) throw new Error('Product not found');` add the following code:

```ts
if (!cart) {
  // Create new cart object
  const newCart = insertCartSchema.parse({
    userId: userId,
    items: [item],
    sessionCartId: sessionCartId,
    ...calcPrice([item]),
  });
  // Add to database
  await prisma.cart.create({
    data: newCart,
  });

  // Revalidate product page
  revalidatePath(`/product/${product.slug}`);

  return {
    success: true,
    message: 'Item added to cart successfully',
  };
}
```

We are checking for an existing cart. If it exists, we create a new object with the cart data. We are using the `insertCartSchema` to validate the data. We are using the `calcPrice` function to calculate the price of the item. We will create this in a minute It also includes the `sessionCartId` and the `userId` from the `session` object. We then add it to the database. We then revalidate the product page. We then return a success message.

## Test It Out

Open up Prisma Studio with `npx prisma studio` and check the database. Before clicking the button, there should be nothing in the Cart table. After clicking the button, there should be a new row in the Cart table with the item you added.

