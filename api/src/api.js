const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()
const port = 3100

  
app.use(cors()); 
app.use(bodyParser.json()); 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.get('/', (req, res) => {
    res.send("Api hello world");
});

app.get('/getExchangeRate', (req, res) => {
    const currency = req.query.currency;
    console.log(currency);
    let control = 0;
    fetch('http://api.nbp.pl/api/exchangerates/tables/A')
    .then(reposne => reposne.json())
    .then(data => {
        const currencyTable = data[0].rates;
        for (let i = 0; i < currencyTable.length; i++) {
            if(currencyTable[i].code == currency) {
                control = 1;
                res.send({message: 'Sukces', rate: currencyTable[i].mid});
            }
        }
        if (control == 0){
            res.send({message: 'error'})
        }
    });
});

app.listen(port, () => {
    console.log(`api listening on port ${port}`)
})