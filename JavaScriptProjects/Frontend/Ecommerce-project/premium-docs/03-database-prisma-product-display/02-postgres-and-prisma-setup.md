# Postgres & Prisma Setup

We are going to setup our database. You have many options for this. Some good ones are Neon, Supabase, AWS, PlanetScale, and MongoDB. We will be using Vercel Postgres, which is a managed Postgres database that actually uses Neon under the hood. You can read more about it [here](https://vercel.com/docs/storage/vercel-postgres).

You first need to log into your Vercel account. Then click on the "Storage" tab and select "Create" next to Postgres.

Give it a name and click "Create".

<img src="../images/vercel-postgres.png" alt="Vercel Postgres Create" />

Once you do that, you will see a database string. We will come back to this in a few minutes.

## Install Prisma

Prisma is an ORM that will help us interact with the database. It is a TypeScript-first ORM that makes it easy to work with databases. It is a great choice for TypeScript projects. I prefer it over the vercel-postgres package and many others.

Run the following command to install Prisma:

```bash
npm install -D prisma @prisma/client
```

Now run the following command to initialize Prisma:

```bash
npx prisma init
```

This creates a `prisma` folder with a `schema.prisma` file. This is where we will define our database schema. It also adds a `DATABASE_URL` environment variable to your `.env` file.

Go back to your Vercel Postgres dashboard and click on the "Settings" tab. Copy the `POSTGRES_PRISMA_URL` value and paste it in in the `DATABASE_URL` environment variable in your `.env` file. It will look like this:

```
DATABASE_URL="postgres://default:63TadedqJVbBH@ep-temper-base-a4v0qilv-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require&pgbouncer=true&connect_timeout=15"
```

## Prisma VS Code Extension

We are going to use the Prisma VS Code extension to help us with our database schema. Install it by going to the Extensions tab in VS Code and searching for "Prisma".

We also want to make sure formatting is setup. Open your command pallete(Ctrl+Shift+P) and type "settings" and select "Preferences: Open User Settings (JSON)". Then add the following to the `settings.json` file:

```json
 "[prisma]": {
    "editor.defaultFormatter": "Prisma.prisma"
  }
```

This will make sure the Prisma extension is the default formatter for `.prisma` files.

In the next section, we will create our database schema.
