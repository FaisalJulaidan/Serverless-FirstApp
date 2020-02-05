import { resolvers, schema } from './schema';

const { ApolloServer } = require('apollo-server-lambda');

// Construct a schema, using GraphQL schema language
const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: ({ event }) => {
		console.log('getting user');
		const user = event.requestContext.authorizer.claims;
		return {
			user,
		};
	},
});

exports.handler = server.createHandler({
	cors: {
		origin: true,
		credentials: true,
	},
});
