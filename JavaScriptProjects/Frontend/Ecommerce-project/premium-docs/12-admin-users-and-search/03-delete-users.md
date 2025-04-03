# Delete Users

Now we want to be able to delete users. Let's start by creating an action in the `lib/actions/user.actions.ts` file:

```ts
// Delete user by ID
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({ where: { id } });

    revalidatePath('/admin/users');

    return {
      success: true,
      message: 'User deleted successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
```

We already have the deleteDialog component that just takes in an action. So let's open the `app/admin/users/page.tsx` file and import the deleteDialog component if you have not already as well as the deleteUser action:

```tsx
import DeleteDialog from '@/components/shared/delete-dialog';
import { getAllUsers, deleteUser } from '@/lib/actions/user.actions';
```

Now add the deleteDialog component to the page where we have the comment:

```tsx
<DeleteDialog id={user.id} action={deleteUser} />
```

Try deleting a user and see if it works.
