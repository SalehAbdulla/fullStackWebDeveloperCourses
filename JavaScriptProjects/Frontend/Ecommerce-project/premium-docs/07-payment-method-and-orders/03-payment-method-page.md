# Payment Method Page & Form

Just like with shipping, payment method will have a page and then a form embedded into it.

Create a new file at `app/(root)/payment-method/page.tsx` and add the following code:

```tsx
import { Metadata } from 'next';
import { auth } from '@/auth';
import { getUserById } from '@/lib/actions/user.actions';

export const metadata: Metadata = {
  title: 'Payment Method',
};

const PaymentMethodPage = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) {
    throw new Error('User ID not found');
  }

  const user = await getUserById(userId);

  return <>Payment Method Form</>;
};

export default PaymentMethodPage;
```

Now when you continue from the shipping page, you should see the text "Payment Method Form" on the screen.

## Payment Method Form

We need to create the payment method form. We will create the file and add some some imports and initialization but we'll add the actual form components in the next lesson.


Now create a file at `app/(root)/payment-method/payment-method-form.tsx` and add the following code:

```tsx
'use client';

import CheckoutSteps from '@/components/shared/checkout-steps';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { updateUserPaymentMethod } from '@/lib/actions/user.actions';
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from '@/lib/constants';
import { paymentMethodSchema } from '@/lib/validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const [isPending, startTransition] = useTransition();

  return (
    <>
      <CheckoutSteps current={2} />
    </>
  );
};

export default PaymentMethodForm;
```

We just have all the imports that we will need along with the `PaymentMethodForm` component which takes in a `preferredPaymentMethod` prop. This prop will be used to set the default value of the radio group. We are initializing the router and the toast hook. We are also initializing the form with the `paymentMethodSchema` and the default value of the radio group. We are also initializing the `isPending` state and the `startTransition` function.

Then we return the `CheckoutSteps` component.

Now let's bring it into the `PaymentMethodPage` component. Update the `PaymentMethodPage` component in `app/(root)/payment-method/page.tsx` to the following:

```tsx
import PaymentMethodForm from './payment-method-form';
```

In the return:

```tsx
return (
  <>
    <PaymentMethodForm preferredPaymentMethod={user.paymentMethod} />
  </>
);
```

You should now see the checkout steps if you click continue from the shipping page or go to /payment-method directly.

In the next lesson, we will add all the form components and handle the form submission.
