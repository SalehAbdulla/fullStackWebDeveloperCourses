# The Stack

In this video, I just want to talk about all the technologies that we'll be using in this course and project.

#### Next.js 15 & React 19

Next.js 15 was just released last month and that's what we'll be using. This version uses the latest version of React at this time, which is version 19. Everything we use is in this course is works fine with React 19 however, there are cases where I had to add the `--legacy-peer-deps` flag when intstalling packages because some of the third-party libraries haven’t fully updated their dependencies to be compatible with React 19. This flag allows npm to bypass strict dependency checks so you can still install and use these libraries without any issues.

#### PostgreSQL Database

We're not going NoSQL for a database this time. We'll be using PostgreSQL through Vercel, which is where we'll be deploying the project. Vercel now offers a cloud Postgres database that's managed by Neon. It's a great option for a projects like this. It's simple to setup and you don't have to pay for anything. The free tier is more than enough for this project. Of course, if you take it to production and you have a lot of traffic, you'll want to upgrade to a paid plan.

#### Prisma ORM

We'll also be using Prisma as our ORM. Prisma is a TypeScript-friendly ORM that makes it easy to work with databases. If you wanted to use something like Planetscale or another database provider, all you need to change is the database URL in the `.env` file. Everything else is the exact same. Prisma let's us easily set up schemas, migrations, and seed data.

#### TypeScript, ES Lint & Zod

I've been asked to do a TypeScript-related course forever. In this project, we'll be using TypeScript and ES Lint pretty heavily. So you're going to learn about type-safe programming, type inference, type guards and more. To simplify things, we'll be using Zod, which is a library that makes it easy to work with TypeScript by providing a way to validate data. We can create schemas for our data and then validate it before we save it to the database. So we don't even have to worry about writing validation logic manually.

#### ShadCN UI

For the UI, we'll be using ShadCN UI. ShadCN UI is a unique library that allows you to pick and choose which components you want to use. It's a great option for projects like this because it's not a full-blown UI library like Material UI or Chakra UI. It's a lot more flexible and customizable. It uses Tailwind CSS under the hood, so we can easily customize the styles.

#### Next Auth

For authentication, we'll be using Next Auth, which in my opinion blows away any other authentication library out there. It's easy to setup and use. It's also very flexible and customizable. We did use Next Auth in my Next.js From Scratch course with the Google provider. This time we'll setup local email and password authentication with Bcrypt encryption. I may add both Magic Link and Google authentication in the future. I already have the code, it's just a matter of if I want to add it to the course.

#### React Hook Form

Another library we'll be using is React Hook Form to handle form state, validation and submission. It's very flexible and customizable and works great with Zod. We can simply pass in our Zod schema to the `useForm` hook and it will automatically handle the validation for us.

#### Jest Testing

We're even going to dabble with unit testing. I didn't want to overcomplicate things, so we won't be doing a lot of this, but when it comes time to integrate the PayPal API, we're going to write a few tests to do things like generate tokens and verify payments.

There's a ton of other smaller libraries and packages that we'll be using in this course.

Here's a quick overview

- React Email & Resend - Used to create email templates and send emails
- Uploadthing - Used to upload files. In our case, product image
- Lucide React - Icon library
- Next Themes - Used to manage themes. We'll have a light mode and a dark mode version of the app
- Recharts - Used to create charts. We'll use this in our admin dashboard
- PayPal React SDK - Used to integrate PayPal payments
- Stripe - Used to integrate Stripe payments
- Slugify - Used to create slugs for products
- Zod - Used to validate data
- Embla Carousel - We'll use a combination of this and ShadCN's carousel component to display featured products in a carousel

## Vercel Deployment

We'll also be getting familiar with the Vercel platform. We're actually going to deploy pretty early in the course and then just have continuous deployment from there. So we can just push to Github and have it automatically deploy.

If this sounds like a lot, don't worry. We'll be going over everything in detail. This is not a watch me code course. I'll be explaining everything as we go. Will, Prateek and myself will also be available for Q&A on Udemy and Discord.

In the next lesson, we'll take a look at the project itself.
