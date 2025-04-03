# Checkout Steps Component

We are gong to create a component for the checkout steps. This will keep track of where we are in the process.

Create a new file at `components/shared/checkout-steps.tsx` and add the following:

```tsx
import React from 'react';

import { cn } from '@/lib/utils';

const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div className='flex-between  flex-col md:flex-row  space-x-2 space-y-2 mb-10'>
      {['User Login', 'Shipping Address', 'Payment Method', 'Place Order'].map(
        (step, index) => (
          <React.Fragment key={step}>
            <div
              className={cn(
                'p-2 w-56 rounded-full text-center  text-sm',
                index === current ? 'bg-secondary' : ''
              )}
            >
              {step}
            </div>
            {step !== 'Place Order' && (
              <hr className='w-16 border-t border-gray-300 mx-2' />
            )}
          </React.Fragment>
        )
      )}
    </div>
  );
};
export default CheckoutSteps;
```

The steps are as follows:

- User Login
- Shipping Address
- Payment Method
- Place Order

This component takes in a `current` prop which is the current step. It will display the steps and highlight the current step. We are using the `cn` function from the `lib/utils.ts` file to conditionally add the `bg-secondary` class to the step.

We are mapping over the steps and rendering them. We are using a React Fragment to wrap each step and the horizontal line. A fragment is just a way to group elements without adding extra nodes to the DOM. You could just as well use a div, but it's a bit cleaner.

## Display In Shipping Form

Now let's bring the steps into the shipping form. Open the `app/(root)/shipping-address/shipping-address-form.tsx` file and add the following import:

```tsx
import CheckoutSteps from '@/components/shared/checkout-steps';
```

In the return statement, add the following just under the opening fragment (<>):

```tsx
<CheckoutSteps current={1} />
```

You should see the steps with the shipping page step highlighted.

Let's continue on to the payment method page.
