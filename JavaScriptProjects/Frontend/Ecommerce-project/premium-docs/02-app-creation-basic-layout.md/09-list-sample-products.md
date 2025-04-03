# List Sample Products

In this lesson, we are going to start to display some products on our page. We are going to use a sample data set and sample images. Right now, the data will come from a file. Later on, we will use a database and the Prisma ORM to fetch the data. You could start with the database, but this is how I typically start a project. I like to get some of the basic layout and functionality working first and then add the database.

## Sample Data

In this lesson, you will have a download for the sample data, which will include the data file and the images. You can also get them from the main Github repository.

Download the data and move the `images/sample-products` folder with the images to the `public/images` folder. There are also two banners. Move those to the `public/images` folder as well.

Move the `db` folder with the `sample-data.ts` file to the root of the project. This `db` folder will have other stuff in it later such as a seeder.

Look at the sample data and get a feel for what the data looks like. There are only products for now but later, we will have users as well.

#### Product Fields

- `name`: The product name.
- `slug`: The product slug.
- `category`: The product category.
- `description`: The product description.
- `images`: Array of product image paths.
- `price`: The product price.
- `brand`: The product brand.
- `rating`: The product rating.
- `numReviews`: The number of reviews for the product.
- `stock`: The product stock.
- `isFeatured`: Whether the product is featured.
- `banner` (optional): The product banner.

## Product List Component

We are going to have a component to list products. Create a new file at `components/shared/product/product-list.tsx` and add the following code:

```tsx
const ProductList = ({ data, title }: { data: any; title?: string }) => {
  return (
     < className='my-10'>
      <h2 className='h2-bold mb-4'>{title}</h2>
      {data.length > 0 ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {data.map((product: any) => (
              <>{product.name}</>
            ))}
          </div>
      ) : (
        <div>
          <p>No product found</p>
        </div>
      )}
    </>
  );
};

export default ProductList;
```
This component will take in the data and display the product name for now. Ultimately, we will display the product card with the data, but for now, this is ok.

Another thing that I want to mention is that we're using the `any` type for the data. This isn't really a good practice, but for now, it's ok because we're going to be implementing something called "Zod" later to validate the data.


## Use the Product List Component

Open the homepage at `app/(root)page.tsx` and import the data and the component:

```tsx
import ProductList from '@/components/shared/product/product-list';
import sampleData from '@/db/sample-data';
```

Then add the following to the return:

```tsx
const HomePage = () => {
  return (
    <div className='space-y-8'>
      <h2 className='h2-bold'>Latest Products</h2>
      <ProductList title='Newest Arrivals' data={sampleData.products} />
    </div>
  );
};
export default HomePage;
```

You should now see the product names in the browser. 

## Limit The Products

Let's also add a `limit` prop so we don't have to show all the products:

```tsx
const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any[];
  title?: string;
  limit?: number;
}) => {
  // Apply limit if provided, otherwise show all products
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className='my-10'>
      <h2 className='h2-bold mb-4'>{title}</h2>
      {limitedData.length > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {limitedData.map((product: any) => (
            <>{product.name}</>
          ))}
        </div>
      ) : (
        <div>
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
```

Now change the embed to the following:

```tsx
<ProductList title='Newest Arrivals' data={sampleData.products} limit={4} />
```

You should only see 4 products now.

In the next lesson, we will create product cards.

