const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Подключение к базе данных
const pool = new Pool({
  connectionString: 'postgres://owner:jybotyrj21021995@127.0.0.1:5432/db-bazarchik?schema=public'
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.send(`Hello World! Current time is: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Something went wrong!');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://127.0.0.1:${port}/`);
});
