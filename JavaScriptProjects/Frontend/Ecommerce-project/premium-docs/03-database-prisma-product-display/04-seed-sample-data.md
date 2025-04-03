# Seed Sample Data

Let's add some products to our database. We can do this by creating a seed file and running it. We are going to use the same sample file that we are using now, except we are going to seed the database with it instead of using it in the code.

Create a new file in the `db` directory called `seed.ts` and add the following:

```typescript
import { PrismaClient } from '@prisma/client';
import sampleData from './sample-data';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });

  console.log('Database seeded successfully');
}

main();
```

This will delete all the products in the database and then create the products from the sample data.

Open your terminal and run the following command to seed the database:

```bash
npx tsx ./db/seed
```

Now, open up Prisma Studio and you should see the products in the database.
