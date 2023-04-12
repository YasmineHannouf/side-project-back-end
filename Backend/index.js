import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import connectDB from '../Backend/config/db.js';
import adminRouter from "../Backend/routes/adminRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";

dotenv.config();
const app = express();

if (process.env.NODE_ENV==="development"){
  app.use(morgan("dev"));
}

connectDB()

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use('/api/admin',adminRouter);
app.use('/api/category',categoryRouter);
app.use('api/products',productRouter);


// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
 