import express from 'express';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('Backend online 🚀'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server in ascolto sulla porta ${PORT}`));
