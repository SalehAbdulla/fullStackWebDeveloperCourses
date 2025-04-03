# Zod Type Validation & Type Inference

So far, we’ve been using `.ts` and `.tsx` files to work with TypeScript, but we haven’t fully utilized TypeScript's potential. For example, in our product code, we used the `any` type, which bypasses TypeScript’s benefits.

Now, let’s take a step up by introducing zod, a powerful library for runtime validation and type inference.

## Why zod?

Let's talk about why we're using Zod. Creating regular TypeScript types and interfaces is great for development because they catch type errors at compile-time. However, they don’t exist at runtime, meaning they can’t validate data coming from an API, form input, or other external sources.

With zod, we:

1. Validate data at runtime.
2. Ensure that data matches the expected format before it’s used.
3. Automatically infer TypeScript types from validation schemas.

In short: zod = validation + type inference.


## Install Zod

Open a terminal and run the following command:

```bash
npm install zod
```

Let's create a new file at `lib/validator.ts`. This will be where we will write our validation code.


```ts
import { z } from 'zod';

// Schema for inserting a product
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Slug must be at least 3 characters'),
  category: z.string().min(3, 'Category must be at least 3 characters'),
  brand: z.string().min(3, 'Brand must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
});

```

Each field in the schema corresponds to a property in our Product model. Fields like name, slug, and description must be at least 3 characters. Images must contain at least one image. Banner can be null because it’s optional.

z.coerce.number() ensures that values (e.g., "10") are converted to numbers, as the stock field in our database expects a number.


## Handling The Price Field

Handling the price field is a little more complex because prices need to be consistent and precise in the database. Imagine running an e-commerce platform where prices have inconsistent decimal places—this could lead to incorrect totals, taxes, or user confusion. By validating and formatting the price field, we ensure that every value stored in the database is accurate and predictable.

Remember, with the price field:

- It’s a Decimal in the database, which requires precise formatting.
- Form inputs typically provides price as a string (e.g., "49.9"), but we need to ensure it’s valid and formatted properly before passing it to the database.


#### Helper Function

First, we're going to create a helper function. Open the `lib/utils.ts` file and add the following:

```ts
// Format number with decimal places
export function formatNumberWithDecimal(num: number): string {
  const [int, decimal] = num.toString().split('.');
  return decimal ? `${int}.${decimal.padEnd(2, '0')}` : `${int}.00`;
}
```

This function ensures numbers always have two decimal places. For example:

- 49 becomes "49.00".
- 49.9 becomes "49.90".

This is important for monetary values where precision matters.

#### Add Validation For Price

Now, let’s define a custom validation rule for the price field using zod’s `.refine()` method.

Add this above your schema in validator.ts:

```ts
// Make sure price is formatted with two decimal places
const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    'Price must have exactly two decimal places (e.g., 49.99)'
  );

```

**Explanation:**

1. Input as a String:
 - The price field is received as a string (e.g., "49.9").
2. Convert to Number:
 - Number(value) converts the string to a number (49.9).
3. Format:
 - `formatNumberWithDecimal` ensures the number has two decimal places (e.g., 49.9 → "49.90").
4. Validate:
 - The regex /^\d+(\.\d{2})?$/ checks that the final value is a valid decimal (e.g., "49.90").

 Why do we convert the string to a number? Strings like "49.9" may visually look correct but lack precision. By converting to a number, we strip out any unnecessary formatting or errors (e.g., leading zeros) and then use our helper function to enforce two decimal places before validating the result.

#### Regex Pattern

 We are checking for a string that matches the following regex:

```regex
^\d+(\.\d{2})?$
```

This regex matches a string that starts with one or more digits, followed by an optional decimal point and exactly two digits. This is how we expect the price to be formatted.

Here is the breakdown:

- `^`: Start of the string.
- `\d`+: Matches one or more digits (e.g., 49 in 49.99).
- `(\.\d{2})?`: Matches an optional decimal point followed by exactly two digits `(\d{2})`. Example: .99. 
The `?` makes the decimal part optional (it’s fine if there’s no .99).
- `$`: End of the string.

#### Add Price To Schema

Now we need to use that `currency` variable for our price field in the schema

```ts
export const insertProductSchema = z.object({
  //... other fields
  price: currency,
});

```

## Generate TypeScript Types

We have our validators, but we need to create the `Product` type. Create a file at `types/index.ts`. This is where we define our types. Add the following imports:

```ts
import { z } from 'zod';
import { insertProductSchema } from '@/lib/validator';
```

We can use `z.infer` to create a product type and include all the fields from the validator. Add the following to the types file:

```ts
export type Product = z.infer<typeof insertProductSchema> & {
  id: string;
  createdAt: Date;
  rating: string;
  numReviews: number;
};
```

So we are saying a product should have all the fields in the Zod schema plus and id, createdAt and rating.

Using `z.infer` ensures that our TypeScript types are always in sync with our validation schema. If we update the schema (e.g., add a required field), the inferred type will automatically reflect the change, reducing the risk of type mismatches in our codebase.


## Update Components

Now we want to use that `Product` type.

Open the `components/shared/product/product-card.tsx` file and import the `Product` type:

```ts
import { Product } from '@/types';
```

Then replace the `any` type with the `Product` type:

```tsx
const ProductCard = ({ product }: { product: Product }) => {
  //...
};
```

Open the `components/shared/product/product-list.tsx` file and import the `Product` type:

```ts
import { Product } from '@/types';
```

Then replace the `any` type with the `Product` type:

```tsx
const ProductList = ({ data, title }: { data: Product[]; title?: string }) => {
  //...
};
```

As well as within the `map` function:

```tsx
{
  data.map((product: Product) => (
    <ProductCard key={product.slug} product={product} />
  ));
}
```

Now we have an insert product validator and a type for products.
