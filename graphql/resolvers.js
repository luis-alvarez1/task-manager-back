import Usuario from "../models/usuario";
import Proyecto from "../models/proyecto";
import Tarea from "../models/tarea";
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

    getTasksByProjects: async (_, { input }, ctx) => {
      const { project } = input;

      const tasks = await Tarea.find({ creator: ctx._id })
        .where("project")
        .equals(project);
      return tasks;
    },
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

      const user = await Usuario.findOne({ email });

      if (!user) {
        throw new Error("User does not exist!");
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        throw new Error("Incorrect Password!");
      }

      return {
        token: users.createToken(user, process.env.SECRET, "10hr"),
      };
    },

    newProject: async (root, { input }, ctx) => {
      try {
        const proyecto = new Proyecto(input);
        proyecto.creator = ctx._id;
        return await proyecto.save();
      } catch (error) {
        console.log(error);
      }
    },

    updateProject: async (root, { input }, ctx) => {
      const { _id } = input;

      const project = await Proyecto.findById({ _id });

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

      const project = await Proyecto.findById({ _id });

      if (!project) {
        throw new Error("Project does not exist");
      }

      if (project.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this project");
      }

      await Proyecto.findOneAndDelete({ _id }, input);

      return "Project deleted";
    },

    newTask: async (root, { input }, ctx) => {
      const { name } = input;
      const taskExist = await Tarea.findOne({
        name,
      });

      if (taskExist) {
        throw new Error("Task already exist ");
      }

      try {
        const task = new Tarea(input);
        task.creator = ctx._id;

        return await task.save();
      } catch (error) {
        console.log(error);
      }
    },
    updateTask: async (root, { input }, ctx) => {
      const { _id } = input;
      const task = await Tarea.findById({ _id });

      if (!task) {
        throw new Error("Task does not exist");
      }

      if (task.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this task");
      }

      return await Tarea.findOneAndUpdate({ _id }, input, { new: true });
    },
    removeTask: async (root, { input }, ctx) => {
      const { _id } = input;
      const task = await Tarea.findById({ _id });

      if (!task) {
        throw new Error("Task does not exist");
      }

      if (task.creator.toString() !== ctx._id) {
        throw new Error("You are not the creator of this task");
      }

      await Tarea.findOneAndDelete({ _id }, input);

      return "Task deleted";
    },
  },
};

export default resolvers;
