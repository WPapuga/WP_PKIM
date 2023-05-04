const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
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
  
app.use(cors()); 
app.use(bodyParser.json()); 


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

app.post('/register', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;

  conn.query("INSERT INTO users (email, username, password) VALUES(?,?,?)", [email, username, password], (error, result) => {
    if (error) {
      console.log(error);
      res.send({message: error});
    } else {
      res.send({message: "Sukces"});
    }
  })
});

app.post('/login', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const email = req.body.email;
  const password = req.body.password;
  conn.query("SELECT * FROM users WHERE email = ? AND password = ?", [email, password], (error, result) => {
    if (error){
      console.log(error);
      res.send({error: error});
    } else {
      if (result.length != 0){
        console.log(result);
        res.send({ message: "Sukces"});
      } else {
        console.log({ message: "Zła kombinacja email/hasło!"});
        res.send({ message: "Zła kombinacja email/hasło!"});
      }
    }
  })
});

app.post('/createAd', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const price = req.body.price;
  const content = req.body.content;
  const user_id = req.body.user_id;
  conn.query("INSERT INTO adverts (price, content, user_id) VALUES(?,?,?)", [price, content, user_id], (error, result) => {
    if (error) {
      console.log(error);
      res.send({message: error});
    } else {
      res.send({message: "Sukces"});
    }
  })
})

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})