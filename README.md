# E-Commerce-App-Portfolio-Project
An E-commerce application REST API that allows users to perform various CRUD operations such as registering an account, browsing and purchasing products.


### Technologies
<div>
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" title="JavaScript" alt="JavaScript" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="NodeJS" alt="NodeJS" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/git/git-original-wordmark.svg" title="Git" **alt="Git" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/postgresql/postgresql-original.svg" title="PostgreSQL" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original-wordmark.svg" title="Express.js" width="40" height="40"/>&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/npm/npm-original-wordmark.svg" title="NPM" width="40" height="40"/>&nbsp;
  
</div>


### Dependencies
   - bcrypt: ^5.1.0,
   - body-parser: ^1.20.2,
   - cookie-parser: ^1.4.6,
   - cors: ^2.8.5,
   - dotenv: ^16.0.3,
   - express: ^4.18.2,
   - express-session: ^1.17.3,
   - express-validator: ^7.0.1,
   - helmet: ^7.0.0,
   - pg: ^8.11.0,
   - validator: ^13.9.0 <br>
 dev-dependencies:
   - morgan: ^1.10.0,
   - nodemon: ^2.0.22

### Getting Started
To get started, you must have the latest version of node.js and postqresql installed on your machine.


### Installation
1. First, run the command:
**npm install** To install all the dependencies required for the project.

2. Second, run all the CREATE TABLE queries in db.sql in a postgresql database client, and add some data to the products table.

3. Then, in user.env, fill in the following environment variables: <br>
PORT - The port on which the Express.js server will listen on <br>
SESSION_SECRET - Your session secret <br>
DATABASE - Your database's name <br>
DATABASE_HOST - The host name you used to connect to your database <br>
DATABASE_PORT - The port on which your database is connected to <br>
DATABASE_USER - The user name you used to connect to your database <br>
DATABASE_PASSWORD - The password you used to connect to your database <br>

### Runing The Application
First, make sure that postgresql is started. Then, In the root directory of the project, type 
**npm start** in the terminal to get the project running.


### Acknowledgements
This is a portfolio project from Codecademy's Full-Stack Engineer Career Path.
