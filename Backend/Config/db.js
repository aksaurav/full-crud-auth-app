import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Mongo DB connected to: ${conn.connection.host}`);
  } catch (error) {
    console.error("Mongo DB connection Error");
    process.exit(1);
  }
};

export default connectDB;
