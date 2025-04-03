# Section Intro

This section is all about adding and removing items from the cart. We'll have a table in the database that represents the cart and the products within it. So we need to create a Prisma schema and model for that.

Now since we're going to allow guests to add products to the cart, we need a way to link them to their cart so we're going to write some code in the NextAuth callback to add a 'sessionCartId' that will link the user to their cart in the database.

Then we'll be creating the add to cart component for the UI and create an action to add the item to the cart, which means adding it to the database. Then we want to add the functionality to remove items from the cart as well.

We need to create actions to add and remove to and from the cart.

We're also going to make our cart button dynamic in that once we add a product, the button will change to show an add and remove quantity selection.

We're going to use the `useTransition` hook to show a loading state while the action is running.
