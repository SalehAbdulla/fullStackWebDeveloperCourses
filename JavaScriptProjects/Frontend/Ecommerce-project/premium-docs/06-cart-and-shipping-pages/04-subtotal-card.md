# Subtotal Card & Format Currency

We are going to add the subtotal to our cart page and create a utility function to format the currency.

Open the file `lib/utils.ts` and add the following code below the other functions:

```ts
const CURRENCY_FORMATTER = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  style: 'currency',
  minimumFractionDigits: 2,
});
```

This is a currency formatter. `Intl.NumberFormat` is a built-in JavaScript object that provides language-sensitive number formatting and makes it easy to format numbers as currency, percentages, or general numbers based on locale. We are using the `en-US` locale and formatting the currency as USD. We are also setting the minimum number of fractional digits to 2.

Now let's create the function below it:

```ts
// Format currency
export function formatCurrency(amount: number | string | null) {
  if (typeof amount === 'number') {
    return CURRENCY_FORMATTER.format(amount);
  } else if (typeof amount === 'string') {
    return CURRENCY_FORMATTER.format(Number(amount));
  } else {
    return 'NaN';
  }
}
```

This function takes in a number or string and returns a formatted currency string. If the input is a number, it formats it using the `CURRENCY_FORMATTER`. If the input is a string, it converts it to a number and then formats it. If the input is not a number or string, it returns 'NaN', which is not a number.

Now, let's go back into the `CartTable` component and bring in the `formatCurrency` function:

```tsx
import { formatCurrency } from '@/lib/utils';
```

Now, let's go right above the last closing `</div>` and add the following:

```tsx
<Card>
  <CardContent className='p-4 gap-4'>
    <div className='pb-3 text-xl'>
      Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
      <span className='font-bold'> {formatCurrency(cart.itemsPrice)}</span>
    </div>
  </CardContent>
</Card>
```

We are using the `Card` component to display the subtotal. We get the subtotal by summing the quantity of each item in the cart by using the `reduce` method. We are also formatting the currency using the `formatCurrency` function.

## Proceed To Checkout Button

Now let's add the button to proceed to checkout. Make the `Card` component look like this:

```tsx
<Card>
  <CardContent className='p-4   gap-4'>
    <div className='pb-3 text-xl'>
      Subtotal ({cart.items.reduce((a, c) => a + c.qty, 0)}):
      {formatCurrency(cart.itemsPrice)}
    </div>
    <Button
      onClick={() => startTransition(() => router.push('/shipping-address'))}
      className='w-full'
      disabled={isPending}
    >
      {isPending ? (
        <Loader className='animate-spin w-4 h-4' />
      ) : (
        <ArrowRight className='w-4 h-4' />
      )}
      Proceed to Checkout
    </Button>
  </CardContent>
</Card>
```

The button is disabled when the request is pending and the loader is shown when it is not. When the button is clicked, it will navigate to the `/shipping-address` page.
