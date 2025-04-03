# Update User Address

Now that we have the address form set up, we need to handle the form submission. We are going to create a new user action to update the shipping address.

Open the `lib/actions/user.actions.ts` file and add the following function:

```tsx
// Update user's address
export async function updateUserAddress(data: ShippingAddress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id! },
    });

    if (!currentUser) throw new Error('User not found');

    const address = shippingAddressSchema.parse(data);

    await prisma.user.update({
      where: { id: currentUser.id },
      data: { address },
    });

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
```

We are using the `auth` function from the `auth` file to get the current user's session. We are using the `prisma.user.findFirst` method to get the current user's information. We are using the `shippingAddressSchema` from the `validator` file to parse the data. We are using the `prisma.user.update` method to update the user's address. We are returning a success message if the user is updated successfully. We are returning an error message if the user is not found. Be sure to import the `auth` function from the `auth` file and the `shippingAddressSchema` from the `validator` file.

## Shipping Address Form

Now go back to the `app/(root)/shipping-address/shipping-address-form.tsx` file and import the `updateUserAddress` function from the `user.actions` file.

```tsx
import { updateUserAddress } from '@/lib/actions/user.actions';
```

Now add the following submit handler above the `return` statement:

```tsx
const onSubmit: SubmitHandler<z.infer<typeof shippingAddressSchema>> = async (
  values
) => {
  startTransition(async () => {
    const res = await updateUserAddress(values);

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
      return;
    }

    router.push('/payment-method');
  });
};
```

We are wrapping everything in a `startTransition` to prevent the UI from freezing. We are using the `updateUserAddress` function from the `user.actions` file to update the user's address. We are using the `toast` function from the `useToast` hook to display a success message if the user is updated successfully. We are using the `router.push` function from the `next/navigation` package to redirect the user to the payment method page.

Add the following to the `<form>` element:

```tsx
 <form
  method="post"
  onSubmit={form.handleSubmit(onSubmit)}
  className="space-y-4"
>
```

Be sure to keep the ShadCN `<Form>` component. Do not replace it.

So when we submit this shipping address form, we are going to call the `updateUserAddress` function from the `user.actions` file. If the user is updated successfully, we are going to redirect the user to the payment method page.  
In the next lesson, we are going to create a `checkoutSteps` component to keep track of where we are in the process.
