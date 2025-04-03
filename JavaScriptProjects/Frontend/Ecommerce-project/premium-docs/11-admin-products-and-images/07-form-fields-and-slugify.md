# Create Product Page

Now let's work on the page and UI to create a new product.

## Slugify

We are going to have slugs for the product which are a URL-friendly version of the product name. We're going to use a package called `slugify` that will convert names to slugs.

Install the package with the following command:

```bash
npm install slugify
```

## Name & Slug Fields

In the first div, we will have the name and the slug:

```tsx
<div className='flex flex-col gap-5 md:flex-row'>
  {/* Name */}
  <FormField
    control={form.control}
    name='name'
    render={({
      field,
    }: {
      field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'name'>;
    }) => (
      <FormItem className='w-full'>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input placeholder='Enter product name' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  {/* Slug */}
  <FormField
    control={form.control}
    name='slug'
    render={({
      field,
    }: {
      field: ControllerRenderProps<z.infer<typeof insertProductSchema>, 'slug'>;
    }) => (
      <FormItem className='w-full'>
        <FormLabel>Slug</FormLabel>
        <FormControl>
          <div className='relative'>
            <Input
              placeholder='Enter product slug'
              className='pl-8'
              {...field}
            />
            {/* Generate Button */}
          </div>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>
```

Let's add the button to generate the slug:

```tsx
<button
  type='button'
  className='bg-gray-500 text-white px-4 py-1 mt-2 hover:bg-gray-600'
  onClick={() => {
    form.setValue('slug', slugify(form.getValues('name'), { lower: true }));
  }}
>
  Generate
</button>
```

We are using the `slugify` library to generate the slug from the name. We are using the `form.getValues` method to get the value of the name field. We are using the `form.setValue` method to set the value of the slug field.

## Category & Brand Fields

Lat's add the next set of fields:

```tsx
<div className='flex flex-col gap-5 md:flex-row'>
  {/* Category */}
  <FormField
    control={form.control}
    name='category'
    render={({
      field,
    }: {
      field: ControllerRenderProps<
        z.infer<typeof insertProductSchema>,
        'category'
      >;
    }) => (
      <FormItem className='w-full'>
        <FormLabel>Category</FormLabel>
        <FormControl>
          <Input placeholder='Enter category' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  {/* Brand */}
  <FormField
    control={form.control}
    name='brand'
    render={({
      field,
    }: {
      field: ControllerRenderProps<
        z.infer<typeof insertProductSchema>,
        'brand'
      >;
    }) => (
      <FormItem className='w-full'>
        <FormLabel>Brand</FormLabel>
        <FormControl>
          <Input placeholder='Enter product brand' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>
```

## Price & Stock Fields

Now, let's add the price and stock fields:

```tsx
<div className='flex flex-col gap-5 md:flex-row'>
  {/* Price */}
  <FormField
    control={form.control}
    name='price'
    render={({
      field,
    }: {
      field: ControllerRenderProps<
        z.infer<typeof insertProductSchema>,
        'price'
      >;
    }) => (
      <FormItem className='w-full'>
        <FormLabel>Price</FormLabel>
        <FormControl>
          <Input placeholder='Enter product price' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  {/* Stock */}
  <FormField
    control={form.control}
    name='stock'
    render={({
      field,
    }: {
      field: ControllerRenderProps<
        z.infer<typeof insertProductSchema>,
        'stock'
      >;
    }) => (
      <FormItem className='w-full'>
        <FormLabel>Stock</FormLabel>
        <FormControl>
          <Input type='number' placeholder='Enter product stock' {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</div>
```

## Description Field

We are going to skip the image field for now and add the description and the submit button.

We need to install the ShadCN Textarea component. In your terminal, enter the following command:

```bash
npx shadcn@latest add textarea
```

Add the following for the description:

```tsx
<div>
          {/* Description */}
          <FormField
            control={form.control}
            name='description'
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof insertProductSchema>,
                'description'
              >;
            }) => (
              <FormItem className='w-full'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Enter product description'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
```

Now add the submit button:

```tsx

```

Alright, now that we added the form fields, in the next lesson, we will add the submit handler.

