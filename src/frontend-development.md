---
title: Building with React & Flux
draft: false
collection: Building with React & Flux
layout: layout.html
date: 2016-12-28
autotoc: true
---

Bedrock ships with React, React Router and Flux. This allows you to start using React components inside your web application. Let's walk through an example of how to use React and Flux to build client-side pages.


## Building Client-side Pages using React

1. **Create a React Component:** Create a new React page anywhere inside `frontend/assets/components/`. Let's create one called `MainPage.js`.

    ```js
    var React = require('react');

    module.exports = React.createClass({
        displayName: "MainPage",
        render() {
            return (
                <section>Main Page contents go here</section>
            );
        }
    });
    ```

2. **Create Client-side Route:** Now, let's say we want this to render when a **logged-in** user goes to the `/main` route. To do this, we will need to add a server-side route and a client-side route. To add the client-side route, we need to edit `assets/frontend/app.js`. This page lists all the client-side routes using React Router. Add the following:

    ```js
    var React = require('react');
    var ReactRouter = require('react-router');
    var Router = ReactRouter.Router;
    var Route = ReactRouter.Route;
    var hashHistory = ReactRouter.hashHistory;
    var ReactDOM = require('react-dom');
    var MainPage = require('./components/MainPage');

    var routes = (
      <Router history={hashHistory}>
        <Route path="/main" name="main" component={MainPage} />
      </Router>
    );
    ```

3. **Create Server-side Route:** This sets up React Router so that it renders `MainPage` whenever `/main` is navigated to. However, we need to also create a server-side route to the page. To add the server-side route, we will edit `config/routes.js`. Add the following line in:

    ```js
    'get /main': 'PageController.renderLoggedInReactPage'
    ```

4. **Restart Server:** The `renderLoggedInReactPage()` method is defined inside `api/controllers/PageController.js`. It just renders an empty page with a single `<div id="main">` tag that renders your React components. It also sets up some middleware (defined inside `config/policies.js`) to ensure that only logged-in users can see the page.

After completing these steps, restart the server. Then, login and go to the `/main` route. You should see the new React compoent that you just created.

## Integrating with Flux
Bedrock also ships with [NuclearJS](https://optimizely.github.io/nuclear-js/) -- a [Flux](https://facebook.github.io/flux/) library developed by Optimizely. Below, I'll demonstrate how we can use Flux stores and actions with React and React Router.

The main entry point for NuclearJS is `assets/frontend/reactor.js`. There are also some empty files created to help you define actions, action types, and getters. These live inside `assets/frontend/modules/`. 

> **Don't want NuclearJS or Flux?** You can easily swap NuclearJS for [Redux](https://github.com/reactjs/redux), or remove it completely from your project. Just edit or remove `assets/frontend/reactor.js` and `assets/frontend/modules/`. Nothing will be impacted.

You can learn more about how to build apps with React and NuclearJS on the [NuclearJS](https://optimizely.github.io/nuclear-js/) documentation. 

## Building with Webpack
To build the frontend assets inside `assets/`, run:

```
grunt build
```

This will automatically start watching for changes, and incrementally build those changes instantaneously. With the help of [Webpack](https://webpack.github.io/), your front-end code [will automatically be chunked](https://webpack.github.io/docs/code-splitting.html), so the each page will receive only the JavaScript that it needs. 

When you are building your assets for production, run `grunt buildProd` instead.



