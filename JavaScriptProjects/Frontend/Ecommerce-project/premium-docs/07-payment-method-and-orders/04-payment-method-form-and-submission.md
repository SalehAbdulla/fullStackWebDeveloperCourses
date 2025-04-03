# Payment Method Form & Submission

We have our `PaymentMethodPage` and `PaymentMethodForm` components. However, we have yet to display the form and handle the form submission. That's what we'll do now.

In this form, we will use ShadCN radio buttons. So we need to install them. Open a terminal and run the following command:

```bash
npx shadcn@latest add radio-group
```

Open the `app/(root)/payment-method/payment-method-form.tsx` file and add the following code to the return:

```tsx
return (
  <>
    <CheckoutSteps current={2} />
    <div className='max-w-md mx-auto'>
      <Form {...form}>
        <form
          method='post'
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <h1 className='h2-bold mt-4'>Payment Method</h1>
          <p className='text-sm text-muted-foreground'>
            Please select your preferred payment method
          </p>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='type'
              render={({ field }) => (
                <FormItem className='space-y-3'>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      className='flex flex-col space-y-2'
                    >
                      {PAYMENT_METHODS.map((paymentMethod) => (
                        <FormItem
                          key={paymentMethod}
                          className='flex items-center space-x-3 space-y-0'
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={paymentMethod}
                              checked={field.value === paymentMethod}
                            />
                          </FormControl>
                          <FormLabel className='font-normal'>
                            {paymentMethod}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-2'>
            <Button type='submit' disabled={isPending}>
              {isPending ? (
                <Loader className='animate-spin w-4 h-4' />
              ) : (
                <ArrowRight className='w-4 h-4' />
              )}
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  </>
);
```

We are displaying the payment methods as radio buttons. We are also displaying the submit button. We are also disabling the submit button when the form is pending. We are also displaying the loader when the form is pending.

## Submit Handler

Let's add the following function above the return statement:

```tsx
async function onSubmit(values: z.infer<typeof paymentMethodSchema>) {
  startTransition(async () => {
    const res = await updateUserPaymentMethod(values);

    if (!res.success) {
      toast({
        variant: 'destructive',
        description: res.message,
      });

      return;
    }

    router.push('/place-order');
  });
}
```

We are using the `startTransition` function to wrap the async function. We are also using the `updateUserPaymentMethod` function to update the user's payment method. We are also checking if the response is successful. If it is not, we are displaying the error message. If it is, we are redirecting the user to the `place-order` page.

Now you should see the payment method form on the payment method page.

## Test Flow

So the way that we have it setup is you can add items to the cart as a guest and when you checkout you will be asked to log in. When you log in, you will be taken back to where you left off. Go ahead and try it by logging out and adding an item to the cart. Then go to the checkout page and log in. You should be taken back to the checkout process.
