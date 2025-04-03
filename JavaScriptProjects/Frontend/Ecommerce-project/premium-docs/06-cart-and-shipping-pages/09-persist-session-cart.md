# Persist Cart On Sign In

So we have the first couple pages of our checkout and we have our cart. However, right now, if you add items to your cart as a guest and then log in, your cart will not persist. To fix this, we will ensure that the guest cart (session-based) is set as the user cart when the user signs in.

We will do this by overwriting the user cart on sign in. When a user logs in, we check for their guest sessionCartId. If the guest cart exists, we update the user's cart with the session cart items.


Open the `auth.ts` file and add the following:

```ts
async jwt({ token, user, trigger, session }: any) {
  if (user) {
    // Assign user properties to the token
    token.id = user.id;
    token.role = user.role;

    if (trigger === 'signIn' || trigger === 'signUp') {
      const cookiesObject = await cookies();
      const sessionCartId = cookiesObject.get('sessionCartId')?.value;

      if (sessionCartId) {
        const sessionCart = await prisma.cart.findFirst({
          where: { sessionCartId },
        });

        if (sessionCart) {
          // Overwrite any existing user cart
          await prisma.cart.deleteMany({
            where: { userId: user.id },
          });

          // Assign the guest cart to the logged-in user
          await prisma.cart.update({
            where: { id: sessionCart.id },
            data: { userId: user.id },
          });
        }
      }
    }
  }

  return token;
},
 ```

 We are checking for a sign in or sign up trigger and then getting the `sessionCartId` from the cookie.

 We then find the user cart if there is one and overwrite it with the guests.

 You could merge the two but the code starts to get very complicated and I dont feel I have a good ability to explain that for this course. 