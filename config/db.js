import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
const connect = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB CONECTADA");
  } catch (error) {
    console.log("hubo un error");
    console.log(error);
    process.exit(1);
  }
};
export default connect;
