import mongoose from "mongoose";

const connectDB = async () => {
    // Event listener for successful connection
    mongoose.connection.on('connected', () => {
        console.log("MongoDB connection established");
    });

    // Extract the MongoDB URI from environment variables
    const dbName = 'ABG_vibes'; // Ensure this is a valid database name without slashes
    const uri = `${process.env.MONGODB_URI}/${dbName}`;

    // Connect to MongoDB using the constructed URI
    try {
        await mongoose.connect(uri);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process if the connection fails
    }
};

export default connectDB;
