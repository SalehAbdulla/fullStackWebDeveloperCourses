# Section Intro

So now we are ready to start creating the admin area. This will allow users with the admin role to manage products, orders and customers.

It will have it's own layout much like the user area. There will be an admin menu here.

We will have an admin overview page with things like total revenue, recent orders, number of products and customers and even a cool chart for sales data by month. So we need to create the action and the UI for that.

We're going to use a library called Recharts to show the monthly sales in a bar chart.

Then we want to do the orders page where all orders will be listed out for the admin.

We want to add the ability to delete orders. We'll be using a nice alert dialog from ShadCN UI.

Then we want admins to be able to update COD orders to paid and delivered.