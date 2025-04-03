# Dynamic Cart Button

We now have an action to remove the items from the cart. Now we are going to edit the add-item-to-cart button to show a quantity and a remove button.

We need to pass the cart into the button component. So open the product page at `app/(root)/product/[slug]/page.tsx` and let's import our `getMyCart` action:

```tsx
import { getMyCart } from '@/lib/actions/cart.actions';
```

then initialize it above the return:

```tsx
const ProductDetailsPage = async (
  props: {
    params: Promise<{ slug: string }>;
  }
) => {
  const params = await props.params;

  const {
    slug
  } = params;

  const product = await getProductBySlug(slug)
  if (!product) notFound();

  const cart = await getMyCart(); //👈 Add this line
  return (// ...)
```

Now just pass it into the `AddToCart` component:

```tsx
<AddToCart
  cart={cart} // 👈 Add this line
  item={{
    productId: product.id,
    name: product.name,
    slug: product.slug,
    price: round2(product.price),
    qty: 1,
    image: product.images![0],
  }}
/>
```

Open the `components/shared/product/add-to-cart.tsx` file and add the `cart` prop:

```tsx
const AddToCart = ({
  cart,
  item,
}: {
  cart?: Cart;
  item: Omit<CartItem, 'cartId'>;
}) => {
  // ...
};
```

Import the `Cart` type, `Minus` icon and the `removeFromCart` action:

```tsx
import { Cart, CartItem } from '@/types';
import { Plus, Minus } from 'lucide-react';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
```

## Handle Remove From Cart

Add the following function below the `handleAddToCart` function:

```tsx
// Remove item from cart
const handleRemoveFromCart = async () => {
  const res = await removeItemFromCart(item.productId);

  toast({
    variant: res.success ? 'default' : 'destructive',
    description: res.message,
  });

  return;
};
```

We are just calling the `removeItemFromCart` action and showing a toast message.

## Show Remove From Cart

We are going to create a variable to let us know if the item exists in the cart. Add the following right above the return statement:

```tsx
const existItem =
  cart && cart.items.find((x) => x.productId === item.productId);
```

Now in the return, let's check for the `existItem` variable and show a remove button with the minus sign, the quantity and an add button with a plus sign:

```tsx
return existItem ? (
  <div>
    <Button type='button' variant='outline' onClick={handleRemoveFromCart}>
      <Minus className='w-4 h-4' />
    </Button>
    <span className='px-2'>{existItem.qty}</span>
    <Button type='button' variant='outline' onClick={handleAddToCart}>
      <Plus className='w-4 h-4' />
    </Button>
  </div>
) : (
  <Button className='w-full' type='button' onClick={handleAddToCart}>
    <Plus className='w-4 h-4' />
    Add to cart
  </Button>
);
```

Now add an item to the cart and you should see the add/remove buttons and the quantity.
