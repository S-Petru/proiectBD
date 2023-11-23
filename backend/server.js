const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const session = require('express-session');

require('dotenv').config();
const app = express();
const port = process.env.PORT || 3001;
const databaseUrl = process.env.DATABASE_URL;

app.use(cors({
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


const pool = new Pool({
  connectionString: databaseUrl,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(bodyParser.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true in a production environment with HTTPS
  },
}));

app.use(bodyParser.json());

// Registration endpoint
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password before saving it
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Check if the user already exists
    const userCheckQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
    const userCheckValues = [username, email];
    const userCheckResult = await pool.query(userCheckQuery, userCheckValues);

    if (userCheckResult.rows.length > 0) {
      return res.status(400).json({ message: 'Username or email already exists.' });
    }

    // Insert the new user into the "users" table
    const insertUserQuery = 'INSERT INTO users (username, email, hash_parola) VALUES ($1, $2, $3)';
    const insertUserValues = [username, email, hashedPassword];
    await pool.query(insertUserQuery, insertUserValues);

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Login endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the user exists
    const userQuery = 'SELECT * FROM users WHERE username = $1';
    const userValues = [username]; 
    const userResult = await pool.query(userQuery, userValues);

    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = userResult.rows[0];

    // Compare the provided password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, user.hash_parola);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // You can send additional data or a token upon successful login if needed
    req.session.user = { username: user.username};
    res.status(200).json({ message: 'Login successful', user: req.session.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




// Endpoint to search and show info about a user's tranzactions
app.post('/api/profil/tranzactii', async (req, res) => {
  try {
    const desiredUsername = req.body.username;

    const tranzactieQuery = `
      SELECT
        users.iduser AS iduser,
        users.username AS username,
        tranzactii.idtranzactie,
        tranzactii.idmasina,
        tranzactii.data_ora
      FROM
        users
        JOIN tranzactii ON users.iduser = tranzactii.iduser
      WHERE
        users.username = $1
    `;
    
    const tranzactieValues = [desiredUsername];
    const tranzactieResult = await pool.query(tranzactieQuery, tranzactieValues);

    const transactions = tranzactieResult.rows;
    res.json(transactions);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
