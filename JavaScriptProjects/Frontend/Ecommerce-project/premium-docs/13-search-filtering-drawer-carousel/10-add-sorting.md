# Add Sorting

Now we are going to add the ability to sort the results. We have to edit both the action and the page component UI.

## Edit the action

Let's start by editing the action. Open the `lib./actions/product.actions.ts` file and go to the `getAllProducts` method.

It already takes in a `sort` parameter. Change the following query:

```ts
// Fetch products
const data = await prisma.product.findMany({
  where: {
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  },
  skip: (page - 1) * limit,
  take: limit,
});
```

To this:

```ts
const data = await prisma.product.findMany({
  where: {
    ...queryFilter,
    ...categoryFilter,
    ...ratingFilter,
    ...priceFilter,
  },
  orderBy:
    sort === 'lowest'
      ? { price: 'asc' }
      : sort === 'highest'
      ? { price: 'desc' }
      : sort === 'rating'
      ? { rating: 'desc' }
      : { createdAt: 'desc' },
  skip: (page - 1) * limit,
  take: limit,
});
```

We are adding a new `orderBy` parameter. We can sort by `price` or `rating` or `createdAt`.

## Edit The Search Page

Now open the `app/(root)/search/page.tsx` file and add the following array at the top of the file with the other arrays:

```ts
const sortOrders = ['newest', 'lowest', 'highest', 'rating'];
```

Now go to the comment "SORTING HERE" and replace it with the following code:

```ts
Sort by{' '}
{sortOrders.map((s) => (
  <Link
    key={s}
    className={`mx-2   ${sort == s && 'font-bold'} `}
    href={getFilterUrl({ s })}
  >
    {s}
  </Link>
))}
```

We are mapping over the sortOrders array and creating a link for each one. We are also adding a class to the link if the sort is the same as the current sort.

You should now w be able to sort the results by price, rating, and createdAt.
