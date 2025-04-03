# Create Product Handler

We have most of our product form ready. We do still need the images and the is featured field, but we will get to those later.

Let's create the handler for the create product form. In the `components/shared/admin/product-form.tsx` file, add the following code above the `return` statement:

```tsx
// Handle form submit
const onSubmit: SubmitHandler<z.infer<typeof insertProductSchema>> = async (
  values
) => {
  if (type === 'Create') {
    const res = await createProduct(values);

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
    } else {
      toast({
        description: res.message,
      });
      router.push(`/admin/products`);
    }
  }
  if (type === 'Update') {
    if (!productId) {
      router.push(`/admin/products`);
      return;
    }

    const res = await updateProduct({ ...values, id: productId });

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });
    } else {
      router.push(`/admin/products`);
    }
  }
};
```

We are just calling the appropriate action based on the type and the productId. We are also using the router to navigate to the admin products page after the product is created or updated.

Add the handler to the form:

```tsx
<form
  method='post'
  onSubmit={form.handleSubmit(onSubmit)}
  className='space-y-8'
>
```

If you try and submit the form with nothing filled in, you will see all your error messages.

If you fill them all in you'll notice it is not submitting. This is because the `insertProductSchema` schema need the images, banner and isFeatured fields to be set.

Since we are not using those fields yet, Let's open the `lib/validator.ts` file and comment out the following lines:

```ts
// Schema for inserting a product
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Name must be at least 3 characters'),
  category: z.string().min(3, 'Name must be at least 3 characters'),
  brand: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Name must be at least 3 characters'),
  stock: z.coerce.number(),
  // images: z.array(z.string()).min(1, 'Product must have at least one image'),
  // isFeatured: z.boolean(),
  // banner: z.string().nullable(),
  price: currency,
});
```

Now if you try and submit the form, it should work.

You will see the product in the admin products area and on the home page. It will not have an image yet. Let's fix that next.
