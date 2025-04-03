# Stripe Setup

In order to use Stripe, you need to create an account. I have an account that I use for my real projects, but I created a dev account for tutorials and courses.

Log in or create an account here: https://dashboard.stripe.com/register

Once you are logged in, you will see the dashboard.

Make sure that the Test Mode switch is on. This is important because you don't want to use your real credit card information or real payments.

One you are ready to go live, then you would switch this off and you need to go through and add your business info and bank account information.

Click on the "Developers" link next to the test mode switch. Then click the "API Keys" tab. You want to add your key to the `.env` file.

Copy the secret key and add it to the file. It should look something like this:

```
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

You also need to add the publishable key to the `.env` file. It should look something like this:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

Be sure to add the `NEXT_PUBLIC_` prefix to the key.

## Install The Stripe Package

We need to install the Stripe NPM package and the package that integrates Stripe with React. Open a terminal and run the following command:

```bash
npm install stripe @stripe/stripe-js @stripe/react-stripe-js
```

The `@stripe/stripe-js` package is a JavaScript library that provides a set of APIs for interacting with Stripe's payment processing services.

The `@stripe/react-stripe-js` package is an official Stripe library that provides a set of React components and hooks to make it easier to integrate Stripe's payment elements in your React application. It's designed to work with Stripe’s Elements API, which is a UI library for creating custom payment forms.

Now that we have Stripe setup in test mode and we have the packages that we need, we can start building the Stripe payment form.
