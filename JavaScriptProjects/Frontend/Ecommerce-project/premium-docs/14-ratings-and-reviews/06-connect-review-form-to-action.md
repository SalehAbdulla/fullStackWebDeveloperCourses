# Connect Review Form to Action

Now we have our form in the UI and we have the action to create or update a review. Let's connect the two.

Open the `app/(root)/product/[slug]/review-form.tsx` file and import the action:

```ts
import { createUpdateReview } from '@/lib/actions/review.actions';
```

## Create Form Submit Handler

Create the submit handler for the form:

```ts
// Form submit handler
const onSubmit: SubmitHandler<CustomerReview> = async (values) => {
  const res = await createUpdateReview({ ...values, productId });

  if (!res.success)
    return toast({
      variant: 'destructive',
      description: res.message,
    });

  setOpen(false);

  onReviewSubmitted();

  toast({
    description: res.message,
  });
};
```

We are passing the productId and the values to the action. We are also setting the open state to false and calling the onReviewSubmitted function, which is passed into the form component. We are also showing a toast message with the response from the action.

Remove the `?` from the `onReviewSubmitted?` parameter in the form component.

## Set User & Product ID

In the `handleOpenForm` function, we need to add the following:

```ts
const handleOpenForm = () => {
  form.setValue('productId', productId);
  form.setValue('userId', userId);

  setOpen(true);
};
```

The form inputs only take care of the title, description and rating, but our validator needs the user and product ID. We set it when the form opens here.

## Add Handler To Form

Add the following to the form tag:

```tsx
  <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
```

## Pass in the callback to the `<ReviewForm />` component

Open the `app/(root)/product/[slug]/review-list.tsx` file and pass in the following props to the `<ReviewForm />` component:

```tsx
<ReviewForm userId={userId} productId={productId} onReviewSubmitted={reload} />
```

So when we submit the form the `onReviewSubmitted` function is called and the `reload` function is called. This will update the reviews list. For now, just add a console log.

Create the `reload` function in the `review-list.tsx` file right above the return statement:

```tsx
// Reload reviews when a review is submitted
const reload = async () => {
  console.log('review submitted');
};
```

Okay, we should be able to submit a review now. Go ahead and give it a try. Add a title, description, and rating.

Now go to Prisma Studio and check the reviews table. You should see the review you just added.
