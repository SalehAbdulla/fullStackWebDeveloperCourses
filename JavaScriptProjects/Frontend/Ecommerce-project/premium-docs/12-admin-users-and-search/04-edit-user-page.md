# Edit User Page

We want admins to be able to edit user information.

## updateUserSchema

Let's start by adding the Zod schema for updating a user. Open the `lib/validators.ts` file and add the following code:

```ts
// Update User Schema
export const updateUserSchema = updateProfileSchema.extend({
  id: z.string().min(1, 'Id is required'),
  name: z.string().min(3, 'Name must be at least 3 characters'),
  role: z.string().min(1, 'Role is required'),
});
```

We have the id, name and role fields.

## Role Constant

We are also going to create a constant for the role. Open the `lib/constants/index.ts` file and add the following code:

```ts
export const USER_ROLES = process.env.USER_ROLES
  ? process.env.USER_ROLES.split(', ')
  : ['admin', 'user'];
```

We first check to see if the roles are set in the environment variables. If they are, we split them by a comma and space. If they are not, we set the roles to an array with the admin and user roles. This makes it easier to add or remove roles in the future.

We'll go ahead and add the roles in the `.env` file.

```
USER_ROLES=admin, user
```

## ShadCN Select

We are going to use the select component from ShadCN. Open a terminal and run the following command:

```bash
npx shadcn@latest add select
```

## User Page

Let's create the update user form. Create a file at `app/admin/users/[id]/page.tsx` and add the following code:

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getUserById } from '@/lib/actions/user.actions';

export const metadata: Metadata = {
  title: 'Update user',
};

const UpdateUserPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const user = await getUserById(id);

  if (!user) notFound();

  console.log(user);

  return (
    <div className='space-y-8 max-w-lg mx-auto'>
      <h1 className='h2-bold'>Update User</h1>
      {/* FORM HERE */}
    </div>
  );
};

export default UpdateUserPage;
```

We are bringing in the `getUserById` action that we already created to get the user. We are getting the id from the params and passing it to the action. We are also checking to see if the user exists. If it doesn't, we are going to use the `notFound` function to return a 404 page. We are also logging the user to the console.

In the next lesson, we will work on the form.
