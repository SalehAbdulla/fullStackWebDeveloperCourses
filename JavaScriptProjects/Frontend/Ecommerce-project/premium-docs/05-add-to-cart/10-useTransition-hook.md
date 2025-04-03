# `useTransition` Hook

We are going to utilize the `useTransition` hook to handle the state of the button.

## What is useTransition?

useTransition is a React hook that helps manage UI updates by allowing you to mark certain updates as "transitions." Transitions are typically non-urgent updates that can be deferred to improve user experience (e.g., showing a loading spinner while the update happens).

It provides two values:

- **isPending**: A boolean that indicates whether the transition is ongoing.
- **startTransition**: A function that starts the transition.


We are going to show a spinning loader when the transition is pending.

In the `AddToCart` component,  let's import the `useTransition` hook and the `Loader` icon:

```tsx
import { useTransition } from 'react';
import { Plus, Minus, Loader } from 'lucide-react';
```

Then add the following in the function above the `handleAddToCart` function:

```tsx
const [isPending, startTransition] = useTransition();
```

- **isPending**: A boolean value that indicates whether the transition is still ongoing. This can be used to show a loading spinner or other feedback to the user.
- **startTransition**: A function that you wrap around any state updates that you want to handle as a transition. It tells React to delay marking this update as urgent, giving priority to other interactive UI updates.

## `startTransition` Function

We need to wrap the functionality of `handleAddToCart` and `handleRemoveFromCart` functions with the `startTransition` function.

Make your `handleAddToCart` function look like this:

```tsx
// Add item to cart
const handleAddToCart = async () => {
  startTransition(async () => {
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
  });
};
```

We just wrapped the existing functionality with the `startTransition` function.

Do the same for the `handleRemoveFromCart` function.

```tsx
// Remove item from cart
const handleRemoveFromCart = async () => {
  startTransition(async () => {
    const res = await removeItemFromCart(item.productId);

    toast({
      variant: res.success ? 'default' : 'destructive',
      description: res.message,
    });

    return;
  });
};
```

We are going to set the `disabled` attribute of the buttons to `isPending` and replace the icons with a check for `isPending` and show a loader if `isPending` is `true`.

```tsx
return existItem ? (
  <div>
    <Button
      type='button'
      variant='outline'
      disabled={isPending}
      onClick={handleRemoveFromCart}
    >
      {isPending ? (
        <Loader className='w-4 h-4  animate-spin' />
      ) : (
        <Minus className='w-4 h-4' />
      )}
    </Button>
    <span className='px-2'>{existItem.qty}</span>
    <Button
      type='button'
      variant='outline'
      disabled={isPending}
      onClick={handleAddToCart}
    >
      {isPending ? (
        <Loader className='w-4 h-4 animate-spin' />
      ) : (
        <Plus className='w-4 h-4' />
      )}
    </Button>
  </div>
) : (
  <Button
    className='w-full'
    type='button'
    disabled={isPending}
    onClick={handleAddToCart}
  >
    {isPending ? (
      <Loader className='w-4 h-4 animate-spin' />
    ) : (
      <Plus className='w-4 h-4' />
    )}
    Add to cart
  </Button>
);
```

So now the button will be disabled when the `isPending` state is `true` and will show a loading spinner.
