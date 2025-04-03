# Update User Profile Action

We are going to have a profile form where we can update the name. So I want to create the Zod schems and the action for that.

## User Profile Schema

Open the file `lib/validators.ts` and add the following code:

```ts
// Update Profile Schema
export const updateProfileSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  email: z.string().min(3, 'Email must be at least 3 characters'),
});
```

## Action

Open the `lib/actions/user.actions.ts` file and add the following code:

```typescript
// Update User Profile
export async function updateProfile(user: { name: string; email: string }) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: {
        id: session?.user.id,
      },
    });

    if (!currentUser) throw new Error('User not found');

    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name: user.name,
      },
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

This is pretty simple. We are just getting the session, finding the user, and updating the name field. We are also returning a success message if everything goes well.


