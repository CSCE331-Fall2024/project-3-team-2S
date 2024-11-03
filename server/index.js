const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Set up the PostgreSQL connection pool
const pool = new Pool({
  user: process.env.PSQL_USER,
  host: process.env.PSQL_HOST,
  database: process.env.PSQL_DATABASE,
  password: process.env.PSQL_PASSWORD,
  port: process.env.PSQL_PORT,
  ssl: { rejectUnauthorized: false },
});

// Food Items API
app.get('/api/fooditems', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM fooditems ORDER BY foodid');
      res.json(result.rows);
    } catch (error) {
      console.error('Error executing query:', error.stack);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/fooditems', async (req, res) => {
  const { foodid, name, category, calories, isgf, isvegetarian, isspicy, ispremium, imagesrc } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO fooditems (foodid, name, category, calories, isgf, isvegetarian, isspicy, ispremium, imagesrc)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [foodid, name, category, calories, isgf || false, isvegetarian || false, isspicy || false, ispremium || false, imagesrc]
    );

    res.status(201).json({ message: 'Food item added successfully', newItem: result.rows[0] });
  } catch (error) {
    console.error('Error adding food item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.delete('/api/fooditems/:foodid', async (req, res) => {
  const { foodid } = req.params;

  try {
    const result = await pool.query('DELETE FROM fooditems WHERE foodid = $1 RETURNING *', [foodid]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.status(200).json({ message: 'Food item deleted successfully', deletedItem: result.rows[0] });
  } catch (error) {
    console.error('Error deleting food item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Inventory API
app.get('/api/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory_tb ORDER BY ingrid');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// app.put('/api/inventory/:ingrid', async (req, res) => { // edit
//   const { ingrid } = req.params;
//   const { ingredient, quantity } = req.body;

//   try {
//     const result = await pool.query(
//       `UPDATE inventory_tb SET ingredient = $1, quantity = $2 WHERE ingrid = $3 RETURNING *`,
//       [ingredient, quantity, ingrid]
//     );

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'Inventory item not found' });
//     }

//     res.status(200).json({ message: 'Inventory item updated successfully', updatedItem: result.rows[0] });
//   } catch (error) {
//     console.error('Error updating inventory item:', error.stack);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// app.delete('/api/inventory/:ingrid', async (req, res) => { // delete
//   const { ingrid } = req.params;

//   try {
//     const result = await pool.query('DELETE FROM inventory_tb WHERE ingrid = $1 RETURNING *', [ingrid]);

//     if (result.rowCount === 0) {
//       return res.status(404).json({ message: 'Inventory item not found' });
//     }

//     res.status(200).json({ message: 'Inventory item deleted successfully', deletedItem: result.rows[0] });
//   } catch (error) {
//     console.error('Error deleting inventory item:', error.stack);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });


// Login endpoint
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 AND password = $2',
      [username, password]
    );

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Express server is working!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.send('Welcome to the Express server!');
  });
  
// Shutdown hook for pool
process.on('SIGINT', () => {
  pool.end(() => {
    console.log('Pool has ended');
  });
  process.exit(0);
});
