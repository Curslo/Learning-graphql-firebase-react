const graphql = require("graphql");

const {GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql;

const _ = require('lodash')

//Dummy data
var books = [
    {name: 'Name of the wind', genre: 'Fantacy', id: '1'},
    {name: 'The final empire', genre: 'Fantacy', id: '2'},
    {name: 'The long earth', genre: 'Sci-fi', id: '3'}
]

var authors = [
    {name: "Patrich Rothfuss", age: 44, id: "1"},
    {name: "Brandon Sunderson", age: 42, id: "2"},
    {name: "Terry Pratchet", age: 66, id: "3"}
]

const BookType = new GraphQLObjectType({
    name : 'Book',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString}
    })

})

const AuthorType = new GraphQLObjectType({
    name : 'Author',
    fields : () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt}
    })

})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                //Code to get data from db/ other source
                // console.log(typeof(args.id))
                return _.find(books, {id: args.id});
                
            }
        },
        auther: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => {
                //Code to get data from db/ other source
                // console.log(typeof(args.id))
                return _.find(authors, {id: args.id});
                
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})