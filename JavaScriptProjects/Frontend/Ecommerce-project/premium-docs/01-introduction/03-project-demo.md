# Project Demo

I just want to go over the different features that we will be adding to this project. It's called Prostore and as mentioned, it will use Next.js, TypeScript, Postgres, Prisma, ShadCN UI and a bunch of other packages.

## Homepage & Header 

On the homepage, we have the header, which has a logo, categories menu button, search box, cart link and sign in button. We can also toggle the theme to be light or dark.

We have a carousel for any products that are marked as featured and have a banner uploaded. Under that we have the latest 4 products in product card components. Then we have a deal of the month countdown timer and some icon boxes.

## Product Details

If we click on a product, it takes us to the details page, where we have the information on that product like the price, description, ratings, etc. You can upload multiple images and click on the thumbnail. We are using a service called "Uploadthing" for image uploads. We have a rating and review system as well but you have to be logged in to create a review, which we'll do in a minute. 

## Cart

You can add a product to your cart and the cart button will then show the qty and buttons to add or remove from that qty. We can then go to our cart and see a summary of products. This is as far as you can go without logging in. If you click on "Proceed to Checkout" you will be taken to the login screen and notice the callback url in the url params. This is so it takes us back to the page we were at before logging in. There is also a sign up link on this page. 

## Sign In & Sign Up

Let's either sign up or sign in. I will use one of the admin accounts. There's a role field for the user and it can be either "user" or "admin".

## Checkout Process

Now that we are logged in, let's move through the checkout. We se our items, we click to go to the shipping address page and then the payment method select. Then we go to the place order page to verify everything. Then place the order. Now we are taken to an order detaila page and this is where you will pay either with PayPal or credit card using Stripe.

Once we pay, we can see our orders in the menu. We can also update our profile.

## Admin Section

If you are an admin, you will have the "Admin" option in the menu. This takes you to the overview with a chart of monthly sales and management of products, orders and users. We can create products from here as well as update and delete products and other resources.

## Search

We also have some advanced filtering going on. If we either search for something or click on the "View All Products" on the homepage,  It takes us to '/search' which has filtering links for category, price and rating as well as sorting by date, price and rating.

## Reviews

Now that we are logged in, if we go to a product page, we can add or update a review and rating.