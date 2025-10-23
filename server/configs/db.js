import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("MongoDB Database connected🔗")
    );
    await mongoose.connect(`${process.env.MONGODB_URL}/linkup`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;