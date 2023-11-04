const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
// const cors = require('cors');

// app.use(cors({
//     credentials:true
// }))

const app = express();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

// const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: false,
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});