# Admin Menu & Layout

Now we are going to get into the admin area functionality. Let's start with the admin menu and layout.

Create a new file at `app/admin/layout.tsx` and add the following code:

```tsx
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import Menu from '@/components/shared/header/menu';

export default async function AdminLayout({
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
            {/* MAIN NAV HERE */}
            <div className='ml-auto flex items-center space-x-4'>
              <div>
                <Input
                  type='search'
                  placeholder='Search...'
                  className='md:w-[100px] lg:w-[300px]'
                />
              </div>
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

This is very similar to the user layout. There are just different links and a search input. This layout will apply to any pages that are under the `/admin` route.

Let's create the admin overview page. Create a new file at `app/admin/overview/page.tsx` and add the following code for now:

```tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
};

const AdminDashboardPage = () => {
  return <>Dashboard</>;
};

export default AdminDashboardPage;
```

Now go to `http://localhost:3000/admin/overview` and you should see the dashboard text.

## Add Menu Item To User Button

We need a way to get here. Let's open the `components/shared/header/user-button.tsx` file and add the following code right above the `<DropdownMenuItem>` for the sign out:

```tsx
{
  session.user.role === 'admin' && (
    <DropdownMenuItem>
      <Link className='w-full' href='/admin/overview'>
        Admin
      </Link>
    </DropdownMenuItem>
  );
}
```

We are showing the link only if the logged in user is an admin. If you have been following along and are logged in with the `admin@example.com` email you should see it. If not, change the role value of whatever user you are logged in with to `admin`.

## Add `role` to Next Auth User Type

Right now, this will throw a TypeScript error because by default the Next Auth session user type only has a name, email and id. If you want to extend it, we need to create a new file in the `types` folder at `types/next-auth.d.ts`. The `d` is because it's a TypeScript definitions file.

```ts
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}

```

This tells TypeScript that the User object (and therefore session.user) includes the role property.

using `declare module` augments existing types without changing the original module, ensuring compatibility with updates to the module.

When you want to extend the session object with custom fields (like role), using DefaultSession ensures that you start with the base structure and build upon it. This avoids overwriting the existing properties.

## Admin Main Menu

Now we will create the main menu for the admin area just like we did with the user area. Create a file at `app/admin/main-nav.tsx` and add the following code:

```tsx
'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  {
    title: 'Overview',
    href: '/admin/overview',
  },
  {
    title: 'Products',
    href: '/admin/products',
  },
  {
    title: 'Orders',
    href: '/admin/orders',
  },
  {
    title: 'Users',
    href: '/admin/users',
  },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

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
}
```

This is very similar to the user main nav. We are just using a different set of links.
Now we need to add the main nav to the layout. Open the `app/admin/layout.tsx` file and import the `MainNav` component and replace the comment:

```tsx
import MainNav from './main-nav';

<MainNav className='mx-6' />;
```

Now you should see all of the links in the main nav.
