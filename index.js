require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./utils/db');
const routes = require('./routes/api.route');
const morgan = require('./utils/morgan.js');
const cors = require('cors');
const logger = require('./utils/winston');

//Initialize Middlewares
app.use(express.json());
app.use(cors());
app.options('*', cors());
if (process.env.MODE !== 'production') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Define Routes
app.get('/', (req, res) => {
  res.status(200).json({CTS: 'Up and running'});
});

app.use('/api', routes);

// Start Server
connectDB()
  .then(() => {
    app.listen(5000, () => console.log('Server is listening on 5000'));
  })
  .catch(err => {
    logger.error('Failed to start server due to database connection failure\n%s', err.message);
  });
