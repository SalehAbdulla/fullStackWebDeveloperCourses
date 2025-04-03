# User Button & Sign Out

Now that the sign in is working, we need to change the header up a bit. We will add a user button component with the user initial and a dropdown with the sign out button.

Create a new file at `components/shared/header/user-button.tsx` and add the following code for now:

```ts
import Link from 'next/link';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SignOutUser } from '@/lib/actions/user.actions';

const UserButton = async () => {
  return <div>User Button</div>;
};

export default UserButton;
```

We are bringing in a bunch of UI components as well as the `SignOutUser` action from the `user.actions` file and the auth object from the `auth.ts` file.

Then we have an async function that will return a div with the text `User Button`. Make sure you make the function async.

Let's bring it into the `components/shared/header/menu.tsx` file:

```tsx
import UserButton from './user-button';
```

We want to put this in two places. In the regular menu and the sheet menu. Let's start with the regular menu. Replace the current sign in button with the user button:

```tsx
<nav className='md:flex hidden w-full max-w-xs gap-1'>
  <ModeToggle />
  <Button asChild variant='ghost'>
    <Link href='/cart'>
      <ShoppingCart />
      Cart
    </Link>
  </Button>
  <UserButton /> 👈 Add this line
</nav>
```

Now add it to the sheet menu right under the cart button:

```tsx
<SheetContent className='flex flex-col items-start'>
  <ModeToggle />
  <Button asChild variant='ghost'>
    <Link href='/cart'>
      <ShoppingCart />
      Cart
    </Link>
  </Button>
  <UserButton /> 👈 Add this line
</SheetContent>
```

Now you should see the text "User Button" in the header.

At the top of the function, we want to check for the session and show the sign in if there is not one:

```tsx
const UserButton = async () => {
  const session = await auth();
  if (!session)
    return (
      <Link href='/api/auth/signin'>
        <Button>Sign In</Button>
      </Link>
    );

  return <div>User Button</div>;
};
```

You can log out by deleting the cookie and you should see the sign in button. Test it and then log back in.

Now we need to show the user's initial and a dropdown with the sign out button.

Add the following between the return statements to get the user name initial:

```tsx
const firstInitial = session.user?.name?.charAt(0).toUpperCase() ?? '';
```

Now let's add the output. Add the following to the return statement:

```tsx
<div className='flex gap-2 items-center'>
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <div className='flex items-center'>
        <Button
          variant='ghost'
          className='relative w-8 h-8 rounded-full ml-2 flex items-center justify-center bg-gray-300'
        >
          {firstInitial}
        </Button>
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className='w-56' align='end' forceMount>
      <DropdownMenuLabel className='font-normal'>
        <div className='flex flex-col space-y-1'>
          <p className='text-sm font-medium leading-none'>
            {session.user?.name}
          </p>
          <p className='text-xs leading-none text-muted-foreground'>
            {session.user?.email}
          </p>
        </div>
      </DropdownMenuLabel>

      <DropdownMenuItem className='p-0 mb-1'>
        <form action={SignOutUser} className='w-full'>
          <Button
            className='w-full py-4 px-2 h-4 justify-start'
            variant='ghost'
          >
            Sign Out
          </Button>
        </form>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</div>
```

You should now see the user initial and a dropdown with the sign out button.

Test it out and make sure it works.
