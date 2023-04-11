import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();
const app = express();

if (process.env.NODE_ENV==="development"){
  app.use(morgan("dev"));
}

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json())

// Define routes
app.get('/', (req, res) => {
  res.send('Hello, world!');
});
 