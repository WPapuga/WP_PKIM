const express = require('express')
const app = express()
const port = 3080

app.get('/', (req, res) => {
  res.send('Hello world!')
})
app.get('/test', (req, res) => {
  res.send('test')
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})