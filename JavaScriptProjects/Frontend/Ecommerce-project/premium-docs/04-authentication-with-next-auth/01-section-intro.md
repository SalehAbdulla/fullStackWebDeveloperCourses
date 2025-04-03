# Section Intro

Now we're going to add authentication to our application. We will use NextAuth.js to handle the authentication. NextAuth.js is a complete open-source authentication solution for Next.js applications. It is designed to work with any authentication provider and supports a wide range of authentication methods.

We are going to use a local email/password provider. We will use the `jwt` strategy, which uses JSON Web Tokens and is stateless and scalable. A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. JWTs can be signed using a secret, which will be used to verify the token's authenticity. We will use the `jwt` strategy to generate a JWT token and store it in the `session` cookie. 

We're going to create a few more Prisma models that relate to users and authentication including the `User` model, the `Session` model and the `VerificationToken` model.

Once that's setup we'll create the server actions to sign in and out and then create the form and the signout button.

We're using Zod for validation and hooking that up is easy. We don't have to do any manual validation as we just link the form to the Zod schema.

Then we'll setup user registration so that users can create and account.


I want to go over the flow of our authentication after we look at the individual tasks here.

So first we are going to create some Prisma models that have to do with users and authentication including the User, Account, Session and VerificationToken models. We're then going to seed some user data. We've already seeded product data now I want to add users. 

Then we'll install and setup Next Auth. We'll create the sign in and sign out actions on the server. Then create the sign in page and form. We'll add the sign out button. We're going to setup a Zod schema for validation. Create our sign up page and form. Handle errors and then add a JWT callback to the Next Auth so that we can customize the token that is sent to the client.

## Authentication Flow Explained

Here is a straightforward explanation of how authentication works in our application:

- Users log in with email and password.
- The credentials are checked against the database using Prisma.
- If the credentials are correct, a JWT (JSON Web Token) is created for the user.
- The JWT contains the user's info (like ID and role) and is encrypted and stored in the session cookie.
- The JWT is sent with every request to authenticate the user.
- The JWT is used to create a session that holds the user’s details (ID, name, email).
- The session allows the application to identify the logged-in user without needing to query the database again.
- The JWT and session data expire after a set time (e.g., 30 days).

That's the gist of how this will all work. I will explain more about the process as we go.