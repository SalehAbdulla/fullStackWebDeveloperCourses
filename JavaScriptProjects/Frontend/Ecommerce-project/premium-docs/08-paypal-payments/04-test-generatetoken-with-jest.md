# Testing Generate Access Token Function With Jest

This is optional, but I figured it would be a nice addition to the course. We are going to use Jest to test our PayPal requests. Jest is a testing framework that allows you to write tests for your code. I just want to be able to test certain things such as generating the token for paypal before we write the actual code.

Run the following command to install Jest and some dependencies:

```bash
npm install -D jest ts-jest ts-node @types/jest @types/node
```

Run the following command to initialize Jest:

```bash
npm init jest@latest
```

You will be asked some questions. Here is what I selected:

- Would you like to run Jest as your 'test' script in package.json? ... Yes
- Would you like to use Typescript for the configuration file? ... Yes
- Choose the test environment that will be used for testing ... node
- Do you want to add coverage reports? ... No
- Which provider should be used to instrument code for coverage? ... v8
- Automatically clear mock calls and instances between every test? ... Yes

You now should have a `jest.config.ts` file in your project.

Open the file and add the following option:

```ts
preset: 'ts-jest',
```

Make sure you have the following in your `package.json`:

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

## `dotenv` Setup

Since Jest runs in a separate environment, we need to set up `dotenv` to load our environment variables.

Install it as a development dependency:

```bash
npm install -D dotenv
```

Create a `jest.setup.ts` file in the root of your project and add the following:

```ts
require('dotenv').config();
```

Now in the `jest.config.ts` file, add the following:

```ts
 setupFiles: ['<rootDir>/jest.setup.ts'],
```

## Writing The Test

Where you put your tests is up to you. A common place is to create a test folder in the folder you are testing. Since we won't have a ton of tests, I'm just going to create a folder in the root of the project called `tests`.

Let's create a test to make sure we can generate an access token. Create a file at `tests/paypal.test.ts` file and add the following:

```ts
import { generateAccessToken } from '../lib/paypal';

// Generate a PayPal access token
test('generates a PayPal access token', async () => {
  const tokenResponse = await generateAccessToken();
  console.log(tokenResponse);
  // Should be a string that is not empty
  expect(typeof tokenResponse).toBe('string');
  expect(tokenResponse.length).toBeGreaterThan(0);
});
```

You also need to export the function from the file. Open the `paypal.ts` file and add an export:

```ts
export async function generateAccessToken() {}
```

Now run the following command to run the test:

```bash
npm run test
```

You should see the log with the token in the console and the test should pass.

