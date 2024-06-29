# Requirements

- Node.js v18+
- GitHub account and client
- Visual Studio Code
- Postman
- MongoDB (optional)

# Tasks

1. Fork the project into your own GitHub account (it should be kept public)

1. Install the project from your own fork and set it to run on port 3000

1. Fix `GET /items` route so that it properly returns the list of all existing items

1. Add the ability to filter the items in the `GET /items` route (propose a solution that complies with the best practices of a REST API):

   - `GET /items?filter_by=active` should return all the _active_ items
   - `GET /items?filter_by=inactive` should return all the _inactive_ items

1. Identify some basic security and stability issues, and document simple ways of correcting them (implementation is not required but is considered a bonus)

1. Create a new 'mongodb' branch of the project on GitHub: with the aim of connecting the application to a MongoDB database, which script(s) should be adapted? Propose a draft code along these lines (a fully functional implementation is not required but is considered a bonus ; the provision of a data set will be appreciated)

1. Referring to this [tutorial](https://welovedevs.com/fr/articles/postman/), add a Postman project (collections, variable if necessary) for simple testing of the API

# Notes

1. Installing missing Node.js libraries:

- To load environment variables from an .env file into your application
   - npm install dotenv 
- For creating web applications and APIs
   - npm install express

- To manage Cross-Origin Resource Sharing (CORS) security policies to define rules for sharing resources between different domains
   - npm install cors

2. Import and initialization of node js libraries in the “src/app.js” file
 ```
  require('dotenv').config();
  const helmet = require('helmet');
  const express = require('express');
  const cors = require('cors');
  const app = express();`
  ```

3. Error correction:
- Fixed initialized file name 'itemFilename' error in service 'src/items.service.js'
```  
let items = JSON.parse(
	fs.readFileSync(path.join(__dirname, 'data', itemFilename)).toString(),
);
```

4. Starting the server on port 3000
```
node server.js
```

5. Using the `await` operator to wait for a promise to resolve in the asynchronous function `getAllItems` defined in the service `items.service.js`

```
const items = await service.getAllItems();
```

6. Identify some basic security and stability issues, and document simple ways of correcting them

 - Security Middleware for Express
   
   - Our application uses `cors` to manage CORS security policies, but it lacks other security middleware like `helmet` to secure HTTP headers.
     
    Add `helmet` to our Express application to secure HTTP headers :
     
```
          npm install helmet
```

In the `src/app.js` file :

```
           ...
           const helmet = require('helmet');
           app.use(helmet());
           ...
```

  - Sensitive Error Management

     - Using `try { ... }` to control error handling, allowing code to execute the instructions defined in the `getAllItems` function of the `src/items.controller.js` controller, to capture and handle appropriately any errors that may arise.

     Editing the `src/items.controller.js` file:

```
   async function getAllItems(req, res, next) {
       try {
          // ...
       } catch (error) {
           next(error);
       }
   }
```

   - Handling unexpected errors

       - Editing the `src/app.js` file:

This allows sensitive information to be displayed only in the development environment.
```
app.use((err, req, res, next) => {
	// Filter sensitive error details
	let filteredError = { message: 'Something went wrong' };

	// Include other necessary information without disclosing sensitive details
	if (process.env.NODE_ENV === 'development') {
		filteredError.error = err.message; // Include error message only in development
		filteredError.stack = err.stack; // Include stack trace only in development
	}

	res.status(500).json(filteredError);
});
```

- Stability Issues

  - Dependency Management:

The `package.json` file contains dependencies, but it is important to ensure that they are up to date and compatible with our application.

- Use `npm audit` regularly to check dependency vulnerabilities.
- Make sure that `nodemon`, used for automatic server restart, is configured so as not to restart in a loop in case of a fatal error.

In the package.json file:
```
"scripts": {
        "start": "nodemon --exitcrash src/server.js"
    }
```

`--exitcrash` tells nodemon to exit after a crash rather than trying to restart the process in a loop. a crash.

- Asynchronous Error Management

  - Using `try-catch` blocks around asynchronous operations and `next(error)` to pass errors to Express.

    See examples of implementation of `try-catch` blocks in the `src/items.controller.js` file.

- File Management

  - File handling in `items.service.js` reads and writes synchronously, which can block the main process.

To improve file handling in the `src/items.service.js` service, we use asynchronous file operations (`fs.readFile`, `fs.writeFile`) from the `fs.promises` library to improve file handling. file management without blocking the main thread.

By applying all these fixes mentioned above, we improve the security and stability of our Node.js application.

7. connecting the application to a MongoDB database

- To connect our application to a MongoDB database, we need to modify the `items.service.js` file to use a MongoDB client and replace the current file operations with database operations.

We start by installing Mongoose, an ODM (Object-Document Mapper) library for MongoDB in Node.js:

```
npm install mongoose
```

- Creating the `Item.js` model
- Next, we adapt the code in `items.service.js`.
- Then, we modify the `app.js` file to use connectToMongoDB.
- Finally, creation of a Postman project (collections, variable) to test the API.
  
The Postman project was exported to the `documentation/postman` folder of the Node js project.

