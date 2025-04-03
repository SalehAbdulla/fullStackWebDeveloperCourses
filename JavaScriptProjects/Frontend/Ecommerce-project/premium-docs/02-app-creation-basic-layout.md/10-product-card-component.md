# Product Card Component

Now, let's display the products in a card. We will use the ShadCN card component.

Open the terminal and run the following command to install the ShadCN card component:

```bash
npx shadcn@latest add card
```

Create a new file at `components/shared/product/product-card.tsx` and add the following code:

```tsx
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

const ProductCard = ({ product }: { product: any }) => {
  return (
    <Card className='w-full max-w-sm'>
      <CardHeader className='p-0 items-center'>
        <Link href={`/product/${product.slug}`}>
          <Image
            priority={true}
            src={product.images![0]}
            alt={product.name}
            className='aspect-square object-cover rounded'
            height={300}
            width={300}
          />
        </Link>
      </CardHeader>
      <CardContent className='p-4 grid gap-4'>
          <div className='text-xs'>{product.brand}</div>
          <Link href={`/product/${product.slug}`}>
            <h2 className='text-sm font-medium'>{product.name}</h2>
          </Link>
        <div className='flex-between gap-4'>
          <p>{product.rating} stars</p>
          {product.stock > 0 ? (
            <p className='font-bold'>${product.price}</p>
          ) : (
            <p className='text-destructive'>Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
```

Now, let's use the component in the product list component. Open the `product-list.tsx` file and replace the code with the following:

```tsx
import ProductCard from './product-card';
```

```tsx
{
  data.map((product: any) => (
    <ProductCard key={product.slug} product={product} />
  ));
}
```

You should now see the product cards in the browser.
