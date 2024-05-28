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

1. Add the ability to filter the items in the `GET /items` route:

   - `GET /items?filter_by=active` should return all the _active_ items
   - `GET /items?filter_by=inactive` should return all the _inactive_ items

1. Identify some basic security and stability issues, and suggest simple ways of correcting them

1. Create a new 'mongodb' branch of the project. With the aim of connecting the application to a MongoDB database, which script(s) should be adapted? Propose a draft code along these lines (not necessarily functional)

1. Referring to this [tutorial](https://welovedevs.com/fr/articles/postman/), add a Postman project (collections, variable if necessary) for simple testing of the API

# Notes

- Don't forget to comment your code and to commit it to GitHub _at each step_ in order to properly keep track of the changes you made (and why you made them)
- Please document any additional steps and operations required by changes and additions to the project
