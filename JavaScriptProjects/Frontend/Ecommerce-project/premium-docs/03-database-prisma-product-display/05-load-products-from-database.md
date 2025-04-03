# Load Products From Database

Now that we have our database setup and seeded with some sample data, we can load the products from the database.

## Convert Prisma Result to JS Object

Before we do any fetching with Prisma, I want to create a simple utility function that will convert the Prisma result to a plain JavaScript object. Prisma returns a `Prisma.Product` object, but this object is tightly coupled to Prisma's internal data structures. We can create a simple utility function that will convert the Prisma result to a plain JavaScript object.

Open the `lib/utils.ts` file and add the following:

```typescript
export function convertToPlainObject<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
```

This function will convert the Prisma result to a plain JavaScript object. We can use this function to convert the Prisma result to a plain JavaScript object.

The function is simple. We run the value through `JSON.stringify` and then `JSON.parse` to convert the Prisma result to a plain JavaScript object.

## The TypeScript Generic

This is not a TypeScript course, but I feel like I should explain what is happening there.

The `<T>` is a generic. We can use this to specify the type of the value that we are passing in. In this case, `T` represents a placeholder for any type that the function might accept when it is called. It could be a `string`, `object`, `array`, or even a more complex type like a Prisma model.

`value: T` means that the value parameter can be of any type T. TypeScript infers the type at the time of function invocation.

`: T` after the function signature indicates that the function will return the same type as the input type T. This ensures that the return value has the same type as the argument that was passed in.

If you call the function with a `Product` object, TypeScript knows that the return value will also be of type `Product`.

I know TypeScript can be a bit confusing and can seem pointless to a lot of people. I can see that point of view. But I can also see the benefits of using TypeScript. I think it is a great tool for catching errors and making your code more readable. It's also nice that it is optional. If you don't want to use this stuff, you don't have to.

## Actions

We will be using server actions throughout this course. It is one of the best features of Next.js 14+. We can run server-side code within an asynchrounous function. This allows us to run code on the server without having to create API routes or make a request to the server. This is great for performance and security and makes it easy to use Prisma with Next.js.

Let's create our `actions` folder in the `lib` directory. Create a new file at `lib/actions/product.actions.ts` and add the following:

```typescript
'use server';
import { PrismaClient } from '@prisma/client';
import { convertToPlainObject } from '../utils';

// Get the latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}
```

We are simply fetching the latest products from the database. We are using the `take` and `orderBy` options to limit the number of products returned and order them by the `createdAt` field. We are also using the `convertToPlainObject` function to convert the Prisma result to a plain JavaScript object.

## Using the Action

Now, let's use this action. Open the homepage at `app/(root)/page.tsx` and add the following:

```typescript
import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

const HomePage = async () => {
  const latestProducts = await getLatestProducts();

  return (
    <div className='space-y-8'>
      <h2 className='h2-bold'>Latest Products</h2>
      <ProductList title='Newest Arrivals' data={latestProducts} />
    </div>
  );
};

export default HomePage;
```

We no longer need to bring in the sample data. We are now seeing the products from the database.

## Using a Constant For Limit

Let's open the `lib/constants/index.ts` file and add the following:

```typescript
export const LATEST_PRODUCTS_LIMIT =
  Number(process.env.LATEST_PRODUCTS_LIMIT) || 4;
```

Now in the `lib/actions/product.actions.ts` file, import the constant and use it in the `getLatestProducts` function:

```typescript
import { LATEST_PRODUCTS_LIMIT } from '../constants';

// Get the latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: 'desc' },
  });

  return convertToPlainObject(data);
}
```
