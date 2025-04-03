# Delete Order (Admin)

Admins can now see all of the orders that have been placed. Now we want to show delete buttons on each order.

## Delete Action

First off, we need an action to delete the order. Open the `lib/actions/orders.actions.ts`
file and add the following function:

```ts
// Delete Order
export async function deleteOrder(id: string) {
  try {
    await prisma.order.delete({ where: { id } });

    revalidatePath('/admin/orders');

    return {
      success: true,
      message: 'Order deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
```

This is very simple. We are using the Prisma `delete` method to delete the order. We are also using the `revalidatePath` method to revalidate the path `/admin/orders`. This will update the orders page after the order has been deleted.

## Delete Dialog Component

We are going to create a custom component for the delete dialog, but we will get some help from ShadCN, which has dialog components.

Install the following from your terminal:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add alert-dialog
```

Now let's create a new component at `components/shared/delete-dialog.tsx` and add the following code:

```tsx
'use client';

import { useState, useTransition } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';

export default function DeleteDialog({
  id,
  action,
}: {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message: string }>;
}) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  return <div>Dialog</div>;
}
```

We are just bringing in all the imports and creating the component function, which takes in an id and an action. The action is a function that will be called when the delete button is clicked. It returns a promise, which returns an object with a success property and a message property.

We are setting some state for the dialog and using the `useTransition` hook to handle the transition of the dialog. We are also using the `useToast` hook to show a toast message after the order has been deleted.

Open the `admin/orders/page.tsx` file and import both the delete action and the dialog component:

```tsx
import { deleteOrder, getAllOrders } from '@/lib/actions/order.actions';
import DeleteDialog from '@/components/shared/delete-dialog';
```

Add the component just under the ending `</Button>` for the details button and pass in the id and the action:

```tsx
<TableCell className='flex gap-1'>
  <Button asChild variant='outline' size='sm'>
    <Link href={`/order/${order.id}`}>Details</Link>
  </Button>
  <DeleteDialog id={order.id} action={deleteOrder} /> // 👈 Add this line
</TableCell>
```

You should just see the text, "Dialog" in the UI. Now let's go back to the `delete-dialog.tsx` file and add the following code in the return statement:

```tsx
return (
  <AlertDialog open={open} onOpenChange={setOpen}>
    <AlertDialogTrigger asChild>
      <Button size='sm' variant='outline'>
        Delete
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <Button variant='destructive' size='sm' disabled={isPending}>
          {isPending ? 'Deleting...' : 'Delete'}
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
```

Now you should see the button, but it still doesn't do anything. Let's add a click handler function right above the return statement:

```tsx
// Handle delete order button click
const handleDeleteClick = () => {
  startTransition(async () => {
    const res = await action(id);
    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
    } else {
      setOpen(false);
      toast({
        description: res.message,
      });
    }
  });
};
```

Now add it to the button:

```tsx
<Button
  variant='destructive'
  size='sm'
  disabled={isPending}
  onClick={handleDeleteClick}
>
  {isPending ? 'Deleting...' : 'Delete'}
</Button>
```

We are using the `startTransition` hook to handle the transition of the dialog. We are also using the `useToast` hook to show a toast message after the order has been deleted.

The reason that we are passing in the `deleteOrder` action instead of just bringing it in is because we may want to use this dialog in other places do run other actions.

You should now be able to delete an order. Go ahead and try it out.
