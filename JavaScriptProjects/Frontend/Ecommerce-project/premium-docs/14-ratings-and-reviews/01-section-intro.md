# Section Intro 

Now we are going to add the rating and review functionality to the project.

This includes creaing the Prisma model for reviews as well as the relationship with both the product ans user models and tables. We'll also have some Zod schemas for validation.

We'll create a review list component, which will utlimately show all reviews for that product.

We will also have a review form that will open in a dialog.

We will create an action to both create and update the review if the logged in user already reviewed the product.

Then we'll get the reviews to list on the page in the review list component.

We also want to pre-fill the form if there is an existing review and rating.