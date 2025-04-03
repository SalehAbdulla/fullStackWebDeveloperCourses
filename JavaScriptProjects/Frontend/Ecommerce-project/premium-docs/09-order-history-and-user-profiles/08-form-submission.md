# Form Submission

Now let's have the form submit to the action.

Add the following code to the `onSubmit` handler:

```tsx
// Submit form to update profile
async function onSubmit(values: z.infer<typeof updateProfileSchema>) {
  const res = await updateProfile(values);

  if (!res.success)
    return toast({
      variant: 'destructive',
      description: res.message,
    });

  const newSession = {
    ...session,
    user: {
      ...session?.user,
      name: values.name,
    },
  };

  await update(newSession);

  toast({
    description: res.message,
  });
}
```


In the function, we are calling the `updateProfile` action with the form values. If the action is successful, we are updating the session and showing a success message. If the action fails, we are showing an error message.

Go ahead and try it out and you should be able to submit the form and update the user name.

If you check the database and the name updates but if you refresh the form and the session still has the old name, then you need to open the `auth.ts` file and add the following to the bottom of the `jwt` callback abover the return:

```tsx
// Handle session updates (e.g., name change)
if (session?.user.name && trigger === 'update') {
  token.name = session.user.name;
}
```

We need this because the session data comes from the token and we need to check for an update in the session and also update the token. Otherwise, you will not see the change on the client.