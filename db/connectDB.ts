import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URI}/${process.env.DB_NAME}`,
    );
    console.log(
      `Connected to Database host: ${connectionInstance.connection.host}`,
    );
  } catch (err) {
    console.log(`Failed to connect to Database ${err}`);
  }
};
