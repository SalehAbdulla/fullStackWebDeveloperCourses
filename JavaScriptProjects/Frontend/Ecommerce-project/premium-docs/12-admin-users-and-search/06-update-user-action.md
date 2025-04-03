# Update User Action & Submit Handler

Now that we have a form displayed, we need to handle the form submission. Let's start by adding a new action in the `lib/actions/user.actions.ts` file:

```ts
// Update user
export async function updateUser(user: z.infer<typeof updateUserSchema>) {
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        name: user.name,
        role: user.role,
      },
    });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
```

Be sure to import `updateUserSchema`:

```ts
import {
  signInFormSchema,
  signUpFormSchema,
  shippingAddressSchema,
  paymentMethodSchema,
  updateUserSchema,
} from '../validator';
```

Now go back to the form at `app/admin/users/[id]/update-user-form.tsx` and import the new action:

```ts
import { updateUser } from '@/lib/actions/user.actions';
```

Now, add the `onSubmit` handler:

```ts
// Handle submit
const onSubmit = async (values: z.infer<typeof updateUserSchema>) => {
  try {
    const res = await updateUser({
      ...values,
      id: user.id,
    });

    if (!res.success)
      return toast({
        variant: 'destructive',
        description: res.message,
      });

    toast({
      description: res.message,
    });

    form.reset();
    router.push(`/admin/users`);
  } catch (error) {
    toast({
      variant: 'destructive',
      description: (error as Error).message,
    });
  }
};
```

Add the `onSubmit` handler to the form:

```ts
<form
  method='post'
  onSubmit={form.handleSubmit(onSubmit)}
  className='space-y-4'
>
```

Now, try and update a user name.
