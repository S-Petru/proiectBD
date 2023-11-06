const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

app.use(cors({
    origin: '*',
  }));

const pool = new Pool({
  connectionString: databaseUrl,
});

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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});