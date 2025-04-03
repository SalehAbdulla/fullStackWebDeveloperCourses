# Dynamic Metadata

This is a nice touch to what we have so far. For the title, we can make it dynamic based on the filters.

Remember, we can just export a function called `generateMetadata` from the page component adn add things like a title, description, etc.

So if we add the following function above the main `SearchPage` function in the `app/(root)/search/page.tsx` file:

```ts
export async function generateMetadata() {
  return {
    title: `Search`,
  };
}
```

It will add the title to the page.

Let's make this very dynamic by taking in the search parameters and using them to create the title.

Add the following searchParams to the function:

```ts
export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await props.searchParams;
}
```

Now we can add some conditional logic to the function and return the title based on the search parameters.

```ts
export async function generateMetadata(props: {
  searchParams: Promise<{
    q: string;
    category: string;
    price: string;
    rating: string;
  }>;
}) {
  const {
    q = 'all',
    category = 'all',
    price = 'all',
    rating = 'all',
  } = await props.searchParams;

  const isQuerySet = q && q !== 'all' && q.trim() !== '';
  const isCategorySet = category && category !== 'all' && category.trim() !== '';
  const isPriceSet = price && price !== 'all' && price.trim() !== '';
  const isRatingSet = rating && rating !== 'all' && rating.trim() !== '';

  if (isQuerySet || isCategorySet || isPriceSet || isRatingSet) {
    return {
      title: `Search ${
        isQuerySet ? q : ''
      }
      ${isCategorySet ? `: Category ${category}` : ''}
      ${isPriceSet ? `: Price ${price}` : ''}
      ${isRatingSet ? `: Rating ${rating}` : ''}`,
    };
  } else {
    return {
      title: 'Search Products',
    };
  }
}

```

We are checking for the query, category, price, and rating parameters and if they are not `all`, we are adding them to the title. If there are no filters, we are just returning the default title of `Search Products`.
