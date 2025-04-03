# Section Intro

In this section, we will continue on with the admin area. We have the overview page and the orders, now we want to be able to manage products, including create, read, update and delete as well as implement product images.

First we'll get the products and display them in the admin area.

Then we'll add the ability to delete products. We'll re-use the delete dialog component that we used for the orders.

Then we want to be able to create products. We'll create an action, add the form with a slugify option so we can get a slug from the title.

We'll be using Uploadthing as our image upload service, so we have to configure that.

Then we'll implement the image uploading in the create form.

We're also going to have an is featured option and featured products can have a banner that will show on the homepage.

Lastly, we'll add the ability to update products.