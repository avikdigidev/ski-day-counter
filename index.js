const {ApolloServer, gql} = require("apollo-server");

const typeDefs = gql
        `
        type SkiDay{
            id: ID!
            date: String!
            mountain: String!
            conditions: Conditions
        }
        type Query{
            totalDays : Int!
            allDays: [SkiDay]!

        }

        enum Conditions{
            POWDER
            HEAVY
            ICE
            THIN
        }

        input AddDayInput {
            date: String!
            mountain: String!
            conditions: Conditions

        }

        type Mutation {
            addDay(input: AddDayInput!): SkiDay

            removeDay(id: ID!): SkiDay!
        }

    `;
/*
in Mutation we have to return something, in here we are returning SkiDay but it can be anything
*/

/*const resolvers = {

}*/

const server = new ApolloServer({
    typeDefs,
    mocks: true
})

server.listen().then(({url}) => console.log(`Server running at ${url}`));


