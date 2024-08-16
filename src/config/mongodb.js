import mongoose from "mongoose";


const connectDB = async () => {

    mongoose.connection.on('connected', ()=> {
        console.log("mongoDB connection established");
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/ABG_vibes`)
}


export default connectDB;