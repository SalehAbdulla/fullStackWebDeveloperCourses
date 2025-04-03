# Get Order Summary

Now we want to get a summart of the orders that have been made on the site. Let's create a new action in the `lib/actions/order.actions.ts` file:

```ts
// Get sales data and order summary
export async function getOrderSummary() {
  // Get counts for each resource
  const ordersCount = await prisma.order.count();
  const productsCount = await prisma.product.count();
  const usersCount = await prisma.user.count();

  // Calculate total sales
  const totalSales = await prisma.order.aggregate({
    _sum: { totalPrice: true },
  });

  // Get monthly sales
  const salesDataRaw = await prisma.$queryRaw<
    Array<{ month: string; totalSales: Prisma.Decimal }>
  >`SELECT to_char("createdAt", 'MM/YY') as "month", sum("totalPrice") as "totalSales" FROM "Order" GROUP BY to_char("createdAt", 'MM/YY')`;

  const salesData: SalesDataType = salesDataRaw.map((entry) => ({
    month: entry.month,
    totalSales: Number(entry.totalSales), // Convert Decimal to number
  }));

  // Get latest sales
  const latestOrders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: { select: { name: true } },
    },
    take: 6,
  });

  return {
    ordersCount,
    productsCount,
    usersCount,
    totalSales,
    latestOrders,
    salesData,
  };
}


```

Now just add the `SalesDataType` above this function:

```ts
type SalesDataType = {
  month: string;
  totalSales: number;
}[]
```

Let's go over this function step by step.

First, we get the total number of orders, products, and users.

Then we use the `aggregate` method to calculate the total sales by summing up the totalPrice field across all orders.

Then we retrieve monthly sales data, grouped by month and year (formatted as MM/YY). We do this by using the `$queryRaw` method to execute a raw SQL query.

We need to convert the Decimal type from Prisma to a number.

Finally, we fetch the latest 6 orders, sorted by creation date in descending order. We include the user's name for each order.

We return all the gathered data in a single object. The salesData is of type `salesDataType` which is defined above the function.

Next, I want to use this data to display some charts using the Rechart library. Let's do that in the next lesson.
