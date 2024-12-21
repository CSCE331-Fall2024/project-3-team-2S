const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 3001;
// const port = 3000;

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

app.get('/api/fooditems/:id', async (req, res) => {
  const foodID = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM fooditems WHERE foodid = $1', [foodID]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching food item:', error);
    res.status(500).json({ message: 'Server error' });
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

app.post('/api/query', async (req, res) => {
  const { sql, params } = req.body;

  // Basic validation to restrict to SELECT statements
  if (!sql.trim().toLowerCase().startsWith('select')) {
    return res.status(400).json({ message: 'Only SELECT queries are allowed' });
  }

  try {
    const result = await pool.query(sql, params || []);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing dynamic query:', error.stack);
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


app.get('/api/getmenuitems', async (req, res) => {
  const { ordernum } = req.params;

  try {
    const result = await pool.query('SELECT * from menuitems where ordernum = $1', [ordernum]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/getorders', async (req, res) => {
  try {
    const result = await pool.query('SELECT orders.ordernum AS ordernum, customer.name AS name, COALESCE(SUM(GREATEST(menuitems.price, 0)), 0) AS price FROM orders JOIN customer ON orders.customerid = customer.customerid LEFT JOIN menuitems ON orders.ordernum = menuitems.ordernum WHERE orders.timecompleted IS NULL GROUP BY orders.ordernum, customer.name ORDER BY orders.ordernum; ');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});



app.post('/api/send-order', async (req, res) => {
  const orders = req.body;

  try {
    await pool.query('BEGIN');

    // Get the next order number
    const result = await pool.query('SELECT MAX(ordernum) AS highest_ordernum FROM orders');
    const nextOrderNum = result.rows[0].highest_ordernum + 1;

    // Insert each order item (excluding the last one)
    for (let i = 0; i < orders.length - 1; i++) {
      const { price, name, foodid1, foodid2, foodid3, foodid4 } = orders[i];

      await pool.query(
        `INSERT INTO menuitems (ordernum, price, name, foodid1, foodid2, foodid3, foodid4)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [nextOrderNum, price, name, foodid1, foodid2, foodid3, foodid4]
      );
    }

    // Extract customer and employee information from the last item in the array
    const { customerid, employeeid } = orders[orders.length - 1];

    // Insert into orders table with timecompleted as NULL
    await pool.query(
      `INSERT INTO orders (ordernum, customerid, employeeid, timecompleted)
       VALUES ($1, $2, $3, NULL)`,
      [nextOrderNum, customerid, employeeid]
    );

    // Insert into orders table with timecompleted as NOW
    // await pool.query(
    //   `INSERT INTO orders (ordernum, customerid, employeeid, timecompleted)
    //    VALUES ($1, $2, $3, NOW())`,
    //   [nextOrderNum, customerid, employeeid]
    // );

    await pool.query('COMMIT');
    res.status(201).json({ message: 'Orders added successfully' });

  } catch (error) {
    console.error('Error executing dynamic query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Complete Order Endpoint
app.put('/api/complete-order/:ordernum', async (req, res) => {
  const { ordernum } = req.params;

  try {
    // Update the timecompleted field to NOW() for the given ordernum
    const result = await pool.query(
      `UPDATE orders 
       SET timecompleted = NOW() 
       WHERE ordernum = $1 
       RETURNING *`,
      [ordernum]
    );

    // Check if the order exists
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // Return the updated order
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error completing order:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/create-customer', async (req, res) => {
  const { customerid, name, cardid } = req.body;

  try {
    // Check if the customerid already exists
    const existingCustomer = await pool.query(
      'SELECT * FROM customer WHERE customerid = $1',
      [customerid]
    );

    if (existingCustomer.rows.length > 0) {
      // Customer ID already exists
      return
    }

    // Insert the new customer
    const result = await pool.query(
      'INSERT INTO customer (customerid, name, cardid) VALUES ($1, $2, $3) RETURNING *',
      [customerid, name, cardid]
    );

    res.status(201).json({ 
      message: 'Customer added successfully', 
      newCustomer: result.rows[0] 
    });
  } catch (error) {
    console.error('Error adding customer:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Inventory endpoints
// POST endpoint for adding new inventory items
app.post('/api/inventory', async (req, res) => {
  const { ingrid, ingredient, quantity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO inventory_tb (ingrid, ingredient, quantity) VALUES ($1, $2, $3) RETURNING *',
      [ingrid, ingredient, quantity]
    );

    res.status(201).json({ message: 'Inventory item added successfully', newItem: result.rows[0] });
  } catch (error) {
    console.error('Error adding inventory item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT endpoint for updating inventory items
app.put('/api/inventory/:ingrid', async (req, res) => {
  const { ingrid } = req.params;
  const { ingredient, quantity } = req.body;

  try {
    const result = await pool.query(
      'UPDATE inventory_tb SET ingredient = $1, quantity = $2 WHERE ingrid = $3 RETURNING *',
      [ingredient, quantity, ingrid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory item updated successfully', updatedItem: result.rows[0] });
  } catch (error) {
    console.error('Error updating inventory item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE endpoint for deleting inventory items
app.delete('/api/inventory/:ingrid', async (req, res) => {
  const { ingrid } = req.params;

  try {
    const result = await pool.query('DELETE FROM inventory_tb WHERE ingrid = $1 RETURNING *', [ingrid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory item deleted successfully', deletedItem: result.rows[0] });
  } catch (error) {
    console.error('Error deleting inventory item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/api/delete-order/:ordernum', async (req, res) => {
  const { ordernum } = req.params;

  try {
    await pool.query('BEGIN');

    const deleteMenuItems = await pool.query('DELETE FROM menuitems WHERE ordernum = $1 RETURNING *', [ordernum]);
    console.log('Deleted menuitems:', deleteMenuItems.rowCount);

    const deleteOrders = await pool.query('DELETE FROM orders WHERE ordernum = $1 RETURNING *', [ordernum]);
    console.log('Deleted orders:', deleteOrders.rowCount);

    if (deleteOrders.rowCount === 0) {
      console.error(`Order not found: ${ordernum}`);
      await pool.query('ROLLBACK');
      return res.status(404).json({ error: 'Order not found' });
    }

    await pool.query('COMMIT');
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error deleting order:', error.message || error);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});



app.post('/api/send-order', async (req, res) => {
  const orders = req.body;
  console.log(orders);

  try {
    await pool.query('BEGIN');

    // Get the next order number
    const result = await pool.query('SELECT MAX(ordernum) AS highest_ordernum FROM orders');
    const nextOrderNum = result.rows[0].highest_ordernum + 1;

    // Insert each order item (excluding the last one)
    for (let i = 0; i < orders.length - 1; i++) {
      const { price, name, foodid1, foodid2, foodid3, foodid4 } = orders[i];
      
      await pool.query(
        `INSERT INTO menuitems (ordernum, price, name, foodid1, foodid2, foodid3, foodid4)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [nextOrderNum, price, name, foodid1, foodid2, foodid3, foodid4]
      );
    }

    // Extract customer and employee information from the last item in the array
    const { customerid, employeeid } = orders[orders.length - 1];

    // Insert into orders table with timecompleted as NULL
    await pool.query(
      `INSERT INTO orders (ordernum, customerid, employeeid, timecompleted)
       VALUES ($1, $2, $3, NULL)`,
      [nextOrderNum, customerid, employeeid]
    );

    await pool.query('COMMIT');
    res.status(201).json({ message: 'Orders added successfully' });

  } catch (error) {
    await pool.query('ROLLBACK');
    console.error('Error inserting orders:', error);
    res.status(500).json({ error: 'Failed to add orders' });
  }
});

app.get('/api/next-order-num', async (req, res) => {
  try {
    const result = await pool.query('SELECT MAX(ordernum) AS highest_ordernum FROM menuitems');
    const nextOrderNum = result.rows[0].highest_ordernum + 1;
    res.json({ nextOrderNum });
  } catch (error) {
    console.error('Error fetching next order number:', error);
    res.status(500).json({ error: 'Failed to fetch next order number' });
  }
});

// GET endpoint for inventory
app.get('/api/inventory', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM inventory_tb ORDER BY ingrid');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST endpoint for adding new inventory items
app.post('/api/inventory', async (req, res) => {
  const { ingrid, ingredient, quantity } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO inventory_tb (ingrid, ingredient, quantity) VALUES ($1, $2, $3) RETURNING *',
      [ingrid, ingredient, quantity]
    );

    res.status(201).json({ message: 'Inventory item added successfully', newItem: result.rows[0] });
  } catch (error) {
    console.error('Error adding inventory item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT endpoint for updating inventory items
app.put('/api/inventory/:ingrid', async (req, res) => {
  const { ingrid } = req.params;
  const { ingredient, quantity } = req.body;

  try {
    const result = await pool.query(
      'UPDATE inventory_tb SET ingredient = $1, quantity = $2 WHERE ingrid = $3 RETURNING *',
      [ingredient, quantity, ingrid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory item updated successfully', updatedItem: result.rows[0] });
  } catch (error) {
    console.error('Error updating inventory item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE endpoint for deleting inventory items
app.delete('/api/inventory/:ingrid', async (req, res) => {
  const { ingrid } = req.params;

  try {
    const result = await pool.query('DELETE FROM inventory_tb WHERE ingrid = $1 RETURNING *', [ingrid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json({ message: 'Inventory item deleted successfully', deletedItem: result.rows[0] });
  } catch (error) {
    console.error('Error deleting inventory item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Food Item endpoints
// GET endpoint for retrieving all food items
app.get('/api/fooditems', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fooditems ORDER BY foodid');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST endpoint for adding new food items
app.post('/api/fooditems', async (req, res) => {
  const { foodid, name, category, calories, isgf, isvegetarian, isspicy, ispremium, imagesrc } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO fooditems (foodid, name, category, calories, isgf, isvegetarian, isspicy, ispremium, imagesrc) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [foodid, name, category, calories, isgf || false, isvegetarian || false, isspicy || false, ispremium || false, imagesrc]
    );

    res.status(201).json({ message: 'Food item added successfully', newItem: result.rows[0] });
  } catch (error) {
    console.error('Error adding food item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT endpoint for updating food items
app.put('/api/fooditems/:foodid', async (req, res) => {
  const { foodid } = req.params;
  const { name, category, calories, isgf, isvegetarian, isspicy, ispremium, imagesrc } = req.body;

  try {
    const result = await pool.query(
      'UPDATE fooditems SET name = $1, category = $2, calories = $3, isgf = $4, isvegetarian = $5, isspicy = $6, ispremium = $7, imagesrc = $8 WHERE foodid = $9 RETURNING *',
      [name, category, calories, isgf || false, isvegetarian || false, isspicy || false, ispremium || false, imagesrc , foodid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item updated successfully', updatedItem: result.rows[0] });
  } catch (error) {
    console.error('Error updating food item:', error.stack); // Log full error stack
    res.status(500).json({ message: 'Internal server error', error: error.message }); // Return detailed error message
  }
});

// DELETE endpoint for deleting food items
app.delete('/api/fooditems/:foodid', async (req, res) => {
  const { foodid } = req.params;

  try {
    const result = await pool.query('DELETE FROM fooditems WHERE foodid = $1 RETURNING *', [foodid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json({ message: 'Food item deleted successfully', deletedItem: result.rows[0] });
  } catch (error) {
    console.error('Error deleting food item:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Employee endpoints
// POST endpoint for adding new employees
app.post('/api/employees', async (req, res) => {
  const { employeeid, name, salary, position } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO employees (employeeid, name, salary, position) VALUES ($1, $2, $3, $4) RETURNING *',
      [employeeid, name, salary, position]
    );

    res.status(201).json({ message: 'Employee added successfully', newEmployee: result.rows[0] });
  } catch (error) {
    console.error('Error adding employee:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT endpoint for updating employees
app.put('/api/employees/:employeeid', async (req, res) => {
  const { employeeid } = req.params;
  const { name, salary, position } = req.body;

  try {
    const result = await pool.query(
      'UPDATE employees SET name = $1, salary = $2, position = $3 WHERE employeeid = $4 RETURNING *',
      [name, salary, position, employeeid]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee updated successfully', updatedEmployee: result.rows[0] });
  } catch (error) {
    console.error('Error updating employee:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE endpoint for deleting employees
app.delete('/api/employees/:employeeid', async (req, res) => {
  const { employeeid } = req.params;

  try {
    const result = await pool.query('DELETE FROM employees WHERE employeeid = $1 RETURNING *', [employeeid]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    res.json({ message: 'Employee deleted successfully', deletedEmployee: result.rows[0] });
  } catch (error) {
    console.error('Error deleting employee:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET endpoint for retrieving all employees
app.get('/api/employees', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM employees ORDER BY employeeid');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/employees/:employeeId/position', async (req, res) => {
  const { employeeId } = req.params;

  try {
    const result = await pool.query('SELECT position FROM employees WHERE employeeid = $1', [employeeId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.json({ position: result.rows[0].position });
  } catch (error) {
    console.error(`Error fetching employee position: ${error.message}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Order History API
app.get('/api/orderhistory', async (req, res) => {
  try {
      const result = await pool.query(`
          SELECT 
              ordernum::integer as ordernum,
              customerid::text as customerid,
              employeeid::integer as employeeid,
              timecompleted::timestamp as timecompleted
          FROM public.orders 
          ORDER BY ordernum DESC
          LIMIT 200
      `);
      res.json(result.rows);
  } catch (error) {
      console.error('Error executing query:', error.stack);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Menu Items API
app.get('/api/menuitems/:ordernum', async (req, res) => {
  try {
    const ordernum = req.params.ordernum;
    const result = await pool.query(`
      SELECT 
        foodid1::integer as foodid1,
        foodid2::integer as foodid2,
        foodid3::integer as foodid3,
        foodid4::integer as foodid4,
        price::numeric as price,
        name::text as name,
        ordernum::integer as ordernum
      FROM public.menuitems
      WHERE ordernum = $1
      ORDER BY ordernum DESC
    `, [ordernum]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

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

app.get('/api/customer-total-price', async (req, res) => {
  const { customerId } = req.query;

  if (!customerId) {
    return res.status(400).json({ error: 'Customer ID is required' });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
          o.customerid,
          SUM(m.price) AS total_price
      FROM 
          orders o
      JOIN 
          menuitems m
      ON 
          o.ordernum = m.ordernum
      WHERE 
          o.customerid = $1
      GROUP BY 
          o.customerid
      `,
      [customerId]
    );

    // Extract rows from the result
    const rows = result.rows;

    // Log the results for debugging
    console.log("Query result:", rows);

    // Send the first row or a default response
    res.json(rows[0] || { customerid: customerId, total_price: 0 });
  } catch (err) {
    console.error("Error during query execution:", err.message);
    console.error(err.stack);
    res.status(500).json({ error: `Database query failed: ${err.message}` });
  }
});

// X Report endpoint
app.get('/api/xreport', async (req, res) => {
  const { date } = req.query;

  try {
    const result = await pool.query(
      'SELECT EXTRACT(HOUR FROM timecompleted) AS hour, COUNT(*) AS total_orders FROM orders WHERE DATE(timecompleted) = $1 GROUP BY EXTRACT(HOUR FROM timecompleted) ORDER BY hour',
      [date]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing X Report query:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Z Report endpoint
app.get('/api/zreport', async (req, res) => {
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const year = yesterdayDate.getFullYear();
  const month = String(yesterdayDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(yesterdayDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  // const formattedDate = '2024-09-20'; // TESTING

  try {
    const query = `
      SELECT menuitems.name AS menu_name, COUNT(*) AS item_count, COALESCE(SUM(menuitems.price), 0) AS total_price 
      FROM menuitems 
      LEFT JOIN orders ON orders.ordernum = menuitems.ordernum 
      WHERE DATE(orders.timecompleted) = $1 
      GROUP BY menuitems.name;
    `;
    
    const empQuery = `
      SELECT orders.employeeid, COUNT(orders.*) AS order_count, employees.name 
      FROM orders 
      JOIN employees ON orders.employeeid = employees.employeeid 
      WHERE DATE(timecompleted) = $1 
      GROUP BY orders.employeeid, employees.name 
      ORDER BY order_count DESC;
    `;

    const salesResult = await pool.query(query, [formattedDate]);
    const empResult = await pool.query(empQuery, [formattedDate]);

    res.json({ sales: salesResult.rows, employees: empResult.rows });
  } catch (error) {
    console.error('Error generating Z Report:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/totalsales', async (req, res) => {
  const { range } = req.query;

  let dateCondition = '';
  if (range === 'day') {
    dateCondition = `WHERE DATE(hour_start) >= NOW() - INTERVAL '1 day'`;
  } else if (range === 'week') {
    dateCondition = `WHERE DATE(hour_start) >= NOW() - INTERVAL '1 week'`;
  } else if (range === 'month') {
    dateCondition = `WHERE DATE(hour_start) >= NOW() - INTERVAL '1 month'`;
  } else if (range === 'year') {
    dateCondition = `WHERE DATE(hour_start) >= NOW() - INTERVAL '1 year'`;
  }

  try {
    const result = await pool.query(`
      SELECT DATE(hour_start) AS sale_date, SUM(total_sales) AS total_sales 
      FROM public.realisticsaleshistory 
      ${dateCondition} 
      GROUP BY sale_date 
      ORDER BY sale_date
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching total sales data:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Gross Revenue endpoint
app.get('/api/grossrevenue', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT foodid, gross_revenue 
      FROM public.grossrevenueperfood2
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching gross revenue data:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Employee Productivity endpoint
app.get('/api/employeeproductivity', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT employeeid, name, position, total_orders_completed 
      FROM public.employeeproductivity
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching employee productivity data:', error.stack);
    res.status(500).json({ message: 'Internal server error' });
  }
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