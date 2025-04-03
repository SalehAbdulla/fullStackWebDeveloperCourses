# Display Reviews

We have our actions to get the reviews, now we need to fetch and display them in the `ReviewList` component.

Open the `app/(root)/products/[slug]/review-list.tsx` file and import the `getReviews` action:

```tsx
import { getReviews } from '@/lib/actions/review.actions';
```

Now we need to fetch the reviews. We will do this in the `useEffect` hook.

Add the following code under the state values:

```tsx
useEffect(() => {
  /// Load reviews from the database
  const loadReviews = async () => {
    const res = await getReviews({ productId });
    setReviews(res.data);
  };

  loadReviews();
}, [productId]);
```

We are calling the `getReviews` action and setting the reviews state with the response. We are also using the `useEffect` hook to call the `loadReviews` function when the component mounts.

## Show Reviews

Now let's map over the reviews and display them where the comment "REVIEWS HERE" is:

```tsx
{
  reviews.map((review) => (
    <Card key={review.id}>
      <CardHeader>
        <div className='flex-between'>
          <CardTitle>{review.title}</CardTitle>
        </div>
        <CardDescription>{review.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='flex space-x-4 text-sm text-muted-foreground'>
          {/* RATING HERE */}
          <div className='flex items-center'>
            <User className='mr-1 h-3 w-3' />
            {review.user ? review.user.name : 'Deleted User'}
          </div>
          <div className='flex items-center'>
            <Calendar className='mr-1 h-3 w-3' />
            {formatDateTime(review.createdAt).dateTime}
          </div>
        </div>
      </CardContent>
    </Card>
  ));
}
```

## Rating Component

The rating component is going to have some SVG stars. Obviously we are not going to type out all the SVG, so I will attach the component file to this lesson. You can also get it from the final repository. It will go in `components/shared/product/rating.tsx`.

Here is the code:

```tsx
const Rating = ({ value, caption }: { value: number; caption?: string }) => {
  const Full = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-yellow-500 w-5 h-auto fill-current'
      viewBox='0 0 16 16'
    >
      <path d='M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z' />
    </svg>
  );
  const Half = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-yellow-500 w-5 h-auto fill-current'
      viewBox='0 0 16 16'
    >
      <path d='M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z' />
    </svg>
  );
  const Empty = () => (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='text-yellow-500 w-5 h-auto fill-current'
      viewBox='0 0 16 16'
    >
      <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
    </svg>
  );

  return (
    <div className='flex gap-2'>
      <div className='flex gap-1'>
        {value >= 1 ? <Full /> : value >= 0.5 ? <Half /> : <Empty />}
        {value >= 2 ? <Full /> : value >= 1.5 ? <Half /> : <Empty />}
        {value >= 3 ? <Full /> : value >= 2.5 ? <Half /> : <Empty />}
        {value >= 4 ? <Full /> : value >= 3.5 ? <Half /> : <Empty />}
        {value >= 5 ? <Full /> : value >= 4.5 ? <Half /> : <Empty />}
      </div>

      {caption && <span className='text-sm'>{caption}</span>}
    </div>
  );
};
export default Rating;
```

Now, import the Rating component into the `ReviewList` component:

```tsx
import Rating from '@/components/shared/product/rating';
```

Replace the `// RATING HERE` with the following:

```tsx
<Rating value={review.rating} />
```

Now you should see the rating component.

We also want to use this on the product card and product page.

## Product Page Update

Open the `app/(root)/product/[slug]/page.tsx` file and import the Rating component:

```tsx
import Rating from '@/components/shared/product/rating';
```

Replace this line:

```tsx
<p>
  {product.rating} of {product.numReviews} reviews
</p>
```

with this line:

```tsx
<Rating value={Number(product.rating)} />
<p>{product.numReviews} reviews</p>
```

## Update Product Card

Now open the `components/shared/product/product-card.tsx` file and import the Rating component:

```tsx
import Rating from './rating';
```

Replace this line:

```tsx
<p>{product.rating} stars</p>
```

with this line:

```tsx
<Rating value={Number(product.rating)} />
```

In the next lesson, we will handle reloading the reviews and the update.
