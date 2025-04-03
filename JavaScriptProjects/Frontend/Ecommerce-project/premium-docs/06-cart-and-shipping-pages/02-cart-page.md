# Start Cart Page

We are going to start creating cart page, which will ultimately show a table of the items in the cart along with the total. We will start the main page here and then work on the ShadCN table in the next lesson.

Create a new file at `app/(root)/cart/page.tsx` and add the following code:

```tsx
export const metadata = {
  title: 'Shopping Cart',
};

const CartPage = async () => {
  return <>Cart Page</>;
};

export default CartPage;
```

We added some metadata and made the function async. We will use this soon to fetch the cart items.

You should see this page if you navigate to `/cart` in your browser.

Now, let's create the form. Create a new file at `app/(root)/cart/cart-table.tsx` and add the following code:

```tsx
'use client';

import { Cart } from '@/types';

const CartTable = ({ cart }: { cart?: Cart }) => {
  return (
    <>
      <h1 className='py-4 h2-bold'>Shopping Cart</h1>
    </>
  );
};

export default CartTable;
```

We are making it a client component because we will be using hookd. We are bringing in the `Cart` type from the `@/types` folder. We are also passing in the `cart` prop to the component, which can be undefined.

Now bring it into the `CartPage` component along with our cart using the `getMyCart` action.

```tsx
import { getMyCart } from '@/lib/actions/cart.actions';
import CartTable from './cart-table';

export const metadata = {
  title: 'Shopping Cart',
};

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default CartPage;
```

You should see the heading "Shopping Cart" on the page.

Let's continue with the cart form. Add the following imports:

```tsx
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { addItemToCart, removeItemFromCart } from '@/lib/actions/cart.actions';
import { ArrowRight, Loader, Minus, Plus } from 'lucide-react';
import { Cart } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
```

In the function, let's initialize the `toast` and `router` variables and also our `useTransition` hook.

```tsx
const router = useRouter();
const { toast } = useToast();
const [isPending, startTransition] = useTransition();
```

For the return, add the following for now:

```tsx
  return (
    <>
      <h1 className='py-4 h2-bold'>Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href='/'>Go shopping</Link>
        </div>
      ) : (
        <div className='grid md:grid-cols-4 md:gap-5'>
          <div className='overflow-x-auto md:col-span-3'></div>
        </div>
      )}
    </>
  );
};
```

We are checking if the cart is empty or undefined. If it is, we show a message to go shopping. If it is not, we show the cart. We will be displaying a ShadCN table for the cart items and I want to wrap it in some grid classes.
