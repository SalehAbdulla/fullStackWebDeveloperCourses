# Place Order Form

Now let's create the form to embed, which is essentially just a button.

Create a new file at `app/(root)/place-order/place-order-form.tsx` and add the following code:

```tsx
'use client';
import { Check, Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { createOrder } from '@/lib/actions/order.actions';
import { useRouter } from 'next/navigation';

const PlaceOrderForm = () => {
  const router = useRouter();

  return <>Place order form</>;
};

export default PlaceOrderForm;
```

Bring it into the `app/(root)/place-order/page.tsx` file:

```tsx
import PlaceOrderForm from './place-order-form';
```

Replace the comment with the following:

```tsx
<PlaceOrderForm />
```

You should see the text for now.

## Form State and Submission

Let's add the form and the place order button. Add the following to the return:

```tsx
 return (
    <form onSubmit={handleSubmit} className='w-full'>
      <PlaceOrderButton />
    </form>
  );
```

## `PlaceOrderButton`

We are going to create a `PlaceOrderButton` component that will be used to submit the form.

Add the following right above the return statement:

```tsx
const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full'>
        {pending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Check className='w-4 h-4' />
        )}{' '}
        Place Order
      </Button>
    );
  };
```

This component will be used to submit the form. It will be disabled if the form is pending and will show a loading spinner if it is.

## `handleSubmit` Function

Now add the `handleSubmit`:

```tsx
 const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const res = await createOrder();

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };
```

We are simple calling the action and redirecting to the `redirectTo` in the response.


If you click the place order button, an order should get added to the database.

Here is the full code:

```tsx
'use client';
import { Check, Loader } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { createOrder } from '@/lib/actions/order.actions';
import { useRouter } from 'next/navigation';

const PlaceOrderForm = () => {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); 
    const res = await createOrder();
    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  const PlaceOrderButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className='w-full'>
        {pending ? (
          <Loader className='w-4 h-4 animate-spin' />
        ) : (
          <Check className='w-4 h-4' />
        )}{' '}
        Place Order
      </Button>
    );
  };

  return (
    <form onSubmit={handleSubmit} className='w-full'>
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;

```
