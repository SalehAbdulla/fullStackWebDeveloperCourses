# Orders Search

Now that we have our `admin-search` component and product search working in the admin area, let's add the same functionality to orders.

We will start by having the `getAllOrders` function take in a query and filter
by it.

Open the `orders.actions.ts` file and add the following code for the `getAllOrders` function:

```ts
export async function getAllOrders({
  limit = PAGE_SIZE,
  page,
  query,
}: {
  query: string;
  limit?: number;
  page: number;
}) {
  const queryFilter: Prisma.OrderWhereInput =
    query && query !== 'all'
      ? {
          user: {
            name: {
              contains: query,
              mode: 'insensitive',
            } as Prisma.StringFilter,
          },
        }
      : {};

  const data = await prisma.order.findMany({
    where: {
      ...queryFilter,
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
    include: { user: { select: { name: true } } },
    include: {
      user: {
        select: { name: true },
      },
    },
  });
```

## Changes

We added a new param of `query`.

We then added the `QueryFilter` and added it to the `where` object in the query.

## Orders Page

Now open the `app/admin/orders/page.tsx` file and make the following changes:

Add a new `query` param to the `SearchParams` prop:

```ts
const AdminOrdersPage = async (props: {
  searchParams: Promise<{ page: string; query: string }>;
}) => {//...}
```

```tsx
const { page = '1', query: searchText } = searchParams;
```

Pass the query into the `getAllOrders` function call:

```tsx
const orders = await getAllOrders({
  page: Number(page),
  query: searchText,
});
```

In the return, replace the `h1` heading with the following:

```tsx
<div className='flex items-center gap-3'>
  <h1 className='h2-bold'>Orders</h1>
  {searchText && (
    <div>
      Filtered by <i>&quot;{searchText}&quot;</i>{' '}
      <Link href={`/admin/orders`}>
        <Button variant='outline' size='sm'>
          Remove Filter
        </Button>
      </Link>
    </div>
  )}
</div>
```

Now you should see an option to remove the filter.

Let's do users next.
