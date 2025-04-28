import express from 'express';
import personRoutes from './routes/personRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/personas', personRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
