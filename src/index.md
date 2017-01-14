---
title: Bedrock
draft: false
collection: Get Started
layout: layout.html
date: 2016-12-24
autotoc: true
---
## About Bedrock
Bedrock lets you set up a production-ready Node web application in under 10 minutes. It is a collection of popular frameworks that work well together. It is great for dashboards, CRUD webapps, and more.

> #### [Watch a video showing how to get a production-ready web app with user authentication set up in 5 minutes using Bedrock](https://www.youtube.com/watch?v=EdUuhdbhfDo)

<iframe width="100%" height="315" src="https://www.youtube.com/embed/EdUuhdbhfDo" frameborder="0" allowfullscreen></iframe>

## Features

### Server-side Features
Bedrock is built on [Sails](http://sailsjs.org), which is a popular MVC Framework that is built on Express. It has all of the great features that Sails ships with, such as:

- Reusable Security Policies (Middleware)
- Configurable via a global `sails.config` object.
- Encourages use of reusable services.
- Waterline ORM that works well with multiple popular databases such as MySQL, Postgres, Mongo, etc.
- Follows MVC conventions, which keeps your code organized as your project grows.
- Auto-generates simple REST APIs based on your models, using Blueprint.
- It is just an Express server under the hood, so all Express modules still work.

> [Check out all the features](http://sailsjs.com/features) on the Sails documentation page.

On top of the Sails features, Bedrock adds in a few nice-to-haves on the server side:

- All the code you need to setup user authentication flow
- Support for Database Migrations
- Configure the server for various `NODE_ENV` such as development, staging, and production

### Frontend Features
Bedrock hooks up React, Flux, and React Router to make frontend development very enjoyable. Here are the features that you get:

- React Routing is setup, so you can just start building components and routes
- NuclearJS is Bedrock's Flux Library, and its project directory is setup with the necessary files.
- Webpack is used to watch and build the JavaScript and [chunk it](https://webpack.github.io/docs/code-splitting.html) so pages don't end up with unneccessary code. 

You can learn more about Bedrock's frontend stack on the [Frontend Development with Bedrock]() page. 

## Quickstart
Bedrock is the *starting point* of your Node application. To install, you should clone the project, and then build on top of it.

```
git clone ... <project-name>
cd <project-name>
npm install
```

### Configure Database Connection
Go into `config/connections.js`. Update the `mysql` connection details. At this point, you may need to create a new database.

If you want to use a different database (PostgreSQL or Mongo), remove the `mysql` connection, and create a new connection, as shown in the comments in the file.

If you don't want any database, you can just remove everything in `config/connections.js` but understand that user authentication won't work. 

### Migrate database tables
Bedrock sets up authentication for your server, and creates Login, Signup, and Reset password pages. It uses PassportJS to accomplish this.

To facilitate this, you need to run a migration to create the `Users` and `Passports` table. Just run this from the command line:

```
grunt db:migrate:up
```
After it runs, check your database and you should see `Users` and `Passports` table created.

We will talk more about migrations in the Best Practices section.

### Build JS/CSS assets
Bedrock uses Grunt to build the CSS and JS assets. To build, just run:

```
grunt build
```

This will run the CSS and JS assets using Webpack. It will also start watching for CSS and JS changes.

### Run the server
To run the server, run:

```
sails lift
```

By default, it will start up the server on port 1337. To configure the PORT or NODE_ENV, you can prefix those variables:

```
NODE_ENV=staging PORT=9999  sails --debug lift
```

## Built With
Bedrock is composed of these open-source frameworks.

[Sails](http://sailsjs.com/): Sails makes it easy to build custom, enterprise-grade Node.js apps. It is designed to emulate the familiar MVC pattern of frameworks like Ruby on Rails, but with support for the requirements of modern apps: data-driven APIs with a scalable, service-oriented architecture

[React](https://facebook.github.io/react/): A JavaScript Library for building user interfaces

[React Router](https://github.com/ReactTraining/react-router): React Router is a complete routing library for React.

[NuclearJS](https://github.com/optimizely/nuclear-js): Traditional Flux architecture built with ImmutableJS data structures. Very similar to Redux.

[Webpack](https://webpack.github.io/): A module bundler for front-end assets. It is used in Bedrock for chunking JavaScript files to be loaded on demand.

