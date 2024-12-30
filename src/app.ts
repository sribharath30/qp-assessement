import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth-routes';
import adminRoutes from './routes/admin-routes';
import userRoutes from './routes/user-routes';

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

export default app;
