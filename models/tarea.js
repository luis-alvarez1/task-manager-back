import { model, Schema } from "mongoose";

const tareaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Proyecto",
    },

    state: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
export default model("Tarea", tareaSchema);
