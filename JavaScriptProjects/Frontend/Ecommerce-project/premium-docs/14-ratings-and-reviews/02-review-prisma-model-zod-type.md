# Review Prisma Model, Zod & Type

Now that we are going to be adding reviews and ratings to our products, we need to create a Prisma model for reviews.

Open the `prisma/schema.prisma` file and add the following code:

```prisma
model Review {
  id                 String   @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
  userId             String   @db.Uuid
  productId          String   @db.Uuid
  rating             Int
  title              String
  description        String
  isVerifiedPurchase Boolean  @default(true)
  createdAt          DateTime @default(now()) @db.Timestamp(6)
  product            Product  @relation(fields: [productId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "reviews_productId_product_id_fk")
  user               User     @relation(fields: [userId], references: [id], onDelete: Cascade, onUpdate: NoAction, map: "reviews_userId_user_id_fk")
}
```

Here is a rundown of the fields:

- `id`: This is the primary key for the review.
- `userId`: This is the foreign key that references the user who wrote the review.
- `productId`: This is the foreign key that references the product that the review is for.
- `rating`: This is the rating that the user gave the product.
- `title`: This is the title of the review.
- `description`: This is the description of the review
- `isVerifiedPurchase`: This is a boolean that indicates whether the user has verified their purchase of the product.
- `createdAt`: This is the date and time that the review was created.
- `product`: This is the relation that links the review to the product.
- `user`: This is the relation that links the review to the user.

Make sure in your `User` and `Product` models that you have a `Review` field like this:

```prisma
model User {
  //..
   Review    Review[]
}

model Product {
  //...
  Review    Review[]
}
```

## Migration

Now we need to run the migration to create the `Review` table in the database.

Run the following commands:

```bash
npx prisma migrate dev --name add-review
npx prisma generate
```

## Zod Schema

We are also going to need to create a Zod schema for inserting reviews.

Open the `lib/validator.ts` file and add the following code:

```ts
// Insert Review Schema
export const insertReviewSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  productId: z.string().min(1, 'Product is required'),
  userId: z.string().min(1, 'User is required'),
  rating: z.coerce
    .number()
    .int()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
});
```

These are the fields and validation needed when we create a review.

## Type

Now we need to create a type for the review and use the `zod` schema to validate the data.

Open the `types/index.ts` file and add the following code:

```ts
import {
  // ..
  insertReviewSchema,
} from '@/lib/validator';

export type Review = z.infer<typeof insertReviewSchema> & {
  id: string;
  createdAt: Date;
  user?: { name: string };
};
```

We are using all the fields from the `insertReviewSchema` and adding the `id` and `createdAt` fields as well as the `user` field.

## Default Values Constant

Like with most of our forms, I am going to add a constant
for the default values. Open the `lib/constants/index.ts` file and add the following code:

```ts
export const reviewFormDefaultValues = {
  title: '',
  comment: '',
  rating: 0,
};
```

In the next lesson, we will start to create the rating and review functionality.
