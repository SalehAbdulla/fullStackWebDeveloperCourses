## Setup Shadcn UI

In this lesson, we will start to setup ShadCN.

ShadCN is a modern UI library that provides a flexible set of components and styles for building web applications. It is built with Radix UI Primitives, which are low-level, unstyled components, and Tailwind CSS for theming and utility-first styling.

Unlike other UI libraries where you import all components from a single package (e.g., Material UI, Chakra UI), ShadCN works differently. It allows you to selectively install and use only the components you need. This gives you more control over your codebase and makes customization easier.

Let's install it.

```bash
npx shadcn@latest init
```

The init command generates a ShadCN component setup in your project. It doesn't install the entire library as a package but instead gives you access to a system where you can pick and choose specific components that will be installed directly into your project’s codebase. This contrasts with typical UI libraries like Material UI or Chakra UI, where you import components from a single package. ShadCN, however, generates the components locally.

Note: It used to be `npx shadcn-ui@latest init` but now it is `npx shadcn@latest init`.

Select `default` for the style.

Select `Slate` for the base color.

Slect `yes` for CSS variables for theming.

#### Legacy Peer Dependencies Note

It depends on when you're watching this but you may get this warning where it says that some dependencies may not be compatible with React 19. This happebns because React 19 is so new and some packages don't explicitly say they're compatible with React 19. If you don't get this warning, just ignore it. If you do, you'll have 2 options:

--force:

Using --force tells npm or your package manager to ignore any dependency conflicts entirely. This option forces the installation, even if there are incompatible peer dependencies. You can select this but it may introduce runtime issues if dependencies rely on specific versions.

--legacy-peer-deps:

This option tells npm to ignore the "peer dependency" requirements of packages. By default, npm enforces strict compatibility for peer dependencies, and this flag just bypasses this check. This is generally safer than --force because it respects the primary dependencies while ignoring only the incompatible peer dependencies. 

I'm going to select the `--legacy-peer-deps` option. Either way you shouldn't have issues. All the packages we're using are compatible with React 19.

Now Shadcn has been initialized.

## Test With a Button

Let's test it with a button. We can use the `Button` component from Shadcn. You can read more about the button component [here](https://ui.shadcn.com/docs/components/button).

Run the following command:

```bash
npx shadcn@latest add button
```

This will create a `components/ui` folder in the root of the project with the `button.tsx` file.

In your `app/page.tsx` file, import the button component and use it:

```tsx
import { Button } from '@/components/ui/button';

const HomePage = () => {
  return <Button>Button</Button>;
};

export default HomePage;
```

You should see the button on the page.

So this will be the process anytime we want to use a component from Shadcn. We will install the component and import it in the file we want to use it.

You can now remove the `Button` from the page.

```jsx
const HomePage = () => {
  return <>Latest Products</>;
};

export default HomePage;
```

you can keep the `Button` component in the `components` folder because we will use it later.

## TypeScript Rule

There is a TypeScript error that gets thrown with the `input` component that has to do with the `no-empty-object-type rule`. I want to fix that by adding a rule to the `eslintrc.json` file. Open it up and add the following:

```json
rules": { "@typescript-eslint/no-empty-object-type": "off" }
```

This will disable the rule for the empty object type.

Now let's move on to the layout in the next lesson.
