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

app.options('*', cors());

app.use(cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:5173", process.env.FRONTEND_ADMIN_URL || "http://localhost:5174"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], 
    credentials: true
}));


app.use(express.static('public')); // 'public' is your directory for static files


//initializing routes
app.use("/api/song", songRouter)
app.use("/api/album", albumRouter)
app.use("/api/user", userRouter)
app.use('/api/playlist', playlistRouter);




app.get('/', (req, res) => res.send("API Working"))


app.listen(port, ()=> console.log(`Server started on ${port}`))