# Serverless Environment Config

We have Prisma working locally, but I want to do our initial deployment soon. We're going to do things a bit different in this course. Usually we build the entire app locally and then deploy at the end. I want to take a more real-world approach and deploy in increments. This will allow us to catch any issues early on and make sure everything is working as expected. Rather than having a bunch of issues thrown at us when we deploy, we'll catch them as we go.

Now we have something to address. Traditional databases maintain persistent TCP connections to handle requests. However, serverless environments (like Vercel) are designed to scale automatically and don’t maintain persistent connections between invocations. If you try to connect directly to a database from a serverless function, you might run into issues like:

- **Connection limits**: Serverless environments can spawn many instances simultaneously, exceeding database connection limits.
- **Cold starts**: Connections are slow to initialize in serverless environments.
- **Incompatibility with WebSockets**: Neon uses WebSockets for serverless compatibility, while Prisma assumes a traditional TCP setup.

The Neon adapter solves these problems by adapting Prisma’s behavior to Neon’s serverless architecture. It allows Prisma to manage connections using WebSockets and pooling, so that it works in a serverless context.

## Needed Packages

There are a few packages that we need to install to set this up:

- `@neondatabase/serverless`: Provides a low-level connection interface to interact with the Neon serverless PostgreSQL database using WebSockets. That's why we're also installing the websockets package. This adapter allows us to connect directly to Neon in serverless environments, such as Vercel or Netlify, where maintaining persistent connections to a database can be challenging.
- `@prisma/adapter-neon`: This is an adapter specifically for Prisma to ensure Prisma can operate smoothly with Neon in serverless environments. Prisma by default assumes traditional database connections (over TCP), so this adapter adapts Prisma’s behavior to Neon’s serverless infrastructure, which uses WebSockets and connection pooling.
- `ws`: This is a WebSocket library used by the Neon adapter to establish and manage connections to the Neon serverless database.

Let's install the following packages:

```bash
npm install @neondatabase/serverless @prisma/adapter-neon ws
```

There are a couple dev dependencies we need to install as well:

```bash
npm i -D @types/ws bufferutil
```

- `@types/ws`: This is the TypeScript type definitions for the ws package.
- `bufferutil`: This is a utility package for working with buffers in Node.js.

Now that we have the packages installed, we need to update our Prisma schema to use the Neon adapter. Open the `prisma/schema.prisma` file and update the provider to use the Neon adapter:

```prisma
generator client {
  provider = "prisma-client-js"
  previewFeatures = ["driverAdapters"]  👈 Add this line
}
```

## Generate Prisma Client

When we make changes like this, we need to regenerate the Prisma Client. Run the following command to generate the Prisma Client:

```bash
npx prisma generate
```

## Use The Adapter & Extend Prisma Client

Now we will create a new file that will extend the Prisma Client. This will allow us to use the Neon adapter in our Prisma Client and we're also going to automatically convert the Decimal type to strings when needed.

Most of the code we are using here is from https://neon.tech/docs/serverless/serverless-driver. I am going to comment it so you know what is happening.

Create a new file at `db/prisma.ts` and add the following:

```ts
import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@prisma/client';
import ws from 'ws';

// Sets up WebSocket connections, which enables Neon to use WebSocket communication.
neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;

// Creates a new connection pool using the provided connection string, allowing multiple concurrent connections.
const pool = new Pool({ connectionString });

// Instantiates the Prisma adapter using the Neon connection pool to handle the connection between Prisma and Neon.
const adapter = new PrismaNeon(pool);

// Extends the PrismaClient with a custom result transformer to convert the price and rating fields to strings.
export const prisma = new PrismaClient({ adapter }).$extends({
  result: {
    product: {
      price: {
        compute(product) {
          return product.price.toString();
        },
      },
      rating: {
        compute(product) {
          return product.rating.toString();
        },
      },
    },
  },
});
```

We are basically just initializing the Prisma Client with the adapter and then extending it to convert the price and rating fields to strings.

The `compute` method is a way to transform the data before it hits our code. In this case, we are converting the price and rating fields to strings but we could do anything we want.

There will be other fields that we need to convert before they hit our code as well. We'll get to that later.

#### Use the New Client

Now when we use Prisma, we import it from here. Open the `lib/actions/product.actions.ts` file and update the import statement to the following:

```ts
import { prisma } from '@/db/prisma';
```

And DELETE the following line:

```ts
const prisma = new PrismaClient();
```

We already initialized it in the `prisma.ts` file.

Now everything should be working as expected.
