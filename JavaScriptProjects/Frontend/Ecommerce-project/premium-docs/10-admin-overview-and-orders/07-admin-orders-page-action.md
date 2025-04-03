# Get Orders For Admin

We have our admin section with the overview and some charts. Now we want the orders section to work. Let's start by creating the action to get all orders.

Open the `lib/actions/orders.actions.ts` file and add the following code:

```ts
// Get All Orders (Admin)
export async function getAllOrders({
  limit = PAGE_SIZE,
  page,
}: {
  limit?: number;
  page: number;
}) {
  const data = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: (page - 1) * limit,
    include: { user: { select: { name: true } } },
  });

  const dataCount = await prisma.order.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
```

We are using pagination for the order list, so we take in a limit that is set to the `PAGE_SIZE` constant and a page number. We then use the Prisma `findMany` method to get all orders. We also include the user name in the order so we can display it in the order list. We also get the total number of orders so we can calculate the total number of pages.

Now let's create the page where we will display the orders. Create a new file called `pages/admin/orders/page.tsx` and add the following code:

```tsx
import { auth } from '@/auth';
import { getAllOrders } from '@/lib/actions/order.actions';
import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-guard';

export const metadata: Metadata = {
  title: 'Admin Orders',
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  await requireAdmin();
  const { page = '1' } = await props.searchParams;

  const session = await auth();
  if (session?.user.role !== 'admin')
    throw new Error('admin permission required');

  const orders = await getAllOrders({
    page: Number(page),
  });

  console.log(orders);

  return <div>Orders</div>;
};

export default OrdersPage;
```

We are getting the `page` from the search params and passing it to the `getAllOrders` action. We are also checking if the user is an admin. If not we throw an error. We are also logging the orders to the console.

## Show Orders Table

Delete the console and let's show the orders in a table.

Add the following to the return statement:

```tsx
return (
  <div className='space-y-2'>
    <h2 className='h2-bold'>Orders</h2>
    <div className='overflow-x-auto'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>DATE</TableHead>
            <TableHead>TOTAL</TableHead>
            <TableHead>PAID</TableHead>
            <TableHead>DELIVERED</TableHead>
            <TableHead>ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.data.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{formatId(order.id)}</TableCell>
              <TableCell>{formatDateTime(order.createdAt).dateTime}</TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>
                {order.isPaid && order.paidAt
                  ? formatDateTime(order.paidAt).dateTime
                  : 'Not Paid'}
              </TableCell>
              <TableCell>
                {order.isDelivered && order.deliveredAt
                  ? formatDateTime(order.deliveredAt).dateTime
                  : 'Not Delivered'}
              </TableCell>
              <TableCell>
                <Button asChild variant='outline' size='sm'>
                  <Link href={`/order/${order.id}`}>Details</Link>
                </Button>
                {/* DELETE */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {orders.totalPages > 1 && (
        <Pagination page={Number(page) || 1} totalPages={orders?.totalPages} />
      )}
    </div>
  </div>
);
```

We are simply showing the orders in a table. We are mapping over the orders to show each one. We are using the `formatId` utility function to format the order ID. We are using the `formatDateTime` utility function to format the date and time. We are using the `formatCurrency` utility function to format the total price. There is a comment where the delete button will go.

Now you should see the orders and if there are more than 10 or whatever you set PAGE_SIZE to, you will see the pagination component.

Let's work on the delete next.
