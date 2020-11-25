import { PrismaClient } from "@prisma/client";
import { GraphQLServer } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";


const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const prisma = new PrismaClient();

const server = new GraphQLServer({
  schema,
  context: {
    prisma,
  },
});

const options = {
  port: 8000,
  endpoint: "/graphql",
  subscriptions: "/subscriptions",
  playground: "/playground",
};
server.start(options, ({ port }) =>
  console.log(
    `Server started, listening on port ${port} for incoming requests.`
  )
);
