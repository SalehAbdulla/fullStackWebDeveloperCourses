# Search Component

We are going to create a search component that allows users to search for products with a keyword text field and a category dropdown. Once we get to the search page, there will be all kinds of filters that the user can use to filter the products such as the price, rating, and sort.

Let's create a new file at `components/shared/header/search.tsx` and add the following code:

```tsx
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getAllCategories } from '@/lib/actions/product.actions';
import { SearchIcon } from 'lucide-react';

const Search = async () => {
  const categories = await getAllCategories();

  return (
    <form action='/search' method='GET'>
      <div className='flex w-full max-w-sm items-center space-x-2'>
        <Select name='category'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='All' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem key={'All'} value={'all'}>
              All
            </SelectItem>
            {categories.map((x) => (
              <SelectItem key={x.category} value={x.category}>
                {x.category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Input
          name='q'
          type='text'
          placeholder='Search...'
          className='md:w-[100px] lg:w-[300px]'
        />
        <Button>
          <SearchIcon />
        </Button>
      </div>
    </form>
  );
};

export default Search;
```

We are using the `getAllCategories` action to get all the categories from the database. We are using the `Select` component from the `@/components/ui/select` component. We are using the `SelectTrigger` component to trigger the dropdown and the `SelectContent` component to display the dropdown options. We are using the `Input` component from the `@/components/ui/input` component. We also have some icons from the `lucide-react` package.

The form action is set to `/search`. We will create the search page soon.

## Use The Search Component

Now open the `components/shared/header/index.tsx` file and import the `Search` component:

```tsx
import Search from './search';
```

We are going to show the search component within the header on large screens but on small screens, we'll show it in the menu drawer.

Add the following code to the `Header` component right above the `Menu` component:

```tsx
<div className='hidden md:block'>
  <Search />
</div>
```

Now open the `components/shared/header/menu.tsx` file and import the `Search` component:

```tsx
import Search from './search';
```

And add the `<div>` with the `<Search />` component within the `<SheetContent>` component:

```tsx
<SheetContent className='flex flex-col items-start'>
  <div className='mt-10'>
    <Search />
  </div>
  // ...
</SheetContent>
```

## Add Search Page

The search page ultimately will have a lot of filters and so on, but for now, I just want the page to show, so let's just show some text that says "Search Page".

Create a file at `app/(root)/search/page.tsx` and add the following code:

```tsx
const SearchPage = () => {
  return (
    <>
      <h1>Search Page</h1>
    </>
  );
};

export default SearchPage;
```

Now if you submit the search form, you should see the search page.

Next, we will add some new functionality to the `getAllProducts` action so that we can filter the products by category, price, rating, etc.
