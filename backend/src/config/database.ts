import mongoose from "mongoose";

export const connectToDatabase = async (mongoUri: string ) : Promise<void> => {
    try {
        await mongoose.connect(mongoUri)
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};


