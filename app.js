const express = require('express');
const logger = require('morgan');
const axios = require('axios'); // npm install axios --save


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(logger('dev'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html')
})

//curl localhost:3000/user/tommy
app.get('/user/:id', (req, res) => {
    res.send(`User id is ${req.params.id}`);
})

// curl "localhost:{port}/user?id={ur-id}"
app.get('/user', (req, res) => {
    res.send(`User id is ${req.query.id}`);
})

// curl -X POST localhost:3000/user -d '{"id": "pingk", "name" :"Yoonsoo Park"}' -H "Content-Type: application/json"
app.post('/user', (req, res) => {
    console.log(req.body.name);
    res.send(req.body);
})

app.get('/musicSearch/:term', async (req, res) => {
    const params = {
        term : req.params.term,
        entity: "album",
    }
    var response = await axios.get('https://itunes.apple.com/search', {params : params});
    console.log(response.data);
    res.json(response.data);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

