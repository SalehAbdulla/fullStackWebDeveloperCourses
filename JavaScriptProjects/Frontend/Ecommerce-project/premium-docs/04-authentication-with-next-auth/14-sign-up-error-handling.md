# Sign Up Error Handling

Our registration form is working, but we need to handle errors more gracefully. Let's go into the `lib/actions/user.actions.ts` file and do some experiments. In the catch block, add the following:

```ts
console.log(error.name);
console.log(error.code);
console.log(error.errors);
console.log(error.meta?.target)
```

Now remove the `required` attribute from the name and email inputs and change the email type to "text" temporarily in the sign up form and try to register a user without a name and email. You will see something like this:

```
ZodError

undefined

[
    {
    code: 'too_small',
    minimum: 3,
    type: 'string',
    inclusive: true,
    exact: false,
    message: 'Name must be at least 3 characters',
    path: [ 'name' ]
  },
  {
    validation: 'email',
    code: 'invalid_string',
    message: 'Invalid email address',
    path: [ 'email' ]
  }
]
```

Now, let's go back to the browser and try to register a user with an email that already exists and look in the server console/terminal. You will see something like this:

```
PrismaClientKnownRequestError

P2002

Invalid `prisma.user.create()` invocation:
Unique constraint failed on the fields: (`email`)
```

This gives us some info we can use for an error handler. 

Let's create an error handler. Open the file `lib/utils.ts` and add the following:

```ts
// Format Errors
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatError(error: any): string {
  if (error.name === 'ZodError') {
    // Handle Zod error
    const fieldErrors = Object.keys(error.errors).map((field) => {
      const message = error.errors[field].message;
      return typeof message === 'string' ? message : JSON.stringify(message);
    });

    return fieldErrors.join('. ');
  } else if (
    error.name === 'PrismaClientKnownRequestError' &&
    error.code === 'P2002'
  ) {
    // Handle Prisma error
    const field = error.meta?.target ? error.meta.target[0] : 'Field';
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    // Handle other errors
    return typeof error.message === 'string'
      ? error.message
      : JSON.stringify(error.message);
  }
}

```

I used the "// eslint-disable-next-line @typescript-eslint/no-explicit-any" comment because I want to use the `any` type without any hassle from eslint. To include the types for this was way more complicated than I'd like.

Here, we are checking for two types of errors: `ZodError` and `PrismaClientKnownRequestError`. If the error is a `ZodError`, we format the error message by joining the error messages for each field. If the error is a `PrismaClientKnownRequestError` and the error code is `P2002`, we format the error message by capitalizing the first letter of the field name that caused the uniqueness error. If the error is neither a `ZodError` nor a `PrismaClientKnownRequestError`, we return the error message as a string.

Now bring it into the `lib/actions/user.actions.ts` file and update the catch block as follows:

```ts
import { formatError } from '../utils';
// ...

try {
  //...
} catch (error) {
  if (isRedirectError(error)) {
    throw error;
  }

  return {
    success: false,
    message: formatError(error), // Change this line
  };
}
```

Now you should get a more user-friendly error message.

You can put the required attribute back to the inputs.
