import Usuario from "../models/usuario";
import Proyecto from "../models/proyecto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { users } from "../helpers/index";

dotenv.config({ path: ".env" });

const resolvers = {
  Query: {
    projects: async (_, {}, ctx) => {
      return await Proyecto.find({ creator: ctx._id });
    },
    users: async () => await Usuario.find(),
  },
  Mutation: {
    createUser: async (root, { input }, ctx) => {
      const { email, password } = input;

      const userExist = await Usuario.findOne({
        email,
      });

      if (userExist) {
        throw new Error("User already exist ");
      }

      try {
        const salt = await bcrypt.genSalt(10);
        input.password = await bcrypt.hash(password, salt);

        const newUser = new Usuario(input);
        await newUser.save();

        return "User Created";
      } catch (error) {
        console.log(error);
      }
    },

    authUser: async (root, { input }, ctx) => {
      const { email, password } = input;

      const lastUser = await Usuario.findOne({ email });

      if (!lastUser) {
        throw new Error("User does not exist!");
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        lastUser.password
      );
      if (!isPasswordCorrect) {
        throw new Error("Incorrect Password!");
      }

      return {
        token: users.createToken(lastUser, process.env.SECRET, "2hr"),
      };
    },

    newProject: async (root, { input }, ctx) => {
      try {
        const proyecto = new Proyecto(input);
        console.log(ctx._id);
        proyecto.creator = ctx._id;
        return await proyecto.save();
      } catch (error) {
        console.log(error);
      }
    },

    updateProject: async (root, { input }, ctx) => {
      const { _id } = input;

      let project = await Proyecto.findById({ _id });

      if (!project) {
        throw new Error("Project does not exist");
      }

      if (project.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this project");
      }

      return await Proyecto.findOneAndUpdate({ _id }, input, { new: true });
    },
    removeProject: async (root, { input }, ctx) => {
      const { _id } = input;

      let project = await Proyecto.findById({ _id });

      if (!project) {
        throw new Error("Project does not exist");
      }

      if (project.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this project");
      }

      await Proyecto.findOneAndDelete({ _id }, input);

      return "Project deleted";
    },
  },
};

export default resolvers;
