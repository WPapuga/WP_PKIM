const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 3080

const conn = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: '123',
    database: 'wp_pkim_db',
});

conn.connect(function(err) {
    if (err) {
      console.error('Database connection error ' + err.stack);
      return;
    }
    console.log('Connection has been established on thread: ' + conn.threadId);
  });
  

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  });

app.get('/', (req, res) => {
    res.send('Hello world!')
})
app.get('/test', (req, res) => {
    res.send('test')
});
app.get('/users', (req, res) => {
    conn.query('SELECT * FROM users', function (error, results, fields) {
    if (error) throw error;
    console.log('Rekordy z tabeli users: ', results);
    res.send(results);
    });
});
app.get('/adverts', (req, res) => {
    conn.query('SELECT adverts.id, price, content, username FROM adverts join users on adverts.user_id = users.id', function (error, results, fields) {
      if (error) throw error;
      console.log('Rekordy z tabeli adverts: ', results);
      res.send(results);
    });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})