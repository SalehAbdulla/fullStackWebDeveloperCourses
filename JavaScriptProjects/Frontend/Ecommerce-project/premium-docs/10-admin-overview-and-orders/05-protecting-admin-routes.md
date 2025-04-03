# Admin Route Guard

Right now, any user can access the admin screens by typing the URL in the browser. We need to add a route guard to protect the admin screens from unauthorized users.

Create a new file at `app/lib/auth-guard.ts` and add the following code:

```tsx
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export async function requireAdmin() {
  const session = await auth();

  if (session?.user?.role !== 'admin') {
    redirect('/unauthorized');
  }

  return session;
}
```

We are just checking if the user is an admin and redirecting to the unauthorized page if they are not.

## Create Unauthrorized Page

Now let's create the unauthorized page. Create a file at `app/unauthorized/page.tsx` and add the following:

```tsx
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Unauthorized Access',
};

export default function UnauthorizedPage() {
  return (
    <div className='container mx-auto flex h-[calc(100vh-200px)] flex-col items-center justify-center space-y-4'>
      <h1 className='h1-bold text-4xl'>Unauthorized Access</h1>
      <p className='text-muted-foreground'>
        You do not have permission to access this page.
      </p>
      <Button asChild>
        <Link href='/'>Return Home</Link>
      </Button>
    </div>
  );
}
```

## Protect Admin Routes

Now we need to bring in the `requireAdmin` function and use it to protect the admin routes. You may be tempted to use it in the admin layout rather than the individual pages, however, it isn't recommended. When you first go to the page it runs and renders the entire page but if you go to another admin page, you're essentially just fetching a server component and not getting a hard refresh with a new HTML page and the layout will not re-render.

So what we're going to do is use the `requireAdmin` function in each admin page to protect it. You just need to require it and call it at the top of the function.

Open `app/admin/overview/page.tsx` and add the following:

```tsx
import { requireAdmin } from '@/lib/auth-guard';
```

Then call the function at the top of the function:

```tsx
const AdminOverviewPage = async () => {
  await requireAdmin();
  // ...
};
```

You want to do the same forall admin pages. I know you may have not created these pages yet, however I had to go back and add this lesson, so just be sure to call `requireAdmin` at the top of the function for the following pages when you create them:

- `app/admin/users/page.tsx`
- `app/admin/users/[id]/page.tsx`
- `app/admin/products/page.tsx`
- `app/admin/products/[id]/page.tsx`
- `app/admin/products/create/page.tsx`
- `app/admin/orders/page.tsx`
- `app/admin/overview/page.tsx`
