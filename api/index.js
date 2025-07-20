const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configure your MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // change if needed
  user: 'your_mysql_user', // change to your MySQL user
  password: 'your_mysql_password', // change to your MySQL password
  database: 'your_database_name' // change to your database name
});

// Test connection
db.connect(err => {
  if (err) throw err;
  console.log('MySQL Connected!');
});

// Get all products
app.get('/products', (req, res) => {
  db.query('SELECT * FROM inventory', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Add a product
app.post('/products', (req, res) => {
  const { name, qty, minStock, note } = req.body;
  db.query(
    'INSERT INTO inventory (name, qty, minStock, note) VALUES (?, ?, ?, ?)',
    [name, qty, minStock, note],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: result.insertId, name, qty, minStock, note });
    }
  );
});

const PORT = 4000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`)); 