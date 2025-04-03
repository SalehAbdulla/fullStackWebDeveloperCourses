# Header & Footer Component

Let's start to work on the main components of our website. We will start with the header component.

The way we are going to structure our component files will be a bit different than I usually do. If the component will include multiple embedded components, we will have them in a folder inside of a folder called shared. For instance, the header will consist of not only the header component, but other ahared components such as the mode toggle.

Create a folder at `components/shared/header`. For the main header component, the file will be called `index.tsx`. So we are doing this in a Next.js-like way. Like the pages and routes.

It's important to mention that you can structure your components in any way you like. This is just the way I want to do it.

Create a file at `components/shared/header/index.tsx` and add the following code:

```tsx
const Header = () => {
  return <>Header</>;
};

export default Header;
```

## Embedding the Header Component

We are going to embed the header in our root group layout file (`app/(root)/layout.tsx`). Not the main layout file (`app/layout.tsx`).

Open the `app/(root)/layout.tsx` file and add the following import:

```tsx
import Header from '@/components/shared/header';
```

Since the file is called `index.tsx`, we don't need to specify the file name when importing it.

Now embed it:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <Header />
      <main className='flex-1 wrapper'>{children}</main>
    </div>
  );
}
```

Now we can see the text `Header` on the page.

Hint: If you want to import something that is not imported, you can press `Ctrl + .` and select to import it.

Add the following to the `Header` component:

```tsx
import { ShoppingCart, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { APP_NAME } from '@/lib/constants';

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
        <div className='space-x-2'>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
```

We are bringing in the `ShoppingCart` and `UserIcon` from the `lucide-react` library. We are also using the `Button` component from the `@/components/ui/button` file. We are using the `Link` component from `next/link` to create a link to the `/cart` page. We are also using the `APP_NAME` constant from the `@/lib/constants` file.

The logo will have the app name on larger screens and on smaller screens it will be hidden.

We are using the `ghost` variant of the `Button` component. This is because we want the button to have a transparent background. We are also using the `asChild` prop to make the button a child of the `Link` component. This is because we want the button to be a child of the `Link` component.

## Footer Component

Create a file at `components/footer.tsx` and add the following code:

```tsx
import { APP_NAME } from '@/lib/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t'>
      <div className='p-5 flex-center'>
        {currentYear} {APP_NAME}. All Rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
```

Bring the footer into the `app/(root)/layout.tsx` file.

```tsx
import Footer from '@/components/footer';
```

Now embed it:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className}`}>
        <div className='flex h-screen flex-col'>
          <Header />
          <main className='flex-1 wrapper'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
```

Now we have a header and footer on the page.
