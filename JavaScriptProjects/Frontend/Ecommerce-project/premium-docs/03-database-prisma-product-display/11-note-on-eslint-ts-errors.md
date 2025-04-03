# Note on ESLint/TS Errors On Build

I wanted to mention this now because it is something you will run into during development. We're using ESLint and TypeScript and when you run 'npm run build' or push to Github and have your continuous deployment setup with Vercel, which we did in the last video, you're going to get errors such as:

```
28:3  Error: 'query' is defined but never used.  @typescript-eslint/no-unused-vars
31:3  Error: 'category' is defined but never used.  @typescript-eslint/no-unused-vars
```

This particular error is because there are variables that we have not yet used. It will prevent your deployment by default. There are a few options that you have.

The one that I would definitely suggest is to address the things that you can and ignore what you can't. For instance these errors are just because we haven't written the code yet that will use those variables. So even though there's an error now, it will go away once we use them. Your deployment will fail when you push to Github, but that's ok because your in development. If you were in production, that's different.

If this really bothers you and you always want your production site to work even though you're in development and nobody is going to it, you could add the following to your `next.config.ts` file:

```js
 typescript: {
 	// Will still allow production build with type errors!
    ignoreBuildErrors: true,
  }
```

I would not suggest that though.

Another thing that you can do that I would not suggest is disabling certain TS rules such as the `@typescript-eslint/no-unused-vars` in your `eslintrc.json` file.

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "rules": {
    "@typescript-eslint/no-unused-vars": "off"
  }
}

```

For certain pages:

```json
{
  "extends": ["next/core-web-vitals", "next/typescript"],
  "overrides": [
    {
      "files": ["path/to/your/file.ts", "path/to/another/file.tsx"],
      "rules": {
        "@typescript-eslint/no-unused-vars": "off"
      }
    }
  ]
}

```

Again, I would not suggest that. I say just fix anything you can and ignore the rest until you can fix it.