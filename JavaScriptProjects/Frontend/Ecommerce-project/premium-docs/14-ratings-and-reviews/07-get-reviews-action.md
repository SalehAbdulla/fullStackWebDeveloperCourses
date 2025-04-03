# Get Reviews Action

Now we need to be able to get the reviews for a product. Let's open the `lib/actions/review.actions.ts` file and create a new action:

```ts
// Get all reviews for a product
export async function getReviews({ productId }: { productId: string }) {
  const data = await prisma.review.findMany({
    where: {
      productId: productId,
    },
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return { data };
}
```

We are simply getting all the reviews for a product and returning them. We are also including the user's name in the response.

## Get Review By User

Let's also create a function to get a product review for a specific product that was written by the current user:

```ts
// Get a review for a product written by the current user
export const getReviewByProductId = async ({
  productId,
}: {
  productId: string;
}) => {
  const session = await auth();
  if (!session) throw new Error('User is not authenticated');

  return await prisma.review.findFirst({
    where: { productId, userId: session?.user.id },
  });
};
```

We are taking in the productId, getting the session, and then finding the review for the productId and the userId.

Next, we will use these actions in the UI.
