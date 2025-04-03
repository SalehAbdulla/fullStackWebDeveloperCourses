# Icon Boxes Component

We are going to add a very simple static component for display that will show some common ecommerce website feature boxes. Free shipping, customer support, etc.

Let's create a new file at `components/icon-boxes.tsx` and add the following code:

```tsx
import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react';

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className='grid gap-4 md:grid-cols-4 p-4 '>
          <div className='space-y-2'>
            <ShoppingBag />
            <div className='text-sm font-bold'>Free Shipping</div>
            <div className='text-sm text-muted-foreground'>
              Free shipping for order above $100
            </div>
          </div>
          <div className='space-y-2'>
            <DollarSign />
            <div className='text-sm font-bold'>Money Back Guarantee</div>
            <div className='text-sm text-muted-foreground'>
              Within 30 days for an exchange
            </div>
          </div>
          <div className='space-y-2'>
            <WalletCards />
            <div className='text-sm font-bold'>Flexible Payment</div>
            <div className='text-sm text-muted-foreground'>
              Pay with credit card, PayPal or COD
            </div>
          </div>
          <div className='space-y-2'>
            <Headset />
            <div className='text-sm font-bold'>24/7 Support</div>
            <div className='text-sm text-muted-foreground'>
              Get support at any time
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default IconBoxes;
```

We just have some icons and text here. Let's import this component into the homepage and render it.

Open the `app/(root)/page.tsx` file and import the `IconBoxes` component:

```tsx
import IconBoxes from '@/components/icon-boxes';
```

Now, add it below the `IconBoxes` component:

```tsx
<IconBoxes />
```
