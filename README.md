# HoshiLe’s Store SPA Client in React

`hoshile-react` is a React port of the store client portion of HoshiLe’s Store.
Written in TypeScript using React Hooks (useState, useEffect, useContext, and UseReducer)
and react-router as a single page application.

The API server written in Go is at [https://github.com/takapro/hoshile-api](https://github.com/takapro/hoshile-api).

## About HoshiLe’s Store

HoshiLe’s Store is a classroom project written by [Ngoc Tin Le](https://github.com/takint) and [Takanori Hoshi](https://github.com/takapro).
Original was written in PHP and composed of a Rest API server, store front and admin clients.

## How to run

Install dependencies (libraries and build tools) with `yarn install`.

```
$ yarn install
```

Run the dev server, and open the application (http://localhost:8080/) manually.

```
$ yarn start
```

Build the `public/bundle.js` for production.

```
$ yarn build
```

Customize the config in `public/index.html`.

```html
  <head>
    <base href="/path/to/hoshile-react/"> <!-- change the base path here -->
    ...
    <title>The Awesome Store</title>      <!-- change the site name here -->
    ...
  </head>
  <body>
    ...
    <script>
      var config = {
        siteName: document.title,
        basePath: new URL(document.baseURI).pathname,
        apiBase: "http://localhost:3000/" // change the API server URL here
      };
    </script>
    ...
  </body>
```
