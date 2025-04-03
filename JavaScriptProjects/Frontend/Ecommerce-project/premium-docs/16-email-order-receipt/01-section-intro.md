# Section Intro

In this section, we are going to implement email receipts when a user places and pays for an order.

We are going to use a service called Resend. They offer email services for developers. So if you need to send emails from your app.

We'll start by creating a free account and setting up our API keys

Then we're going to create the email template. We'll be using the Resend NPM package but we'll also be using a library called "React Email", which is a great library that gives us pre-built UI components for creating email templates.

Once we have the template, we can add some sample data so that we can see what the email will look like before we send it.

Then finally, we'll send the email when the order is paid.