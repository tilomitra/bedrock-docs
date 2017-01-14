---
title: User Authentication
draft: false
collection: User Authentication
layout: layout.html
date: 2016-12-26
autotoc: true
---
## User Authentication
Bedrock lets you set up a web application with user authentication (login, signup, and reset password pages) in under 5 minutes. I strongly recommend [viewing the Youtube screencast](https://www.youtube.com/watch?v=EdUuhdbhfDo) where I walk through the entire process, or read on below to find more details on how things work under the hood.

## What does Bedrock provide?
Bedrock comes with all the code you need to setup a local user signup and login flow. It does this by using [PassportJS](http://passportjs.org) under the hood to setup a local user authentication strategy. It also gives you a few other things for free:

### Routes
Bedrock sets up the necessary routes that are necessary for user login, signup, and password reset. These are all defined inside `config/routes.js`.

### Controllers and Services
All necessary logic to facilitate logging in, signing up, and resetting passwords is defined in `/api/controllers/AuthController.js`. The controller calls the Passport service located at `api/services/Passport.js`. Services are just singletons that are available to any controller. 

### Policies (Middleware)

> **What are policies?** Policies in Sails are the same as "middleware" in traditional Express applications. They are versatile tools for authorization and access control-- they let you allow or deny access to your controllers down to a fine level of granularity. 
[Learn more about how middleware works](http://sailsjs.com/documentation/concepts/policies).

Bedrock provides middleware to ensure that a user is logged in. You can find this middleware in `api/policies/passport.js` and `/api/policies/sessionAuth.js`.

The `passport` policy initializes a session, and the `sessionAuth` policy ensures that a request is authenticated. You should include both if you are creating pages behind an authentication wall. For example, you may want to write something like this:

```
'PageController': {
    // The page at PageController.js#everyone() is available to everyone.
    everyone: true
    // The page at PageController.js#onlyLoggedIn() is only available to logged in users.
    onlyLoggedIn: ['passport', 'sessionAuth']
}
```

### Views
Bedrock provides the necessary views for the login, signup, reset password pages. These views are located in `views/pages/*.handlebars`. 


## Setup user authentication for your project
To enable user authentication, you just have to tell Bedrock what database you are using and how to connect to it. You want to provide this information in `config/connections.js`.

If you're using MySQL, you can update the `mysql` object:
```
mysql: {
    adapter: 'sails-mysql',

    //update these values
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'bedrock'
}
```

If you are using another database like Mongo, Postgres, Redis, etc. check the comments inside `config/connections.js` to see code snippets on how to setup your database connections. They look very similar to the code snippet above.

After setting up the database connections, you need to run a migration. To do that, run this command:

```
grunt db:migrate:up
```

This will create three database tables in your newly connected database:

- **Users**: Will store all user information
- **Passports**: Will store passwords, API access tokens and other authentication-related information
- **migrations**: Will store a list of all migrations that have been run.

> **What are migrations?** Migrations are important in production web applications as they let you specify database changes in a systematic and retraceable way. [Learn more about migrations]('http://nodewebapps.com/2016/12/20/how-to-update-database-schema-for-a-production-web-app/') and how they work in Bedrock.

After running the migrations, you should get a success message in your terminal window. At that point, start up the server:

```
sails lift
```

## Check if things are working
Then, visit [http://localhost:1337/signup](http://localhost:1337/signup), and create an account. Verify that a new entry was created in the `Users` and `Passports` table. If so, login with your new credentials. You should see a logged in page! Try logging out, and you should be back on the Login page!


## Setup Emails to Reset Passwords
At this point, the login and signup flow should be working but if a user forgets their password, they won't be able to receive a new one. To accomplish this, you need to tell Bedrock how to send emails. 

This is covered in the tutorial on [How to send emails in Sails & Bedrock](http://nodewebapps.com/2016/12/21/how-to-send-emails-in-sails-bedrock/) over on Node Web Apps.
