import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Routes
import memberRoutes from './routes/members.js';
import announcementRoutes from './routes/announcements.js';
import paymentRoutes from './routes/payments.js';
import occupantRoutes from './routes/occupants.js';
import suggestionRoutes from './routes/suggestions.js';
import guardRoutes from './routes/guards.js';
import complaintRoutes from './routes/complaints.js';
import adminRoutes from './routes/admin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/members', memberRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/occupants', occupantRoutes);
app.use('/api/suggestions', suggestionRoutes);
app.use('/api/guards', guardRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});