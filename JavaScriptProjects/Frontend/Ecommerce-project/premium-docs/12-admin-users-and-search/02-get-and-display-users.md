# Get & Display Users

Now that we can manage orders and products as an admin, let's add the ability to show and manage users. We will start with the user action.

Open the `lib/actions/users.actions.ts` and add the following function:

```ts
// Get all users
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const data = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
  });

  const dataCount = await prisma.user.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
```

You will need to import the `PAGE_SIZE` constant from the `constants` module.

```ts
import { PAGE_SIZE } from '@/lib/constants';
```

This function is simple. We are just getting all the users from the database and returning them. We are also returning the total number of pages so that we can use it to paginate the users.

## Users Page

Let's create the users page just to test out the action for now. Create a file at `app/admin/users/page.tsx` and add the following code:

```tsx
import { Metadata } from 'next';
import { getAllUsers } from '@/lib/actions/user.actions';
import { requireAdmin } from '@/lib/auth-guard';

export const metadata: Metadata = {
  title: 'Admin Users',
};

const AdminUserPage = async () => {
  await requireAdmin();
  const users = await getAllUsers({ page: 1 });
  console.log(users);

  return <>Users</>;
};

export default AdminUserPage;
```

You should see the users in the console.

Now let's add them on to the page in a table.

We will use a ShadCN table like we did with the other resources.

Open the `src/app/admin/users/page.tsx` file and add the following imports:

```tsx
import { auth } from '@/auth';
import DeleteDialog from '@/components/shared/delete-dialog';
import Pagination from '@/components/shared/pagination';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getAllUsers } from '@/lib/actions/user.actions';
import { formatId } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';
```

We need to get the page from the search params, so add the following code to the function:

```tsx
const AdminUserPage = async (props: {
  searchParams: Promise<{
    page: string;
  }>;
}) => {
  const searchParams = await props.searchParams;

  const { page = '1' } = searchParams;

  const users = await getAllUsers({ page: Number(page) });

  return <>Users</>;
};
```

We are passing the page from the search params to the action. We are also getting the users from the action.

Now add the following code to the return statement:

```tsx
return (
  <div className='space-y-2'>
    <h1 className='h2-bold'>Users</h1>
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>EMAIL</TableHead>
            <TableHead>ROLE</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{formatId(user.id)}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell className='flex gap-1'>
                <Button asChild variant='outline' size='sm'>
                  <Link href={`/admin/users/${user.id}`}>Edit</Link>
                </Button>
                {/* DELETE DIALOG HERE */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {users?.totalPages && users.totalPages > 1 && (
        <Pagination page={page} totalPages={users.totalPages} />
      )}
    </div>
  </div>
);
```

We are showing a table with the users. We are also showing a pagination component. To test pagination, you can pass in `limit:2` to the action.

In the next lesson, we will add delete functionality.
