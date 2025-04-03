# Users Search

Let's add the same search functionality to users.

We will start by having the `getAllUsers` function take in a query and filter
by it.

Open the `orders.actions.ts` file and add the following code for the `getAllOrders` function:

```ts
export async function getAllUsers({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  limit?: number;
  page: number;
  query: string;
}) {
  const queryFilter: Prisma.UserWhereInput =
    query && query !== 'all'
      ? {
          name: {
            contains: query,
            mode: 'insensitive',
          } as Prisma.StringFilter,
        }
      : {};

  const data = await prisma.user.findMany({
    where: {
      ...queryFilter,
    },
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

## Changes

We added a new param of `query`.

We then added the `QueryFilter` and added it to the `where` object in the query.

## Users Page

Now open the `app/admin/users/page.tsx` file and make the following changes:

Add a new `query` param to the `SearchParams` prop:

```ts
const AdminUsersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {//...}
```

```tsx
const { page = '1', query: searchText } = searchParams;
```

Pass the query into the `getAllUsers` function call:

```tsx
const users = await getAllUsers({ page: Number(page), query: searchText });
```

In the return, replace the `h1` heading with the following:

```tsx
<div className='flex items-center gap-3'>
  <h1 className='h2-bold'>Users</h1>
  {searchText && (
    <div>
      Filtered by <i>&quot;{searchText}&quot;</i>{' '}
      <Link href={`/admin/users`}>
        <Button variant='outline' size='sm'>
          Remove Filter
        </Button>
      </Link>
    </div>
  )}
</div>
```

Now you should see an option to remove the filter.

Now we have admin search functionality.
