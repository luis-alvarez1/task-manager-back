import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    projects: [Project!]!
    users: [User!]!
  }

  type Mutation {
    createUser(input: UsuarioInput): String
    authUser(input: AuthInput): Token
    newProject(input: ProjectInput): Project
    updateProject(input: UpdateProjectInput): Project
    removeProject(input: RemoveProjectInput): String
  }
  type Token {
    token: String!
  }

  type User {
    name: String!
    email: String!
  }
  type Project {
    _id: ID!
    name: String!
    creator: ID!
  }

  input UsuarioInput {
    name: String!
    email: String!
    password: String!
  }

  input AuthInput {
    email: String!
    password: String!
  }

  input ProjectInput {
    name: String!
  }
  input UpdateProjectInput {
    _id: ID!
    name: String!
  }
  input RemoveProjectInput {
    _id: ID!
  }
`;
export default typeDefs;
