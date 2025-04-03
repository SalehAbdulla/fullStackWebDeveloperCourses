# Get Products For Admin Page

We now want to list all of the products in the admin area. We are going to have an action that not only gets the products but also filters them by category, price and ratings, etc. So I want to take this step by step and explain what we are doing.

Let's start off by creating the page and the action.

Create a new file at `app/admin/products/page.tsx` and add the following:

```tsx
const AdminProductsPage = () => {
  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <h1 className='h2-bold'>Products</h1>
      </div>
    </div>
  );
};

export default AdminProductsPage;
```

Now you should be able to go to `http://localhost:3000/admin/products` and see the page. It should just say, "Products" at the top.

There are a few search params that we want to pass into the `AdminProductsPage` component and set some variables depending on those values. Add the following:

```tsx
const AdminProductsPage = async (props: {
  searchParams: Promise<{
    page: string;
    query: string;
    category: string;
  }>;
}) => {
  await requireAdmin();
  const searchParams = await props.searchParams;

  const page = Number(searchParams.page) || 1;
  const searchText = searchParams.query || '';
  const category = searchParams.category || '';

  return (
    <div className='space-y-2'>
      <div className='flex-between'>
        <h1 className='h2-bold'>Products</h1>
      </div>
    </div>
  );
};

export default AdminProductsPage;
```

Be sure to import the `requireAdmin` function at the top of the file:

```tsx
import { requireAdmin } from '@/lib/auth-guard';
```

From the search params, we want to get the query, category and page. The query is the search term that we are looking for in the product name. If it is empty, we want to get all the products. If category is empty, we want to get all the products. If page is empty, we want to get the first page.

## Start The Action

Next, let's create the action to get all the products. Open the file `lib/actions/products.action.ts` and let's start by creating the function signature, meaning the parameters that we want to pass in and their types.

Add the following:

```ts
// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category: string;
}) {
  // Function body
}
```

So it will take in the following parameters:

- query - A search term to look for in product names.
- limit - The maximum number of products to retrieve per page (defaulted to PAGE_SIZE).
- page - The current page number, used for pagination.
- category - The category to filter products by.

We need to import the `PAGE_SIZE` constant from the `lib/constants/index.ts` file:

```ts
import { PAGE_SIZE } from '../constants';
```

Now, let's add the following to find the products:

```ts
const data = await prisma.product.findMany({
  skip: (page - 1) * limit,
  take: limit,
});
```

We are using the `skip` and `take` methods to paginate the results. We are skipping `(page - 1) * limit` products and taking `limit` products. This is how we can get the products for the current page.

### Handle pagination

In order to have pagination, we need to get the total number of products. Add this to the function:

```ts
const dataCount = await prisma.product.count();
```

Now just return an object with the `data` and the total pages:

```ts
return {
  data,
  totalPages: Math.ceil(dataCount / limit),
};
```

Here is the entire action for now:

```ts
// Get all products
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
```

Now let's bring this into our page. Open the `app/admin/products/page.tsx` file and add the following imports:

```tsx
import Link from 'next/link';
import { getAllProducts } from '@/lib/actions/product.actions';
import { formatCurrency, formatId } from '@/lib/utils';
```

We are bringing in the `getAllProducts` action and the `formatCurrency` and `formatId` functions from the `lib/utils` file as well as the `Link` component from `next/link`.

Add the following right above the return statement and under the other variables:

```tsx
const products = await getAllProducts({
  query: searchText,
  page,
  category,
});

console.log(products);
```

We are then calling the `getAllProducts` function with the search text and the page number. We are also logging the products to the console.

Now when you go to the page, you should see the products and total pages in the console. This should be in your terminal not in the browser because we are rendering this on the server.

Now that we are able to fetch the products, let's add a table to the page with the data in the next lesson.
