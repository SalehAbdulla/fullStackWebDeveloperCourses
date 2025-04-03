
# Rating & Query Filter Links

Now we will add links to filter the ratings and query text.

## Rating Links

Let's create an array of ratings right under the prices array.

```ts
const ratings = [4, 3, 2, 1];
```

Now add the following right under the closing `</div>` of the price links. Make sure you are still within the `filter-links` div or the layout will not look right.

```tsx
{
  /* Rating Links */
}
<div>
  <div className='text-xl mt-8 mb-2'>Customer Review</div>
  <ul className='space-y-1'>
    <li>
      <Link
        href={getFilterUrl({ r: 'all' })}
        className={`  ${'all' === rating && 'font-bold'}`}
      >
        Any
      </Link>
    </li>
    {ratings.map((r) => (
      <li key={r}>
        <Link
          href={getFilterUrl({ r: `${r}` })}
          className={`${r.toString() === rating && 'font-bold'}`}
        >
          {`${r} stars & up`}
        </Link>
      </li>
    ))}
  </ul>
</div>;
```

We are doing the same thing, mapping through the ratings and creating a link for each one.

## Query Text

Right now we are stuck with whatever query we have in the URL. So let's show the query text along with the category, price, rating and a button to clear the filters.

Find the div that wraps the right column:

```tsx
<div className="md:col-span-4 space-y-4">
```

And add this inside of it:

```tsx
<div className='flex-between flex-col md:flex-row my-4'>
  <div className='flex items-center'>
    {q !== 'all' && q !== '' && 'Query : ' + q}
    {category !== 'all' && category !== '' && '   Category : ' + category}
    {price !== 'all' && '    Price: ' + price}
    {rating !== 'all' && '    Rating: ' + rating + ' & up'}
    &nbsp;
    {(q !== 'all' && q !== '') ||
    (category !== 'all' && category !== '') ||
    rating !== 'all' ||
    price !== 'all' ? (
      <Button variant={'link'} asChild>
        <Link href='/search'>Clear</Link>
      </Button>
    ) : null}
  </div>
  <div>{/* SORTING HERE */}</div>
</div>
```

First, we are checking if the query is not `all` and not empty. If it is not, we are showing the query text. Then we are checking if the category is not `all` and not empty. If it is not, we are showing the category text. Then we are checking if the price is not `all`. If it is not, we are showing the price text. Then we are checking if the rating is not `all`. If it is not, we are showing the rating text. Then we are checking if the query is not `all` and not empty or the category is not `all` and not empty or the rating is not `all` or the price is not `all`. If it is not, we are showing a button to clear the filters.

In the next lesson, we will add the sorting.
