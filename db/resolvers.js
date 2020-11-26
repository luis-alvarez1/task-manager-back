import Usuario from "../models/usuario";

const resolvers = {
  Query: {},
  Mutation: {
    createUser: async (_, { input }, ctx) => {
      const { email, password } = input;

      const userExist = await Usuario.findOne({
        email,
      });

      if (userExist) {
        throw new Error("User already exist ");
      }

      try {
        const newUser = new Usuario(input);
        newUser.save();

        return "User Created";
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;
