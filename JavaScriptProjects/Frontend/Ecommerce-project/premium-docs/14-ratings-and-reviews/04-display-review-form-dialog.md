# Display Review Form Dialog

I want to start on the review form before we actually try and fetch and display them because we need to actually have some reviews. So create a new file at `app/(root)/product/[slug]/review-form.tsx` and add the following code:

```tsx
'use client';

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string;
  productId: string;
  onReviewSubmitted?: () => void;
}) => {
  return <>REVIEW FORM</>;
};

export default ReviewForm;
```

This component will be used to create a new review for the product. It will take in the `userId`, `productId` and a callback function to call when the review is submitted.
I made the callback function optional for now because we are not going to add it yet.

Let's add this to the review list component. Open the `app/(root)/product/[slug]/review-list.tsx` file and import the following:

```tsx
import ReviewForm from './review-form';
```

Now replace the comment with the component:

```tsx
<ReviewForm userId={userId} productId={productId} />
```

You should see the text from the review form component.

Now we will add a bunch of imports to the top of the file:

```tsx
'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import {
  createUpdateReview,
  getReviewByProductId,
} from '@/lib/actions/review.actions';
import { reviewFormDefaultValues } from '@/lib/constants';
import { insertReviewSchema } from '@/lib/validator';
import { z } from 'zod';
import { StarIcon } from 'lucide-react';
import { reviewFormDefaultValues } from '@/lib/constants';

type CustomerReview = z.infer<typeof insertReviewSchema>;
```

We have a bunch of ShadCN components, hooks, icons, zod schema, etc.

Let's add some code above the return:

```tsx
const [open, setOpen] = useState(false);

const { toast } = useToast();

const form = useForm<CustomerReview>({
  resolver: zodResolver(insertReviewSchema),
  defaultValues: reviewFormDefaultValues,
});
```

We are setting a state for the dialog to be open or closed. We are also getting the toast from the `useToast` hook. We are also creating a form with the `useForm` hook. We are also setting the resolver to the `insertReviewSchema` schema and the default values to the `reviewFormDefaultValues` constant.

Now let's create the dialog in the return:

```tsx
return (
  <Dialog open={open} onOpenChange={setOpen}>
    <Button onClick={handleOpenForm} variant='default'>
      Write a review
    </Button>
    <DialogContent className='sm:max-w-[425px]'>
      <Form {...form}>
        <form method='post'>
          <DialogHeader>
            <DialogTitle>Write a review</DialogTitle>
            <DialogDescription>
              Share your thoughts with other customers
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Enter description' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='rating'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a rating' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Array.from({ length: 5 }).map((_, index) => (
                        <SelectItem key={index} value={(index + 1).toString()}>
                          {index + 1} <StarIcon className='inline h-4 w-4' />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type='submit'
              size='lg'
              className='w-full'
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  </Dialog>
);
```

We have a title, description, rating, and a submit button. We are using a mix of ShadCN and React Hook Form components to create the form.

When you click the button, the dialog will open. In the next lesson, we will start to add the logic to submit the form.
