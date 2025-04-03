# Is-Featured and Banner Image

Now that we can add products, I want to add a new field that will allow us to mark a product as featured and add a banner image. I will add a download of the banner images with this lesson. You can also get them from the public image folder or the repository.

We will have a checkbox to mark a product as featured and if it is checked, it will display an image upload for the banner.

Go into the `lib/validators.ts` file and make sure you uncomment the `isFeatured` and `banner` fields:

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
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
```

Open the `components/shared/admin/product-form.tsx` file and add the following above the return statement:

```tsx
const isFeatured = form.watch('isFeatured');
const banner = form.watch('banner');
```

Go to where you have the "isFeatured" comment. It should be below the image and above the description.

Add the following `div` element:

```tsx
<div className='upload-field'>
  Featured Product
  <Card>
    <CardContent className='space-y-2 mt-2  '>
      <FormField
        control={form.control}
        name='isFeatured'
        render={({ field }) => (
          <FormItem className='space-x-2 items-center'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <FormLabel>Is Featured?</FormLabel>
          </FormItem>
        )}
      />
      {isFeatured && banner && (
        <Image
          src={banner}
          alt='banner image'
          className=' w-full object-cover object-center rounded-sm'
          width={1920}
          height={680}
        />
      )}
      {isFeatured && !banner && (
        <UploadButton
          endpoint='imageUploader'
          onClientUploadComplete={(res: { url: string }[]) => {
            form.setValue('banner', res[0].url);
          }}
          onUploadError={(error: Error) => {
            toast({
              variant: 'destructive',
              description: `ERROR! ${error.message}`,
            });
          }}
        />
      )}
    </CardContent>
  </Card>
</div>
```

We are using the `watch` method to get the value of the `isFeatured` and `banner` fields. We are also using the `UploadButton` component from the `uploadthing` package to upload the banner image.

Now you should have the option to set a product to featured ans add a banner. You can test it out by creating a featrued product and a banner. In the next lesson, we will be able to update products.