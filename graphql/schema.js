import { gql } from "apollo-server";

const typeDefs = gql`
  type Query {
    projects: [Project!]!
    users: [User!]!
    getTasksByProjects(input: IDProjectInput): [Task!]!
  }

  type Mutation {
    """
    USUARIOS
    """
    createUser(input: UsuarioInput): String
    authUser(input: AuthInput): Token

    """
    PROYECTOS
    """
    newProject(input: ProjectInput): Project
    updateProject(input: UpdateProjectInput): Project
    removeProject(input: RemoveProjectInput): String

    """
    TAREAS
    """
    newTask(input: TaskInput): Task
    updateTask(input: TaskInputUpdate): Task
    removeTask(input: TaskInputRemove): String
  }

  type Token {
    token: String!
  }

  type Task {
    _id: ID!
    name: String!
    state: Boolean
    project: String!
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
    _id: ID
    name: String
  }
  input RemoveProjectInput {
    _id: ID!
  }
  input IDProjectInput {
    project: String!
  }
  input TaskInput {
    name: String!
    project: String!
  }

  input TaskInputUpdate {
    _id: ID!
    name: String
    project: String
    state: Boolean
  }

  input TaskInputRemove {
    _id: ID!
  }
`;
export default typeDefs;
