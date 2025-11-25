const express = require('express');
const logger = require('morgan');
const axios = require('axios'); // npm install axios --save


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : true}));
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.send('Hello world!');
})

//curl localhost:3000/user/tommy
app.get('/user/:id', (req, rse) => {
    res.send(`User id is ${req.params.id}`);
})

// curl "localhost:{port}/user?id={ur-id}"
app.get('/user', (req, rse) => {
    res.send(`User id is ${req.query.id}`);
})

// curl -X POST localhost:3000/user -d '{"id": "jyc", "name" :"Jae Young"}' -H "Content-Type: application/json"
app.post('/user', (req, rse) => {
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

