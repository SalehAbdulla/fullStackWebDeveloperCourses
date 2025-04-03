# Section Intro

Now we need to implement our first payment solution, and that will be PayPal.

First we need to setup an app in the PayPal developer site and create two sandbox accounts. One for personal and one for business. The busineess is to recieve money and and the personal is to buy and test. We're working with the sandbox, so of course there is not real money or banks involved.

We're going to setup a file with our functions that interact with the PayPal API. There will be 3 functions here. One to generate an access token, one to create an order and I mean an order on PayPal's side not in our database yet. And then one to capture payment.

This is where I want to do a little unit testing. We have no other way to run and test these functions, so we'll write a test for each one to make sure they work before we use them in our app.

Once we know they work, we'll start to create the server action to call these functions in our app.

Then we can finally add the PayPal buttons on the order page. We'll be using a package called React-PayPal-JS for that.