# Theme Mode Toggle

We are going to add a theme toggle to our app. This will allow the user to switch between a light and dark theme as well as a system theme.

## Dependencies

We are going to use a dropdown menu to allow the user to select a theme. Run the following command in your terminal:

```bash
npx shadcn@latest add dropdown-menu
```

We are also using a package called `next-themes`, which allows us to easily switch between light and dark themes. Run the following command in your terminal:

```bash
npm install next-themes
```

## Mode Toggle Component

Create a new file at `components/shared/header/mode-toggle.tsx`.

Create a basic component:

```tsx
const ModeToggle = () => {
  return <>ModeToggle</>;
};

export default ModeToggle;
```

Bring it into the `components/shared/header/index.tsx` file:

```tsx
import ModeToggle from './mode-toggle';
```

Embed it right above the button that surrounds the shopping cart link and inside the div with the class `space-x-2`:

```tsx
<div className='space-x-2'>
  <ModeToggle /> 👈 Add this line
  <Button asChild variant='ghost'>
    <Link href='/cart'>
      <ShoppingCart />
      Cart
    </Link>
  </Button>
  // ...
</div>
```

You should see the text in the header.

Go back to the `components/shared/header/mode-toggle.tsx` file and add the following imports. We also need to make this a client component since we are using hooks:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoonIcon, SunIcon, SunMoon } from 'lucide-react';
```

We are bringing in the `useTheme` hook from `next-themes` to allow us to switch between light and dark themes. We are also bringing in the `useState` and `useEffect` hooks and some dropdown components and icons.

Add the following inside the function above the return statement:

```tsx
const { theme, setTheme } = useTheme();
```

The theme switching is easy. We simply get the theme state from the hook. We can then use the `setTheme` function to switch between light and dark themes.

## Output

Now we just need to add the output in the return statement. Replace the `<>ModeToggle</>` with the following:

````tsx
 <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {theme === 'system' ? (
            <SunMoon />
          ) : theme === 'dark' ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={theme === 'system'}
          onClick={() => setTheme('system')}
        >
          System
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'light'}
          onClick={() => setTheme('light')}
        >
          Light
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          checked={theme === 'dark'}
          onClick={() => setTheme('dark')}
        >
          Dark
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
    ```
````

We are checking the theme state and then rendering the appropriate icon. We are also adding a dropdown menu with three options: system, light, and dark. We are also adding a checkbox item for each option. We are also setting the theme state when the checkbox item is clicked. The logic here is pretty simple.

## Theme Provider

In order to use the theme state in our app we need to wrap our app in a theme provider. This is something that will be used throughout the entire project, so we want this in our main layout. Open the `app/layout.tsx` file and add the following import:

```tsx
import { ThemeProvider } from 'next-themes';
```

Now just wrap the output with the theme provider:

```tsx
return (
  <html lang='en'>
    <body className={`${inter.className}`}>
      <ThemeProvider
        attribute='class'
        defaultTheme='light'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </body>
  </html>
```

We are adding a couple of options to the theme provider. The `attribute` prop is used to set the data-theme attribute on the html element. The `defaultTheme` prop is used to set the default theme. The `enableSystem` prop is used to enable the system theme. The `disableTransitionOnChange` prop is used to disable the transition when the theme changes. I chose to set the default to light but you can set it to dark or system if you want.

## Fix Hydration Issue

If you run the app now you will see an error in the console about hydration. You can fix this by adding the `surpressHydrationWarning` attribute to the `<html>` tag in the main layout.



One of the reasons is listed as "Server/client branch like if (typeof window !== 'undefined')"

This is a common cause with next-themes because it uses window to detect and set the theme. Since window isn’t available on the server, the theme sometimes behaves differently between SSR and client-side rendering.

We can fix this by making sure the component is mounted before the theme is set. We can do this by setting a `mounted` state and then checking if the component is mounted before setting the theme. Add the following inside the function above the return statement:

```tsx
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
}, []);
if (!mounted) {
  return null;
}
```

So when you see this hydration error, this is what you can do to fix it.

If you see any other errors that say something like the client doesn't match the server, it is most likely from a browser extension that changes the HTML of the page. You can leave it or try and find the extension that is causing the issue. Lastpass and some of the color picker extensions are known to cause this issue.

Now we have a cool theme toggler. Let's move on.
