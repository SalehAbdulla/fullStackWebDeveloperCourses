# Section Intro

In this section we are going to add Stripe Payments to our application. It's nice to give your users a few options to pay.

We first need to setup our Sripe account to use test mode. That's as simple as flipping a switch. We also need to get our api keys and add them to both the .env and the Vercel platform environment variables.

We then need to create what is called a payment intent. This is a core concept in Stripe's API that represents a specific transaction for collecting payment from a customer. The Sripe API gives us the methods that we need for this. So we will be installing a few NPM packages to work with Stripe.

We then need to create the payment and form component. This will show the credit card and expiration inputs on the order details page. Stripe also gives us a fake credit card to work with to test things.

Then we need to create a payment success page.

The last thing we need to do is create a webook, which is tells one service when something from another service happens. We need to notify our app when a payment succeeds. They we can mark it in our database that it was paid. It's important to know that thos webhook will be for our live site. Because it needs to be able to make a request to our project and it can't do that to our localhost.

Alright, let's get started with Sripe.
