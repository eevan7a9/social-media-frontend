# social-media-frontend

Is a Vue Social Media Application Developed using Vuejs with Typescript.

(Update 2025) 
- Added *Tailwindcss*
- updated from *Webpack* to *Vite*
- updated from *Javascript* to *Typescript*
- Updated from *Vue 2* to *Vue 3*
- Updated from *Vuex* to *Pinia*
- Removed som 3rd party packages like *Sweet Alert* & *AOS*

# Reminder

This is a **Frontend Only** application.

**Social-media-frontend** a front-end only application is written in a sort of way to mimic a fullstack application for demo purpose only

## What can You do?

### As a Registered, Signed in user -

- You can view Posts
- You can create new Post
- You can edit your Posts
- You can delete your Posts
- You can see Comments
- You can write Comments to Posts
- You can edit your Comments
- You can delete your Comments
- You can give Thumbs-up to Posts you like
- You can remove Thumbs-up to Posts you unlike
- You can view users profile
- You can follow other user you like
- You can view Groups
- You can view Stories

## Technology

- HTML5
- CSS 3
- Javascript
- Typescript
- Vuejs 3
- Pinia
- Vue Router
- Axios - HTTP requests

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
