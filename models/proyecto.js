import { model, Schema } from "mongoose";

const proyectoSchema = new Schema(
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
  },
  { timestamps: true }
);
export default model("Proyecto", proyectoSchema);
