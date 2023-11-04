require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // If you're using SSL, you might need the following option:
  // ssl: { rejectUnauthorized: false },
});

app.use(express.json());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is running on port ${PORT}");
});