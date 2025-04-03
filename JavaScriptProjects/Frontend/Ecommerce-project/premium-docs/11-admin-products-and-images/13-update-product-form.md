# Update Product Form

We can add new products through the admin panel. Now we want to update existing products. We have the update action and we have the product form. One other thing we need is an action to get the product by id.

Open the `lib/actions/product.action.ts` file and add the following function:

```ts
// Get single product by id
export async function getProductById(productId: string) {
  const data = await prisma.product.findFirst({
    where: { id: productId },
  });

  return convertToPlainObject(data);
}
```

Create a new file at `app/admin/products/[id]/page.tsx`. This will be the update page.

Add the following code:

```tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProductForm from '@/components/shared/admin/product-form';
import { getProductById } from '@/lib/actions/product.actions';

export const metadata: Metadata = {
  title: 'Update product',
};

const UpdateProductPage = async (props: {
  params: Promise<{
    id: string;
  }>;
}) => {
  const { id } = await props.params;

  const product = await getProductById(id);

  if (!product) return notFound();

  return (
    <div className='space-y-8 max-w-5xl mx-auto'>
      <h1 className='h2-bold'>Update Product</h1>
      <ProductForm type='Update' product={product} productId={product.id} />
    </div>
  );
};

export default UpdateProductPage;
```

Now click on the edit button on a product in the admin dashboard and you should see the update form with the values. Go ahead and change something like the stock and save and the product should be updated.
