# Admin Search Form

Now we are going to make the search bar in the admin area work. It will search products on the products page, orders on the orders and users on the users page.

Let's create a new file at `components/admin/admin-search.tsx` and add the following code:

```tsx
'use client';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname } from 'next/navigation';

const AdminSearch = () => {
  const pathname = usePathname();
  const formActionUrl = pathname.includes('/admin/orders')
    ? '/admin/orders'
    : pathname.includes('/admin/users')
    ? '/admin/users'
    : '/admin/products';

  const searchParams = useSearchParams();
  const [queryValue, setQueryValue] = useState(searchParams.get('query') || '');

  useEffect(() => {
    setQueryValue(searchParams.get('query') || '');
  }, [searchParams]);

  return (
    <form action={formActionUrl} method='GET'>
      <Input
        type='search'
        placeholder='Search...'
        name='query'
        value={queryValue}
        onChange={(e) => setQueryValue(e.target.value)}
        className='md:w-[100px] lg:w-[300px]'
      />
      <button type='submit' className='sr-only'>
        Search
      </button>
    </form>
  );
};

export default AdminSearch;
```

I added `sr-only` to the button, which will make it only visible to screen readers. So we hit `enter` to submit the form.

We are getting the path name and the form action url. Then we set the `queryValue` to the `query` value in the URL. When we type in the search, we set that value to whatever is typed. When we submit, we submit to `formActionUrl`, which could be either `admin/orders`, `admin/products` or `admin/users`.

## Add Form To Layout

Now let's add the form to the admin layout. Open the `app/admin/layout.tsx` file and add the following import:

```tsx
import AdminSearch from '@/components/shared/admin/admin-search';
```

Replace the `Input` with the component:

```tsx
<div className='ml-auto flex items-center space-x-4'>
  <AdminSearch />
  <Menu />
</div>
```

Remove the import for the `Input` as you do not need it anymore.

## Products Remove Filter

If you go to `/admin/products` it will already work because we already implemented this in the `getAllProducts` action.

Let's add an option to remove the filter. Open the `app/admin/products/page.tsx` and replace the `h1` heading with the following:

```tsx
<div className='flex items-center gap-3'>
  <h1 className='h2-bold'>Products</h1>
  {searchText && (
    <div>
      Filtered by <i>&quot;{searchText}&quot;</i>{' '}
      <Link href={`/admin/products`}>
        <Button variant='outline' size='sm'>
          Remove Filter
        </Button>
      </Link>
    </div>
  )}
</div>
```

Now you can remove the filter.

Now we want it to work with orders and users.
