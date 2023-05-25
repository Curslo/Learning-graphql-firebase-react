//Import graphql
const graphql = require("graphql");

//Define certain variables required from graphql
const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql;

//Import lodash to help in database management
const _ = require('lodash')

//Dummy data
var books = [
    {name: 'Name of the wind', genre: 'Fantacy', id: '1', authorid: '1'},
    {name: 'The final empire', genre: 'Fantacy', id: '2', authorid: '2'},
    {name: 'The long earth', genre: 'Sci-fi', id: '3', authorid: '3'},
    {name: 'The hero of ages', genre: 'Fantacy', id: '4', authorid: '2'},
    {name: 'The color of magic', genre: 'Fantacy', id: '5', authorid: '3'},
    {name: 'The light fantastic', genre: 'Fantacy', id: '6', authorid: '3'}
]

var authors = [
    {name: "Patrich Rothfuss", age: 44, id: "1"},
    {name: "Brandon Sunderson", age: 42, id: "2"},
    {name: "Terry Pratchet", age: 66, id: "3"}
]

//Define a new graphql object type called book
const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve: (parent, args) => {
                // console.log(parent)
                return _.find(authors, {id: parent.authorid})
            }
        }
    })

})

//Define a new graphql object type called Author
const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return _.filter(books, {authorid: parent.id})
            }
        }
    })

})

//Define the root query used to query data from the database
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        //The first RootQueryType used to query for a book
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                //Code to get data from db/ other source
                // console.log(typeof(args.id))
                return _.find(books, {id: args.id});
                
            }
        },
        //The first RootQueryType used to query for am auther
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                //Code to get data from db/ other source
                // console.log(typeof(args.id))
                return _.find(authors, {id: args.id});
                
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => {
                return books;
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve: (parent, args) => {
                return authors;
            }
        }
    }
})
//Export the rootquery 
module.exports = new GraphQLSchema({
    query: RootQuery
})