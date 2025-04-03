# Add To Cart Component

Let's start creating the `AddToCart` component. This component will be used to add items to the cart on the product page. It will call an action to add the item to the cart. Right now I just want to create the component and connect it to the action. For now, it will just say something like "Add to cart".

## `toast` Component From ShadCN

We will be using the `toast` component from ShadCN. This is a component that will display a notification to the user. We will use this to notify the user when an item is added to the cart.

Install the component by running the following command:

```bash
npx shadcn@latest add toast
```

We need to add the container for the toast component. Add the following to the `app/layout.tsx` file:

```tsx
import { Toaster } from '@/components/ui/toaster';
```

Embed it right below the `{children}` tag:

```tsx
<ThemeProvider
  attribute='class'
  defaultTheme='light'
  enableSystem
  disableTransitionOnChange
>
  {children}
  <Toaster />
</ThemeProvider>
```

## Add To Cart Component

Create a new file called `add-to-cart.tsx` in the `components/shared/product` folder and add the following for now:

```tsx
'use client';

import { CartItem } from '@/types';

const AddToCart = ({ item }: { item: Omit<CartItem, 'cartId'> }) => {
  return <>Add To Cart</>;
};

export default AddToCart;
```

We made it a client component.

We are using the `CartItem` type from the `types.ts` file. We are using the `Omit` utility type to remove the `cartId` property from the `CartItem` type.

Bring it into the product page. Open the `app/(root)/product/[slug]/page.tsx` file and add the following import:

```tsx
import AddToCart from '@/components/shared/product/add-to-cart';
```

Replace this code:

```tsx
{
  product.stock > 0 && (
    <div className=' flex-center'>
      <Button className='w-full'>Add to cart</Button>
    </div>
  );
}
```

With this code:

```tsx
{
  product.stock > 0 && (
    <div className=' flex-center'>
      <AddToCart
        item={{
          productId: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          qty: 1,
          image: product.images![0],
        }}
      />
    </div>
  );
}
```

## Component Logic

Now we need to go into the `AddToCart` component and add the logic. This will be a very dynamic component. It will be able to add and remove the item from the cart. We will be using the `useTransition` hook from React, which will allow us to show a loading state while the item is being added or removed to and from the cart. This is not something that you need to do, but it makes for a better user experience. This course includs some of the more advanced features of React.

We will also implment the `toast` component for notifications. So we will add to this as we go.

For now, add the following imports:

```tsx
import { Button } from '@/components/ui/button';
import { ToastAction } from '@/components/ui/toast';
import { useToast } from '@/hooks/use-toast';
import { round2 } from '@/lib/utils';
import { CartItem } from '@/types';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
```

Pretty self-explanatory. We are importing our ShadCN components, the types, some icons, the `useRouter` , and the `useToast` hook.

Let's add the initializations and state right above the return:

```tsx
const router = useRouter();
const { toast } = useToast();
```

Under that, in the return let's add the button:

```tsx
return (
  <Button className='w-full' type='button' onClick={handleAddToCart}>
    <Plus />
    Add to cart
  </Button>
);
```

Finally, add the `handleAddToCart` function:

```tsx
const handleAddToCart = async () => {
  // Execute the addItemToCart action
  const res = await addItemToCart(item);

  // Display appropriate toast message based on the result
  if (!res.success) {
    toast({
      variant: 'destructive',
      description: res.message,
    });
    return;
  }

  toast({
    description: `${item.name} added to the cart`,
    action: (
      <ToastAction
        className='bg-primary text-white hover:bg-gray-800'
        onClick={() => router.push('/cart')}
        altText='Go to cart'
      >
        Go to cart
      </ToastAction>
    ),
  });
};
```

We have not created the `addItemToCart` action yet, but we will do that next. We will then call it. If we get a successful response, we will display a toast message. If we get an error, we will display a toast error.

Here is the whole AddToCart component:

```tsx
'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast';
import { addItemToCart } from '@/lib/actions/cart.actions';
import { CartItem } from '@/types';

const AddToCart = ({ item }: { item: CartItem; }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    // Execute the addItemToCart action
    const res = await addItemToCart(item);

    // Display appropriate toast message based on the result
    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
      return;
    }

    toast({
      description: `${item.name} added to the cart`,
      action: (
        <ToastAction
          className='bg-primary text-white hover:bg-gray-800'
          onClick={() => router.push('/cart')}
          altText='Go to cart'
        >
          Go to cart
        </ToastAction>
      ),
    });
};

  return <Button className='w-full' type='button' onClick={ handleAddToCart }>Add To Cart</Button>;
};

export default AddToCart;

```

## Create The `addItemToCart` Action

We aren't going to add any functionality to this action yet. We will just create the action and send a response to test the component.

Create a new file at `li/actions/cart.actions.ts` and add the following:

```ts
'use server';

import { CartItem } from '@/types';

export async function addItemToCart (data: CartItem) => {
  return {
    success: true,
    message: 'Item added to the cart',
  };
};
```

Bring the action into the `AddToCart` component:

```tsx
import { addItemToCart } from '@/lib/actions/cart.actions';
```

Now click the button and you should see the toast message.

Temporarily change the success to false:

```ts
return { success: false, message: 'Something went wrong' };
```

Click the button and the toast should be red.

Now that we have the component working, let's start to add the logic to add the item to the cart.
