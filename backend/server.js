const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

// app.use(cors({
//     credentials:true
// }))

// const getComments = () => {
//     const config = {
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
  
//       },
//       method: "GET",
//       url: `${url}/all`,
//       withCredentials: true,
//     };
//     return axios(config)
//       .then(serviceHelper.onGlobalSuccess)
//       .catch(serviceHelper.onGlobalError);
//   };

const allowedOrigins = ['http://localhost:3000', 'https://proiect-bd.onrender.com/'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));

// const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: databaseUrl,
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