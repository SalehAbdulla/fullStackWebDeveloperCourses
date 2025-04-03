# Review List Component

We have quite a bit of work to do here. We need to create components for the review list and the review form. We need actions to get and post reviews and so on.

Let's start with the UI stuff first. I want to have a review-list component and in that we will display the reviews but we will also have a review-form component within the list component.

So create a new file at `app/(root)/product/[slug]/review-list.tsx` and add the following code:

```tsx
'use client';

const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  console.log(userId, productId, productSlug);

  return <>REVIEW LIST</>;
};

export default ReviewList;
```

The component takes in the `userId`, `productId` and `productSlug` as props. We will use these to get the reviews for the product and to post reviews. For now, just log them out to the console.

We want to add this to the product page. So open the `app/(root)/product/[slug]/page.tsx` file and import the following:

```tsx
import { auth } from '@/auth';
import ReviewList from './review-list';
```

We need to get the user ID. So add the following above the return in the `ProductDetailsPage`:

```tsx
const session = await auth();
const userId = session?.user?.id;
```

Now under the closing `</section>` add the following section with the review list component:

```tsx
<section className='mt-10'>
  <h2 className='h2-bold  mb-5'>Customer Reviews</h2>
  <ReviewList
    productId={product.id}
    productSlug={product.slug}
    userId={userId || ''}
  />
</section>
```

Now if you go to the product page, you should see the component text and the console.log output.

Let's bring in a few ShadCN components, icons and hooks into the `ReviewList` component:

```tsx
import { useEffect, useState } from 'react';
import { Review } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Calendar, Check, User } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
```

Now let's just add an empty array in state to hold the reviews and then add the following to the return:

```tsx
const ReviewList = ({
  userId,
  productId,
  productSlug,
}: {
  userId: string;
  productId: string;
  productSlug: string;
}) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <div className='space-y-4'>
      {reviews.length === 0 && <div>No reviews yet</div>}
      {userId ? (
        <>{/* REVIEW FORM HERE */}</>
      ) : (
        <div>
          Please{' '}
          <Link
            className='text-primary px-2'
            href={`/api/auth/signin?callbackUrl=/product/${productSlug}`}
          >
            sign in
          </Link>{' '}
          to write a review
        </div>
      )}
      <div className='flex flex-col gap-3'>{/* REVIEWS HERE */}</div>
    </div>
  );
};
```

We are just checking for reviews and if the user is logged in, we will show the review form. Otherwise, we will show a message to sign in to write a review. We use the `callbackUrl` to redirect the user to the product page after they sign in.

Now you should just see the heading and no reviews message.

Let's continue with the form in the next lesson.
