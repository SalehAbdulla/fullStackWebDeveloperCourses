# Create & Update Product Actions

We want to be able to create and update products. Products are created by admins and they will have images associated with them. However, I want to first just be able to create and update products without images. Then once we get the form working, we will integrate image uploading with "Uploadthing".

## Zod Schema

Let's start by creating the Zod schema.

Open the `lib/validator.ts` file. We already have an `insertProductSchema` schema. Let's create another one called `updateProductSchema` right below it.

```ts
// Schema for updating a product
export const updateProductSchema = insertProductSchema.extend({
  id: z.string().min(1, 'Id is required'),
});
```

All we need to do is extend the `insertProductSchema` schema with the `id` field. We also need to add the `id` field to the `insertProductSchema` schema.

Open the `lib/actions/product.actions.ts` file and import the `updateProductSchema` schema:

```ts
import { insertProductSchema, updateProductSchema } from '../validator';
```

## Product Default Values

I am also going to add a constant for the product form default values. Open the `lib/constants/index.ts` file and add the following constant:

```ts
export const productDefaultValues = {
  name: '',
  slug: '',
  category: '',
  images: [],
  brand: '',
  description: '',
  price: '0',
  stock: 0,
  rating: '0',
  numReviews: '0',
  isFeatured: false,
  banner: null,
};
```

## Create Product Action

Let's create the action to create a product. In the `lib/actions/product.actions.ts` file and add the following function:

```ts
// Create Product
export async function createProduct(data: z.infer<typeof insertProductSchema>) {
  try {
    // Validate and create product
    const product = insertProductSchema.parse(data);
    await prisma.product.create({ data: product });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product created successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
```

This code is simple. We are validating the product using the `insertProductSchema` schema. If the validation is successful, we are creating the product using the Prisma client. We are also revalidating the `/admin/products` page to update the products list.

## Update Product Action

While we're in the action file, let's also add the update product action.

Add the following function to the `lib/actions/product.actions.ts` file:

```ts
// Update Product
export async function updateProduct(data: z.infer<typeof updateProductSchema>) {
  try {
    // Validate and find product
    const product = updateProductSchema.parse(data);
    const productExists = await prisma.product.findFirst({
      where: { id: product.id },
    });

    if (!productExists) throw new Error('Product not found');

    // Update product
    await prisma.product.update({ where: { id: product.id }, data: product });

    revalidatePath('/admin/products');

    return {
      success: true,
      message: 'Product updated successfully',
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
```

We are finding, validating and updating the product using the Prisma client. We are also revalidating the `/admin/products` page to update the products list.

Now that we have the actions, let's start to work on the pages and forms.
