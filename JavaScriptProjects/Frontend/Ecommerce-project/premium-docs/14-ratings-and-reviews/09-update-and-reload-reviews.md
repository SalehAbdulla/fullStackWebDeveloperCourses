# Update & Reload Reviews

Now we need to make it so that if the user already has a review, it will show in the form and the user can update it. We also want to reload the reviews so that the user can see the added or updated review.

Open the `app/(root)/product/[slug]/review-form.tsx` file and import the `getReviewByProductId` action:

```tsx
import {
  createUpdateReview,
  getReviewByProductId,
} from '@/lib/actions/review.actions';
```

Now, in the `handleOpenForm` function, add the following:

```tsx
// Open dialog on button click
const handleOpenForm = async () => {
  form.setValue('productId', productId);
  form.setValue('userId', userId);

  const review = await getReviewByProductId({ productId });

  if (review) {
    form.setValue('title', review.title);
    form.setValue('description', review.description);
    form.setValue('rating', review.rating);
  }
  setOpen(true);
};
```

We are setting the productId and userId in the form, then we are getting the review by productId and if it exists, we are setting the form values to the review values.

You should see the data in the form if you already have a review for that product.

## Reload Reviews

Now go to the `app/(root)/product/[slug]/review-list.tsx` file and add the following to the `reload()` function:

```tsx
// Reload reviews when a review is submitted
const reload = async () => {
  try {
    const res = await getReviews({ productId });
    setReviews([...res.data]);
  } catch (err) {
    console.log(err);
    toast({
      variant: 'destructive',
      description: 'Error in fetching reviews',
    });
  }
};
```

You will also need to initialize the `toast`. Add this under the state:

```tsx
const { toast } = useToast();
```

Now try and edit or add a review and you should see the reviews reload.
