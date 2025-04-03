# User Layout & Menu

Now that we can make payment on items, I want to have an order history page. Before we do that though, we will create a layout for the user pages. The user pages will be the order history and user profile.

## User Layout

Let's create the layout. Create a file at `app/user/layout.tsx` and add the following code:

```tsx
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import Menu from '@/components/shared/header/menu';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex flex-col'>
        <div className='border-b container mx-auto'>
          <div className='flex h-16 items-center px-4'>
            <Link href='/' className='w-22'>
              <Image
                src='/images/logo.svg'
                width={48}
                height={48}
                alt={`${APP_NAME} logo`}
              />
            </Link>
            {/* Main Nav Here */}
            <div className='ml-auto flex items-center space-x-4'>
              <Menu />
            </div>
          </div>
        </div>
        <div className='flex-1 space-y-4 p-8 pt-6 container mx-auto'>
          {children}
        </div>
      </div>
    </>
  );
}
```

So we have a customized version of the header. We have the user navigation on the left as with the other pages and we have a placeholder for the new user main menu. Which we will create soon.

## Orders Page Test

Now let's create the orders page so we can test the layout.

Create a file at `app/user/orders/page.tsx` and add the following code:

```tsx
const OrdersPage = () => {
  return <>Orders</>;
};

export default OrdersPage;
```

Since this page is in the user folder, it should use the layout. So go to the browser and navigate to `/user/orders`. You should see the orders page.

## User Main Nav

We are going to have a main menu for the user area (orders, profile). Create a new file at `app/user/main-nav.tsx` and make it a client component and add the following code:

```tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { cn } from '@/lib/utils';

const MainNav = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => {
  const pathname = usePathname();

  return <nav>Navigation</nav>;
};

export default MainNav;
```

We are importing the `usePathname` hook from `next/navigation` to get the current pathname. We are also importing the `cn` function from `@/lib/utils` to conditionally add classes to the navigation. We are also importing the `Link` component from `next/link` to create links. Finally, we're importing React from `react` because we are going to be using the `React.HTMLAttributes` type to define the props for the component. This way you can pass any of your standard attributes like class, id, style, etc to this component.

The component takes in a `className` prop that we can use to add classes to the navigation. We are also using the `...props` to pass through any other props that are passed to the component. So if you want to pass an `id` or another attribute to the navigation, you can do so.

Then we are just intializing the pathname variable to the `usePathname` hook.

Now let's add an array of links under the imports:

```tsx
const links = [
  {
    title: 'Profile',
    href: '/user/profile',
  },
  {
    title: 'Orders',
    href: '/user/orders',
  },
];
```

We have a link for the profile and orders page.

In the return, add the following code:

```tsx
return (
  <nav
    className={cn('flex items-center space-x-4 lg:space-x-6', className)}
    {...props}
  >
    {links.map((item) => (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname.includes(item.href) ? '' : 'text-muted-foreground'
        )}
      >
        {item.title}
      </Link>
    ))}
  </nav>
);
```

We are mapping over the `links` array and creating a link for each item. We are also using the `pathname` variable to conditionally add a class to the link. If the pathname includes the href of the link, we are adding an empty string to the class. Otherwise, we are adding the `text-muted-foreground` class.

## Add Menu To Layout

Now open the `app/user/layout.tsx` file and add the following below the closing `</Link>` tag where the comment is:

```tsx
<MainNav className='mx-6' />
```

Ne sure to import it:

```tsx
import MainNav from './main-nav';
```

Now you should see the links. Click on the orders link and you should see the orders page.

## Add Links To User Button

We need a way to get to this page from other areas. Open the `components/shared/header/user-button.tsx` file and add the following above the `<DropdownMenuItem>` for the sign out:

```tsx
<DropdownMenuItem>
  <Link className="w-full" href="/user/profile">
    User Profile
  </Link>
</DropdownMenuItem>
<DropdownMenuItem>
  <Link className='w-full' href='/user/orders'>
    Order History
  </Link>
</DropdownMenuItem>
```

You should see the link in the dropdown menu. Click on the order history link and you should be taken to the orders page.
