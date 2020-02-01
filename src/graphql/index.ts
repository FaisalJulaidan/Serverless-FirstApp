import { resolvers, schema } from './schema';

const { ApolloServer } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // context: async ({ event }) => {
    //     console.log('getting user');
    //     const user = await getPayload(event.headers.Authorization);
    //     return {
    //         user,
    //     };
    // },
});

exports.handler = server.createHandler({
    cors: {
        origin: true,
        credentials: true,
    },
});
