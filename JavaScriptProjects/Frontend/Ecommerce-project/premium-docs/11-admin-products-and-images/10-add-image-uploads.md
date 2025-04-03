# Add Image Uploads

A couple lessons ago, we commented out some fields in the `lib/validators.ts` file in the `insertProductSchema`. We want to uncomment the `images` field so that we can upload images to our products.

So it should look like this:

```ts
// Schema for inserting a product
export const insertProductSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  slug: z.string().min(3, 'Name must be at least 3 characters'),
  category: z.string().min(3, 'Name must be at least 3 characters'),
  brand: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(3, 'Name must be at least 3 characters'),
  stock: z.coerce.number(),
  images: z.array(z.string()).min(1, 'Product must have at least one image'),
  // isFeatured: z.boolean(),
  // banner: z.string().nullable(),
  price: currency,
});
```

Now let's open the `components/shared/admin/product-form.tsx` file and add the image field. We also want to preview the image.

Import the `UploadButton` component from the file we created earlier:

```tsx
import { UploadButton } from '@/lib/uploadthing';
```

Right above the return statement, add the following:

```tsx
const images = form.watch('images');
```

This will allow us to access the images array from the form.

Replace the image comment in the return statement with the following:

```tsx
<FormField
  control={form.control}
  name='images'
  render={() => (
    <FormItem className='w-full'>
      <FormLabel>Images</FormLabel>
      <Card>
        <CardContent className='space-y-2 mt-2 min-h-48'>
          <div className='flex-start space-x-2'>
            {images.map((image: string) => (
              <Image
                key={image}
                src={image}
                alt='product image'
                className='w-20 h-20 object-cover object-center rounded-sm'
                width={100}
                height={100}
              />
            ))}
            <FormControl>
              <UploadButton
                endpoint='imageUploader'
                onClientUploadComplete={(res: { url: string }[]) => {
                  form.setValue('images', [...images, res[0].url]);
                }}
                onUploadError={(error: Error) => {
                  toast({
                    variant: 'destructive',
                    description: `ERROR! ${error.message}`,
                  });
                }}
              />
            </FormControl>
          </div>
        </CardContent>
      </Card>
      <FormMessage />
    </FormItem>
  )}
/>
```

We created an area for the uploaded images to be displayed. We map over the images and display them. We also added a button to upload images using the `UploadButton` component. We also added a `onClientUploadComplete` function that will be called when the upload is complete. When the upload is complete, we will add the new image to the images array to be sent to the database. On error, we will show a toast message.

You may notice that you can't see the "Choose File" text. This is why I added the custom class of `upload-field` to the div.

Open your `assets/styles/globals.css` file and add the following:

```css
/* Uploadthing button text override*/
html.dark .upload-field .text-white {
  color: #ffffff !important;
}

.upload-field .text-white {
  color: #000 !important;
}
```

That should fix the issue.

Now try adding a new product and uploading an image. You should see the image in the preview area.