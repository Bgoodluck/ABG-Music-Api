import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import songRouter from './src/routes/songRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import albumRouter from './src/routes/albumRoute.js';
import userRouter from './src/routes/userRoute.js';
import playlistRouter from './src/routes/playlistRoute.js';


//app config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();


//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: ["https://abgvibes-bgoodlucks-projects.vercel.app", "https://abgvibes-admin.vercel.app/list-music"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
    credentials: true
}));

//initializing routes
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/user", userRouter)
app.use('/api/playlist', playlistRouter);




app.get('/', (req, res) => res.send("API Working"))


app.listen(port, ()=> console.log(`Server started on ${port}`))