# shopify-graphql
GraphQL API for data retrieved from Shopify API.

# Steps to run #

### 1. Install packages ###
`npm install `

### 2. Configure knexfile.js in ./db/: ###

##### In ./db/knexfile.js, replace empty strings with relevant data #####
```
module.exports = {
  development: {
    client: "",
    connection: {
      database: "",
      user: "",
      password: "",
    },
 ...
```
Where database is your local database name, user is dbuser, and password is the user account's password.

### 3. Run the scripts ###
Add the following to your package json if it does not exist. 

```
"scripts": {
    "server": "nodemon server.js",
    "start": "node server.js",
    "migrate": "knex migrate:latest --knexfile ./db/knexfile.js",
    "rollback": "knex migrate:rollback --knexfile ./db/knexfile.js",
    "make-dummy-seed": "knex seed:make dummy --knexfile ./db/knexfile.js",
    "dummy-seed": "knex seed:run --knexfile ./db/knexfile.js",
  },
```
And run in the following order.

1. `npm run migrate`
2. `npm run dummy-seed`

### NOTE: You can always rollback the migration with `npm run rollback` ###

### 4. Test the API ###
`npm run server`
By default the server is hosted at: `localhost:8080`

1. The mock API call is at `localhost:8080/product/getProducts`
This will populate the filtered product and product variant tables. 

2. GraphQL API: `localhost:8080/graphql`

### NOTE: Make sure nodemon package is installed. ###


