import { ApolloServer } from "apollo-server";

import resolvers from "./db/resolvers";
import typeDefs from "./db/schema";

import connect from "./config";
connect();

const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(
  ({ url }) => console.log("servidor listo en", url),
  (err) => console.log(err)
);
