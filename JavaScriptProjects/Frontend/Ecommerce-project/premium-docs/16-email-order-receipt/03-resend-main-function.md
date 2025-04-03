# Resend Main Function

We need to now create our email template for the purchase receipt, but first, we need to setup the main function that sends the email. We will use the `resend` for this and the `react-email` packages to create our email template.

If you go to this link: [https://www.npmjs.com/package/resend](https://www.npmjs.com/package/resend) you will see how to use the `resend` package to send emails. We simply import the `resend` package and then call the `resend.emails.send` method with the properties of `to`, `from`, `subject`, etc. Since we are using React, we can set a property called `react` and pass in our email template.

So let's create a new file in the root of our project at `email/index.tsx`. Don't add it to the `app` folder because we don't want it to be a page.

Add the following code for now:

```tsx
import { Resend } from 'resend';
import { SENDER_EMAIL, APP_NAME } from '@/lib/constants';
import { Order } from '@/types';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: Order }) => {
  await resend.emails.send({
    from: `${APP_NAME} <${SENDER_EMAIL}>`,
    to: order.user.email,
    subject: `Order Confirmation ${order.id}`,
    react: <>EMAIL COMPONENT</>,
  });
};
```

We are just creating a new instance of the `Resend` class and calling the `emails.send` method. We are passing in the properties of `from`, `to`, `subject`, and `react`. The `react` property is where we will pass in our email template.

NOTE: While in development, you can only send emails to your own email address so just make sure when you test, you create a prostore account with the same email address that you used to register for Resend.

Let's create a file at `email/purchase-receipt.tsx`. This is where we will create our email template.

Add the following imports and type:

```tsx
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { formatCurrency } from '@/lib/utils';
import { Order } from '@/types';
import sampleData from '@/db/sample-data';
require('dotenv').config();

type OrderInformationProps = {
  order: Order;
};

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

export default function PurchaseReceiptEmail({ order }: {order: Order}) {
  return (
    <Html>

    </Html>
}
```

We are bringing in a bunch of components from the `@react-email/components` package. We are also bringing in the `formatCurrency` function from our `lib/utils` file. We are also bringing in the `Order` type from our `types` file. We are also bringing in the `sampleData` object from our `db/sample-data` file. This is because I'm going to use sample data to preview the email.

Since we are using environment variables outside of the main app folder, we need to require the `dotenv` package and call the `config` method.

We also create a `dateFormatter` object to format the date.


## Apply the Email Template

Now back in the `email/index.tsx` file, we need to apply the `PurchaseReceiptEmail` component to the `send` function.

Import it like this:

```tsx
import PurchaseReceiptEmail from './purchase-receipt';
```

Then pass it into the `react` property with the order as a prop:

```tsx
await resend.emails.send({
  from: `${APP_NAME} <${SENDER_EMAIL}>`,
  to: order.user.email,
  subject: `Order Confirmation ${order.id}`,
  react: <PurchaseReceiptEmail order={order} />, 👈 Add this line
});
```

In the next lesson, we will create the template with React Email.
