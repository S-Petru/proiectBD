require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const cors = require('cors');

const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


app.use(express.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// ==
app.get('/test', async (req, res) => {
    try {
      const { rows } = await pool.query('SELECT * FROM tabelatest');
      res.json(rows);
    } catch (error) {
      res.status(500).send('Server error');
      console.error(error);
    }
  });  

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});