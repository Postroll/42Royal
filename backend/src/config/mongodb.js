import mongoose from "mongoose";

const connectMongoDB = async () => {
   const MONGODB_URI=process.env.DB
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
};

export default connectMongoDB;