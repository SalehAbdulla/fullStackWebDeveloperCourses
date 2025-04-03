# Product Price Component

Next we will make the price look a bit better and create a component for it.

Create a file at `components/product/product-price.tsx` and add the following:

```tsx
import { cn } from '@/lib/utils';

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  // Ensures two decimal places
  const stringValue = value.toFixed(2); 
  // Split into integer and decimal parts
  const [intValue, floatValue] = stringValue.split('.'); 

  return (
    <p className={cn('text-2xl', className)}>
      <span className='text-xs align-super'>$</span>
      {intValue}
      <span className='text-xs align-super'>.{floatValue}</span>
    </p>
  );
};

export default ProductPrice;
```

This component will display the price of the product. It takes in the price as a number and converts it to a string. It then splits the string into the integer and decimal parts. It then displays the integer part with a `$` sign and the decimal part with a `.` in between.

It also takes an optional `className` prop that can be used to add additional classes to the component. The `cn` function is a utility function that will combine the class names and add the `text-2xl` class.

## Add `ProductPrice` to `ProductCard` component

Open the `components/product/product-card.tsx` file and replace the `<p>` with the price with the `ProductPrice` component.

```tsx
<ProductPrice value={Number(product.price)} />
```
