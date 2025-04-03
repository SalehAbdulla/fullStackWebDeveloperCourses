# Product Images Component

We have the product details page. We will now create a component to show the images. There will be a main image and a list of images to click on to show the current one.

Create a file at `components/product/product-images.tsx` and add the following:

```tsx
'use client';
import Image from 'next/image';

import { cn } from '@/lib/utils';
import { useState } from 'react';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className='space-y-4'>
      <Image
        src={images![current]}
        alt='hero image'
        width={1000}
        height={1000}
        className='min-h-[300px] object-cover object-center '
      />
      <div className='flex'>
        {images.map((image, index) => (
          <div
            key={image}
            className={cn(
              'border   mr-2 cursor-pointer hover:border-orange-600',
              current === index && '  border-orange-500'
            )}
            onClick={() => setCurrent(index)}
          >
            <Image src={image} alt={'image'} width={100} height={100} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
```

This is a simple component that will display the product images. We are using the `useState` hook to keep track of the current image. We are also using the `cn` function from the `@/lib/utils` file to conditionally apply the `border-orange-500` class to the current image.

Import it in the `app/(root)/product/[slug]/page.tsx` file:

```tsx
import ProductImages from '@/components/shared/product/product-images';
```

And add it to the page:

```tsx
{
  /* Images Column */
}
<div className='col-span-2'>
  <ProductImages images={product.images!} />
</div>;
```

Now you should see the images and be able to select one.
