require('dotenv').config();
const express = require('express');
const app = express();

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction ? { rejectUnauthorized: true } : { rejectUnauthorized: true }
});


app.use(express.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ==
app.get('/test', (req, res) => {
    // Prepare some JSON data to send
    const dataToSend = { key: 'value' };
    
    // Send JSON data to the client
    res.json(dataToSend);
  });

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});