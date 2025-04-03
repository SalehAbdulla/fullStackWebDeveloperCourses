# Create Next.js App & Assets

Let's get started with our project by creating a new Next.js app. Open a terminal in the folder where you want to create the project and run the following command:

```bash
npx create-next-app@latest
```

Here are the answers I am going to give:

```bash
✔ What is your project named? … prostore
✔ Would you like to use TypeScript? … Yes
✔ Would you like to use ESLint? … Yes
✔ Would you like to use Tailwind CSS? … Yes
✔ Would you like to use `src/` directory? … No
✔ Would you like to use App Router? (recommended) … Yes
✔ Would you like to customize the default import alias? … No
```

If you do not want to use TypeScript, you can answer No to that question or any others.

Now open VS Code or whichever test editor you prefer:

```bash
code prostore
```

Now open the terminal in VS Code and run the following command:

```bash
npm run dev
```

This will run the development server on port 3000.

## Font Setup

Next.js now uses the Geist font by default. I want to change that to the Inter font.

Open the `app/layout.tsx` file.

Change this line at the top:

```tsx
import localFont from 'next/font/local';
```

to the following:

```tsx
import { Inter } from 'next/font/google';
```

Replace the following code:

```tsx
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
```

With this:

```tsx
const inter = Inter({ subsets: ['latin'] });
```

And your body tag should look like this:

```tsx
    <body className={`${inter.className}`}>
```

Also, change the title and description:

```tsx
export const metadata: Metadata = {
  title: 'Prostore',
  description: 'A modern store built with Next.js, ShadCN, and Prisma.',
};
```

## Move `globals.css`

I like to have the global stylesheet in separate folder.

Create a folder called `assets` in the root and a folder called `styles` in the `assets` folder. Then move the `global.css` file into the `styles` folder.

You can also delete the `fonts` folder.

Replace the import in the `app/layout.tsx` file with this:

```tsx
import '@/assets/styles/globals.css';
```

Here is the final code for `app/layout.tsx` so far:

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

If your layout does not include the `suppressHydrationWarning` prop, I would suggest adding it especially if you are running a lot of browser extensions. What this does is it stops warnings when the server and client are not in sync. This can happen for many reasons such as dates and times, certain cookies as well as extensions that change the DOM.

## Clear Homepage

Let's clear the homepage. Open the `app/page.tsx` file and replace the code with this:

```tsx
const HomePage = () => {
  return <>Latest Products</>;
};

export default HomePage;
```

## Logo & Favicon

Attached to this lesson is a zip with the `logo.svg` and `favicon.ico` file. Download the files from here or from the final repo.

Create a new folder `public/images` and add the `logo.svg` file to it. Add the `favicon.ico` file to the `app` folder and overwrite the existing one.

## Tailwind Utilities

We are going to add some Tailwind utilities to the `globals.css` file. Replace the current `utilities` content with the following:

```css
@layer utilities {
  .wrapper {
    @apply max-w-7xl lg:mx-auto p-5 md:px-10 w-full;
  }

  .flex-start {
    @apply flex justify-start items-center;
  }
  .flex-center {
    @apply flex justify-center items-center;
  }

  .flex-between {
    @apply flex justify-between items-center;
  }

  .h1-bold {
    @apply font-bold text-3xl lg:text-4xl;
  }

  .h2-bold {
    @apply font-bold text-2xl lg:text-3xl;
  }

  .h3-bold {
    @apply font-bold text-xl lg:text-2xl;
  }
}
```

These are some basic Tailwind utilities that we will use throughout the course for style.

Now we have our app created. In the next lesson, we will talk about and setup ShadCN.
