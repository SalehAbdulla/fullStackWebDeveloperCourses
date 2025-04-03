# ShadCN Table

We will use the table component from ShadCN too display the cart items. We need to install it first:

```bash
npx shadcn@latest add table
```

Then we can use it in the `CartTable` component. Let's add the following imports for the card, button and all the table elements:

```tsx
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
```

Let's start with the headers. Add the following to the return:

```tsx
<div className='grid md:grid-cols-4 md:gap-5'>
  <div className='overflow-x-auto md:col-span-3'>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item</TableHead>
          <TableHead className='text-center'>Quantity</TableHead>
          <TableHead className='text-right'>Price</TableHead>
        </TableRow>
      </TableHeader>
    </Table>
  </div>
</div>
```

## Image & Name Cell

Now let's add the table body and map over the cart items. We will add the first table cell, which will be the item image and name:

```tsx
<TableBody>
  {cart.items.map((item) => (
    <TableRow key={item.slug}>
      <TableCell>
        <Link href={`/product/${item.slug}`} className='flex items-center'>
          <Image
            src={item.image}
            alt={item.name}
            width={50}
            height={50}
          ></Image>
          <span className='px-2'>{item.name}</span>
        </Link>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
```

Be sure you have the sample images in the `public/images/sample-products` folder.

## Quantity & Add/Remove Cell

The next cell will be the quantity and the add/remove buttons. We will add the following to the table body:

```tsx
<TableCell className='flex-center gap-2'>
  <Button
    disabled={isPending}
    variant='outline'
    type='button'
    onClick={() =>
      startTransition(async () => {
        const res = await removeItemFromCart(item.productId);
        if (!res.success) {
          toast({
            variant: 'destructive',
            description: res.message,
          });
        }
      })
    }
  >
    {isPending ? (
      <Loader className='w-4 h-4  animate-spin' />
    ) : (
      <Minus className='w-4 h-4' />
    )}
  </Button>
  <span>{item.qty}</span>
  <Button
    disabled={isPending}
    variant='outline'
    type='button'
    onClick={() =>
      startTransition(async () => {
        const res = await addItemToCart(item);
        if (!res.success) {
          toast({
            variant: 'destructive',
            description: res.message,
          });
        }
      })
    }
  >
    {isPending ? (
      <Loader className='w-4 h-4  animate-spin' />
    ) : (
      <Plus className='w-4 h-4' />
    )}
  </Button>
</TableCell>
```

We are doing the same thing that we did with the add to cart component. We are showing the loader when the request is pending and the button when it is not. We have the plus and minus buttons to add and remove items from the cart.

## Price Cell

Lastly, we will add the price cell. We will add the following to the table body:

```tsx
<TableCell className='text-right'>${item.price}</TableCell>
```

In the next lesson, we will have a card that shows the total. We are also going to create a custom function to format the currency.
