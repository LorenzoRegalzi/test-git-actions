import express from 'express';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,             
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use("/api/products", productRoutes);

app.get('/', (req, res) => res.send('Backend online 🚀'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
