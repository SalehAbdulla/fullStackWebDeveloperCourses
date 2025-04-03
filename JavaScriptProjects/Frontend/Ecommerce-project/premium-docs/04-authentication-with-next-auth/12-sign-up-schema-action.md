# Sign Up Form Schema & Action

Now we will create the Zod schema for the sign up form data as well as the action to handle the form submission.

## Sign Up Form Schema

Open the file `lib/validator.ts` and add the following code:

```ts
// Schema for signing up a user
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().min(3, 'Email must be at least 3 characters'),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    confirmPassword: z
      .string()
      .min(3, 'Confirm password must be at least 3 characters'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
```

We are creating the schema for the sign up form data. There will be a name, email, password, and confirm password field. The name and email fields are required and must be at least 3 characters long. The password and confirm password fields are required and must be at least 3 characters long. We use the `refine` method on the object itself to check if the password and confirm password fields match. Zod's .refine() expects you to pass a function that returns true or false. If true, the validation succeeds and if false, the validation fails. If the validation fails, Zod adds an error to the field specified in the path (in this case, confirmPassword).

## Sign Up Action

Let's create the action that will handle the sign up form submission. Open the file `lib/actions/user.action.ts` and add the following imports:

```ts
import { signInFormSchema, signUpFormSchema } from '../validator';
import { hashSync } from 'bcrypt-ts-edge';
import { prisma } from '@/db/prisma';
```

Here is the code for the action:

```ts
// Register a new user
export async function signUp(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: 'User created successfully' };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      success: false,
      message: 'Something went wrong',
    };
  }
}
```

We are using the `signUpFormSchema` schema to validate the form data. We are using the `hashSync` function to hash the password. We are using the `prisma.user.create` method to create a new user. We are using the `signIn` function to sign in the user. We are returning the success status and a message.

As far as the error, it is very vauge. We can work on this later. First, I want to get the form working.

In the next lesson, we will create the sign up form.
