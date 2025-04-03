# Responsive Sheet Menu

In this lesson, I want to make the navigation responsive. We will use a `Sheet` component from the shadcn/ui library. The `Sheet` component is a modal that slides in from the right side of the screen. We will use it to display the navigation links on smaller screens.

Install the sheet component:

```bash
npx shadcn@latest add sheet
```

## Create The `Menu` Component

We are going to create a separate component for the menu.

Creare a new file at `components/shared/header/menu.tsx` and add the following imports:

```tsx
import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import Link from 'next/link';
import ModeToggle from './mode-toggle';
```

Add the following code:

```tsx
const Menu = () => {
  return (
    <>
      <div className='flex justify-end gap-3'>
        <nav className='md:flex hidden w-full max-w-xs gap-1'>
          <ModeToggle />
          <Button asChild variant='ghost'>
            <Link href='/cart'>
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <Button asChild>
            <Link href='/sign-in'>
              <UserIcon />
              Sign In
            </Link>
          </Button>
        </nav>
      </div>
    </>
  );
};

export default Menu;
```

Let's replace the right side of the header with this Menu component. Open the `components/shared/header/index.tsx` file and remove the Button, icons and ModeToggle imports and import the Menu. Then replace the ` <div className='space-x-2'>` and everything in it with the `<Menu />` component.

It should look like this:

```tsx
import Image from 'next/image';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import Menu from './menu';

const Header = () => {
  return (
    <header className='w-full border-b'>
      <div className='wrapper flex-between'>
        <div className='flex-start'>
          <Link href='/' className='flex-start'>
            <Image
              priority={true}
              src='/images/logo.svg'
              width={48}
              height={48}
              alt={`${APP_NAME} logo`}
            />
            <span className='hidden lg:block font-bold text-2xl ml-3'>
              {APP_NAME}
            </span>
          </Link>
        </div>
        <Menu />
      </div>
    </header>
  );
};

export default Header;
```

You should basically see the same thing. The only difference is that the menu is now a separate component.

## Add The Sheet Component

Now let's create the sheet. Add the following code under the ending `</nav>` tag in the `Menu` component:

```tsx
<nav className='md:hidden'>
  <Sheet>
    <SheetTrigger className='align-middle'>
      <EllipsisVertical />
    </SheetTrigger>
    <SheetContent className='flex flex-col items-start'>
      <SheetTitle>Menu</SheetTitle>
      <ModeToggle />
      <Button asChild variant='ghost'>
        <Link href='/cart'>
          <ShoppingCart />
          Cart
        </Link>
      </Button>
       <Button asChild>
        <Link href='/sign-in'>
          <UserIcon />
          Sign In
        </Link>
      </Button>
      <SheetDescription></SheetDescription>
    </SheetContent>
  </Sheet>
</nav>
```

The sheet component is a modal that slides in from the right side of the screen. We are using it to display the navigation links on smaller screens. The `SheetTrigger` component is a button that triggers the sheet to slide in. The `SheetContent` component is the content of the sheet. We are using it to display the navigation links. The `SheetTitle` and `SheetDescription` components are required or you will get a warning in the console. I am just adding the text "Menu" in the title and leaving the description blank.

Now when you make the screen smaller, you should see the EllipsisVertical icon. Click on it and you should see the navigation links. You can't see the sign in, but don't worry about that because we will be changing that around in a future lesson.

Here is the final code for the Menu component:

```tsx
import { EllipsisVertical, ShoppingCart, UserIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Link from 'next/link';
import ModeToggle from './mode-toggle';

const Menu = () => {
  return (
    <>
      <div className='flex justify-end gap-3'>
        <nav className='md:flex hidden w-full max-w-xs gap-1'>
          <ModeToggle />
          <Button asChild variant='ghost'>
            <Link href='/cart'>
              <ShoppingCart />
              Cart
            </Link>
          </Button>
          <Button asChild>
            <Link href='/sign-in'>
              <UserIcon />
              Sign In
            </Link>
          </Button>
        </nav>
        <nav className='md:hidden'>
          <Sheet>
            <SheetTrigger className='align-middle'>
              <EllipsisVertical />
            </SheetTrigger>
            <SheetContent className='flex flex-col items-start'>
              <SheetTitle>Menu</SheetTitle>
              <ModeToggle />
              <Button asChild variant='ghost'>
                <Link href='/cart'>
                  <ShoppingCart />
                  Cart
                </Link>
              </Button>
               <Button asChild>
                <Link href='/sign-in'>
                  <UserIcon />
                  Sign In
                </Link>
              </Button>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
};

export default Menu;
```
