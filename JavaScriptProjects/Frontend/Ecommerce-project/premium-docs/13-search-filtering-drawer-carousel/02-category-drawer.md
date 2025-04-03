# Category Drawer

We are going to start on the drawer component on the homepage. This will show a list of categories so that we can navigate to the category pages.

## Get All Categories Action

Before we create the component, let's add the action that will give us the data.

Open the `lib/actions/product.actions.ts` file and add the following function:

```ts
// Get product categories
export async function getAllCategories() {
  const data = await prisma.product.groupBy({
    by: ['category'],
    _count: true,
  });

  return data;
}
```

This is simple. We are just getting the categories and the count of products in each category.

## ShadCN Drawer Component

We need to install the ShadCN Drawer component. Open a terminal and run the following command:

```bash
npx shadcn@latest add drawer
```

## Categories Drawer Component

Let's create a new component at `components/shared/header/categories-drawer.tsx` and add the following code:

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { getAllCategories } from '@/lib/actions/product.actions';
import { Button } from '@/components/ui/button';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';

const CategoriesDrawer = async () => {
  const categories = await getAllCategories();

  return (
    <Drawer direction='left'>
      <DrawerTrigger asChild>
        <Button variant='outline'>
          <MenuIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='h-full max-w-sm'>
        <DrawerHeader>
          <DrawerTitle>Select a category</DrawerTitle>
          <div className='space-y-1'>
            {categories.map((x) => (
              <Button
                className='w-full justify-start'
                variant='ghost'
                key={x.category}
                asChild
              >
                <DrawerClose asChild>
                  <Link href={`/search?category=${x.category}`}>
                    {x.category} ({x._count})
                  </Link>
                </DrawerClose>
              </Button>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default CategoriesDrawer;
```

We are bringing in the `getAllCategories` action from the `product.actions.ts` file. We are also using the `Drawer` component from the ShadCN library. We map over the categories and render a button for each category. The `DrawerClose` component is used to close the drawer when the button is clicked and we can have it navigate to the category page, which we will create later.

## Add Categories Drawer to Header

Open the `components/shared/header/index.tsx` file and add import the `CategoriesDrawer` component:

```tsx
import CategoriesDrawer from './categories-drawer';
```

It's up to you on where you want to place this. Since we're going to have it open on the left, I am going to place it to the left of the logo. If you want to add it to the menu on the right, you can do that as well.

Here is where I will embed it:

```tsx
<header className='w-full border-b'>
  <div className='wrapper flex-between'>
    <div className='flex-start'>
      <CategoriesDrawer />
      <Link href='/' className='flex-start ml-4'>
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
```

I also added a class of `ml-4` to the logo so that it is not right next to the drawer.

Now you should be able to click on the button and see the drawer open.
