# Environment Setup

So as with any JavaScript project, there's not too much that we need to do to get started. We don't install separate compilers or anything like that obviously but there are some tools that you need and some that will just make your life easier.

## Node.js

First off, make sure that you have Node.js installed. You can download it from the [official website](https://nodejs.org/en/download). You need Node.js when working with Next.js because it's SSR or server-side rendering and it utilizes Node.js to run on the server. We also need it just to install and setup not only Next.js but also many the other tools that we'll be using.

## VS Code

Second, you'll need a text editor or IDE. I recommend [VS Code](https://code.visualstudio.com/). It's free, open source, and has great support for TypeScript and JavaScript. There's a ton of great extensions that you can install. I'll show you a few of them in a minute. If you want to use something else like Sublime Text or Vim, that's fine too.

## Git & Github

We will be using Git and Github in this course for version control and also to setup continuous integration and deployment with Vercel. Vercel is not only the platform that we'll be deploying to, they are also the creators of Next.js. So in my opinion, they're the best when it comes to hosting. We need to be able to select a Github repo when we deploy so you need to install Git on your machine. You can download Git from the [official website](https://git-scm.com/downloads). You should also have a Github account.

## VS Code Extensions

So now I just want to go over some of the extensions that I will be using and recommend for this course.

- **Prettier** - This is a code formatter. It will automatically format your code for you. It's very configurable and you can even create your own rules. I have a very basic setup because I do courses and tutorials and I don't want my setup to be too opinionated. I have semi-colons turned on so it will automatically add them if I forget. I have single quotes set so if there are double quotes in my code, it will automatically change them to single quotes. Simple things like that.

- **ES Lint** - This is a code linter. Linting is a way to check your code for errors and also to enforce a certain style guide. For instance, if you have a variable declared but not used, it will let you know that it isn't being used. It's not something that will break your code but it will help you write better code and stick to a certain style guide. When we install Next.js, you can choose if you want to use ESLint or not. This sets it up in your local project but if you want to have highlighting and integration in VS Code, I would suggest installing the extension.

- **Prisma** - We'll be using Prisma in this course, which is an ORM to work with our Postgres database. We create schemas and migrations and you want this extension so that you have the correct syntax highlighting, code completion and linting.

- **Simple React Snippets** - This is a code snippet extension. It will automatically generate code for you. I'll be using it to generate React components in a certain format.

- **Tailwind CSS IntelliSense** - Since we're using ShadCN and Tailwind, this is a helpful extension that gives use Tailwind classes in a dropdown.

- **JavaScript (ES6+) code snippets** - This is a code snippet extension. It will automatically generate code for you. I don't use a lot of the snippets but I'll use it for console logs and try catch statements and some other things.

- **Markdown Preview Enhanced** - This one is good if you're using the premium docs. It will display your markdown files in a preview window. Even though VS Code can do this by default, there are some features that the built in one doesn't have.

Those are pretty much the extensions that I would suggest for this course.

All right, so now that we're ready to go, let's get started on our app.
