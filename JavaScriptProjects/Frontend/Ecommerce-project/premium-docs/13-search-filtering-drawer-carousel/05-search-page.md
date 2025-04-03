# Search Page

Now that we have the search component that takes us to the search page, there is quite a bit to do. We need to add the filters to the `getAllProducts` action for things like category, price, sorting, etc. We need to add the filter UI and handlers to the search page. There will be a lot of logic to do here, so we will go through it step by step.

I struggled with how I wanted to do this. I didn't want to just add a bunch of code to the action without being able to test it. I thought about writing some Jest tests, but that got really complicated and I didn't want to spend too much time with Jest.

So I think the best thing is to start working on the search page and add to the action as we go so that we can test the filters.

Let's open the `app/(root)/search/page.tsx` file.

Let's bring in the imports we need:

```tsx
import Pagination from '@/components/shared/pagination';
import ProductCard from '@/components/shared/product/product-card';
import { Button } from '@/components/ui/button';
import {
  getAllCategories,
  getAllProducts,
} from '@/lib/actions/product.actions';
import Link from 'next/link';
```

We are using the `getAllCategories` and `getAllProducts` actions from the `product.actions` file.

Let's create a basic component that takes in `searchParams`:

```tsx
const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
    sort = 'newest',
    page = '1',
  } = await props.searchParams;

  console.log(q, category, price, rating, sort, page);

  return (
    <>
      <h1>Search Page</h1>
    </>
  );
};

export default SearchPage;
```

We destructured the `searchParams` to get the search query, category, price, rating, sort, and page and we are logging them to the console. We are also setting default values for them.

Go into the search component and select a category and type something in the search bar. You should see the search query, category, price, rating, sort, and page in the console.

Delete the console log statement.

Now let's have it call the `getAllProducts` action and pass in the search query, category, price, rating, sort, and page and log the products.

Add the following above the return statement:

```tsx
// Get products
const products = await getAllProducts({
  category,
  query: q,
  price,
  rating,
  page: Number(page),
  sort,
});
```

## Edit The Action

Now let's open the `lib/actions/product.actions.ts` file and go to the `getAllProducts` action. Right now it just takes in the query, limit, and page. We need to add the category, price, rating, and sort.

Add the following parameters to the `getAllProducts` action:

```ts
export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
  price,
  rating,
  sort,
}: {
  query: string;
  category: string;
  limit?: number;
  page: number;
  price?: string;
  rating?: string;
  sort?: string;
}) {}
```

## Showing The Results

Let's add the following to the search page return statement:

```tsx
return (
  <div className='grid md:grid-cols-5 md:gap-5'>
    <div className='filter-links'>{/* FILTERS */}</div>
    <div className='md:col-span-4 space-y-4'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
        {products!.data.length === 0 && <div>No product found</div>}
        {products!.data.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products!.totalPages! > 1 && (
        <Pagination page={page} totalPages={products!.totalPages} />
      )}
    </div>
  </div>
);
```

You should see all products. We have not implemented the filters yet, so we are just showing all products.

## View All Products Button

This is essentially the products page. It uses pagination and will have all kinds of filters. So on the homepage, I want a button to go to this /search page under the new arrivals section.

Create a new file at `components/view-all-products-button.tsx` and add the following code:

```tsx
'use client';

import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const ViewAllProductsButton = () => {
  const router = useRouter();

  return (
    <div className='flex justify-center items-center my-8'>
      <Button
        onClick={() => router.push('/search')}
        className='px-8 py-4 text-lg font-semibold'
      >
        View All Products
      </Button>
    </div>
  );
};

export default ViewAllProductsButton;
```

Now let's import it into the `app/page.tsx` file and import it:

```tsx
import ViewAllProductsButton from '@/components/view-all-products-button';
```

Add it below the `ProductList` component:

```tsx
<ViewAllProductsButton />
```

In the next few lessons, we will start to add filters and sorting.
