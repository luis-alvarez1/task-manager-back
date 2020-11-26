import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    name: String
    email: String
  }
  input UsuarioInput {
    nombre: String!
    email: String!
    password: String!
  }
  type Email {
    email: String
  }

  type Query {
    getUsers: [User]
    getEmails: [Email]
  }

  type Mutation {
    createUser(input: UsuarioInput): String
  }
`;
export default typeDefs;
