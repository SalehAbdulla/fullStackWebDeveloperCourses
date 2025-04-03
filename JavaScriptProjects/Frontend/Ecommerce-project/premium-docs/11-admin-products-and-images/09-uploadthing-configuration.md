# Image Upload

We are going to use the `uploadthing` library to handle the image uploading. Uploadthing is a file uploading service that offers features like middleware support, file type validation, and custom metadata, making it an great choice for secure and efficient file handling. The free teir that we're using is very generous and the paid teir is only 10 bucks per month. They aren't sponsoring or anything like that. I just think it's a good solution for image uploads.

Go to https://uploadthing.com/ and sign in with Github. Then click on the "Create an app" button and name your app. Then from the dashboard, click on the "API Keys" option and copy the token, secret and the app id (Find this in the URL) and past them in your `.env` file.

They should look something like this:

```
UPLOADTHING_TOKEN='eyJhcGlLZXkiOiJza19saXZlXzQ4YTE24545ZjhiMDE5YmFiODE0OWQ4MmYxMGQxZGU2NTM3YzlkZGI3YjNiZDk3MmRhNGZmNGMwMmJlOWI2Y2Q0N2UiLCJhcHBJZCI6InRyejZ2NHczNzUiLCJyZWdpb25zIjpbInNlYTEiXX0='
UPLOADTHING_SECRET='sk_live_48a16f8b019bafd545b8149d82f10d1de6537c9ddb7b3bd972da4ff4c02be9b6cd47e'
UPLOADTHING_APPID='trz6v4w375'
```

We need to install the following packages:

```bash
npm install uploadthing @uploadthing/react
```

All the code that we are about to write comes from the [uploadthing documentation](https://docs.uploadthing.com/getting-started/appdir).

We need to create a new file at `app/api/uploadthing/core.ts` and add the following code:

```ts
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { auth } from '@/auth';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: '4MB' } })
    .middleware(async () => {
      const session = await auth();
     
      if (!session) throw new UploadThingError('Unauthorized');
     
      return { userId: session?.user.id };
    })
    .onUploadComplete(async ({ metadata }) => {
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
```

This code creates a file router for the uploadthing library. It also creates a middleware that checks if the user is authenticated. If the user is not authenticated, it throws an error. It also returns the user id in the metadata. This metadata is then passed to the `onUploadComplete` callback.

## Create The Route

Now we will use the `ourFileRouter` to create a route for the uploadthing library. Create a file at `app/api/uploadthing/route.ts` with the following code:

```ts
import { createRouteHandler } from 'uploadthing/next';
import { ourFileRouter } from './core';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
```

We are exporting the `GET` and `POST` routes for the uploadthing library. This works similar to how we created the routes for the next auth library. So the route /api/uploadthing will be used to upload images.

## Generate Components

Now we are going to generate some pre-configured components that we can use to upload images.

 Create a file named `lib/uploadthing.ts` with the following code:

```ts
import {
  generateUploadButton,
  generateUploadDropzone,
} from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();
```

We are exporting the `UploadButton` and `UploadDropzone` components from the `uploadthing` library with the `OurFileRouter` type. You can import them directly in the file where you want to use them.

## Add Domain To Config

When we use images from 3rd party websites, we need to add the domain to the `next.config.mjs` file.

Add the following code to the `next.config.mjs` file:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        port: '',
      },
    ],
  },
};

export default nextConfig;
```
