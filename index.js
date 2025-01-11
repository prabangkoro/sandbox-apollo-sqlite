const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users(limit: Int, offset: Int, search: String): [User!]!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
  }
`;

const resolvers = {
    Query: {
        users: async (_, { limit, offset, search }) => {
            const whereClause = search
                ? {
                    OR: [
                        { name: { contains: search } },
                        { email: { contains: search } },
                    ],
                }
                : {};
            return await prisma.user.findMany({
                take: limit || 10,
                skip: offset || 0,
                where: whereClause,
            });
        }
    },
    Mutation: {
        createUser: async (_, { name, email }) =>
            await prisma.user.create({
                data: { name, email },
            }),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
});
