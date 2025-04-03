# Section Intro

Now that we have our basic layout and some components including the product card display, we can start to implement a database.

We're going to be using a cloud PostgreSQL database that is offered through Vercel but is managed and is hosted by Neon, which is a great company and service. We're using the free tier so you don't need to pay anything or enter any credit card information to use this service. 

We'll be using Prisma as our ORM to interact with our database. Instead of writing raw SQL queries, Prisma offers easy to use methods to create, read, update, delete and more.

Prisma has models that we can setup in the schema file and these models pertain to the database tables. So we define the fields, types and other annotations like default values and primary keys.

Once we create these models, we can use them to create and run a migration, which will actually create our tables with all the fileds. So there's no having to go into something like PG Admin to create our fields and provision the database.

I want to have some sample data to work with so I'll show you how we can setup seeding, which is an easy, reusable way to populate our database with sample data.

Another library we'll be using and setting up is `Zod` which is a schema validation library. We'll be using it to validate our data to make sure that it is in the correct format. We'll get this setup in this section.

Once everything is setup and we run our migrations, we'll refactor our code to use the database and Prisma instead of the TypeScript file with the sample data. We're going to create the product details page as well as the product images component which will have a large image and then clickable thumbnails under it.

Lastly, we're actually going to deploy our application to Vercel. Usually I wait until the end, but I want this course to be more realistic and to show you how to deploy your application and have continuous deployment. So that when you push to Github, your application will automatically be deployed to Vercel. So we'll have our development environment and our production environment throughout the course.
