# Seed User Data

Let's add a couple sample users to the database.

#### Install `bcrypt-ts-edge`

If you look at the sample data, the passwords are being hashed. We are going to use the `bcrypt-ts-edge` package. It is a TypeScript-native implementation of bcrypt, designed for edge environments such as Cloudflare Workers, Vercel Edge Functions, or any serverless platforms that don’t support native Node.js APIs. You could just as well install and use the `bcryptjs` package, but we're going to use this for easy deployment later.

Run the following command to install the package:

```bash
npm install bcrypt-ts-edge
```

Open the `db/sample-data.ts` file and add the following code:

```typescript
import { hashSync } from 'bcrypt-ts-edge'; // Import the hashSync function from the bcrypt-ts-edge library

const sampleData = {
  users: [
    {
      name: 'John',
      email: 'admin@example.com',
      password: hashSync('123456', 10),
      role: 'admin',
    },
    {
      name: 'Jane',
      email: 'jane@example.com',
      password: hashSync('123456', 10),
      role: 'user',
    },
  ],

  products: [
    //...
  ],
};
```

## Update the Seeder

Open the `db/seed.ts` file and update it with the following code:

```typescript
import { PrismaClient } from '@prisma/client';
import sampleData from '@/db/sample-data';

async function main() {
  const prisma = new PrismaClient();
  await prisma.product.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  await prisma.product.createMany({ data: sampleData.products });
  await prisma.user.createMany({ data: sampleData.users });

  console.log('Database seeded successfully');
}

main();
```

Now, in addition to the products, we are also seeding the users.

Open Prisma Studio and look at the User table. You should see the two users we just seeded.
