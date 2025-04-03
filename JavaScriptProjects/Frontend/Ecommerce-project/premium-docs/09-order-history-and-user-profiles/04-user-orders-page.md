# User Orders Page

Now we want to create the page to show the user's orders.

Open the file `app/user/orders/page.tsx` and replace the contents with the following:

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getMyOrders } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'My Orders',
};

const OrdersPage = async (props: {
  searchParams: Promise<{ page: string }>;
}) => {
  const {page } = await props.searchParams;
  const orders = await getMyOrders({
    page: Number(page) || 1,
  });

  console.log(orders);

  return <>Orders</>;
};

export default OrdersPage;
```

We added all our imports, some metadata and passed in searchParams as a prop. We then set the page number to 1 if it's not provided and fetched the orders using the `getMyOrders` function. The `getMyOrders` function takes in the page number as a parameter. You could also pass in a limit to override whatever is in the `PAGE_SIZE` constant.

We then logged the orders to the console and returned a placeholder text. You should see the orders in the server console.

Now let's create the UI for the orders page. Replace the return statement with the following:

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
              <TableCell> {formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>
                {order.isPaid && order.paidAt
                  ? formatDateTime(order.paidAt).dateTime
                  : 'not paid'}
              </TableCell>
              <TableCell>
                {order.isDelivered && order.deliveredAt
                  ? formatDateTime(order.deliveredAt).dateTime
                  : 'not delivered'}
              </TableCell>
              <TableCell>
                <Link href={`/order/${order.id}`}>
                  <span className='px-2'>Details</span>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);
```

This is pretty straightforward. We're using the `Table` component from the `@/components/ui/table` package to display the orders in a table. We're also using the `formatCurrency` and `formatDateTime` functions from the `@/lib/utils` package to format the currency and date.

Now you should see the orders in the table.

Next, let's add the pagination.
