# Resend Account and API Key

We are going to use a service called Resend to send email. Resend is a developer-focused service designed to simplify the process of sending emails. It provides a simple API for sending emails, making it easy to integrate into your applications.

The first thing you need to do is create an account. You can go to [Resend](https://resend.com/) and click on the "Sign Up" button. Or you can do what I did and just use your GitHub account.

Once you log in you will see the dashboard. Click on "Add API Key" and copy it and then paste it into your `.env` file. You also want to add the sender email address. Ultimately, you want to set this to an email that you own the domain but for testing, you can actually use `onboarding@resend.dev` and it will work.

It should look something like this:

```
RESEND_API_KEY="re_ZnhUcrjR_QD2cDqzQ3iYCrkfvPYFCYiXm"
SENDER_EMAIL="onboarding@resend.dev"
```

You also need to add these variables to Vercel for the production environment. Go to settings->Environment Variables and add the same variables.

Let's also add the sender email to our constants file. Add the following to `app/constants/index.ts`:

```ts
export const SENDER_EMAIL =
  process.env.SENDER_EMAIL || 'onboarding@resend.dev';
```

## Install Packages

We are going to install a few packages to send emails. Open a terminal and run the following command:

```bash
npm install resend react-email @react-email/components
```

The `resend` package is the official Node.js SDK for Resend. It provides a simple API for sending emails. The `react-email` package is a library for creating email templates in React. The `@react-email/components` package is a set of pre-built components for creating email templates.

That's it for now. In the next lesson, we will create our email purchase receipt.
