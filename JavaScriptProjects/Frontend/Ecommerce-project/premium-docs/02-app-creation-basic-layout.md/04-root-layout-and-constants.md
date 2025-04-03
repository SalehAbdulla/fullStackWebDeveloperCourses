# Root Layout & Constants

In Next.js we can have groups and multiple layouts. Groups are folders that are not pages and are used for structure. You can create a group by creating a folder with parenrentheses around the name.

Create a folder called `(root)` in the `app` folder. Move the `app/page.tsx` into the `(root)` folder. We are also going to have a sub layout here. Instead of adding the container classes and embedding our header, footer and things like that in the main layout, we will do that here.

Add the following code to the `(root)/layout.tsx` file:

```tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col'>
      <main className='flex-1 wrapper'>{children}</main>
    </div>
  );
}
```

It is very similar to the main layout except we added some container classes. We will add the header and footer components here.

Your main `app/layout.tsx` file should look like this:

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/assets/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Prostore',
  description: 'A modern store built with Next.js',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className}`}>{children}</body>
    </html>
  );
}
```

So that only the `{children}` prop is rendered in the `<body>` tag. No classes or anything.

This will give us a more flexible layout. When we create our header and stuff, the will go in the `(root)/layout.tsx` file. Now if we want to have multiple layoutss, we can create a new group and add the layout there.

## Constants

Another thing I want to do in this lesson is create a file to store some constants and info that we will use throughout the course. Create a file at `lib/constants/index.ts` and add the following code:

```ts
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Prostore';
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'A modern store built with Next.js';
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';
```

We will add to this file as we go. The purpose of this file is so that we can use these values in multiple places without having to repeat ourselves. In this case, we are using the `process.env` object to get the values from the `.env` file and creating a default value if the environment variable is not set.

## `.env` File

Even though we have the defaults in the constants file, I stil want to set the environment variables in the `.env` file.

Create a file called `.env` in the root of the project and add the following values:

```env
NEXT_PUBLIC_APP_NAME="Prostore"
NEXT_PUBLIC_APP_DESCRIPTION="Prostore is a modern e-commerce platform for selling digital products"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"
```

Add the `.env` file to your `.gitignore` file as well. You don't want this to be committed to the repository.

## Add To Metadata

In the `app/layout.tsx` file, we can add the `APP_NAME` and `APP_DESCRIPTION` to the metadata object.

Import the contstants and add them to the metadata object:

```tsx
import { APP_NAME, APP_DESCRIPTION, SERVER_URL } from '@/lib/constants';
```

```tsx
export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
};
```

For the `title`, we are using a template to set the title. So if we set a title for an individual page, it will be prepended with the `APP_NAME` and a pipe character.

`metadataBase` is used to set the base URL for the metadata.

In the next lesson we will work on the header and footer components.
