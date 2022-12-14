const {ApolloServer, gql} = require("apollo-server");
const { MockList } = require('@graphql-tools/mock');
const typeDefs = gql
        `
        
        scalar Date
        """
        An object that describes the characteristics of a ski day
        """
        type SkiDay{
            "A ski day is a unique identifier"
            id: ID!
            "the date that a ski day occurred"
            date: Date!
            "the location where a ski day occurred"
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
            date: Date!
            mountain: String!
            conditions: Conditions

        }
        
        type RemoveDayPayload{
            day: SkiDay!
            removed: Boolean
            totalBefore: Int
            totalAfter: Int
        }

        type Mutation {
            addDay(input: AddDayInput!): SkiDay
            removeDay(id: ID!): RemoveDayPayload!
        }

    `;
/*
in Mutation we have to return something, in here we are returning SkiDay but it can be anything
*/

/*const resolvers = {

}*/
const mocks = {
    Date: () => "1/2/2025",
    String: () => "Cool Data",
    Query: () =>  ({ allDays: () => new MockList([1,15]) })
};
const server = new ApolloServer({
    typeDefs,
    mocks: mocks
});

server.listen().then(({url}) => console.log(`Server running at ${url}`));


