import express from 'express';
import ConnectToDB from './config/db.js';
import { PORT } from './config/env.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contractRoutes from './routes/contactRoutes.js';
import cros from 'cors';


const app = express();

app.use(cros());
app.use(express.json());

ConnectToDB();

app.use('/storage', express.static('storage'));

app.use('/user', userRoutes);

app.use('/blog', blogRoutes);

app.use('/contact', contractRoutes);

app.get('/', (req, res) => { return res.status(200).json({ status: 'success', message: 'Server running fine!' }) });

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})