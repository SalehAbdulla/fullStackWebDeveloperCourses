# PayPal Developer Setup

Now we are going to start to implement PayPal. In order to do that, you need to go to https://developer.paypal.com/ and log in.

PayPal has a sandbox mode where you can test your application before you go live. The way it works is you create a sandbox account for the "buyer" and a sandbox account for the "seller". You can then use these accounts to test your application. Everything works as if it were in live mode, but you are not actually using real money.

## Create Sandbox Accounts

Once you log into developer.paypal.com, go to "Testing Tools" and then "Sandbox Accounts".

You may have a default business and a default personal account. If you do, you don't need to create new ones.

If you don't have any test accounts, click "Create Account" and select "Business". This will be the account that the store will use to receive money.

Now click "Create Account" again and select "Personal". This will be the account that the store will use to pay for things.

## Create App

Under "Apps & Credentials", click on "Create App". Give it a name and keep Merchant selected.

Select a test business account to use and click "Create App".

You will be taken to a page with your keys.

Copy the Client ID and the Secret and put them in your .env file along with the api url:

```
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
PAYPAL_CLIENT_ID="AeFIi3onfA_dW_ncys8G4dsdsdJg2IT_kRV1PJIlHFgcecrlmMApC6zpb5Nsd7zlxj7UWJ5FRZtx"
PAYPAL_APP_SECRET="EEdG53DEeX_ShoPasdsd1nORwyG3xXmzSxFCDcSofBBTq9VRqjs6xsNVBcbjqz--HiiGoiV"
```

Don't use these keys, they are not real.

Once you want to go live, you would change the url to https://api-m.paypal.com and change the client id and secret to the live ones.

In the next lesson, we will start to implement PayPal.
