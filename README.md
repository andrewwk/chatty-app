Chatty App
=====================

# Project Description
Many of the web applications that you use today have real-time functionality where the user does not have to reload the page in order to see updates. Major examples of these include Slack, Twitter and Facebook.

Chatty will allow users to communicate with each other without having to register accounts. It will use React, a popular front-end library created and used heavily by Facebook as well as modern tools for Node including Webpack and Babel.

### Additional Features
1. Notifity users of username change. (Completed)
2. Display the number of clients connected to the server/display the number of current users. (Completed)
3. Assign a random colour to each user/connection. The colour will not change, even if the username is change. (Completed)
4. Allow users to post image urls and display the images within the chat application. (In Progress)

# Learning Objectives
1. Can explain what the "Virtual Dom" is and how it works
2. Can explain benefits of using a Virtual DOM
3. Can explain how React uses a Virtual DOM
4. Can understand Component Lifecycles
5. Can successfully use Web Sockets to allow multiple users to send and receive messages inside of a single page, chat        
   application.

### Getting Started

Clone the boilerplate and create your own git repo.

```
git clone git@github.com:lighthouse-labs/react-simple-boilerplate.git
git remote rm origin
git remote add origin [YOUR NEW REPOSITORY]
# Manually update your package.json file
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
