//Import express used to setup our server
const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

//Import express-graphql middleware used to make express understand graphql
const {graphqlHTTP} = require('express-graphql');

//Import graphql schema from ./schema/schema.js
const schema = require('./schema/schema');

//Initialize the express app
const app = express();

//Allow cross-origin request
app.use(cors)

mongoose.connect('mongodb+srv://richardkisivii:AyUTekgzHvUcQYHG@cluster0.vnughlv.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
    console.log('Connected to the datbase');
})
const pass = 'AyUTekgzHvUcQYHG'
//Define a route /graphql with the method graphqlHTTP()
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  //Used to test qraphql queries from the client side
}))

//Define a port number for express to listen to
app.listen(4000, () => {
    console.log('Now listening for request on port 4000');
})