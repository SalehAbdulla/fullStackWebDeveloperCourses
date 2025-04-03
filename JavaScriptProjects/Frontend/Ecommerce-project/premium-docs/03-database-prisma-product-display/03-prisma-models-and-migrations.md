# Prisma Modela & Migrations

Now that we have our Vercel Postgres database setup and Prisma installed and configured, we can create our product model in our database schema.

Models represent the entities of our application domain, They also map to the tables of our database and we create our migrations from them. When used with TypeScript, the Prisma Client provides generated type definitions for your models and any variations of them to make database access entirely type safe.

Open the `schema.prisma` file in your project and add the following:

```prisma
   model Product {
      id          String       @id @default(dbgenerated("gen_random_uuid()")) @db.Uuid
      name        String
      slug        String       @unique(map: "product_slug_idx")
      category    String
      images      String[]
      brand       String
      description String
      stock       Int
      price       Decimal      @default(0) @db.Decimal(12, 2)
      rating      Decimal      @default(0) @db.Decimal(3, 2)
      numReviews  Int          @default(0)
      isFeatured  Boolean      @default(false)
      banner      String?
      createdAt   DateTime     @default(now()) @db.Timestamp(6)
    }
```

This is the schema for our `Product` model. It has the fields that we went over for the sample data. In addition, it will have a generated `id` field that will be a UUID. We also have a `createdAt` field that will be a timestamp.

Anything that starts with `@` are annotations that define specific constraints, defaults, and database-specific configurations for fields. For instance:

- `@id` - Marks the field as the primary key of the table in the database. cEach record must have a unique value for this field.
- `@unique` - Ensures that the field has a unique value across all rows in the table.
- `@unique(map: "product_slug_idx")` - Adds a unique constraint on the field and assigns a custom name (product_slug_idx) to the database index created for this constraint. Without map, it would generate a default name.
- `@default` - Specifies a default value for the field when a new record is created and no value is explicitly provided.
- `@db` - Maps the field to a specific database type, useful for defining database-specific precision or constraints. For example, `@db.Uuid` maps the id field to a UUID type in the database. `@db.Decimal(12, 2)` maps the price field to a decimal type with precision 12 (total digits) and scale 2 (digits after the decimal point).
- `default(dbgenerated(...))` - This uses a database function (gen_random_uuid()) to generate a UUID for the id field.

In order to create this schema and table in our database, there are some commands we have to run. Before we do that though, there are a few things that I want to do. First, we need to add a postinstall script to our `package.json` file. This will run the Prisma migration commands after we install our dependencies.

Open the `package.json` file and add the following:

```json
  "scripts": {
     "postinstall": "prisma generate",
     //..
  },
```

Now let's run the generate command locally to generate the Prisma client and the Prisma schema.

```bash
npx prisma generate
```

Now we should be able to use the Prisma client to interact with our database.

## Create the Migration

Run the following command to create a migration:

```bash
npx prisma migrate dev --name init
```

This will create a migration file in the `prisma/migrations` directory. you can look at it if you want, it is just a CREATE TABLE sql statement.

## Prisma Studio

Prisma comes with a built-in studio that we can use to view our database. We can run the following command to start the studio:

```bash
npx prisma studio
```

This will open a new browser window with the Prisma Studio. You can use this to view your database and make changes to it.

In the next lesson, we will seed our sample data.
