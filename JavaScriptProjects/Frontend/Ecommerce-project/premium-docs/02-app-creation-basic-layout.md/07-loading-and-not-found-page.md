# Loading and Not Found Page

In Next.js, you can create a loading page and a not found page simply by naming the files `loading` and `not-found` respectively.

## Loading Page

Let's create a loading page with a spinner. There are a lot of ways to do this. There are packages like [react-spinners](https://www.npmjs.com/package/react-spinners) that you can use to create a loading page. You could also just use text or an image. I am going to use an image that is visible in both light and dark mode. I have attached a download for the image to this lesson. You can also get it from the final repository.

The image is called `loader.gif` and we're going to put it in the `assets` folder.

Now create a file called `loading.tsx` in the `app` folder and add the following code:

```tsx
import Image from 'next/image';
import loader from '@/assets/loader.gif';

const Loading = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Image src={loader} width={150} height={150} alt='Loading...' />
    </div>
  );
};

export default Loading;
```

We are just bringing in the image and displaying it using the `Image` component from Next.js. We are also setting the height and width of the image to 150 pixels and aligning it to the center of the screen.

Now if you refresh the page, you will see the loading page. If you don't see it it's because it loaded too fast. You can test by adding the following to the `app/(root)/page.tsx`:

```jsx
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Homepage = async () => {
    await delay(2000);
  return <>Prostore</>;
};

export default Homepage;

```

## Not Found Page

Now we want a not found page. Go to any page that does not exist and you will see the default not found page. You can keep this if you want but I like to create a custom one with a button or link to go to the homepage.

Create a file called `not-found.tsx` in the `app` folder and add the following code:

```tsx
'use client';
import { APP_NAME } from '@/lib/constants';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen '>
      <Image
        priority={true}
        src='/images/logo.svg'
        width={48}
        height={48}
        alt={`${APP_NAME} logo`}
      />
      <div className='p-6 rounded-lg shadow-md w-1/3 text-center'>
        <h1 className='text-3xl font-bold mb-4'>Not Found</h1>
        <p className='text-destructive'>Could not find requested resource</p>
        <Button
          variant='outline'
          className='mt-4 ml-2'
          onClick={() => (window.location.href = '/')}
        >
          Back to home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
```

We have the logo, a heading, a paragraph, and a button. The button will take you back to the homepage. You could use a link instead of a button if you want.

Feel free to use a different layout for these pages. I just wanted to create something simple.
