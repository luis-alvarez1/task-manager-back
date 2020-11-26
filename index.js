import { ApolloServer } from "apollo-server";
import jwt from "jsonwebtoken";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/schema";
import connect from "./config/db";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
connect();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers["authorization"] || "";
    if (token) {
      try {
        const user = jwt.verify(token, process.env.SECRET);

        return user;
      } catch (error) {
        console.log(error);
      }
    }
  },
});
server.listen().then(
  ({ url }) => console.log("servidor listo en", url),
  (err) => console.log(err)
);
