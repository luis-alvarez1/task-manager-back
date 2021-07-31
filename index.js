import { ApolloServer } from 'apollo-server';
import jwt from 'jsonwebtoken';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import connect from './config/db';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
connect();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  context: ({ req }) => {
    const token = req.headers['authorization'] || null;
    if (token) {
      try {
        const user = jwt.verify(
          token.replace('Bearer ', ''),
          process.env.SECRET,
        );
        return user;
      } catch (error) {
        console.log(error);
      }
    }
  },
});

const port = process.env.PORT || 1000;

server.listen(port).then(
  ({ url }) => console.log('servidor listo en', url),
  (err) => console.log(err),
);
