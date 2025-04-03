# Get Filter URL Function

We are going to have a UI that allows us to filter our search results. Remember, we do this with query strings in the URL. So we need to create a function to construct this URL.

An example of what a URL may look like is:

```
http://localhost:3000/search?q=shirt&category=Men%27s%20Dress%20Shirts&price=10-40&rating=4&sort=newest
```

Add the following function above the return statement in the `app/(root)/search/page.tsx` file:

```tsx
// Construct filter url
const getFilterUrl = ({
  c,
  s,
  p,
  r,
  pg,
}: {
  c?: string;
  s?: string;
  p?: string;
  r?: string;
  pg?: string;
}) => {
  const params = { q, category, price, rating, sort, page };
  if (c) params.category = c;
  if (p) params.price = p;
  if (r) params.rating = r;
  if (pg) params.page = pg;
  if (s) params.sort = s;
  return `/search?${new URLSearchParams(params).toString()}`;
};
```

The function takes in optional params of the following:

- c (category)
- s (sort order)
- p (price)
- r (rating)
- pg (page number)

The `params` object (q, category, price, rating, sort, and page) corresponds to a filter or sort option. These values come from the `searchParams` object, which stores the current state of each filter.

Then we check if the optional params are truthy. If they are, we add them to the `params` object.

Finally, we return the URL with the query string using `new URLSearchParams(params).toString()`, which converts the `params` object into a query string.

Let's test it out. Add this anywhere in the search page return statement:

```tsx
URL: {
  getFilterUrl({ c: "Men's Dress Shirts" });
}
```

You will see the URL on the page with the values. They should all be the default except for the category, which we passed in. Also, the query comes from the URL, which comes from the search component.

Delete that line. I just wanted to show you how the function works. In the next lesson, we will start to build the UI.
