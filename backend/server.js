const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const colors = require('colors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cookieParser = require('cookie-parser');

// routes
const driversRoutes = require('./routes/api/drivers');
const logentriesRoutes = require('./routes/api/logentries');
const vehiclesRoutes = require('./routes/api/vehicles');
const dutystatusRoutes = require('./routes/api/dutystatus');
const tripsRoutes = require('./routes/api/trips');
const authRoutes = require('./routes/api/auth');
const adminRoutes = require('./routes/api/admin');

const app = express();
app.use(cookieParser());

// Connect DB
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) =>
  res.send('<h1>Welcome to the DriverLog Server App</h1>')
);

// use Routes
app.use('/api/drivers', driversRoutes);
app.use('/api/logentries', logentriesRoutes);
app.use('/api/vehicles', vehiclesRoutes);
app.use('/api/dutystatus', dutystatusRoutes);
app.use('/api/trips', tripsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

const port = process.env.PORT || 5000;

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
