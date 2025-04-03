# Payment Method & Orders Page

In this section, we'll be adding more pages to the checkout process. We're going to have a payment method selection page where the use can select Paypal, Stripe or Cash on Delivery. We will also have a place order page so the user can review the order items and then place the order. After they place the order, they'll be taken to an order details page with the payment buttons.

We're going to create the payment select form and the action that that form will submit to. It will update the user's payment method in the database.

After the payment method page is done, we'll create an order schema  as well as an `orderItems` schema for each item. Because when a user places an order, the items will be stored in the `orderItems` table while the basic order info like the totalPrice will be in the `order` table.

We'll need to create a createOrder action to add that stuff to the database. 

We're going to have a place order page with a summary of the items and a button to place the order. 

Once they place the order, they will be taken to the order page and will have the option to pay with their seleced method. Of course, we have not added the PayPal or Stripe integration, but later on they will have either PayPal buttons or a Stripe form.

We're also going to be creating some utility functions along the way to shorten the id for display as well as the date and time.
