# Create Product Page

Now let's work on the page and UI to create a new product.

Create a file at `app/admin/products/create/page.tsx` with the following code:

```tsx
import { Metadata } from 'next';
import { requireAdmin } from '@/lib/auth-guard';

export const metadata: Metadata = {
  title: 'Create product',
};

const CreateProductPage = async () => {
  await requireAdmin();
  return (
    <>
      <h2 className='h2-bold'>Create Product</h2>
      <div className='my-8'>{/* Product Form Here */}</div>
    </>
  );
};
export default CreateProductPage;
```

If you go to the admin products page, you should be able to click on the button and see the heading. You can also go to the `/admin/products/create` page and see the heading.

## Product Form

Let's start on the product form. Create a file at `components/shared/admin/product-form` and add the following code for now:

```tsx
'use client';

const ProductForm = () => {
  return <>Form</>;
};

export default ProductForm;
```

Now bring it into the `app/admin/products/create/page.tsx` file:

```tsx
import ProductForm from '@/components/shared/admin/product-form';
```

and embed it:

```tsx
const CreateProductPage = () => {
  return (
    <>
      <h2 className='h2-bold'>Create Product</h2>
      <div className='my-8'>
        <ProductForm type='Create' />
      </div>
    </>
  );
};
```

We are passing in a type of `Create` to the form. This can be either `Create` or `Update`.

You should see the text `Form` on the page.

Let's add all of the imports:

```tsx
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { createProduct, updateProduct } from '@/lib/actions/product.actions';
import { productDefaultValues } from '@/lib/constants';
import { insertProductSchema, updateProductSchema } from '@/lib/validator';
import { ControllerRenderProps } from 'react-hook-form';
import { Product } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import slugify from 'slugify';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
```

Lot's of imports here. We have a bunch of ui components from ShadCN, a few hooks, a few actions, a few types, a few constants, a few validators, a few libraries, and a few components.

Let's add a few parameters to the `ProductForm` component and also init the router and toast:

```tsx
const ProductForm = ({
  type,
  product,
  productId,
}: {
  type: 'Create' | 'Update';
  product?: Product;
  productId?: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  return <>Form</>;
};
```

It is taking in a type, which will be either `Create` or `Update`, a product, and a productId. We will use this to determine whether we are creating a new product or updating an existing product.

We are going to use React Hook Form, so let's create a form:

```tsx
const form = useForm<z.infer<typeof insertProductSchema>>({
  resolver:
    type === 'Update'
      ? zodResolver(updateProductSchema)
      : zodResolver(insertProductSchema),
  defaultValues: product && type === 'Update' ? product : productDefaultValues,
});
```

We are using the `useForm` hook from React Hook Form. We are passing in the schema we want to use, the default values, and the resolver. We are using the `zodResolver` from `@hookform/resolvers/zod` to resolve the schema. We are using the `type` parameter to determine whether we are creating a new product or updating an existing product. We are using the `product` parameter to determine the default values. We are using the `productId` parameter to determine whether we are creating a new product or updating an existing product.

Now we want to assemble the form with a bunch of fields. These are the fields we want to show in the form:

- Name
- Slug (with a button to generate the slug from the name)
- Category
- Brand
- Price
- Stock
- Images (We will add this later)
- Featured (Is the image featured?) (We will add this later)
- Description
- Button to submit the form

It will be a two colum layout. So we will have a div wrapped around every two fields.

Let's add the form to the return statement with the divs that will hold the fields. We will use comments to map everything out:

```tsx
return (
  <Form {...form}>
    <form className='space-y-8'>
      <div className='flex flex-col gap-5 md:flex-row'>
        {/* Name */}
        {/* Slug */}
      </div>
      <div className='flex flex-col gap-5 md:flex-row'>
        {/* Category */}
        {/* Brand */}
      </div>
      <div className='flex flex-col gap-5 md:flex-row'>
        {/* Price */}
        {/* Stock  */}
      </div>
      <div className='upload-field flex flex-col gap-5 md:flex-row'>
        {/* Images */}
      </div>
      <div className='upload-field'>{/* Is Featured */}</div>
      <div>{/* Description */}</div>
      <div>{/* Submit */}</div>
    </form>
  </Form>
);
```

I added the custom class `upload-field` to the divs that will hold image uploads because for some reason the button text is white on the white background. So we will add an override class to the button to make it black.

In the next lesson, we will add the form fields.
