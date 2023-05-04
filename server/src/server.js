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

app.get('/advertsCustom', (req, res) => {
  const user_id = req.query.user_id;
  console.log(user_id);
  conn.query('SELECT adverts.id, price, content, username FROM adverts join users on adverts.user_id = users.id WHERE adverts.user_id = (?)', [user_id], (error, results, fields) => {
    if (error) throw error;
    console.log('Rekordy z tabeli adverts: ', results);
    res.send(results);
  });
});

app.put('/advertCreate', (req, res) => {
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
      res.send({message: "Nie udało się dodać ogłoszenia"});
    } else {
      res.send({message: "Sukces"});
    }
  })
});

app.delete('/advertDelete', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  const id = req.body.id;
  conn.query("DELETE FROM adverts WHERE id = ?", [id], (error, result) => {
    if (error) {
      console.log(error);
      res.send({message: "Nie udało się usunąć ogłoszenia"});
    } else {
      res.send({message: "Sukces"});
    }
  })
});

app.post('/register', (req, res) => {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  console.log(req.body);
  conn.query("INSERT INTO users (email, username, password) VALUES(?,?,?)", [email, username, password], (error, result) => {
    if (error) {
      console.log("Duplikat");
      res.send({message: "Użytkownik o podanym emailu/nazwie użytkownika już istnieje"});
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
        res.send({ message: "Sukces", user_id: result[0].id});
      } else {
        console.log({ message: "Zła kombinacja email/hasło!"});
        res.send({ message: "Zła kombinacja email/hasło!"});
      }
    }
  })
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})