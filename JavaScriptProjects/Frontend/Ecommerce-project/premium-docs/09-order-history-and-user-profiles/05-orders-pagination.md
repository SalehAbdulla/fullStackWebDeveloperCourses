# Orders Pagination

Now we will add the pagination to the orders. We already have a PAGE_SIZE constant in the `constants.js` file. I have it set to 2. So I am going to go through the app and make sure I have at least 3 orders. You should do the same.

## Pagination Component

We are going to create a pagination component. Create a file at `components/shared/pagination.tsx` and add the following code:

```tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '../ui/button';

type PaginationProps = {
  page: number | string;
  totalPages: number;
  urlParamName?: string;
};
const Pagination = ({ page, totalPages, urlParamName }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className='flex gap-2'>
      <Button
        size='lg'
        variant='outline'
        className='w-28'
        disabled={Number(page) <= 1}
      >
        Previous
      </Button>
      <Button
        size='lg'
        variant='outline'
        className='w-28'
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
```

We are going to use the `useRouter` and `useSearchParams` hooks from Next.js. We are going to pass in the `page`, `totalPages`, and `urlParamName` props. We are going to use the `useRouter` hook to get the router object. We are going to use the `useSearchParams` hook to get the search params object.

Then we return a div with two buttons. The first button is disabled if the page is less than or equal to 1. The second button is disabled if the page is greater than or equal to the total pages.

Before we add the rest of the functionality, let's add the component to the orders page.

Open the `app/user/orders/page.tsx` file and import the pagination component:

```tsx
import Pagination from '@/components/shared/pagination';
```

Now under the closing `</Table>` element, add the following code:

```tsx
{
  orders.totalPages > 1 && (
    <Pagination page={Number(page) || 1} totalPages={orders?.totalPages} />
  );
}
```

We are checking to see if there are more than 1 page of orders. If there are, we are going to render the pagination component. We are going to pass in the `page` and `totalPages`.

You should now see 2 orders and the buttons on the orders page. Right now, clicking the buttons will not do anything. We will add that functionality now.

## Pagination Functionality

Add the following click handler above the return statement:

```tsx
// Handle Page Change
const onClick = (btnType: string) => {
  const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;
  console.log(pageValue);
};
```

This function takes in a `btnType` parameter. If the `btnType` is `next`, we increment the page number by 1. If the `btnType` is `prev`, we decrement the page number by 1. We then log the new page number to the console.

Add the handler to the buttons:

```tsx
return (
  <div className='flex gap-2'>
    <Button
      size='lg'
      variant='outline'
      className='w-28'
      onClick={() => onClick('prev')}
      disabled={Number(page) <= 1}
    >
      Previous
    </Button>
    <Button
      size='lg'
      variant='outline'
      className='w-28'
      onClick={() => onClick('next')}
      disabled={Number(page) >= totalPages}
    >
      Next
    </Button>
  </div>
);
```

Click on the next button and you should see the page number in the console.

We need to build the URL to navigate to. To keep this clean, I'm going to create a utility function for this. We're also going to use the `query-string` package to build the URL. This package is used to parse and stringify query strings.

Open your terminal and type the following command:

```bash
npm install query-string
```

Open the `lib/utils.ts` file and add the following import:

```tsx
import qs from 'query-string';
```

Now add the following function to the file:

```tsx
// Form Pagination Links
export function formUrlQuery({
  params,
  key,
  value,
}: {
  params: string;
  key: string;
  value: string | null;
}) {
  const query = qs.parse(params);

  query[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query,
    },
    { skipNull: true }
  );
}
```

This function takes in 3 parameters:

- params: a string representing the current URL’s query parameters. For instance, if we have the URL `https://example.com?page=1&limit=10`, the params would be `page=1&limit=10`.
- key: a string representing the key to be updated in the query parameters. For instance, if we want to update the `page` parameter, the key would be `page`. That's what it will be by default.
- value: a string representing the new value to be set for the key. For instance, if we want to update the `page` parameter to `2`, the value would be `2`.

The function first parses the current URL's query parameters using `qs.parse(params)`. It then updates the specified key with the new value. Finally, it uses `qs.stringifyUrl` to build the new URL with the updated query parameters.

The skipNull option in qs.stringifyUrl (from the qs library) ensures that query parameters with null values are omitted from the generated URL string.

Now bring the function into the `components/shared/pagination.tsx` file and add the following import:

```tsx
import { formUrlQuery } from '@/lib/utils';
```

In the `onClick` function, add the following code:

```tsx
// Handle Page Change
const onClick = (btnType: string) => {
  const pageValue = btnType === 'next' ? Number(page) + 1 : Number(page) - 1;

  const newUrl = formUrlQuery({
    params: searchParams.toString(),
    key: urlParamName || 'page',
    value: pageValue.toString(),
  });

  router.push(newUrl, { scroll: false });
};
```

This will build the URL with the new page number. Then we are just pushing the new URL to the router.

You should now be able to click the next and previous buttons and see the page number change and see the correct orders.

Now let's change the `PAGE_SIZE` constant to 10 in the `lib/constants/index.ts` file. Now you won't see the pagination until there are at least 11 orders.
