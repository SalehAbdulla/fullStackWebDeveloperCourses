# Search Filter UI

We have our action handling the filters, now we need to actually be able to use them in our UI.

Open the `app/(root)/search/page.tsx` file.

## Category Links

We need have our function that will add the params we need including the category to our URL. I want to list out the categories and be able to click on it and add the category to our URL. This means we need to fetch the categories. So let's import the `getCategories` action:

```ts
import {
  getAllCategories,
  getAllProducts,
} from '@/lib/actions/product.actions';
```

Now let's get the categories. Add this line right above where we get our products:

```ts
const categories = await getAllCategories();
```

Now in the return, let's have a link for "any" category and then map over the categories and create a link for each one.

The return should look like this:

```tsx
return (
  <div className='grid md:grid-cols-5 md:gap-5'>
    <div className='filter-links'>
      {/* Category Links */}
      <div className='text-xl mt-3 mb-2'>Department</div>
      <div>
        <ul className='space-y-1'>
          <li>
            <Link
              className={`${
                ('all' === category || '' === category) && 'font-bold'
              }`}
              href={getFilterUrl({ c: 'all' })}
            >
              Any
            </Link>
          </li>
          {categories.map((x) => (
            <li key={x.category}>
              <Link
                className={`${x.category === category && 'font-bold'}`}
                href={getFilterUrl({ c: x.category })}
              >
                {x.category}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>

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

We are setting the `href` to the `getFilterUrl` function that we created earlier, which adds the category to our URL. Then we call our action with the category.

## Price Links

For prices, we will specify a range and then have links for each price range. So let's create an array of price ranges.

Put this above the main function right below the imports:

```ts
const prices = [
  {
    name: '$1 to $50',
    value: '1-50',
  },
  {
    name: '$51 to $100',
    value: '51-100',
  },
  {
    name: '$101 to $200',
    value: '101-200',
  },
  {
    name: '$201 to $500',
    value: '201-500',
  },
  {
    name: '$501 to $1000',
    value: '501-1000',
  },
];
```

If you want to use different or more price ranges, you can add them here.

Now add the links right under the closing `</div>` of the category links. Make sure you are still within the `filter-links` div or the layout will not look right.

```tsx
{
  /* Price Links */
}
<div>
  <div className='text-xl mt-8 mb-2'>Price</div>
  <ul className='space-y-1'>
    <li>
      <Link
        className={`  ${'all' === price && 'font-bold'}`}
        href={getFilterUrl({ p: 'all' })}
      >
        Any
      </Link>
    </li>
    {prices.map((p) => (
      <li key={p.value}>
        <Link
          href={getFilterUrl({ p: p.value })}
          className={`${p.value === price && 'font-bold'}`}
        >
          {p.name}
        </Link>
      </li>
    ))}
  </ul>
</div>;
```

We are mapping over the prices and creating a link for each one. We are also setting the `href` to the `getFilterUrl` function that we created earlier, which adds the price to our URL. Then we call our action with the price.
